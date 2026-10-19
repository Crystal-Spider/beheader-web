import {readFileSync} from 'node:fs';
import {ZipWriter, Uint8ArrayWriter} from '@zip.js/zip.js';
import type {Entry} from '@zip.js/zip.js';
import {describe, expect, it} from 'vitest';

import {InputSource, ProcessingContext} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {CHUNK_BYTES, INPUT_LIMIT} from '../io/bytes';
import {OutputWriter} from '../io/output-writer';
import {ArchiveBudget, ArchiveInfo, ARCHIVE_DIRECTORY_LIMIT, archivePath, inspectArchive, mergeArchives} from './archive';
import {inspectPdf, PDF_ENTRY_LIMIT} from './pdf';
import {inspectImage} from './image';
import {bundleHtml} from './html-bundle';
import {HtmlAssets, HTML_REFERENCE_LIMIT} from './html-assets';
import {htmlNodes} from './html-output';
import {parse} from 'parse5';

const context = (): ProcessingContext => ({signal: new AbortController().signal, progress: () => {}});
const source = (name: string, bytes: BlobPart): InputSource => ({id: name, name, mediaType: '', reader: new BlobInput(new Blob([bytes]))});
const assetIndex = (entries: readonly Entry[], expandedSize = 0): ArchiveInfo => ({source: source('assets.zip', ''), entries, expandedSize});

