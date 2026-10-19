// Test-only decoder evidence; does not need OPFS or enter the production bundle.
import {AudioSampleSink, BufferSource, Input, MP3} from 'mediabunny';

import {BlobInput} from '../src/lib/polyglot/io/blob-input';
import {inspectAudio} from '../src/lib/polyglot/format/audio';

/**
 * Decodes packet-by-packet without AudioDecoder/AudioData or storage APIs.
 * @param {Uint8Array<ArrayBuffer>} bytes Small original fixture.
 * @returns {Promise<{channels: number; sampleRate: number; frames: number; continuous: boolean; rms: number[]}>} Measured PCM properties.
 */
export async function decodeMp3(bytes: Uint8Array<ArrayBuffer>): Promise<{channels: number; sampleRate: number; frames: number; continuous: boolean; rms: number[]}> {
  const info = await inspectAudio({id: 'mp3', name: 'tone.mp3', mediaType: 'audio/mpeg', reader: new BlobInput(new Blob([bytes]))}, {signal: new AbortController().signal, progress: () => {}});
  const input = new Input({source: new BufferSource(bytes), formats: [MP3]});
  const sums = Array<number>(info.channels).fill(0);
  let frames = 0;
  let continuous = true;
  try {
    const track = await input.getPrimaryAudioTrack();
    if (!track) { throw new Error('No MP3 track'); }
    for await (const sample of new AudioSampleSink(track).samples()) {
      continuous &&= Math.abs(sample.timestamp - frames / info.sampleRate) < 0.000001;
      for (let channel = 0; channel < info.channels; channel++) {
        const data = new Float32Array(sample.numberOfFrames);
        sample.copyTo(data, {planeIndex: channel, format: 'f32-planar'});
        for (const value of data) { sums[channel]! += value * value; }
      }
      frames += sample.numberOfFrames;
      sample.close();
    }
    return {channels: info.channels, sampleRate: info.sampleRate, frames, continuous, rms: sums.map(sum => Math.sqrt(sum / frames))};
  } finally { input.dispose(); }
}
