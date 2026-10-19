import {Diagnostic} from './contract';

/** Fixed public reasons; no input text, paths or arbitrary error messages cross this boundary. */
export const PDF_REASONS = [
  'HEADER', 'ENDING', 'XREF_OFFSET', 'XREF_TABLE', 'XREF_SUBSECTION', 'XREF_ENTRY',
  'DUPLICATE_OBJECT', 'OBJECT_OFFSET', 'FREE_LIST', 'ENCRYPTED', 'INCREMENTAL', 'HYBRID',
  'TRAILER', 'TRAILER_FIELDS', 'ROOT', 'OBJECT_HEADER', 'METADATA_LIMIT', 'ENTRY_LIMIT', 'LINEARIZED', 'XREF_STREAM'
] as const;

/** A failed structural check or explicitly unsupported PDF capability. */
export type PdfReason = typeof PDF_REASONS[number];

/**
 * Only known PDF reasons may enter translated messages and privacy-preserving exports.
 * @param {Diagnostic} diagnostic Processing outcome.
 * @returns {PdfReason | undefined} Allowlisted reason, excluding arbitrary diagnostic details.
 */
export function pdfReason(diagnostic: Diagnostic): PdfReason | undefined {
  const reason = diagnostic.details?.['reason'];
  return ['PDF_INVALID', 'PDF_STRUCTURE', 'PDF_ENCRYPTED', 'FORMAT_RESOURCE_LIMIT'].includes(diagnostic.code)
    && typeof reason === 'string' && PDF_REASONS.includes(reason as PdfReason) ? reason as PdfReason : undefined;
}
