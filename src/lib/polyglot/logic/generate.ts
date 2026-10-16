/*
 * ICO/MP4 layout and HTML wrapping derived from Beheader by p2r3.
 * https://github.com/p2r3/beheader — GPL-3.0-only; see LICENSE and NOTICE.md.
 */
import {ArtifactReference, ProcessingContext} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {BinaryReader, invalid, relocate, uint32, uint64} from '../io/binary';
import {TOTAL_INPUT_LIMIT} from '../io/bytes';
import {TemporaryStorage} from '../io/temporary-storage';
import {HTML_PREFIX, HTML_SUFFIX} from '../format/html';
import {inspectImage, normalizeImage} from '../format/image';
import {checkCancelled, ProcessingError} from './diagnostic';
import {PreparedComposition} from './compose';

/** Canonical brands avoid arbitrary input ftyp bytes interfering with the HTML comment. */
const FTYP = new Uint8Array([
  0, 0, 0, 32, 102, 116, 121, 112, 105, 115, 111, 109, 0, 0, 2, 0,
  105, 115, 111, 109, 105, 115, 111, 50, 97, 118, 99, 49, 109, 112, 52, 49
]);

/**
 * Produces an ICO directory doubling as a 256-byte unknown MP4 box.
 * @param {number} width Normalized raster width.
 * @param {number} height Normalized raster height.
 * @param {number} pngSize Embedded PNG size.
 * @param {number} pngOffset Absolute embedded PNG position.
 * @param {boolean} html Whether the output includes HTML.
 * @returns {Uint8Array<ArrayBuffer>} Fixed header with checked directory offsets.
 */
export function imageContainerHeader(width: number, height: number, pngSize: number, pngOffset: number, html: boolean): Uint8Array<ArrayBuffer> {
  relocate(pngOffset, 0, 4);
  relocate(pngSize, 0, 4);
  const header = new Uint8Array(256);
  const view = new DataView(header.buffer);
  view.setUint16(2, 1, true);
  view.setUint16(4, 1, true);
  // ICO directory fields cap at 256; PNG-aware readers may use the full embedded dimensions.
  header[6] = width < 256 ? width : 0;
  header[7] = height < 256 ? height : 0;
  view.setUint16(10, 1, true);
  view.setUint16(12, 32, true);
  view.setUint32(14, pngSize, true);
  view.setUint32(18, pngOffset, true);
  if (html) { header.set(new TextEncoder().encode('><meta charset=utf-8><style>body{font-size:0}</style><!--'), 22); }
  return header;
}

/**
 * Writes one image/media composition, with optional HTML, entirely through bounded file I/O.
 * @param {PreparedComposition} prepared Structure-validated runtime plan.
 * @param {TemporaryStorage} storage Owning job workspace, retained on success.
 * @param {ProcessingContext} context Cancellation and measured write/patch progress.
 * @returns {Promise<ArtifactReference>} Finished file-backed output reference.
 */
export async function generateResult(prepared: PreparedComposition, storage: TemporaryStorage, context: ProcessingContext): Promise<ArtifactReference> {
  checkCancelled(context.signal);
  const {plan, image, media, html} = prepared;
  if (!plan.ready || !image || !media) {
    throw new ProcessingError(plan.diagnostics.find(diagnostic => diagnostic.severity === 'error') ?? {code: 'IMPLEMENTATION_UNAVAILABLE', severity: 'error'});
  }
  const png = new BlobInput(await normalizeImage(image.input.blob, image.info, context));
  const normalized = await inspectImage(png, context);
  const htmlLength = html ? HTML_PREFIX.length + html.source.reader.size - html.bom + HTML_SUFFIX.length : 0;
  const skipSize = 8 + htmlLength + png.size;
  const pngOffset = 256 + FTYP.length + 8 + htmlLength;
  const prefixSize = 256 + FTYP.length + skipSize;
  const delta = prefixSize - media.info.ftyp.size;
  const outputSize = media.source.reader.size + delta;
  if (!Number.isSafeInteger(outputSize) || outputSize > TOTAL_INPUT_LIMIT) { invalid('OUTPUT_LIMIT'); }
  const patchBytes = media.info.tables.reduce((sum, table) => sum + table.count * table.width, 0);
  const total = outputSize + patchBytes;
  let completed = 0;
  const progress = (): void => { context.progress({stage: 'generate', completed, total, unit: 'bytes'}); };
  const {id, writer} = await storage.createOutput(TOTAL_INPUT_LIMIT);
  const append = async(bytes: Uint8Array<ArrayBuffer>): Promise<void> => {
    await writer.append(bytes, context.signal);
    completed += bytes.length;
    progress();
  };
  const copy = async(source: typeof media.source.reader, offset: number, length: number): Promise<void> => {
    const base = completed;
    await writer.copy(source, offset, length, {...context, progress: event => { completed = base + event.completed; progress(); }});
  };
  progress();
  await append(imageContainerHeader(normalized.width, normalized.height, png.size, pngOffset, !!html));
  await append(FTYP);
  const skip = new Uint8Array(8);
  new DataView(skip.buffer).setUint32(0, skipSize);
  skip.set(new TextEncoder().encode('skip'), 4);
  await append(skip);
  if (html) {
    await append(HTML_PREFIX);
    await copy(html.source.reader, html.bom, html.source.reader.size - html.bom);
    await append(HTML_SUFFIX);
  }
  await copy(png, 0, png.size);
  await copy(media.source.reader, media.info.ftyp.size, media.source.reader.size - media.info.ftyp.size);
  const reader = new BinaryReader(media.source.reader, context.signal);
  for (const table of media.info.tables) {
    for (let index = 0; index < table.count;) {
      const count = Math.min(16384, table.count - index);
      const bytes = await reader.read(table.start + index * table.width, count * table.width);
      const view = new DataView(bytes.buffer);
      for (let entry = 0; entry < count; entry++) {
        const offset = entry * table.width;
        const original = table.width === 4 ? uint32(bytes, offset) : uint64(bytes, offset);
        const shifted = relocate(original, delta, table.width);
        if (table.width === 4) { view.setUint32(offset, shifted); }
        else { view.setBigUint64(offset, BigInt(shifted)); }
      }
      await writer.patch(relocate(table.start + index * table.width, delta, 8), bytes, context.signal);
      index += count;
      completed += bytes.length;
      progress();
    }
  }
  if (writer.size !== outputSize) { invalid('IO_FAILURE'); }
  return writer.finish(storage.jobId, id, 'application/octet-stream', context.signal);
}
