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

  it('rejects oversized metadata before reading that range and honors cancellation', async() => {
    const size = 2 * 1024 * 1024;
    const read = vi.fn((offset: number, length: number) => {
      const bytes = new Uint8Array(length);
      if (offset === 0) { bytes.set(new TextEncoder().encode('%PDF-1.4\n')); }
      if (offset + length === size) {
        const tail = new TextEncoder().encode('startxref\n9\n%%EOF\n');
        bytes.set(tail, length - tail.length);
      }
      return Promise.resolve(bytes);
    });
    await expect(inspectPdf({size, read}, context())).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
    expect(read.mock.calls.every(([, length]) => length <= 65536)).toBe(true);
    const controller = new AbortController();
    controller.abort();
    await expect(inspectPdf(fixture('classic.pdf'), {...context(), signal: controller.signal})).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
  });
});
