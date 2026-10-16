/* Classic PDF relocation follows Beheader's approach; GPL-3.0-only, see NOTICE.md. */
import {ProcessingContext, SeekableInput} from '../model/contract';
import {BinaryReader, invalid} from '../io/binary';
import {CHUNK_BYTES} from '../io/bytes';

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
  const header = decode(await reader.read(0, Math.min(16, input.size))).match(/^%PDF-(?:1\.[0-7]|2\.0)(?:\r\n|\r|\n)/)?.[0];
  if (!header) { invalid('PDF_INVALID'); }
  const tailOffset = Math.max(0, input.size - 65536);
  const tail = decode(await reader.read(tailOffset, input.size - tailOffset));
  const end = /startxref[\t \r\n]+(\d+)[\t \r\n]+%%EOF[\t \r\n]*$/.exec(tail);
  if (!end) { invalid('PDF_INVALID'); }
  const xref = Number(end[1]);
  const startxref = tailOffset + end.index + end[0].indexOf(end[1]!);
  if (!Number.isSafeInteger(xref) || xref < header.length || xref >= startxref) { invalid('PDF_INVALID'); }
  if (startxref - xref > CHUNK_BYTES) { invalid('FORMAT_RESOURCE_LIMIT'); }
  const text = decode(await reader.read(xref, startxref - xref));
  if (!text.startsWith('xref')) { invalid('PDF_STRUCTURE'); }
  let position = 4;
  const entries: PdfEntry[] = [];
  const objects = new Set<number>();
  const whitespace = (): void => { position += /^[\t \r\n]*/.exec(text.slice(position))![0].length; };
  while (true) {
    whitespace();
    if (text.startsWith('trailer', position)) { position += 7; break; }
    const subsection = /^(\d+) +(\d+) *(?:\r\n|\n|\r)/.exec(text.slice(position));
    if (!subsection) { invalid('PDF_INVALID'); }
    const first = Number(subsection[1]);
    const count = Number(subsection[2]);
    if (!Number.isSafeInteger(first) || !Number.isSafeInteger(count) || count < 1 || first + count > 40000 || objects.size + count > 40000) { invalid('FORMAT_RESOURCE_LIMIT'); }
    position += subsection[0].length;
    for (let index = 0; index < count; index++) {
      const entry = /^(\d{10}) (\d{5}) ([nf])(?: \r| \n|\r\n)/.exec(text.slice(position));
      if (!entry || objects.has(first + index)) { invalid('PDF_INVALID'); }
      objects.add(first + index);
      const offset = Number(entry[1]);
      const generation = Number(entry[2]);
      if (generation > 65535) { invalid('PDF_INVALID'); }
      if (entry[3] === 'n') {
        if (!offset || offset >= xref || first + index === 0) { invalid('PDF_INVALID'); }
        entries.push({object: first + index, generation, offset, field: xref + position});
      } else if (first + index === 0 && (offset !== 0 || generation !== 65535)) { invalid('PDF_STRUCTURE'); }
      position += entry[0].length;
    }
  }
  // Accept a deliberately narrow trailer grammar. Parse names before checking keys so escapes cannot hide Encrypt/Prev.
  const trailer = text.slice(position).replace(/#[0-9a-f]{2}/gi, escape => String.fromCharCode(parseInt(escape.slice(1), 16)));
  if (/\/(?:Encrypt)\b/.test(trailer)) { invalid('PDF_ENCRYPTED'); }
  if (/\/(?:Prev|XRefStm)\b/.test(trailer)) { invalid('PDF_STRUCTURE'); }
  const dictionary = /^\s*<<([\s\S]*)>>\s*startxref\s*$/.exec(trailer)?.[1];
  if (!dictionary) { invalid('PDF_INVALID'); }
  const fields = new Map<string, string>();
  const pattern = /\s*\/(Size|Root|Info|ID)\s+(\d+\s+\d+\s+R|\d+|\[\s*<[\da-f\s]*>\s*<[\da-f\s]*>\s*\])/iy;
  let cursor = 0;
  while (cursor < dictionary.trimEnd().length) {
    pattern.lastIndex = cursor;
    const field = pattern.exec(dictionary);
    if (!field || fields.has(field[1]!)) { invalid('PDF_STRUCTURE'); }
    fields.set(field[1]!, field[2]!);
    cursor = pattern.lastIndex;
  }
  const size = Number(fields.get('Size'));
  const root = /^(\d+)\s+(\d+)\s+R$/.exec(fields.get('Root') ?? '');
  if (!Number.isSafeInteger(size) || size < 1 || size > 40000 || [...objects].some(object => object >= size) || !root
    || !entries.some(entry => entry.object === Number(root[1]) && entry.generation === Number(root[2]))) { invalid('PDF_INVALID'); }
  for (const entry of entries) {
    const objectHeader = decode(await reader.read(entry.offset, Math.min(64, xref - entry.offset)));
    const match = /^(\d+)\s+(\d+)\s+obj\b/.exec(objectHeader);
    if (!match || Number(match[1]) !== entry.object || Number(match[2]) !== entry.generation) { invalid('PDF_INVALID'); }
  }
  return {header, entries, xref, startxref, size};
}
