import {FormatCandidate, InputSource, ProcessingContext} from '../model/contract';
import {invalid, uint32, fourCC} from '../io/binary';
import {dimensions} from '../format/image';
import {probePdf} from '../format/pdf-probe';
import {HTML_TEXT_LIMIT} from '../format/html';
import {probeMp4} from '../format/mp4-probe';

/**
 * Positive bounded evidence only: an incomplete header leaves the full check to Combine.
 * @param {InputSource} source Selected bytes.
 * @param {string | null} role Detected or explicit role.
 * @param {readonly FormatCandidate[]} candidates Signature evidence independent of the filename.
 * @param {Uint8Array} head Existing bounded leading read.
 * @param {Uint8Array} tail Existing bounded trailing read.
 * @param {ProcessingContext} context Job cancellation.
 * @returns {Promise<void>} Early compatibility prerequisites.
 */
export async function inspectHeaders(source: InputSource, role: string | null, candidates: readonly FormatCandidate[], head: Uint8Array, tail: Uint8Array, context: ProcessingContext): Promise<void> {
  if (role === 'pdf') { await probePdf(source.reader, context, head, tail); }
  if (role === 'html' && source.reader.size > HTML_TEXT_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_TEXT_BYTES', actual: source.reader.size, limit: HTML_TEXT_LIMIT}); }
  const format = candidates.find(candidate => candidate.evidence === 'signature' && candidate.family === role)?.format;
  if (role === 'media' && format === 'mp4') { await probeMp4(source.reader, context); }
  if (role === 'media' && ['matroska', 'avi'].includes(format ?? '')) { invalid('MP4_STRUCTURE', {reason: 'MEDIA_CONTAINER', format: format!}); }
  if (role !== 'image' || !format) { return; }
  if (['svg', 'tiff', 'ico', 'heif'].includes(format)) { invalid('IMAGE_UNSUPPORTED', {reason: 'IMAGE_FORMAT', format}); }
  const view = new DataView(head.buffer, head.byteOffset, head.byteLength);
  if (format === 'png' && head.length >= 24 && fourCC(head, 12) === 'IHDR') {
    dimensions(uint32(head, 16), uint32(head, 20));
    for (let position = 8; position + 12 <= head.length;) {
      const size = uint32(head, position); const type = fourCC(head, position + 4);
      if (['acTL', 'fcTL', 'fdAT'].includes(type)) { invalid('IMAGE_ANIMATED'); }
      if (size + 12 > head.length - position) { break; }
      position += size + 12;
    }
  } else if (format === 'gif' && head.length >= 10) { dimensions(view.getUint16(6, true), view.getUint16(8, true)); }
  else if (format === 'bmp' && head.length >= 26 && [40, 108, 124].includes(view.getUint32(14, true))) { dimensions(view.getInt32(18, true), Math.abs(view.getInt32(22, true))); }
  else if (format === 'webp' && head.length >= 30 && fourCC(head, 12) === 'VP8X') {
    if (head[20]! & 2) { invalid('IMAGE_ANIMATED'); }
    dimensions(1 + head[24]! + 256 * head[25]! + 65536 * head[26]!, 1 + head[27]! + 256 * head[28]! + 65536 * head[29]!);
  } else if (format === 'jpeg') {
    for (let position = 2; position + 4 <= head.length;) {
      if (head[position] !== 255) { break; }
      const marker = head[position + 1]!;
      if (marker === 0xff) { position++; continue; }
      if (marker === 0xda || marker === 0xd9) { break; }
      const size = view.getUint16(position + 2);
      if (size < 2 || size + 2 > head.length - position) { break; }
      if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker) && size >= 8) { dimensions(view.getUint16(position + 7), view.getUint16(position + 5)); return; }
      position += size + 2;
    }
  }
}
