import {readFileSync} from 'node:fs';
import {describe, expect, it} from 'vitest';

import {BlobInput} from '../io/blob-input';
import {InputSource} from '../model/contract';
import {inspectInputs} from './inspect';
import {probeMp4, MEDIA_PROBE_BYTES, MEDIA_PROBE_HEADERS} from '../format/mp4-probe';

const context = (): {signal: AbortSignal; progress: () => void} => ({signal: new AbortController().signal, progress: () => {}});
const source = (name: string, bytes: BlobPart): InputSource => ({id: name, name, mediaType: '', reader: new BlobInput(new Blob([bytes]))});

describe('bounded early compatibility checks', () => {
  it('recognizes encrypted, incremental, stream-based and linearized PDFs before full validation', async() => {
    for (const [file, reason] of [['encrypted.pdf', 'ENCRYPTED'], ['incremental.pdf', 'INCREMENTAL']]) {
      expect((await inspectInputs([source(file!, new Uint8Array(readFileSync(`e2e/fixture/${file}`)))], context())).diagnostics).toContainEqual(expect.objectContaining({details: {reason}}));
    }
    const stream = '%PDF-1.5\n1 0 obj\n<</Type/XRef /Size 1 /Length 0 /W[1 1 1]>>\nstream\n\nendstream\nendobj\nstartxref\n9\n%%EOF\n';
    expect((await inspectInputs([source('stream.pdf', stream)], context())).diagnostics).toContainEqual(expect.objectContaining({code: 'PDF_STRUCTURE', details: {reason: 'XREF_STREAM'}}));
    const linearized = '%PDF-1.4\n1 0 obj<</Linearized 1 /L 100>>endobj';
    expect((await inspectInputs([source('linearized.pdf', linearized)], context())).diagnostics).toContainEqual(expect.objectContaining({details: {reason: 'LINEARIZED'}}));
  });

  it('defers object integrity and a trailer outside the bounded probe while enforcing the read budget', async() => {
    const original = readFileSync('e2e/fixture/classic.pdf', 'utf8');
    const brokenObject = original.replace('1 0 obj', '7 0 obj');
    expect((await inspectInputs([source('later.pdf', brokenObject)], context())).diagnostics).toEqual([]);
    const padded = original.replace('trailer\n', `trailer\n%${'padding '.repeat(10000)}\n`);
    const input = source('padded.pdf', padded);
    const ranges: number[] = [];
    const reader = input.reader;
    const bounded = {...input, reader: {size: reader.size, read: (offset: number, length: number, signal: AbortSignal) => { ranges.push(length); return reader.read(offset, length, signal); }}};
    expect((await inspectInputs([bounded], context())).diagnostics).toEqual([]);
    expect(ranges).toHaveLength(3);
    expect(ranges.reduce((sum, length) => sum + length, 0)).toBeLessThanOrEqual(65536 + 65557 + 16384);
  });

  it('catches unsupported image signatures, excessive dimensions and positive animation flags', async() => {
    const png = new Uint8Array(readFileSync('e2e/fixture/transparent.png'));
    new DataView(png.buffer).setUint32(16, 32768);
    const wide = (await inspectInputs([source('wide.png', png)], context())).diagnostics.find(item => item.code === 'IMAGE_RESOURCE_LIMIT');
    expect(wide?.details).toMatchObject({reason: 'IMAGE_DIMENSIONS', width: 32768, limit: 32767});
    expect((await inspectInputs([source('vector.svg', '<svg xmlns="http://www.w3.org/2000/svg"></svg>')], context())).diagnostics).toContainEqual(expect.objectContaining({code: 'IMAGE_UNSUPPORTED', details: {reason: 'IMAGE_FORMAT', format: 'svg'}}));
    const animated = new Uint8Array(readFileSync('e2e/fixture/animated.png'));
    expect((await inspectInputs([source('animated.png', animated)], context())).diagnostics).toContainEqual(expect.objectContaining({code: 'IMAGE_ANIMATED'}));
  });

  it('finds incompatible video metadata without reading media payloads or scanning a long box list', async() => {
    const video = new Uint8Array(readFileSync('e2e/fixture/video-aac.mp4'));
    const index = Buffer.from(video).indexOf('avc1', 40);
    expect(index).toBeGreaterThan(40);
    video.set(new TextEncoder().encode('hvc1'), index);
    expect((await inspectInputs([source('hevc.mp4', video)], context())).diagnostics).toContainEqual(expect.objectContaining({code: 'MP4_CODEC', details: {reason: 'MEDIA_CODEC', codec: 'h265'}}));
    const size = 1024 ** 3;
    let reads = 0; let bytes = 0;
    await probeMp4({size, read: (_offset, length) => {
      reads++; bytes += length;
      const data = new Uint8Array(length); new DataView(data.buffer).setUint32(0, 8); data.set(new TextEncoder().encode('free'), 4); return Promise.resolve(data);
    }}, context());
    expect(reads).toBeLessThanOrEqual(MEDIA_PROBE_HEADERS);
    expect(bytes).toBeLessThanOrEqual(MEDIA_PROBE_BYTES);
  });
});
