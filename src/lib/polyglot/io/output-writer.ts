import {ArtifactReference, ProcessingContext, SeekableInput} from '../model/contract';
import {checkCancelled, diagnose, ProcessingError} from '../logic/diagnostic';
import {CHUNK_BYTES, validRange} from './bytes';

/** Minimal positioned sink, implemented with browser-managed temporary files. */
export interface OutputSink {
  write: (offset: number, bytes: Uint8Array<ArrayBuffer>) => Promise<void>;
  close: () => Promise<void>;
  abort: () => Promise<void>;
}

/** Backpressured, bounded writer with checked offset arithmetic and explicit resource limits. */
export class OutputWriter {
  /** @type {number} */
  private length = 0;
  /** @type {'open' | 'closed' | 'aborted'} */
  private state: 'open' | 'closed' | 'aborted' = 'open';
  /** @type {boolean} */
  private busy = false;
  /** A failed positioned write may have partially changed the sink; only abort remains safe. @type {boolean} */
  private failed = false;

  /**
   * @param {OutputSink} sink Seekable file sink.
   * @param {number} limit Maximum permitted output bytes, including patches.
   */
  public constructor(private readonly sink: OutputSink, private readonly limit: number) {
    if (!Number.isSafeInteger(limit) || limit < 0) {
      throw new ProcessingError({code: 'INVALID_SIZE', severity: 'error'});
    }
  }

  /** @returns {number} Current logical output length. */
  public get size(): number { return this.length; }

  /**
   * Appends one bounded chunk, awaiting the sink before allowing another operation.
   * @param {Uint8Array<ArrayBuffer>} bytes Chunk to append.
   * @param {AbortSignal} signal Job cancellation signal.
   * @returns {Promise<void>} Completion after the write is flushed to the sink.
   */
  public async append(bytes: Uint8Array<ArrayBuffer>, signal: AbortSignal): Promise<void> {
    await this.write(this.length, bytes, signal, true);
  }

  /**
   * Repairs bytes already written without extending the artifact or allocating it in memory.
   * @param {number} offset Patch position.
   * @param {Uint8Array<ArrayBuffer>} bytes Replacement bytes.
   * @param {AbortSignal} signal Job cancellation signal.
   * @returns {Promise<void>} Completion of the bounded patch.
   */
  public async patch(offset: number, bytes: Uint8Array<ArrayBuffer>, signal: AbortSignal): Promise<void> {
    await this.write(offset, bytes, signal, false);
  }

  /**
   * Copies a source range chunk by chunk; no stream adapter may buffer the full source.
   * @param {SeekableInput} source Random-access source.
   * @param {number} offset Starting source position.
   * @param {number} length Bytes to copy.
   * @param {ProcessingContext} context Cancellation and byte progress.
   * @returns {Promise<void>} Completion after every bounded write.
   */
  public async copy(source: SeekableInput, offset: number, length: number, context: ProcessingContext): Promise<void> {
    this.requireOpen();
    checkCancelled(context.signal);
    if (!validRange(offset, length, source.size)) {
      throw new ProcessingError({code: 'INVALID_RANGE', severity: 'error'});
    }
    if (length > this.limit - this.length) {
      throw new ProcessingError({code: 'OUTPUT_LIMIT', severity: 'error'});
    }
    for (let completed = 0; completed < length;) {
      checkCancelled(context.signal);
      const count = Math.min(CHUNK_BYTES, length - completed);
      const bytes = await source.read(offset + completed, count, context.signal);
      if (bytes.length !== count) {
        throw new ProcessingError({code: 'TRUNCATED_INPUT', severity: 'error'});
      }
      await this.append(bytes, context.signal);
      completed += count;
      context.progress({stage: 'generate', completed, total: length, unit: 'bytes'});
    }
    checkCancelled(context.signal);
  }

  /**
   * Closes the sink before exposing an opaque artifact reference.
   * @param {string} jobId Owning job.
   * @param {string} id Workspace file identifier.
   * @param {string} mediaType Artifact MIME type.
   * @param {AbortSignal} signal Job cancellation signal.
   * @returns {Promise<ArtifactReference>} Serializable output reference.
   */
  public async finish(jobId: string, id: string, mediaType: string, signal: AbortSignal): Promise<ArtifactReference> {
    this.requireOpen();
    checkCancelled(signal);
    this.busy = true;
    try {
      await this.sink.close();
      this.state = 'closed';
      checkCancelled(signal);
      return {jobId, id, size: this.length, mediaType};
    } catch(error) {
      throw new ProcessingError(diagnose(error));
    } finally { this.busy = false; }
  }

  /** @returns {Promise<void>} Aborts an unfinished file before its job directory is deleted. */
  public async abort(): Promise<void> {
    if (this.state !== 'open') { return; }
    if (this.busy) { throw new ProcessingError({code: 'JOB_BUSY', severity: 'error'}); }
    await this.sink.abort();
    this.state = 'aborted';
  }

  /** Ensures callers serialize writes, patches, and finalization. */
  private requireOpen(): void {
    if (this.state !== 'open' || this.busy || this.failed) {
      throw new ProcessingError({code: 'IO_FAILURE', severity: 'error'});
    }
  }

  /**
   * @param {number} offset Destination position.
   * @param {Uint8Array<ArrayBuffer>} bytes Bounded payload.
   * @param {AbortSignal} signal Job signal.
   * @param {boolean} append Whether this operation may extend the output.
   * @returns {Promise<void>} Completion of the sink operation.
   */
  private async write(offset: number, bytes: Uint8Array<ArrayBuffer>, signal: AbortSignal, append: boolean): Promise<void> {
    this.requireOpen();
    checkCancelled(signal);
    if (bytes.length > CHUNK_BYTES || !validRange(offset, bytes.length, append ? this.limit : this.length)) {
      throw new ProcessingError({code: append && bytes.length <= CHUNK_BYTES ? 'OUTPUT_LIMIT' : 'INVALID_RANGE', severity: 'error'});
    }
    this.busy = true;
    try {
      await this.sink.write(offset, bytes);
      if (append) { this.length = offset + bytes.length; }
      checkCancelled(signal);
    } catch(error) {
      this.failed = true;
      throw new ProcessingError(diagnose(error));
    } finally { this.busy = false; }
  }
}
