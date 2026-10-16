import {readFileSync} from 'node:fs';
import {describe, expect, it, vi} from 'vitest';

import {BlobInput} from '../io/blob-input';
import {CHUNK_BYTES, INPUT_LIMIT} from '../io/bytes';
import {InputSource, ProcessingContext} from '../model/contract';
import {inspectAudio} from './audio';
import {inspectAudioStructure} from './audio-structure';
import {inspectMp4} from './mp4';

const context = (): ProcessingContext => ({signal: new AbortController().signal, progress: vi.fn()});
const fixture = (name: string): Uint8Array<ArrayBuffer> => new Uint8Array(readFileSync(`e2e/fixture/${name}`));
const source = (bytes: Uint8Array<ArrayBuffer>, name = 'audio.wav'): InputSource => ({id: 'audio', name, mediaType: '', reader: new BlobInput(new Blob([bytes]))});

describe('audio preparation and structural limits', () => {
  it.each(['audio.wav', 'audio-stereo.wav', 'audio-float.wav'])('validates PCM without native WebCodecs: %s', async name => {
    const info = await inspectAudio(source(fixture(name), name), context());
    expect(info).toMatchObject({channels: name === 'audio.wav' ? 1 : 2, sampleRate: 48000, duration: 2, copy: false});
  });

  it('plans ADTS AAC copy without requiring a decoder and accepts compatible audio-only MP4', async() => {
    expect(await inspectAudio(source(fixture('audio.aac'), 'audio.aac'), context())).toMatchObject({codec: 'aac', copy: true, channels: 1});
    expect(await inspectMp4(source(fixture('audio.m4a')).reader, context())).toMatchObject({audio: true, video: false});
  });

  it.each(['audio-vorbis.ogg', 'audio-opus.ogg'])('verifies every Ogg page and rejects corrupt/truncated/chained %s', async name => {
    const bytes = fixture(name);
    await expect(inspectAudioStructure(source(bytes).reader, context())).resolves.toBeUndefined();
    const corrupt = bytes.slice();
    corrupt[corrupt.length - 1]! ^= 1;
    for (const malformed of [corrupt, bytes.slice(0, -1), new Uint8Array([...bytes, ...bytes])]) {
      await expect(inspectAudioStructure(source(malformed).reader, context())).rejects.toBeInstanceOf(Error);
    }
  });

  it('rejects malformed WAV lengths, incomplete PCM frames, unsupported channels, and oversized ID3 tags', async() => {
    await expect(inspectAudio(source(fixture('audio-corrupt.wav')), context())).rejects.toBeInstanceOf(Error);
    const truncated = fixture('audio.wav').slice(0, -1);
    await expect(inspectAudio(source(truncated), context())).rejects.toMatchObject({diagnostic: {code: 'AUDIO_INVALID'}});
    const multi = fixture('audio.wav');
    const format = Buffer.from(multi).indexOf('fmt ');
    new DataView(multi.buffer).setUint16(format + 10, 7, true);
    await expect(inspectAudio(source(multi), context())).rejects.toMatchObject({diagnostic: {code: 'AUDIO_CHANNELS'}});
    const id3 = new Uint8Array([73, 68, 51, 4, 0, 0, 1, 0, 0, 0]);
    await expect(inspectAudioStructure(source(id3).reader, context())).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
  });

  it('inspects a synthetic 1 GiB PCM source through bounded reads without allocating its payload', async() => {
    const size = INPUT_LIMIT;
    const header = new Uint8Array(44);
    const view = new DataView(header.buffer);
    header.set(new TextEncoder().encode('RIFF'), 0);
    view.setUint32(4, size - 8, true);
    header.set(new TextEncoder().encode('WAVEfmt '), 8);
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 2, true);
    view.setUint32(24, 48000, true);
    view.setUint32(28, 192000, true);
    view.setUint16(32, 4, true);
    view.setUint16(34, 16, true);
    header.set(new TextEncoder().encode('data'), 36);
    view.setUint32(40, size - 44, true);
    const read = vi.fn((offset: number, length: number) => {
      expect(length).toBeLessThanOrEqual(CHUNK_BYTES);
      const bytes = new Uint8Array(length);
      if (offset < header.length) { bytes.set(header.subarray(offset, Math.min(header.length, offset + length))); }
      return Promise.resolve(bytes);
    });
    const info = await inspectAudio({id: 'large', name: 'large.wav', mediaType: '', reader: {size, read}}, context());
    expect(info.duration).toBeCloseTo((size - 44) / 192000, 6);
    expect(read.mock.calls.reduce((sum, [, count]) => sum + count, 0)).toBeLessThan(CHUNK_BYTES);
  });
});
