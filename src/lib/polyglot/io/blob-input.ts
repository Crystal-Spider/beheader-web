import {SeekableInput} from '../model/contract';
import {checkCancelled, ProcessingError} from '../logic/diagnostic';
import {CHUNK_BYTES, validRange} from './bytes';

/** Seekable Blob/File adapter, also suitable for future ZIP central-directory readers. */
export class BlobInput implements SeekableInput {
  /**
   * @param {Blob} blob Immutable file-backed or in-memory source.
   */
  public constructor(private readonly blob: Blob) {}

  /**
   * @returns {number} Source byte count without allocating its contents.
   */
  public get size(): number {
    return this.blob.size;
  }

  /**
   * Reads only a bounded slice, even when the source is several GiB.
   * @param {number} offset Starting byte position.
   * @param {number} length Requested byte count, at most one chunk.
   * @param {AbortSignal} signal Job cancellation signal.
   * @returns {Promise<Uint8Array<ArrayBuffer>>} Exact requested bytes.
   */
  public async read(offset: number, length: number, signal: AbortSignal): Promise<Uint8Array<ArrayBuffer>> {
    checkCancelled(signal);
    if (!validRange(offset, length, this.size) || length > CHUNK_BYTES) {
      throw new ProcessingError({code: 'INVALID_RANGE', severity: 'error'});
    }
    const buffer = await this.blob.slice(offset, offset + length).arrayBuffer();
    checkCancelled(signal);
    if (buffer.byteLength !== length) {
      throw new ProcessingError({code: 'TRUNCATED_INPUT', severity: 'error'});
    }
    return new Uint8Array(buffer);
  }
}
