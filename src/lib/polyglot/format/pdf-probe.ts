/* eslint no-control-regex: off -- NUL is explicitly a PDF whitespace character. */
import {ProcessingContext, SeekableInput} from '../model/contract';
import {ProcessingError} from '../logic/diagnostic';
import {BinaryReader} from '../io/binary';
import {linearizedPdf, PdfSyntax} from './pdf-syntax';

/** Maximum cross-reference/trailer area accepted by the full classic PDF parser. */
export const PDF_METADATA_LIMIT = 32 * 1024 * 1024;

/** Shared bounded PDF envelope, independent of object count and document payload size. */
export interface PdfEnvelope {readonly header: string; readonly xref: number; readonly startxref: number}

/**
 * Reads only headers, the final pointer and one 16 KiB metadata window. Missing metadata is deferred.
 * @param {SeekableInput} input PDF bytes.
 * @param {ProcessingContext} context Cancellation.
 * @param {Uint8Array | undefined} head Already inspected leading bytes.
 * @param {Uint8Array | undefined} tail Already inspected trailing bytes.
 * @returns {Promise<PdfEnvelope>} Declared locations; full xref/object validation still follows on Combine.
 */
export async function probePdf(input: SeekableInput, context: ProcessingContext, head?: Uint8Array, tail?: Uint8Array): Promise<PdfEnvelope> {
  const reader = new BinaryReader(input, context.signal);
  const decode = (bytes: Uint8Array): string => new TextDecoder('latin1').decode(bytes);
  const leading = decode(head ?? await reader.read(0, Math.min(1024, input.size)));
  const header = leading.match(/^%PDF-(?:1\.[0-7]|2\.0)(?:\r\n|\r|\n)/)?.[0];
  const fail = (code: 'PDF_INVALID' | 'PDF_STRUCTURE' | 'PDF_ENCRYPTED' | 'FORMAT_RESOURCE_LIMIT', reason: string): never => { throw new ProcessingError({code, severity: 'error', details: {reason}}); };
  if (!header) { return fail('PDF_INVALID', 'HEADER'); }
  if (linearizedPdf(leading.slice(0, 1024))) { return fail('PDF_STRUCTURE', 'LINEARIZED'); }
  const trailing = tail ?? await reader.read(Math.max(0, input.size - 65557), Math.min(65557, input.size));
  const text = decode(trailing);
  const end = /startxref[\x00\t\n\f\r ]+(\d+)[\x00\t\n\f\r ]+%%EOF[\x00\t\n\f\r ]*$/.exec(text);
  if (!end) { return fail('PDF_INVALID', 'ENDING'); }
  const xref = Number(end[1]);
  const startxref = input.size - trailing.length + end.index + end[0].indexOf(end[1]!);
  if (!Number.isSafeInteger(xref) || xref < header.length || xref >= startxref) { return fail('PDF_INVALID', 'XREF_OFFSET'); }
  if (startxref - xref > PDF_METADATA_LIMIT) { throw new ProcessingError({code: 'FORMAT_RESOURCE_LIMIT', severity: 'error', details: {reason: 'METADATA_LIMIT', actual: startxref - xref, limit: PDF_METADATA_LIMIT}}); }
  const window = decode(await reader.read(xref, Math.min(16384, input.size - xref)));
  if (!window.startsWith('xref')) {
    let stream = false;
    try {
      const syntax = new PdfSyntax(window);
      const object = syntax.next(); const generation = syntax.next();
      if (/^\d+$/.test(object?.value ?? '') && /^\d+$/.test(generation?.value ?? '') && syntax.next()?.value === 'obj') {
        const fields = syntax.dictionary();
        stream = new PdfSyntax(fields.get('Type') ?? '').next()?.value === 'XRef' && syntax.next()?.value === 'stream';
      }
    } catch { /* An incomplete bounded dictionary is not evidence of a particular stream type. */ }
    return fail('PDF_STRUCTURE', stream ? 'XREF_STREAM' : 'XREF_TABLE');
  }
  const marker = [...text.slice(0, end.index).matchAll(/(?:^|[\r\n])[\x00\t\f ]*trailer(?=[\x00\t\n\f\r <])/g)].at(-1);
  let fields: Map<string, string> | undefined;
  if (marker && input.size - trailing.length + marker.index >= xref) {
    try {
      const syntax = new PdfSyntax(text.slice(marker.index + marker[0].length, end.index));
      const candidate = syntax.dictionary();
      if (!syntax.next()) { fields = candidate; }
    } catch { /* Full validation will parse trailers outside this fixed window or syntax subset. */ }
  }
  if (fields?.has('Encrypt') && fields.get('Encrypt') !== 'null') { return fail('PDF_ENCRYPTED', 'ENCRYPTED'); }
  if (fields?.has('XRefStm')) { return fail('PDF_STRUCTURE', 'HYBRID'); }
  if (fields?.has('Prev')) { return fail('PDF_STRUCTURE', 'INCREMENTAL'); }
  return {header, xref, startxref};
}
