import {ADTS, Conversion, Input, MP3, OGG, Output, Mp4OutputFormat, Quality, WAVE} from 'mediabunny';

import {ArtifactReference, InputSource, ProcessingContext} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {invalid} from '../io/binary';
import {TOTAL_INPUT_LIMIT} from '../io/bytes';
import {mediaSource, mediaTarget} from '../io/media-io';
import {TemporaryStorage} from '../io/temporary-storage';
import {checkCancelled, diagnose, ProcessingError} from '../logic/diagnostic';
import {inspectAudioStructure} from './audio-structure';

/** Upstream-aligned initial AAC-LC bitrate; compatible encoded AAC is copied instead. */
export const AUDIO_BITRATE = 192000;

/** AAC-LC accepts a discrete set of sample rates; normalize other PCM rates to 48 kHz. */
const AAC_SAMPLE_RATES: readonly number[] = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];

/** Validated conversion metadata only; live decoders and input handles are scoped to each call. */
export interface AudioInfo {
  readonly codec: string;
  readonly channels: number;
  readonly sampleRate: number;
  readonly duration: number;
  readonly copy: boolean;
}

/**
 * Restricts the reader to local supported audio containers, excluding HLS/URL-based sources.
 * @param {InputSource} source Selected local file.
 * @param {ProcessingContext} context Cancellation.
 * @returns {Input} Owned media input, requiring disposal.
 */
function audioInput(source: InputSource, context: ProcessingContext): Input {
  return new Input({source: mediaSource(source.reader, context), formats: [MP3, WAVE, OGG, ADTS]});
}

/**
 * Validates the single audio track and browser decoding capability without writing or encoding it.
 * @param {InputSource} source MP3, WAVE, Ogg, or ADTS input.
 * @param {ProcessingContext} context Cancellation and progress.
 * @returns {Promise<AudioInfo>} Supported codec and bounded conversion estimates.
 */
export async function inspectAudio(source: InputSource, context: ProcessingContext): Promise<AudioInfo> {
  checkCancelled(context.signal);
  await inspectAudioStructure(source.reader, context);
  const input = audioInput(source, context);
  try {
    const tracks = await input.getTracks();
    const audio = await input.getAudioTracks();
    if (tracks.length !== 1 || audio.length !== 1 || !audio[0]) { invalid('AUDIO_TRACKS'); }
    const track = audio[0];
    const codec = await track.getCodec();
    if (!codec || !['mp3', 'vorbis', 'opus', 'aac'].includes(codec) && !codec.startsWith('pcm-')) { invalid('AUDIO_CODEC'); }
    const channels = await track.getNumberOfChannels();
    const sampleRate = await track.getSampleRate();
    // Seven-channel AAC requires a program configuration element, outside the classic ASC relocation scope.
    if (![1, 2, 3, 4, 5, 6, 8].includes(channels)) { invalid('AUDIO_CHANNELS'); }
    if (!Number.isFinite(sampleRate) || sampleRate < 7350 || sampleRate > 192000) { invalid('AUDIO_CODEC'); }
    const duration = await input.computeDuration();
    checkCancelled(context.signal);
    if (!Number.isFinite(duration) || duration <= 0) { invalid('AUDIO_INVALID'); }
    const outputRate = AAC_SAMPLE_RATES.includes(sampleRate) ? sampleRate : 48000;
    if (duration * AUDIO_BITRATE / 8 > TOTAL_INPUT_LIMIT || Math.ceil(duration * outputRate / 1024) + 2 > 4000000) { invalid('FORMAT_RESOURCE_LIMIT'); }
    const copy = codec === 'aac' && AAC_SAMPLE_RATES.includes(sampleRate) && await track.getCodecParameterString() === 'mp4a.40.2';
    if (!copy && !await track.canDecode()) { invalid('AUDIO_DECODE_UNAVAILABLE'); }
    return {codec, channels, sampleRate, duration, copy};
  } catch(error) { throw new ProcessingError(diagnose(error, 'AUDIO_INVALID')); }
  finally { input.dispose(); }
}

/**
 * Converts inside the cancellable worker to a file-backed, non-fragmented AAC-LC MP4 intermediate.
 * @param {InputSource} source Original local audio.
 * @param {AudioInfo} info Validated metadata.
 * @param {TemporaryStorage} storage Owning job workspace.
 * @param {ProcessingContext} context Cancellation and measured media-time progress.
 * @returns {Promise<{source: InputSource; artifact: ArtifactReference}>} Closed seekable intermediate to relocate.
 */
export async function normalizeAudio(source: InputSource, info: AudioInfo, storage: TemporaryStorage, context: ProcessingContext): Promise<{source: InputSource; artifact: ArtifactReference}> {
  checkCancelled(context.signal);
  if (!info.copy) {
    const {registerAacEncoder} = await import('@mediabunny/aac-encoder');
    registerAacEncoder();
  }
  const {id, writer} = await storage.createOutput(TOTAL_INPUT_LIMIT);
  const input = audioInput(source, context);
  let sinkFailure: unknown;
  const output = new Output({format: new Mp4OutputFormat({fastStart: false}), target: mediaTarget(writer, context.signal, error => { sinkFailure = error; })});
  let conversion: Conversion | undefined;
  const cancel = (): void => { void conversion?.cancel().catch(() => {}); };
  context.signal.addEventListener('abort', cancel, {once: true});
  try {
    conversion = await Conversion.init({
      input, output, tags: {},
      audio: {codec: 'aac', ...(info.copy ? {} : {quality: new Quality({bitrate: AUDIO_BITRATE}), sampleRate: AAC_SAMPLE_RATES.includes(info.sampleRate) ? info.sampleRate : 48000})}
    });
    if (!conversion.isValid || conversion.discardedTracks.length) { invalid('AUDIO_DECODE_UNAVAILABLE'); }
    const total = Math.ceil(info.duration * 1000000);
    let completed = 0;
    context.progress({stage: 'convert', completed, total, unit: 'microseconds'});
    conversion.onProgress = (_fraction, time) => {
      checkCancelled(context.signal);
      completed = Math.max(completed, Math.min(total, Math.round(time * 1000000)));
      context.progress({stage: 'convert', completed, total, unit: 'microseconds'});
    };
    checkCancelled(context.signal);
    await conversion.execute();
    checkCancelled(context.signal);
    const artifact = await writer.finish(storage.jobId, id, 'audio/mp4', context.signal);
    return {artifact, source: {...source, reader: new BlobInput(await storage.resolve(artifact))}};
  } catch(error) {
    if (context.signal.aborted) { invalid('CANCELLED'); }
    throw new ProcessingError(diagnose(sinkFailure ?? error, 'AUDIO_CONVERSION_FAILED'));
  } finally {
    context.signal.removeEventListener('abort', cancel);
    if (conversion && conversion.state !== 'done') { await conversion.cancel().catch(() => {}); }
    input.dispose();
  }
}