describe('approved resource boundaries', () => {
  it('accepts the enlarged static image pixel boundary and rejects its next row', async() => {
    const png = new Uint8Array(readFileSync('e2e/fixture/transparent.png'));
    const view = new DataView(png.buffer);
    view.setUint32(16, 8192); view.setUint32(20, 8192);
    expect(await inspectImage(new BlobInput(new Blob([png])), context())).toMatchObject({width: 8192, height: 8192});
    view.setUint32(20, 8193);
    await expect(inspectImage(new BlobInput(new Blob([png])), context())).rejects.toMatchObject({diagnostic: {code: 'IMAGE_RESOURCE_LIMIT'}});
  });

  it('supports a million xref records through bounded reads and rejects the next record count', async() => {
    const body = '%PDF-1.4\n1 0 obj\n<</Type/Catalog>>\nendobj\n';
    const table = `xref\n0 ${PDF_ENTRY_LIMIT}\n0000000000 65535 f \n0000000009 00000 n \n${'0000000000 00000 f \n'.repeat(PDF_ENTRY_LIMIT - 2)}`;
    const trailer = `trailer\n<</Size ${PDF_ENTRY_LIMIT} /Root 1 0 R>>\nstartxref\n${body.length}\n%%EOF\n`;
    const input = new BlobInput(new Blob([body, table, trailer]));
    let reads = 0;
    const checked = {size: input.size, read: (offset: number, length: number, signal: AbortSignal) => {
      reads++; expect(length).toBeLessThanOrEqual(CHUNK_BYTES); return input.read(offset, length, signal);
    }};
    const result = await inspectPdf(checked, context());
    expect(result.entries).toHaveLength(1);
    expect(result.size).toBe(PDF_ENTRY_LIMIT);
    expect(reads).toBeLessThan(100);
    const over = new BlobInput(new Blob([body, `xref\n0 ${PDF_ENTRY_LIMIT + 1}\n`, trailer]));
    await expect(inspectPdf(over, context())).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
  }, 30000);

  it('accepts sparse high PDF object numbers without allocating by the largest number', async() => {
    const body = '%PDF-1.4\n1000000000 0 obj\n<</Type/Catalog>>\nendobj\n';
    const text = `${body}xref\n0 1\n0000000000 65535 f \n1000000000 1\n0000000009 00000 n \ntrailer\n<</Size 1000000001 /Root 1000000000 0 R>>\nstartxref\n${body.length}\n%%EOF\n`;
    expect((await inspectPdf(new BlobInput(new Blob([text])), context())).entries[0]?.object).toBe(1000000000);
  });

  it('reuses PDF windows across many sparse xref subsections', async() => {
    const body = '%PDF-1.4\n1 0 obj\n<</Type/Catalog>>\nendobj\n';
    const table = 'xref\n0 2\n0000000000 65535 f \n0000000009 00000 n \n'
      + Array.from({length: 40000}, (_, index) => `${100000 + index * 2} 1\n0000000000 00000 f \n`).join('');
    const input = new BlobInput(new Blob([body, table, `trailer\n<</Size 200000 /Root 1 0 R>>\nstartxref\n${body.length}\n%%EOF\n`]));
    let readBytes = 0;
    const result = await inspectPdf({size: input.size, read: (offset, length, signal) => {
      readBytes += length;
      if (readBytes > input.size * 8) { throw new Error('Repeated metadata window reads'); }
      return input.read(offset, length, signal);
    }}, context());
    expect(result.entries).toHaveLength(1);
    expect(readBytes).toBeLessThan(input.size * 8);
  });

  it('reserves aggregate ZIP indexes and uses UTF-8 bytes for long paths', () => {
    const budget = new ArchiveBudget();
    budget.reserve(65534, ARCHIVE_DIRECTORY_LIMIT - 1);
    budget.reserve(34466, 1);
    expect(() => budget.reserve(1, 0)).toThrow('FORMAT_RESOURCE_LIMIT');
    expect(() => budget.reserve(0, 1)).toThrow('FORMAT_RESOURCE_LIMIT');
    expect(archivePath('a'.repeat(65535))).toHaveLength(65535);
    expect(() => archivePath('a'.repeat(65536))).toThrow('ARCHIVE_PATH');
    expect(archivePath('\u00e8'.repeat(32767) + 'a')).toHaveLength(32768);
    expect(() => archivePath('\u00e8'.repeat(32768))).toThrow('ARCHIVE_PATH');
  });

  it('reads a real central directory above 1 MiB and 4,096 entries through bounded source reads', async() => {
    const zip = new ZipWriter(new Uint8ArrayWriter(), {useWebWorkers: false, extendedTimestamp: false});
    for (let index = 0; index < 5000; index++) { await zip.add(`${index}-${'x'.repeat(200)}/`, undefined, {directory: true}); }
    const archive = source('many.zip', await zip.close());
    const input = archive.reader;
    let largest = 0;
    const result = await inspectArchive({...archive, reader: {size: input.size, read: (offset, length, signal) => {
      largest = Math.max(largest, length); return input.read(offset, length, signal);
    }}}, context());
    expect(result.entries).toHaveLength(5000);
    expect(result.directorySize).toBeGreaterThan(CHUNK_BYTES);
    expect(largest).toBeLessThanOrEqual(CHUNK_BYTES);
  }, 30000);

  it('allows 65,534 final classic ZIP entries, then rejects ZIP64-sized output', () => {
    const entries = Array.from({length: 65534}, (_, index) => ({filename: `file-${index}`, directory: false, uncompressedSize: 0}) as Entry);
    expect(mergeArchives([assetIndex(entries)]).winners).toHaveLength(65534);
    expect(() => mergeArchives([assetIndex([...entries, {filename: 'extra', directory: false, uncompressedSize: 0} as Entry])])).toThrow('ARCHIVE_UNSUPPORTED');
  });

  it('accepts the logical HTML/expanded-assets boundary and rejects excess before reading HTML', async() => {
    const html = source('page.html', '<!doctype html><p>Hello</p>');
    expect((await bundleHtml(html, assetIndex([], INPUT_LIMIT - html.reader.size), {}, context())).size).toBeGreaterThan(0);
    const unread = {...html, reader: {size: html.reader.size, read: (): Promise<Uint8Array<ArrayBuffer>> => { throw new Error('Must reject statically'); }}};
    await expect(bundleHtml(unread, assetIndex([], INPUT_LIMIT), {}, context())).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
  });

  it('rejects base64 expansion above 1 GiB without extracting the large asset', async() => {
    const size = INPUT_LIMIT * 3 / 4;
    const entry = {filename: 'large.bin', directory: false, uncompressedSize: size, getData: () => { throw new Error('Must reject statically'); }} as unknown as Entry;
    await expect(bundleHtml(source('page.html', '<!doctype html><img src="large.bin">'), assetIndex([entry], size), {}, context())).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
  });

  it('streams an asset above the former 8 MiB cap with correct base64 across irregular boundaries', async() => {
    const size = 8 * CHUNK_BYTES + 11;
    const entry = {filename: 'large.bin', directory: false, uncompressedSize: size, getData: async(stream: WritableStream<Uint8Array<ArrayBuffer>>) => {
      const writer = stream.getWriter();
      const lengths = [1, 2, 65535, 4097];
      for (let offset = 0, index = 0; offset < size; index++) {
        const length = Math.min(lengths[index % lengths.length]!, size - offset);
        const chunk = Uint8Array.from({length}, (_, index) => (offset + index) % 251);
        await writer.write(chunk); offset += length;
      }
      await writer.close();
    }} as unknown as Entry;
    const bundle = await bundleHtml(source('page.html', '<!doctype html><img src="large.bin">'), assetIndex([entry], size), {}, context());
    const chunks: Uint8Array<ArrayBuffer>[] = [];
    const output = new OutputWriter({write: (_offset, bytes) => {
      expect(bytes.length).toBeLessThanOrEqual(65536); chunks.push(bytes.slice()); return Promise.resolve();
    }, close: async() => {}, abort: async() => {}}, bundle.size);
    await bundle.write(output, context());
    const text = await new Blob(chunks).text();
    const decoded = Buffer.from(text.match(/data:application\/octet-stream;base64,([^"]+)/)![1]!, 'base64');
    expect(decoded.length).toBe(size);
    expect(decoded.every((value, index) => value === index % 251)).toBe(true);
    expect(output.size).toBe(bundle.size);
  }, 30000);

  it('enforces the raised reference and node counters without recursive traversal', async() => {
    const assets = new HtmlAssets(undefined, context());
    for (let index = 0; index < HTML_REFERENCE_LIMIT; index++) { await assets.resolve('#anchor', 'index.html'); }
    await expect(assets.resolve('#anchor', 'index.html')).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
    const document = parse('<p>node</p>');
    const leaf = document.childNodes[0]!;
    document.childNodes = Array<typeof leaf>(1000001).fill({...leaf, ...('childNodes' in leaf ? {childNodes: []} : {})});
    expect(() => { for (const _node of htmlNodes(document)) { /* consume without retaining a second node array */ } }).toThrow('FORMAT_RESOURCE_LIMIT');
  });
});
