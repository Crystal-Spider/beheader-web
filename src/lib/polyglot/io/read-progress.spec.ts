import {describe, expect, it} from 'vitest';

import {SeekableInput} from '../model/contract';
import {withReadProgress} from './read-progress';

describe('bounded audio scan estimates', () => {
  it('counts sparse reads and overlapping reads once without equating a tail seek with completion', async() => {
    const size = 1024 ** 3;
    const reads: number[] = [];
    const updates: number[] = [];
    const input: SeekableInput = {size, read: (_offset, length, signal) => {
      signal.throwIfAborted(); reads.push(length); return Promise.resolve(new Uint8Array(length).fill(7));
    }};
    const tracked = withReadProgress(input, fraction => updates.push(fraction));
    const signal = new AbortController().signal;
    expect(await tracked.read(size - 1024, 1024, signal)).toEqual(new Uint8Array(1024).fill(7));
    expect(updates[0]).toBeLessThan(0.001);
    await tracked.read(size - 512, 256, signal);
    expect(updates).toHaveLength(1);
    await tracked.read(0, 1024 * 1024, signal);
    expect(updates[1]).toBeGreaterThan(updates[0]!);
    expect(Math.max(...reads)).toBe(1024 * 1024);
    const abort = new AbortController(); abort.abort();
    await expect(tracked.read(0, 1, abort.signal)).rejects.toThrow();
  });

  it('does not declare completion merely because the small input was fully read', async() => {
    const updates: number[] = [];
    const input = withReadProgress({size: 3, read: () => Promise.resolve(new Uint8Array([1, 2, 3]))}, fraction => updates.push(fraction));
    await input.read(0, 3, new AbortController().signal);
    expect(updates).toEqual([0.99]);
  });
});
