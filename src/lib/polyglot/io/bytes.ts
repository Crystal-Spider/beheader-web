/** Maximum allocation per read/write; large files use repeated bounded chunks. */
export const CHUNK_BYTES = 1024 * 1024;

/** Binary input limits, checked before reading any content. */
export const INPUT_LIMIT = 1024 ** 3;
export const TOTAL_INPUT_LIMIT = 2 * INPUT_LIMIT;

/** Bounds selection metadata and per-input structural work, independently of byte limits. */
export const INPUT_COUNT_LIMIT = 128;

/**
 * Prevents unsafe offset arithmetic, negative lengths, and reads past EOF.
 * @param {number} offset Starting byte position.
 * @param {number} length Byte count.
 * @param {number} size Available byte count.
 * @returns {boolean} Whether the full range is representable and available.
 */
export function validRange(offset: number, length: number, size: number): boolean {
  return [offset, length, size].every(value => Number.isSafeInteger(value) && value >= 0)
    && offset <= size && length <= size - offset;
}

/**
 * Matches an ASCII/binary signature without decoding an entire input.
 * @param {Uint8Array} bytes Bounded bytes.
 * @param {number} offset Signature offset.
 * @param {readonly number[]} signature Expected bytes.
 * @returns {boolean} Whether every signature byte matches.
 */
export function matches(bytes: Uint8Array, offset: number, signature: readonly number[]): boolean {
  return validRange(offset, signature.length, bytes.length)
    && signature.every((byte, index) => bytes[offset + index] === byte);
}
