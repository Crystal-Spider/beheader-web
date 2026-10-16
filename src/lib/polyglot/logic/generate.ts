/*
 * ICO/MP4 layout and HTML wrapping derived from Beheader by p2r3.
 * https://github.com/p2r3/beheader — GPL-3.0-only; see LICENSE and NOTICE.md.
 */
import {ArtifactReference, ProcessingContext, SeekableInput} from '../model/contract';
import {BlobInput} from '../io/blob-input';
import {BinaryReader, invalid, relocate, uint32, uint64} from '../io/binary';
import {TOTAL_INPUT_LIMIT} from '../io/bytes';
import {TemporaryStorage} from '../io/temporary-storage';
import {HTML_PREFIX, HTML_SUFFIX} from '../format/html';
import {inspectImage, normalizeImage} from '../format/image';
import {appendArchives} from '../format/archive';
import {normalizeAudio} from '../format/audio';
import {inspectMp4} from '../format/mp4';
import {checkCancelled, ProcessingError} from './diagnostic';
import {headerPayloadOffset, PreparedComposition} from './compose';

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
 * Writes selected interpretations using bounded I/O; neutral container bytes add no advertised family.
 * @param {PreparedComposition} prepared Structure-validated runtime plan.
 * @param {TemporaryStorage} storage Owning job workspace, retained on success.
 * @param {ProcessingContext} context Cancellation and measured write/patch progress.
 * @returns {Promise<ArtifactReference>} Finished file-backed output reference.
 */
