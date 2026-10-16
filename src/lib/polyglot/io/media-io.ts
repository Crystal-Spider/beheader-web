import {CustomSource, StreamTarget, StreamTargetChunk} from 'mediabunny';

import {ProcessingContext, SeekableInput} from '../model/contract';
import {checkCancelled} from '../logic/diagnostic';
import {BinaryReader, invalid} from './binary';
import {CHUNK_BYTES} from './bytes';
import {OutputWriter} from './output-writer';

/**
 * Bridges ranged media reads without materializing large requested ranges in one ArrayBuffer.
 * @param {SeekableInput} input Source bytes.
 * @param {ProcessingContext} context Cancellation.
 * @returns {CustomSource} Seekable source with a bounded cache and backpressured ranges.
 */
export function mediaSource(input: SeekableInput, context: ProcessingContext): CustomSource {
  const reader = new BinaryReader(input, context.signal);
  return new CustomSource({
    getSize: () => input.size,
    maxCacheSize: 2 * CHUNK_BYTES,
    prefetchProfile: 'none',
    read: (start, end) => {
      let offset = start;
      return new ReadableStream<Uint8Array<ArrayBuffer>>({pull: async controller => {
        checkCancelled(context.signal);
        if (offset >= end) { controller.close(); return; }
        const bytes = await reader.read(offset, Math.min(CHUNK_BYTES, end - offset));
        offset += bytes.length;
        controller.enqueue(bytes);
      }});
    }
  });
}

/**
 * Writes media chunks and patches through the same bounded output used by the composition writer.
 * @param {OutputWriter} writer File-backed intermediate.
 * @param {StreamTargetChunk} chunk Positioned library write.
 * @param {AbortSignal} signal Cancellation.
 * @returns {Promise<void>} Backpressured write completion.
 */
export async function writeMediaChunk(writer: OutputWriter, chunk: StreamTargetChunk, signal: AbortSignal): Promise<void> {
  checkCancelled(signal);
  if (!Number.isSafeInteger(chunk.position) || chunk.position < 0 || chunk.position > writer.size) { invalid('INVALID_RANGE'); }
  for (let offset = 0; offset < chunk.data.length;) {
    const position = chunk.position + offset;
    const patch = position < writer.size;
    const count = Math.min(CHUNK_BYTES, chunk.data.length - offset, patch ? writer.size - position : CHUNK_BYTES);
    const bytes = chunk.data.slice(offset, offset + count);
    if (patch) { await writer.patch(position, bytes, signal); }
    else { await writer.append(bytes, signal); }
    offset += count;
  }
}

/**
 * Uses at most two buffered 1 MiB chunks and preserves storage errors across library wrappers.
 * @param {OutputWriter} writer Bounded intermediate writer.
 * @param {AbortSignal} signal Cancellation.
 * @param {(error: unknown) => void} failure Captures original sink failures.
 * @returns {StreamTarget} Seekable backpressured media target.
 */
export function mediaTarget(writer: OutputWriter, signal: AbortSignal, failure: (error: unknown) => void): StreamTarget {
  return new StreamTarget(new WritableStream<StreamTargetChunk>({write: async chunk => {
    try { await writeMediaChunk(writer, chunk, signal); }
    catch(error) { failure(error); throw error; }
  }}), {chunked: true, chunkSize: CHUNK_BYTES});
}
