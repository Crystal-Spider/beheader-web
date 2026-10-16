import {DiagnosticCode, SeekableInput} from '../model/contract';
import {checkCancelled, ProcessingError} from '../logic/diagnostic';
import {CHUNK_BYTES, validRange} from './bytes';

/**
 * Throws a typed format diagnostic at an invalid structure or capability boundary.
 * @param {DiagnosticCode} code Stable failure code.
 * @returns {never} Always throws.
 */
export function invalid(code: DiagnosticCode): never { throw new ProcessingError({code, severity: 'error'}); }

/**
 * Decodes a four-byte box/chunk name without changing arbitrary binary byte values.
 * @param {Uint8Array} bytes Bounded source bytes.
 * @param {number} offset Name position.
 * @returns {string} Four-character name.
 */
export function fourCC(bytes: Uint8Array, offset = 0): string {
  return String.fromCharCode(...bytes.subarray(offset, offset + 4));
}

/**
 * Reads a big-endian unsigned 32-bit field.
 * @param {Uint8Array} bytes Bounded bytes.
 * @param {number} offset Field position.
 * @returns {number} Unsigned field value.
 */
export function uint32(bytes: Uint8Array, offset = 0): number {
  if (!validRange(offset, 4, bytes.length)) { invalid('TRUNCATED_INPUT'); }
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(offset);
}

/**
 * Reads a 64-bit offset only when it can be represented exactly by JavaScript.
 * @param {Uint8Array} bytes Bounded bytes.
 * @param {number} offset Field position.
 * @returns {number} Exactly representable offset.
 */
export function uint64(bytes: Uint8Array, offset = 0): number {
  if (!validRange(offset, 8, bytes.length)) { invalid('TRUNCATED_INPUT'); }
  const value = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getBigUint64(offset);
  if (value > BigInt(Number.MAX_SAFE_INTEGER)) { invalid('OFFSET_OVERFLOW'); }
  return Number(value);
}

/**
 * Adds a relocation delta without wrapping 32-bit fields or losing integer precision.
 * @param {number} offset Original byte position.
 * @param {number} delta Signed displacement.
 * @param {number} width Destination field width.
 * @returns {number} Checked new position.
 */
export function relocate(offset: number, delta: number, width: 4 | 8): number {
  const value = offset + delta;
  if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(delta) || !Number.isSafeInteger(value)
    || offset < 0 || value < 0 || (width === 4 && value > 0xffffffff)) { invalid('OFFSET_OVERFLOW'); }
  return value;
}

/** Shared exact bounded reads for all format inspectors, including synthetic readers. */
export class BinaryReader {
  /**
   * @param {SeekableInput} input Seekable input.
   * @param {AbortSignal} signal Job cancellation signal.
   */
  public constructor(public readonly input: SeekableInput, public readonly signal: AbortSignal) {}

  /**
   * @param {number} offset Source position.
   * @param {number} length Bounded byte count.
   * @returns {Promise<Uint8Array<ArrayBuffer>>} Exactly the requested bytes.
   */
  public async read(offset: number, length: number): Promise<Uint8Array<ArrayBuffer>> {
    checkCancelled(this.signal);
    if (!validRange(offset, length, this.input.size) || length > CHUNK_BYTES) { invalid('TRUNCATED_INPUT'); }
    const bytes = await this.input.read(offset, length, this.signal);
    checkCancelled(this.signal);
    if (bytes.length !== length) { invalid('TRUNCATED_INPUT'); }
    return bytes;
  }
}