export async function generateResult(prepared: PreparedComposition, storage: TemporaryStorage, context: ProcessingContext): Promise<ArtifactReference> {
  checkCancelled(context.signal);
  const {plan, image, html, pdf, archives = [], appendables = [], header: extraHeader} = prepared;
  const extensions = !!pdf || archives.length > 0 || appendables.length > 0;
  if (!plan.ready) {
    throw new ProcessingError(plan.diagnostics.find(diagnostic => diagnostic.severity === 'error') ?? {code: 'IMPLEMENTATION_UNAVAILABLE', severity: 'error'});
  }
  let media = prepared.media && 'info' in prepared.media ? prepared.media : undefined;
  let audioArtifact: ArtifactReference | undefined;
  if (prepared.media && 'audio' in prepared.media) {
    const normalized = await normalizeAudio(prepared.media.source, prepared.media.audio, storage, context);
    audioArtifact = normalized.artifact;
    media = {source: normalized.source, info: await inspectMp4(normalized.source.reader, context)};
  }
  const encode = (text: string): Uint8Array<ArrayBuffer> => new TextEncoder().encode(text);
  const png = image ? new BlobInput(await normalizeImage(image.input.blob, image.info, context)) : undefined;
  const normalized = png ? await inspectImage(png, context) : undefined;
  const htmlLength = html ? HTML_PREFIX.length + html.source.reader.size - html.bom + HTML_SUFFIX.length : 0;
  const skipSize = 8 + htmlLength + (png?.size ?? 0);
  const pngOffset = 256 + (media ? FTYP.length + 8 : 0) + htmlLength;
  const prefixSize = pngOffset + (png?.size ?? 0);
  const delta = prefixSize - (media?.info.ftyp.size ?? 0);
  const baseSize = prefixSize + (media ? media.source.reader.size - media.info.ftyp.size : 0);
  const extensionStart = baseSize + (media && extensions ? 8 : 0) + appendables.reduce((sum, source) => sum + source.reader.size, 0);
  const terminator = pdf ? encode('\nendstream\nendobj\n') : new Uint8Array(0);
  const pdfOffset = extensionStart + terminator.length;
  const pdfEnd = pdf ? encode(`${pdfOffset + pdf.info.xref}\n%%EOF\n`) : new Uint8Array(0);
  const pdfComment = pdf ? encode(`\nstartxref\n${pdfOffset + pdf.info.xref}\n%%EOF\n`) : new Uint8Array(0);
  const outputSize = pdf ? pdfOffset + pdf.info.startxref + pdfEnd.length : extensionStart;
  if (!Number.isSafeInteger(outputSize) || outputSize > TOTAL_INPUT_LIMIT) { invalid('OUTPUT_LIMIT'); }
  const patchBytes = (media?.info.tables.reduce((sum, table) => sum + table.count * table.width, 0) ?? 0) + (pdf?.info.entries.length ?? 0) * 10;
  const total = outputSize + patchBytes;
  let completed = 0;
  const progress = (): void => { context.progress({stage: 'generate', completed, total, unit: 'bytes'}); };
  const {id, writer} = await storage.createOutput(TOTAL_INPUT_LIMIT);
  const append = async(bytes: Uint8Array<ArrayBuffer>): Promise<void> => {
    await writer.append(bytes, context.signal);
    completed += bytes.length;
    progress();
  };
  const copy = async(source: SeekableInput, offset: number, length: number): Promise<void> => {
    const base = completed;
    await writer.copy(source, offset, length, {...context, progress: event => { completed = base + event.completed; progress(); }});
  };
  progress();
  const header = png && normalized ? imageContainerHeader(normalized.width, normalized.height, png.size, pngOffset, !!html) : new Uint8Array(256);
  if (!png) {
    new DataView(header.buffer).setUint32(0, 256);
    header.set(encode('free'), 4);
    if (html) { header.set(encode('><meta charset=utf-8><style>body{font-size:0}</style><!--'), 22); }
  }
  if (pdf) {
    const position = html ? 80 : 22;
    const start = encode(`\n${pdf.info.header}${pdf.info.size} 0 obj\n<</Length `);
    const end = encode('>>\nstream\n');
    const streamStart = position + start.length + 10 + end.length;
    if (streamStart > header.length) { invalid('PDF_STRUCTURE'); }
    header.set(start, position);
    header.set(encode(String(extensionStart - streamStart).padStart(10, '0')), position + start.length);
    header.set(end, position + start.length + 10);
  }
  if (extraHeader) { header.set(await extraHeader.reader.read(0, extraHeader.reader.size, context.signal), headerPayloadOffset(!!html, pdf?.info)); }
  await append(header);
  const box = (size: number): Uint8Array<ArrayBuffer> => {
    const bytes = new Uint8Array(8);
    new DataView(bytes.buffer).setUint32(0, size);
    bytes.set(encode('skip'), 4);
    return bytes;
  };
  if (media) { await append(FTYP); await append(box(skipSize)); }
  if (html) {
    await append(HTML_PREFIX);
    await copy(html.source.reader, html.bom, html.source.reader.size - html.bom);
    await append(HTML_SUFFIX);
  }
  if (png) { await copy(png, 0, png.size); }
  if (media) { await copy(media.source.reader, media.info.ftyp.size, media.source.reader.size - media.info.ftyp.size); }
  if (media && extensions) { await append(box(8)); }
  for (const source of appendables) { await copy(source.reader, 0, source.reader.size); }
  if (pdf) {
    await append(terminator);
    await copy(pdf.source.reader, 0, pdf.info.startxref);
    await append(pdfEnd);
    for (const entry of pdf.info.entries) {
      const shifted = entry.offset + pdfOffset;
      if (!Number.isSafeInteger(shifted) || shifted > 9999999999) { invalid('OFFSET_OVERFLOW'); }
      await writer.patch(entry.field + pdfOffset, encode(String(shifted).padStart(10, '0')), context.signal);
      completed += 10;
      progress();
    }
  }
  if (media) {
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
    // A formerly terminal size-zero mdat must not swallow the newly appended PDF/ZIP container.
    for (const mdat of media.info.mdats) {
      if (uint32(await reader.read(mdat.start, 4)) === 0) {
        const size = new Uint8Array(4);
        new DataView(size.buffer).setUint32(0, mdat.size);
        await writer.patch(mdat.start + delta, size, context.signal);
      }
    }
  }
  if (writer.size !== outputSize) { invalid('IO_FAILURE'); }
  if (audioArtifact) { await storage.discard(audioArtifact); }
  if (archives.length) { await appendArchives(archives, writer, storage, context, pdfComment); }
  if (media && extensions) { await writer.patch(baseSize, box(writer.size - baseSize), context.signal); }
  return writer.finish(storage.jobId, id, 'application/octet-stream', context.signal);
}
