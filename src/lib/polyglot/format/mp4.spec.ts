import {readFileSync} from 'node:fs';
import {describe, expect, it, vi} from 'vitest';

import {BlobInput} from '../io/blob-input';
import {BinaryReader, relocate, uint64} from '../io/binary';
import {ProcessingContext} from '../model/contract';
import {inspectMp4, readBoxes} from './mp4';

const fixture = (name = 'video-aac.mp4'): Uint8Array<ArrayBuffer> => new Uint8Array(readFileSync(new URL(`../../../../e2e/fixture/${name}`, import.meta.url)));
const context = (): ProcessingContext => ({signal: new AbortController().signal, progress: vi.fn()});
const inspect = (bytes: Uint8Array<ArrayBuffer>) => inspectMp4(new BlobInput(new Blob([bytes])), context());
const atom = (name: string): Uint8Array<ArrayBuffer> => {
  const bytes = new Uint8Array(8);
  new DataView(bytes.buffer).setUint32(0, 8);
  bytes.set(new TextEncoder().encode(name), 4);
  return bytes;
};
const find = (bytes: Uint8Array, type: string): number => Buffer.from(bytes).indexOf(type, 32);

describe('non-fragmented MP4 validation', () => {
  it.each(['video-aac.mp4', 'video-tail-moov.mp4', 'video-co64.mp4'])('accepts real H.264 fixture %s through bounded seekable reads', async name => {
    const original = new BlobInput(new Blob([fixture(name)]));
    const read = vi.spyOn(original, 'read');
    const info = await inspectMp4(original, context());
    expect(info.audio).toBe(name !== 'video-tail-moov.mp4');
    expect(info.tables.every(table => table.width === (name === 'video-co64.mp4' ? 8 : 4))).toBe(true);
    expect(info.tables).toHaveLength(info.audio ? 2 : 1);
    expect(info.mdats.length).toBeGreaterThan(0);
    expect(Math.max(...read.mock.calls.map(call => call[1]))).toBeLessThanOrEqual(128 * 1024);
  });

  it.each([
    ['hvc1', 'MP4_CODEC'], ['encv', 'MP4_ENCRYPTED']
  ])('rejects sample entry %s explicitly', async(type, code) => {
    const bytes = fixture();
    const at = find(bytes, 'avc1');
    expect(at).toBeGreaterThan(32);
    bytes.set(new TextEncoder().encode(type), at);
    await expect(inspect(bytes)).rejects.toMatchObject({diagnostic: {code}});
  });

  it.each([['moof', 'MP4_FRAGMENTED'], ['sidx', 'MP4_FRAGMENTED'], ['pssh', 'MP4_ENCRYPTED'], ['uuid', 'MP4_STRUCTURE']])('rejects top-level %s', async(type, code) => {
    const bytes = new Uint8Array([...fixture(), ...atom(type)]);
    await expect(inspect(bytes)).rejects.toMatchObject({diagnostic: {code}});
  });

  it('rejects chunk offsets outside mdat and dishonest table counts', async() => {
    const bytes = fixture();
    const table = find(bytes, 'stco');
    new DataView(bytes.buffer).setUint32(table + 12, 0);
    await expect(inspect(bytes)).rejects.toMatchObject({diagnostic: {code: 'MP4_INVALID'}});
    const count = fixture();
    new DataView(count.buffer).setUint32(find(count, 'stsz') + 12, 0xffffffff);
    await expect(inspect(count)).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
  });

  it('rejects truncated, oversized, nested malformed, and external-reference structures', async() => {
    await expect(inspect(fixture().slice(0, -1))).rejects.toMatchObject({diagnostic: {code: 'MP4_INVALID'}});
    const oversized = fixture();
    new DataView(oversized.buffer).setUint32(0, oversized.length + 1);
    await expect(inspect(oversized)).rejects.toMatchObject({diagnostic: {code: 'MP4_INVALID'}});
    const nested = fixture();
    new DataView(nested.buffer).setUint32(find(nested, 'stts') - 4, 3);
    await expect(inspect(nested)).rejects.toMatchObject({diagnostic: {code: 'MP4_INVALID'}});
    const external = fixture();
    new DataView(external.buffer).setUint32(find(external, 'url ') + 4, 0);
    await expect(inspect(external)).rejects.toMatchObject({diagnostic: {code: 'MP4_STRUCTURE'}});
  });

  it('handles final zero-size mdat and extended-size boxes without trusting unsafe integers', async() => {
    const bytes = fixture();
    const mdat = find(bytes, 'mdat') - 4;
    new DataView(bytes.buffer).setUint32(mdat, 0);
    expect((await inspect(bytes)).mdats[0]?.size).toBe(bytes.length - mdat);
    const extended = new Uint8Array(16);
    const view = new DataView(extended.buffer);
    view.setUint32(0, 1);
    extended.set(new TextEncoder().encode('free'), 4);
    view.setBigUint64(8, 16n);
    expect(await readBoxes(new BinaryReader(new BlobInput(new Blob([extended])), context().signal), 0, 16)).toEqual([{start: 0, size: 16, header: 16, type: 'free'}]);
    view.setBigUint64(8, 2n ** 63n);
    expect(() => uint64(extended, 8)).toThrow('OFFSET_OVERFLOW');
  });

  it('rejects offset overflow rather than wrapping chunk addresses', () => {
    expect(relocate(0xffffffff - 2, 2, 4)).toBe(0xffffffff);
    expect(() => relocate(0xffffffff, 1, 4)).toThrow('OFFSET_OVERFLOW');
    expect(() => relocate(1, -2, 8)).toThrow('OFFSET_OVERFLOW');
    expect(() => relocate(Number.MAX_SAFE_INTEGER, 1, 8)).toThrow('OFFSET_OVERFLOW');
  });
});
