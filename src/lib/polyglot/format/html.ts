import {ProcessingContext, SeekableInput} from '../model/contract';
import {BinaryReader, invalid} from '../io/binary';
import {CHUNK_BYTES, matches} from '../io/bytes';
import {ProcessingError} from '../logic/diagnostic';

/** Parsed HTML/CSS text is bounded independently of streamable binary assets. */
export const HTML_TEXT_LIMIT = 64 * CHUNK_BYTES;

/** Encoded boundaries count bytes, never UTF-16 JavaScript string length. */
export const HTML_PREFIX = new TextEncoder().encode('--><div style="font-size:initial">');
export const HTML_SUFFIX = new TextEncoder().encode('</div><plaintext hidden>');

/**
 * Validates UTF-8 incrementally without executing or fetching any supplied HTML.
 * @param {SeekableInput} input HTML source.
 * @param {ProcessingContext} context Job cancellation/progress.
 * @returns {Promise<number>} Optional UTF-8 BOM length to skip when embedding.
 */
export async function inspectHtml(input: SeekableInput, context: ProcessingContext): Promise<number> {
  if (input.size > HTML_TEXT_LIMIT) { invalid('FORMAT_RESOURCE_LIMIT', {reason: 'HTML_TEXT_BYTES', actual: input.size, limit: HTML_TEXT_LIMIT}); }
  const reader = new BinaryReader(input, context.signal);
  const decoder = new TextDecoder('utf-8', {fatal: true});
  const head = await reader.read(0, Math.min(3, input.size));
  const bom = matches(head, 0, [239, 187, 191]) ? 3 : 0;
  try {
    for (let offset = bom; offset < input.size; offset += CHUNK_BYTES) {
      const text = decoder.decode(await reader.read(offset, Math.min(CHUNK_BYTES, input.size - offset)), {stream: true});
      if (text.includes('\0')) { invalid('HTML_ENCODING'); }
    }
    decoder.decode();
  } catch(error) {
    if (error instanceof ProcessingError) { throw error; }
    invalid('HTML_ENCODING');
  }
  return bom;
}
