import {describe, expect, it, vi} from 'vitest';

import {CHUNK_BYTES} from './bytes';
import {OutputWriter} from './output-writer';
import {writeMediaChunk} from './media-io';

describe('positioned media output', () => {
  it('splits oversized writes and repairs a range that crosses the current file end', async() => {
    const writes: {offset: number; size: number}[] = [];
    const write = vi.fn((offset: number, bytes: Uint8Array) => { writes.push({offset, size: bytes.length}); return Promise.resolve(); });
    const output = new OutputWriter({write, close: async() => {}, abort: async() => {}}, 3 * CHUNK_BYTES);
    const signal = new AbortController().signal;
    await writeMediaChunk(output, {type: 'write', position: 0, data: new Uint8Array(CHUNK_BYTES + 10)}, signal);
    await writeMediaChunk(output, {type: 'write', position: CHUNK_BYTES, data: new Uint8Array(20)}, signal);
    expect(writes).toEqual([{offset: 0, size: CHUNK_BYTES}, {offset: CHUNK_BYTES, size: 10}, {offset: CHUNK_BYTES, size: 10}, {offset: CHUNK_BYTES + 10, size: 10}]);
    expect(output.size).toBe(CHUNK_BYTES + 20);
  });

  it('rejects gaps, quota exhaustion, cancellation, and further writes after a sink failure', async() => {
    const output = new OutputWriter({write: () => Promise.reject(new DOMException('quota', 'QuotaExceededError')), close: async() => {}, abort: async() => {}}, 10);
    const signal = new AbortController().signal;
    await expect(writeMediaChunk(output, {type: 'write', position: 1, data: new Uint8Array(1)}, signal)).rejects.toMatchObject({diagnostic: {code: 'INVALID_RANGE'}});
    await expect(writeMediaChunk(output, {type: 'write', position: 0, data: new Uint8Array(1)}, signal)).rejects.toMatchObject({diagnostic: {code: 'STORAGE_FULL'}});
    await expect(writeMediaChunk(output, {type: 'write', position: 0, data: new Uint8Array(1)}, signal)).rejects.toMatchObject({diagnostic: {code: 'IO_FAILURE'}});
    const controller = new AbortController();
    controller.abort();
    await expect(writeMediaChunk(output, {type: 'write', position: 0, data: new Uint8Array(0)}, controller.signal)).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
    await expect(writeMediaChunk(output, {type: 'write', position: NaN, data: new Uint8Array(1)}, signal)).rejects.toMatchObject({diagnostic: {code: 'INVALID_RANGE'}});
  });
});
