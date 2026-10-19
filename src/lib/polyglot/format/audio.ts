import {ADTS, Conversion, Input, MP3, OGG, Output, Mp4OutputFormat, Quality, WAVE} from 'mediabunny';

import {ArtifactReference, InputSource, ProcessingContext} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {invalid} from '../io/binary';
import {TOTAL_INPUT_LIMIT} from '../io/bytes';
import {mediaSource, mediaTarget} from '../io/media-io';
import {TemporaryStorage} from '../io/temporary-storage';
import {checkCancelled, diagnose, ProcessingError} from '../logic/diagnostic';
import {inspectAudioStructure} from './audio-structure';
import {withReadProgress} from '../io/read-progress';

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
  const report = (fraction: number, detail: 'audio-structure' | 'audio-metadata'): void => {
    context.progress({stage: 'plan', completed: Math.floor(fraction * 10000), total: 10000, unit: 'bytes', estimated: true, detail});
  };
  report(0, 'audio-structure');
  await inspectAudioStructure(withReadProgress(source.reader, fraction => report(fraction * 0.4, 'audio-structure')), context);
  report(0.4, 'audio-metadata');
  const input = audioInput({...source, reader: withReadProgress(source.reader, fraction => report(0.4 + fraction * 0.59, 'audio-metadata'))}, context);
  try {
    const tracks = await input.getTracks();
    const audio = await input.getAudioTracks();
    if (tracks.length !== 1 || audio.length !== 1 || !audio[0]) { invalid('AUDIO_TRACKS', {reason: 'MEDIA_TRACKS', tracks: tracks.length, audioTracks: audio.length}); }
    const track = audio[0];
    const codec = await track.getCodec();
    if (!codec || !['mp3', 'vorbis', 'opus', 'aac'].includes(codec) && !codec.startsWith('pcm-')) { invalid('AUDIO_CODEC', {reason: 'MEDIA_CODEC', codec: codec ?? 'unknown'}); }
    const channels = await track.getNumberOfChannels();
    const sampleRate = await track.getSampleRate();
    // Seven-channel AAC requires a program configuration element, outside the classic ASC relocation scope.
    if (![1, 2, 3, 4, 5, 6, 8].includes(channels)) { invalid('AUDIO_CHANNELS', {reason: 'MEDIA_CHANNELS', actual: channels}); }
    if (!Number.isFinite(sampleRate) || sampleRate < 7350 || sampleRate > 192000) { invalid('AUDIO_CODEC', {reason: 'MEDIA_SAMPLE_RATE', actual: Number.isFinite(sampleRate) ? sampleRate : 0}); }
    const duration = await input.computeDuration();
    checkCancelled(context.signal);
    if (!Number.isFinite(duration) || duration <= 0) { invalid('AUDIO_INVALID', {reason: 'AUDIO_DURATION'}); }
    const outputRate = AAC_SAMPLE_RATES.includes(sampleRate) ? sampleRate : 48000;
    if (duration * AUDIO_BITRATE / 8 > TOTAL_INPUT_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'AUDIO_OUTPUT_BYTES', actual: Math.ceil(duration * AUDIO_BITRATE / 8), limit: TOTAL_INPUT_LIMIT}); }
    if (Math.ceil(duration * outputRate / 1024) + 2 > 4000000) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'AUDIO_PACKETS', actual: Math.ceil(duration * outputRate / 1024) + 2, limit: 4000000}); }
    const copy = codec === 'aac' && AAC_SAMPLE_RATES.includes(sampleRate) && await track.getCodecParameterString() === 'mp4a.40.2';
    if (!copy && !await track.canDecode()) {
      if (codec !== 'mp3') { invalid('AUDIO_DECODE_UNAVAILABLE', {reason: 'AUDIO_DECODE', codec: codec.startsWith('pcm-') ? 'pcm' : codec}); }
      const {registerMp3Decoder} = await import('./mp3-decoder');
      checkCancelled(context.signal);
      registerMp3Decoder();
      if (!await track.canDecode()) { invalid('AUDIO_DECODE_UNAVAILABLE', {reason: 'AUDIO_DECODE', codec: 'mp3'}); }
    }
    report(1, 'audio-metadata');
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
    if (context.signal.aborted) { throw new ProcessingError({code: 'CANCELLED', severity: 'info'}); }
    throw new ProcessingError(diagnose(sinkFailure ?? error, 'AUDIO_CONVERSION_FAILED'));
  } finally {
    context.signal.removeEventListener('abort', cancel);
    if (conversion && conversion.state !== 'done') { await conversion.cancel().catch(() => {}); }
    input.dispose();
  }
}
