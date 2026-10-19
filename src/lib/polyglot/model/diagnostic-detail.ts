import {Diagnostic} from './contract';
import {pdfReason, PdfReason} from './pdf-diagnostic';

/** Fixed descriptions shared by presentation and the privacy-preserving diagnostic exporter. */
export const DETAIL_REASONS = [
  'SELECTED_INPUTS', 'INPUT_BYTES', 'TOTAL_BYTES', 'IMAGE_DIMENSIONS', 'IMAGE_PIXELS', 'IMAGE_FORMAT',
  'ZIP_DIRECTORY_BYTES', 'ZIP_ENTRIES', 'ZIP_OUTPUT_ENTRIES', 'ZIP_FILENAME_BYTES', 'ZIP64', 'ZIP_SYMLINK',
  'ZIP_COMPRESSION', 'ZIP_CRC', 'ZIP_SIZE_CHECK', 'ZIP_PATH_ABSOLUTE', 'ZIP_PATH_TRAVERSAL', 'ZIP_PATH_CONFLICT', 'ZIP_HEADER',
  'ZIP_ENTRY_SIZE', 'ZIP_EXPANDED_BYTES', 'HTML_LOGICAL_BYTES', 'HTML_OUTPUT_BYTES', 'HTML_TEXT_BYTES',
  'HTML_NODES', 'HTML_REFERENCES', 'CSS_SYNTAX', 'ASSET_ENCODING', 'ASSET_DIRECTORY', 'ASSET_RECIPE',
  'MEDIA_CODEC', 'MEDIA_TRACKS', 'MEDIA_SAMPLE_RATE', 'MEDIA_CHANNELS', 'MEDIA_BRAND', 'MEDIA_BOX',
  'MEDIA_EXTERNAL', 'MEDIA_TIMING', 'MEDIA_SAMPLES', 'MEDIA_BOXES', 'AUDIO_DURATION', 'AUDIO_PACKETS',
  'AUDIO_OUTPUT_BYTES', 'AUDIO_DECODE', 'WORKSPACE_BYTES', 'FORMAT_RECORDS', 'MEDIA_METADATA_BYTES', 'VIDEO_TRACKS', 'MEDIA_CONTAINER'
] as const;

/** Fixed reason token; never a raw browser exception or document string. */
export type DetailReason = typeof DETAIL_REASONS[number];
/** Public numeric measurements and enum values, independent of input identities. */
export type DiagnosticParameters = Readonly<Record<string, string | number>>;

/**
 * @param {Diagnostic} diagnostic Processing result.
 * @returns {DetailReason | PdfReason | undefined} Allowlisted explanation token.
 */
export function detailReason(diagnostic: Diagnostic): DetailReason | PdfReason | undefined {
  const reason = diagnostic.details?.['reason'];
  return pdfReason(diagnostic) ?? (typeof reason === 'string' && DETAIL_REASONS.includes(reason as DetailReason) ? reason as DetailReason : undefined);
}

/**
 * Retains only bounded numeric facts and fixed enums; unknown detail keys and strings are private.
 * @param {Diagnostic} diagnostic Processing result.
 * @returns {DiagnosticParameters} Safe values for interpolation and optional diagnostic export.
 */
export function diagnosticParameters(diagnostic: Diagnostic): DiagnosticParameters {
  const parameters: Record<string, string | number> = {};
  for (const key of ['actual', 'limit', 'width', 'height', 'tracks', 'audioTracks', 'videoTracks']) {
    const value = diagnostic.details?.[key];
    if (typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= Number.MAX_SAFE_INTEGER) { parameters[key] = value; }
  }
  const enums: Readonly<Record<string, readonly string[]>> = {
    role: ['image', 'media', 'html', 'pdf', 'archive', 'html-assets'],
    detected: ['image', 'media', 'html', 'pdf', 'archive', 'unknown', 'ambiguous'],
    format: ['png', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'tiff', 'ico', 'heif', 'mp4', 'mp3', 'wav', 'ogg', 'matroska', 'avi', 'unknown'],
    codec: ['mp3', 'aac', 'vorbis', 'opus', 'h264', 'h265', 'av1', 'vp8', 'vp9', 'pcm', 'unknown'],
    stage: ['inspect', 'plan', 'convert', 'generate', 'extract', 'pack', 'cleanup'],
    feature: ['metadata', 'fragmentation', 'encryption', 'track', 'sample', 'unknown']
  };
  for (const [key, values] of Object.entries(enums)) {
    const value = diagnostic.details?.[key];
    if (typeof value === 'string' && values.includes(value)) { parameters[key] = value; }
  }
  if (['MEDIA_CODEC', 'AUDIO_DECODE'].includes(String(diagnostic.details?.['reason'])) && !parameters['codec']) { parameters['codec'] = 'unknown'; }
  return parameters;
}

/**
 * @param {DetailReason | PdfReason} reason Public reason token.
 * @returns {string} Catalog key without document-derived text.
 */
export function detailKey(reason: DetailReason | PdfReason): string { return `${DETAIL_REASONS.includes(reason as DetailReason) ? 'detail' : 'pdfReason'}.${reason}`; }
