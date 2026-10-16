import {describe, expect, it, vi} from 'vitest';

import {BlobInput} from './blob-input';
import {CHUNK_BYTES, INPUT_LIMIT, validRange} from './bytes';
import {OutputSink, OutputWriter} from './output-writer';

const signal = (): AbortSignal => new AbortController().signal;
const sink = (): OutputSink => ({write: vi.fn(async() => {}), close: vi.fn(async() => {}), abort: vi.fn(async() => {})});

describe('bounded byte I/O', () => {
  it('checks safe integer ranges without overflowing the endpoint calculation', () => {
    expect(validRange(Number.MAX_SAFE_INTEGER, 0, Number.MAX_SAFE_INTEGER)).toBe(true);
    expect(validRange(Number.MAX_SAFE_INTEGER, 1, Number.MAX_SAFE_INTEGER)).toBe(false);
    for (const value of [-1, NaN, Infinity, 0.1]) { expect(validRange(value, 1, 10)).toBe(false); }
    expect(validRange(3, 1, 3)).toBe(false);
  });

  it('reads only the requested Blob slice, with immediate bounds and allocation checks', async() => {
    const blob = new Blob(['abcdef']);
    const slice = vi.spyOn(blob, 'slice');
    const reader = new BlobInput(blob);
    expect(new TextDecoder().decode(await reader.read(2, 3, signal()))).toBe('cde');
    expect(slice).toHaveBeenCalledExactlyOnceWith(2, 5);
    await expect(reader.read(0, CHUNK_BYTES + 1, signal())).rejects.toMatchObject({diagnostic: {code: 'INVALID_RANGE'}});
    await expect(reader.read(6, 1, signal())).rejects.toMatchObject({diagnostic: {code: 'INVALID_RANGE'}});
    expect(slice).toHaveBeenCalledTimes(1);
  });

  it('rejects cancellation after an asynchronous read and detects truncated readers', async() => {
    const controller = new AbortController();
    const blob = new Blob(['abc']);
    vi.spyOn(blob, 'slice').mockImplementation(() => {
      controller.abort();
      return new Blob(['a']);
    });
    await expect(new BlobInput(blob).read(0, 3, controller.signal)).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
    await expect(new BlobInput(blob).read(0, 3, signal())).rejects.toMatchObject({diagnostic: {code: 'TRUNCATED_INPUT'}});
  });

  it('copies a synthetic 1 GiB source in <=1 MiB backpressured reads/writes', async() => {
    let inFlight = false;
    let writes = 0;
    let reads = 0;
    const target = sink();
    target.write = async(offset, bytes) => {
      expect(inFlight).toBe(false);
      inFlight = true;
      expect(offset).toBe(writes * CHUNK_BYTES);
      expect(bytes.length).toBeLessThanOrEqual(CHUNK_BYTES);
      await Promise.resolve();
      writes++;
      inFlight = false;
    };
    const writer = new OutputWriter(target, INPUT_LIMIT);
    await writer.copy({size: INPUT_LIMIT, read: (offset, length) => {
      expect(inFlight).toBe(false);
      expect(offset).toBe(reads * CHUNK_BYTES);
      reads++;
      return Promise.resolve(new Uint8Array(length));
    }}, 0, INPUT_LIMIT, {signal: signal(), progress: vi.fn()});
    expect(reads).toBe(1024);
    expect(writes).toBe(1024);
    expect(writer.size).toBe(INPUT_LIMIT);
    const artifact = await writer.finish('job', 'file', 'application/octet-stream', signal());
    expect(artifact).toEqual({jobId: 'job', id: 'file', mediaType: 'application/octet-stream', size: INPUT_LIMIT});
    expect(target.close).toHaveBeenCalledOnce();
    await expect(writer.append(new Uint8Array(1), signal())).rejects.toThrow();
  });

  it('patches existing bytes and rejects output limits before reading/writing', async() => {
    const target = sink();
    const writer = new OutputWriter(target, 5);
    await writer.append(new Uint8Array([1, 2, 3]), signal());
    await writer.patch(1, new Uint8Array([9]), signal());
    expect(writer.size).toBe(3);
    await expect(writer.patch(3, new Uint8Array([9]), signal())).rejects.toMatchObject({diagnostic: {code: 'INVALID_RANGE'}});
    await expect(writer.append(new Uint8Array(3), signal())).rejects.toMatchObject({diagnostic: {code: 'OUTPUT_LIMIT'}});
    const read = vi.fn();
    await expect(writer.copy({size: 9, read}, 0, 9, {signal: signal(), progress: vi.fn()})).rejects.toMatchObject({diagnostic: {code: 'OUTPUT_LIMIT'}});
    expect(read).not.toHaveBeenCalled();
    expect(target.write).toHaveBeenCalledTimes(2);
  });

  it('cancels a long copy between chunks and aborts unfinished output', async() => {
    const controller = new AbortController();
    const target = sink();
    const writer = new OutputWriter(target, 3 * CHUNK_BYTES);
    const read = vi.fn((_offset: number, length: number) => Promise.resolve(new Uint8Array(length)));
    await expect(writer.copy({size: 3 * CHUNK_BYTES, read}, 0, 3 * CHUNK_BYTES, {
      signal: controller.signal, progress: () => { controller.abort(); }
    })).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
    expect(read).toHaveBeenCalledOnce();
    await writer.abort();
    await writer.abort();
    expect(target.abort).toHaveBeenCalledOnce();
  });

  it('reports quota failures without leaking raw browser errors', async() => {
    const target = sink();
    target.write = () => Promise.reject(new DOMException('private filename', 'QuotaExceededError'));
    const writer = new OutputWriter(target, 10);
    await expect(writer.append(new Uint8Array(1), signal())).rejects.toMatchObject({message: 'STORAGE_FULL', diagnostic: {code: 'STORAGE_FULL'}});
    await expect(writer.append(new Uint8Array(1), signal())).rejects.toMatchObject({diagnostic: {code: 'IO_FAILURE'}});
    await writer.abort();
  });

  it('rejects overlapping writes until the sink releases backpressure', async() => {
    let release: (() => void) | undefined;
    const target = sink();
    target.write = () => new Promise<void>(resolve => { release = resolve; });
    const writer = new OutputWriter(target, 10);
    const pending = writer.append(new Uint8Array([1]), signal());
    await expect(writer.append(new Uint8Array([2]), signal())).rejects.toMatchObject({diagnostic: {code: 'IO_FAILURE'}});
    release?.();
    await pending;
    expect(writer.size).toBe(1);
  });
});
