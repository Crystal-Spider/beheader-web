/* Classic PDF relocation follows Beheader's approach; GPL-3.0-only, see NOTICE.md. */
import {Diagnostic, DiagnosticCode, ProcessingContext, SeekableInput} from '../model/contract';
import {PdfReason} from '../model/pdf-diagnostic';
import {ProcessingError} from '../logic/diagnostic';
import {BinaryReader} from '../io/binary';
import {CHUNK_BYTES} from '../io/bytes';
import {TextCursor} from '../io/text-cursor';
import {PdfSyntax} from './pdf-syntax';
import {probePdf} from './pdf-probe';
export {PDF_METADATA_LIMIT} from './pdf-probe';

/** Xref/trailer bytes and actual records, independent of the largest object number. */
export const PDF_ENTRY_LIMIT = 1000000;

/**
 * Identifies the failed check without retaining document contents or filenames.
 * @param {DiagnosticCode} code Compatibility, validity or resource category.
 * @param {PdfReason} reason Stable, separately translated failure reason.
 * @param {Diagnostic['details']} details Safe measured limits.
 * @returns {never} Always throws.
 */
function invalid(code: DiagnosticCode, reason: PdfReason, details?: Diagnostic['details']): never { throw new ProcessingError({code, severity: 'error', details: {...details, reason}}); }

/** Only in-use classic entries are relocated; free-list links are object numbers. */
export interface PdfEntry {
  readonly object: number;
  readonly generation: number;
  readonly offset: number;
  readonly field: number;
}

/** Small bounded relocation index, independent of PDF stream payload sizes. */
export interface PdfInfo {
  readonly header: string;
  readonly entries: readonly PdfEntry[];
  readonly xref: number;
  readonly startxref: number;
  readonly size: number;
}

/**
 * Reads a single classic cross-reference revision, rejecting encrypted, hybrid, and incremental PDFs.
 * @param {SeekableInput} input PDF bytes with offsets relative to their original file.
 * @param {ProcessingContext} context Cancellation and progress.
 * @returns {Promise<PdfInfo>} Verified entry positions and replaceable final startxref value.
 */
export async function inspectPdf(input: SeekableInput, context: ProcessingContext): Promise<PdfInfo> {
  const reader = new BinaryReader(input, context.signal);
  const decode = (bytes: Uint8Array): string => new TextDecoder('latin1').decode(bytes);
  const {header, xref, startxref} = await probePdf(input, context);
  const cursor = new TextCursor(reader, xref, startxref);
  if (!(await cursor.peek(4)).startsWith('xref')) { invalid('PDF_STRUCTURE', 'XREF_TABLE'); }
  cursor.position += 4;
  const entries: PdfEntry[] = [];
  const objects = new Set<number>();
  const free: {object: number; next: number}[] = [];
  while (true) {
    await cursor.whitespace();
    const head = await cursor.peek(128);
    if (head.startsWith('trailer')) { cursor.position += 7; break; }
    const subsection = /^(\d+) +(\d+) *(?:\r\n|\n|\r)/.exec(head);
    if (!subsection) { invalid('PDF_INVALID', 'XREF_SUBSECTION'); }
    const first = Number(subsection[1]);
    const count = Number(subsection[2]);
    if (!Number.isSafeInteger(first) || !Number.isSafeInteger(count) || first < 0 || count < 1
      || !Number.isSafeInteger(first + count)) { invalid('PDF_INVALID', 'XREF_SUBSECTION'); }
    if (objects.size + count > PDF_ENTRY_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', 'ENTRY_LIMIT', {actual: objects.size + count, limit: PDF_ENTRY_LIMIT}); }
    cursor.position += subsection[0].length;
    for (let index = 0; index < count; index++) {
      const entry = /^(\d{10}) (\d{5}) ([nf])(?: \r| \n|\r\n)/.exec(await cursor.peek(20));
      if (!entry) { invalid('PDF_INVALID', 'XREF_ENTRY'); }
      if (objects.has(first + index)) { invalid('PDF_INVALID', 'DUPLICATE_OBJECT'); }
      objects.add(first + index);
      const offset = Number(entry[1]);
      const generation = Number(entry[2]);
      if (generation > 65535) { invalid('PDF_INVALID', 'XREF_ENTRY'); }
      if (entry[3] === 'n') {
        if (!offset || offset >= xref || first + index === 0) { invalid('PDF_INVALID', 'OBJECT_OFFSET'); }
        entries.push({object: first + index, generation, offset, field: cursor.position});
      } else {
        if (first + index === 0 && generation !== 65535) { invalid('PDF_INVALID', 'FREE_LIST'); }
        free.push({object: first + index, next: offset});
      }
      cursor.position += entry[0].length;
    }
  }
  const syntax = new PdfSyntax(await cursor.remainder());
  const fields = syntax.dictionary();
  if (fields.has('Encrypt') && fields.get('Encrypt') !== 'null') { invalid('PDF_ENCRYPTED', 'ENCRYPTED'); }
  if (fields.has('XRefStm')) { invalid('PDF_STRUCTURE', 'HYBRID'); }
  if (fields.has('Prev')) { invalid('PDF_STRUCTURE', 'INCREMENTAL'); }
  if (syntax.next()?.value !== 'startxref' || syntax.next()) { invalid('PDF_STRUCTURE', 'TRAILER'); }
  const declaredSize = fields.get('Size') ?? '';
  const size = /^\+?\d+$/.test(declaredSize) ? Number(declaredSize) : NaN;
  const rootTokens = new PdfSyntax(fields.get('Root') ?? '');
  const rootObject = rootTokens.next(); const rootGeneration = rootTokens.next(); const rootMarker = rootTokens.next();
  const root = rootObject?.kind === 'word' && rootGeneration?.kind === 'word' && rootMarker?.kind === 'word' && rootMarker.value === 'R' && !rootTokens.next() && /^\d+$/.test(rootObject.value) && /^\d+$/.test(rootGeneration.value) ? [rootObject.value, rootGeneration.value] : null;
  if (!Number.isSafeInteger(size) || size < 1 || [...objects].some(object => object >= size) || !root
    || !entries.some(entry => entry.object === Number(root[0]) && entry.generation === Number(root[1]))) { invalid('PDF_INVALID', 'ROOT'); }
  const freeObjects = new Set(free.map(entry => entry.object));
  if (free.some(entry => entry.next >= size || !freeObjects.has(entry.next))) { invalid('PDF_INVALID', 'FREE_LIST'); }
  // Validate object headers in offset order through one reusable bounded window,
  // instead of issuing up to a million tiny file reads.
  let window = new Uint8Array(0);
  let windowStart = -1;
  for (const entry of [...entries].sort((a, b) => a.offset - b.offset)) {
    const length = Math.min(64, xref - entry.offset);
    if (entry.offset < windowStart || entry.offset + length > windowStart + window.length) {
      windowStart = entry.offset;
      window = await reader.read(windowStart, Math.min(CHUNK_BYTES, xref - windowStart));
    }
    const objectHeader = decode(window.subarray(entry.offset - windowStart, entry.offset - windowStart + length));
    const match = /^(\d+)\s+(\d+)\s+obj\b/.exec(objectHeader);
    if (!match || Number(match[1]) !== entry.object || Number(match[2]) !== entry.generation) { invalid('PDF_INVALID', 'OBJECT_HEADER'); }
  }
  return {header, entries, xref, startxref, size};
}
