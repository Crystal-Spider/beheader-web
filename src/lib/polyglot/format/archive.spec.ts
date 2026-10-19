import {readFileSync} from 'node:fs';
import {describe, expect, it, vi} from 'vitest';

import {BlobInput} from '../io/blob-input';
import {ProcessingContext} from '../model/contract';
import {TemporaryStorage} from '../io/temporary-storage';
import {OutputWriter} from '../io/output-writer';
import type {Entry} from '@zip.js/zip.js';
import {CHUNK_BYTES} from '../io/bytes';
import {appendArchives, archivePath, ArchiveReader, ARCHIVE_DIRECTORY_LIMIT, inspectArchive, mergeArchives} from './archive';

const context = (): ProcessingContext => ({signal: new AbortController().signal, progress: vi.fn()});
const source = (name: string, id = name) => ({id, name, mediaType: '', reader: new BlobInput(new Blob([new Uint8Array(readFileSync(`e2e/fixture/${name}`))]))});

describe('seekable archive validation and ordering', () => {
  it('merges in selected order, retaining unrelated binary/UTF-8 names and reporting collisions', async() => {
    const first = await inspectArchive(source('first.zip'), context());
    const second = await inspectArchive(source('second.zip'), context());
    const merged = mergeArchives([first, second]);
    expect(merged.collisions).toEqual([{path: 'shared.txt', earlierInputId: 'first.zip', laterInputId: 'second.zip'}]);
    expect(merged.winners.find(winner => winner.path === 'shared.txt')?.archive.source.id).toBe('second.zip');
    expect(mergeArchives([second, first]).winners.find(winner => winner.path === 'shared.txt')?.archive.source.id).toBe('first.zip');
    expect(first.entries.map(entry => entry.filename)).toContain('nested/città.txt');
  });

  it.each([['oversized-expanded.zip', 'ARCHIVE_EXPANDED_LIMIT'], ['encrypted.zip', 'ARCHIVE_ENCRYPTED'], ['split.zip', 'ARCHIVE_SPLIT']] as const)('rejects %s using metadata before extraction', async(name, code) => {
    await expect(inspectArchive(source(name), context())).rejects.toMatchObject({diagnostic: {code}});
  });

  it('rejects path traversal, absolute/drive paths, control characters, and ambiguous ancestry', async() => {
    for (const name of ['../file', '/file', 'C:\\file', 'a/../../file', 'a//b', 'a/./b', 'a\0b']) {
      expect(() => archivePath(name)).toThrow();
    }
    expect(archivePath('nested\\file')).toBe('nested/file');
    const first = await inspectArchive(source('first.zip'), context());
    const shared = first.entries.find(entry => entry.filename === 'shared.txt')!;
    expect(() => mergeArchives([{...first, entries: [shared, {...shared, filename: 'shared.txt/child'}]}])).toThrow('ARCHIVE_PATH');
  });

  it('rejects oversized central directories without buffering them, even for a synthetic large source', async() => {
    const size = 1024 ** 3;
    const read = vi.fn((_offset: number, length: number) => {
      const bytes = new Uint8Array(length);
      const view = new DataView(bytes.buffer, length - 22);
      view.setUint32(0, 0x06054b50, true);
      view.setUint32(12, ARCHIVE_DIRECTORY_LIMIT + 1, true);
      return Promise.resolve(bytes);
    });
    await expect(inspectArchive({id: 'large', name: 'large.zip', mediaType: '', reader: {size, read}}, context())).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
    expect(read).toHaveBeenCalledOnce();
    expect(read.mock.calls[0]?.[1]).toBe(65557);
    await expect(new ArchiveReader({size, read}, context().signal).readUint8Array(0, CHUNK_BYTES + 1)).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
  });

  it('stops an oversized decoder chunk before writing beyond its declared expansion', async() => {
    const write = vi.fn(async() => {});
    const output = new OutputWriter({write, close: async() => {}, abort: async() => {}}, 100);
    const storage = Object.create(TemporaryStorage.prototype) as TemporaryStorage;
    vi.spyOn(storage, 'createOutput').mockResolvedValue({id: crypto.randomUUID(), writer: output});
    const entry = {
      filename: 'file', directory: false, uncompressedSize: 1,
      getData: async(stream: WritableStream<Uint8Array<ArrayBuffer>>) => {
        const writer = stream.getWriter();
        try { await writer.write(new Uint8Array(2)); } finally { writer.releaseLock(); }
      }
    } as unknown as Entry;
    await expect(appendArchives([{source: source('first.zip'), entries: [entry], expandedSize: 1}], output, storage, context(), new Uint8Array(0))).rejects.toMatchObject({diagnostic: {code: 'ARCHIVE_EXPANDED_LIMIT'}});
    expect(write).not.toHaveBeenCalled();
  });
});
