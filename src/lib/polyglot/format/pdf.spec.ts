import {readFileSync} from 'node:fs';
import {describe, expect, it, vi} from 'vitest';

import {BlobInput} from '../io/blob-input';
import {ProcessingContext} from '../model/contract';
import {inspectPdf} from './pdf';

const context = (): ProcessingContext => ({signal: new AbortController().signal, progress: vi.fn()});
const fixture = (name: string): BlobInput => new BlobInput(new Blob([new Uint8Array(readFileSync(`e2e/fixture/${name}`))]));

describe('classic PDF inspection', () => {
  it.each(['classic.pdf', 'subsections.pdf'])('verifies classic object offsets with LF/CRLF and subsections: %s', async name => {
    const info = await inspectPdf(fixture(name), context());
    expect(info.entries.map(entry => entry.object)).toEqual([1, 2, 3, 4, 5]);
    expect(info.size).toBe(6);
    const read = new TextDecoder();
    const input = fixture(name);
    for (const entry of info.entries) {
      expect(read.decode(await input.read(entry.field, 10, context().signal))).toBe(String(entry.offset).padStart(10, '0'));
      expect(read.decode(await input.read(entry.offset, 7, context().signal))).toBe(`${entry.object} 0 obj`);
    }
  });

  it.each([['encrypted.pdf', 'PDF_ENCRYPTED'], ['incremental.pdf', 'PDF_STRUCTURE']] as const)('rejects unsupported revision/security structure %s', async(name, code) => {
    await expect(inspectPdf(fixture(name), context())).rejects.toMatchObject({diagnostic: {code}});
  });

  it('rejects xref streams, wrong object offsets, duplicate entries, and truncated endings', async() => {
    const original = new TextDecoder().decode(readFileSync('e2e/fixture/classic.pdf'));
    for (const text of [original.replace('\nxref\n', '\nXRef\n'), original.replace('0000000009 00000 n', '0000000010 00000 n'), original.replace('0 6\n', '0 7\n'), original.slice(0, -9)]) {
      await expect(inspectPdf(new BlobInput(new Blob([text])), context())).rejects.toMatchObject({diagnostic: {severity: 'error'}});
    }
  });

  it('accepts legitimate free-list links, trailer comments, escaped names and adjacent delimiters', async() => {
    const original = readFileSync('e2e/fixture/classic.pdf', 'utf8');
    const free = original.replace('0 6\n', '0 7\n').replace('0000000000 65535 f', '0000000006 65535 f').replace('trailer\n', '0000000000 00001 f \ntrailer\n').replace('/Size 6', '/Size 7');
    const rich = free.replace('/Root 1 0 R', '/Ro#6Ft 1% reference comment\n0 R /En#63rypt null /ID[<01><ab>] /Custom<</Note(literal /Encrypt /Prev) /Nested[true null [1 2]]>>');
    expect((await inspectPdf(new BlobInput(new Blob([rich])), context())).entries).toHaveLength(5);
    expect((await inspectPdf(new BlobInput(new Blob([free])), context())).size).toBe(7);
  });

  it.each(['#5B', '#3C#3C'])('accepts escaped delimiter characters as name values: %s', async name => {
    const original = readFileSync('e2e/fixture/classic.pdf', 'utf8');
    const text = original.replace('/Size 6', `/Size 6 /Custom /${name}`);
    expect((await inspectPdf(new BlobInput(new Blob([text])), context())).entries).toHaveLength(5);
  });

  it.each([
    ['HEADER', (text: string) => text.replace('%PDF-', '%BAD-')],
    ['ENDING', (text: string) => text.slice(0, -9)],
    ['XREF_OFFSET', (text: string) => text.replace(/startxref\s+\d+/, 'startxref\n9999999999')],
    ['XREF_TABLE', (text: string) => text.replace('\nxref\n', '\nXRef\n')],
    ['XREF_SUBSECTION', (text: string) => text.replace('0 6\n', 'bad\n')],
    ['XREF_ENTRY', (text: string) => text.replace('0000000009 00000 n', '0000000009 99999 n')],
    ['DUPLICATE_OBJECT', (text: string) => text.replace('trailer', '1 1\n0000000009 00000 n \ntrailer')],
    ['OBJECT_OFFSET', (text: string) => text.replace('0000000009 00000 n', '9999999999 00000 n')],
    ['FREE_LIST', (text: string) => text.replace('0000000000 65535 f', '0000000001 65535 f')],
    ['HYBRID', (text: string) => text.replace('/Size 6', '/XRefStm 9 /Size 6')],
    ['TRAILER', (text: string) => text.replace('trailer\n<<', 'trailer\n<')],
    ['TRAILER', (text: string) => text.replace('/Size 6', '/Size 6 /Size 6')],
    ['ROOT', (text: string) => text.replace('/Root 1 0 R', '/Root 9999 0 R')],
    ['ROOT', (text: string) => text.replace('/Root 1 0 R', '/Root /1 /0 /R')],
    ['ROOT', (text: string) => text.replace('/Size 6', '/Size 6.0')],
    ['OBJECT_HEADER', (text: string) => text.replace('1 0 obj', '7 0 obj')],
    ['ENTRY_LIMIT', (text: string) => text.replace('0 6\n', '0 1000001\n')]
  ] as const)('identifies the failed PDF check without retaining source data: %s', async(reason, change) => {
    const text = change(readFileSync('e2e/fixture/classic.pdf', 'latin1'));
    await expect(inspectPdf(new BlobInput(new Blob([text])), context())).rejects.toMatchObject({diagnostic: {details: {reason}}});
  });

  it.each([['encrypted.pdf', 'ENCRYPTED'], ['incremental.pdf', 'INCREMENTAL']])('explains supported-scope restrictions for %s', async(name, reason) => {
    await expect(inspectPdf(fixture(name), context())).rejects.toMatchObject({diagnostic: {details: {reason}}});
  });

  it('rejects oversized metadata before reading that range and honors cancellation', async() => {
    const size = 33 * 1024 * 1024;
    const read = vi.fn((offset: number, length: number) => {
      const bytes = new Uint8Array(length);
      if (offset === 0) { bytes.set(new TextEncoder().encode('%PDF-1.4\n')); }
      if (offset + length === size) {
        const tail = new TextEncoder().encode('startxref\n9\n%%EOF\n');
        bytes.set(tail, length - tail.length);
      }
      return Promise.resolve(bytes);
    });
    await expect(inspectPdf({size, read}, context())).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT', details: {reason: 'METADATA_LIMIT'}}});
    expect(read.mock.calls.every(([, length]) => length <= 65557)).toBe(true);
    const controller = new AbortController();
    controller.abort();
    await expect(inspectPdf(fixture('classic.pdf'), {...context(), signal: controller.signal})).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
  });
});
