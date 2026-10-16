import {ProcessingContext, SeekableInput} from '../model/contract';
import {BinaryReader, fourCC, invalid, uint32} from '../io/binary';
import {CHUNK_BYTES, matches} from '../io/bytes';
import {checkCancelled, ProcessingError} from '../logic/diagnostic';

/** Bounds decoded pixels independently of compressed input size (128 MiB of RGBA). */
export const IMAGE_PIXEL_LIMIT = 32 * 1024 * 1024;

/** Static raster dimensions checked before invoking a browser decoder. */
export interface ImageInfo {
  readonly width: number;
  readonly height: number;
  readonly format: 'png' | 'jpeg' | 'gif' | 'webp' | 'bmp';
}

/**
 * Checks image dimensions without allocating a pixel buffer.
 * @param {number} width Image width.
 * @param {number} height Image height.
 */
function dimensions(width: number, height: number): void {
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width <= 0 || height <= 0) { invalid('IMAGE_INVALID'); }
  if (width > 32767 || height > 32767 || width * height > IMAGE_PIXEL_LIMIT) { invalid('IMAGE_RESOURCE_LIMIT'); }
}

/**
 * Reads PNG structure through IEND, rejecting APNG even when its first frame is static.
 * @param {BinaryReader} reader Exact bounded reader.
 * @returns {Promise<ImageInfo>} Static dimensions.
 */
async function png(reader: BinaryReader): Promise<ImageInfo> {
  let position = 8;
  let width = 0;
  let height = 0;
  let data = false;
  let chunks = 0;
  while (position < reader.input.size) {
    if (++chunks > 100000) { invalid('FORMAT_RESOURCE_LIMIT'); }
    const header = await reader.read(position, 8);
    const size = uint32(header);
    const type = fourCC(header, 4);
    if (size + 12 > reader.input.size - position) { invalid('IMAGE_INVALID'); }
    if (['acTL', 'fcTL', 'fdAT'].includes(type)) { invalid('IMAGE_ANIMATED'); }
    if (position === 8 && type !== 'IHDR') { invalid('IMAGE_INVALID'); }
    if (type === 'IHDR') {
      if (position !== 8 || size !== 13) { invalid('IMAGE_INVALID'); }
      const header = await reader.read(position + 8, 13);
      width = uint32(header);
      height = uint32(header, 4);
      dimensions(width, height);
    }
    if (type === 'IDAT') { data = true; }
    position += size + 12;
    if (type === 'IEND') {
      if (size || position !== reader.input.size || !data) { invalid('IMAGE_INVALID'); }
      return {width, height, format: 'png'};
    }
  }
  return invalid('IMAGE_INVALID');
}

/**
 * Skips entropy-coded JPEG bytes without confusing escaped or restart markers with frames.
 * @param {BinaryReader} reader Exact bounded reader.
 * @param {number} position First entropy byte.
 * @returns {Promise<number>} Next unescaped marker position.
 */
async function jpegMarker(reader: BinaryReader, position: number): Promise<number> {
  while (position + 1 < reader.input.size) {
    const bytes = await reader.read(position, Math.min(CHUNK_BYTES, reader.input.size - position));
    for (let index = 0; index < bytes.length - 1; index++) {
      const next = bytes[index + 1]!;
      if (bytes[index] === 255 && next !== 0 && next !== 255 && (next < 0xd0 || next > 0xd7)) { return position + index; }
    }
    position += bytes.length - 1;
  }
  return invalid('IMAGE_INVALID');
}

/**
 * Checks JPEG dimensions and rejects MPO or concatenated multi-image input.
 * @param {BinaryReader} reader Exact bounded reader.
 * @returns {Promise<ImageInfo>} Static dimensions.
 */
async function jpeg(reader: BinaryReader): Promise<ImageInfo> {
  let position = 2;
  let width = 0;
  let height = 0;
  let scans = 0;
  let segments = 0;
  while (position < reader.input.size) {
    if (++segments > 100000) { invalid('FORMAT_RESOURCE_LIMIT'); }
    const marker = await reader.read(position, 2);
    if (marker[0] !== 255) { invalid('IMAGE_INVALID'); }
    const type = marker[1];
    if (type === 255) { position++; continue; }
    if (type === 0xd8) { invalid('IMAGE_MULTIPAGE'); }
    if (type === 0xd9) {
      if (position + 2 !== reader.input.size) { invalid('IMAGE_MULTIPAGE'); }
      if (!scans || !width || !height) { invalid('IMAGE_INVALID'); }
      return {width, height, format: 'jpeg'};
    }
    const length = await reader.read(position + 2, 2);
    const size = (length[0]! << 8) | length[1]!;
    if (size < 2 || size + 2 > reader.input.size - position) { invalid('IMAGE_INVALID'); }
    if (type === 0xe2 && size >= 6 && fourCC(await reader.read(position + 4, 4)) === 'MPF\0') { invalid('IMAGE_MULTIPAGE'); }
    if ([0xc0, 0xc1, 0xc2].includes(type ?? -1)) {
      if (size < 8 || width) { invalid('IMAGE_INVALID'); }
      const frame = await reader.read(position + 4, 5);
      height = (frame[1]! << 8) | frame[2]!;
      width = (frame[3]! << 8) | frame[4]!;
      dimensions(width, height);
    }
    position += size + 2;
    if (type === 0xda) { scans++; position = await jpegMarker(reader, position); }
  }
  return invalid('IMAGE_INVALID');
}

/**
 * Parses GIF block boundaries; compressed byte patterns never count as extra frames.
 * @param {BinaryReader} reader Exact bounded reader.
 * @returns {Promise<ImageInfo>} Exactly one static frame.
 */
async function gif(reader: BinaryReader): Promise<ImageInfo> {
  const header = await reader.read(0, 13);
  const width = header[6]! + 256 * header[7]!;
  const height = header[8]! + 256 * header[9]!;
  dimensions(width, height);
  let position = 13 + (header[10]! & 128 ? 3 * 2 ** ((header[10]! & 7) + 1) : 0);
  let frames = 0;
  let blocks = 0;
  while (position < reader.input.size) {
    if (++blocks > 1000000) { invalid('FORMAT_RESOURCE_LIMIT'); }
    const type = (await reader.read(position++, 1))[0];
    if (type === 0x3b) {
      if (frames !== 1 || position !== reader.input.size) { invalid('IMAGE_INVALID'); }
      return {width, height, format: 'gif'};
    }
    if (type === 0x2c) {
      if (++frames > 1) { invalid('IMAGE_ANIMATED'); }
      const descriptor = await reader.read(position, 9);
      const left = descriptor[0]! + 256 * descriptor[1]!;
      const top = descriptor[2]! + 256 * descriptor[3]!;
      const frameWidth = descriptor[4]! + 256 * descriptor[5]!;
      const frameHeight = descriptor[6]! + 256 * descriptor[7]!;
      dimensions(frameWidth, frameHeight);
      if (frameWidth > width - left || frameHeight > height - top) { invalid('IMAGE_INVALID'); }
      position += 9 + (descriptor[8]! & 128 ? 3 * 2 ** ((descriptor[8]! & 7) + 1) : 0);
      position++; // LZW minimum code size precedes the data sub-blocks.
    } else if (type === 0x21) {
      const label = (await reader.read(position++, 1))[0];
      if (label === 1) { invalid('IMAGE_UNSUPPORTED'); }
    } else { invalid('IMAGE_INVALID'); }
    for (;;) {
      if (++blocks > 1000000) { invalid('FORMAT_RESOURCE_LIMIT'); }
      const length = (await reader.read(position++, 1))[0]!;
      if (!length) { break; }
      position += length;
      if (position > reader.input.size) { invalid('IMAGE_INVALID'); }
    }
  }
  return invalid('IMAGE_INVALID');
}

/**
 * Parses RIFF chunks and rejects WebP animation before browser decoding.
 * @param {BinaryReader} reader Exact bounded reader.
 * @returns {Promise<ImageInfo>} Static dimensions.
 */
async function webp(reader: BinaryReader): Promise<ImageInfo> {
  const header = await reader.read(0, 12);
  const little = new DataView(header.buffer).getUint32(4, true);
  if (little + 8 !== reader.input.size) { invalid('IMAGE_INVALID'); }
  let position = 12;
  let width = 0;
  let height = 0;
  let frames = 0;
  let count = 0;
  while (position < reader.input.size) {
    if (++count > 100000) { invalid('FORMAT_RESOURCE_LIMIT'); }
    const chunk = await reader.read(position, 8);
    const type = fourCC(chunk);
    const size = new DataView(chunk.buffer).getUint32(4, true);
    if (size + 8 + size % 2 > reader.input.size - position) { invalid('IMAGE_INVALID'); }
    if (type === 'ANIM' || type === 'ANMF') { invalid('IMAGE_ANIMATED'); }
    if (type === 'VP8X') {
      if (size !== 10) { invalid('IMAGE_INVALID'); }
      const data = await reader.read(position + 8, 10);
      if (data[0]! & 2) { invalid('IMAGE_ANIMATED'); }
      width = 1 + data[4]! + 256 * data[5]! + 65536 * data[6]!;
      height = 1 + data[7]! + 256 * data[8]! + 65536 * data[9]!;
      dimensions(width, height);
    }
    if (type === 'VP8 ' || type === 'VP8L') {
      if (++frames > 1) { invalid('IMAGE_MULTIPAGE'); }
      const declaredWidth = width;
      const declaredHeight = height;
      {
        const data = await reader.read(position + 8, Math.min(10, size));
        if (type === 'VP8 ') {
          if (!matches(data, 3, [0x9d, 1, 0x2a]) || data.length < 10) { invalid('IMAGE_INVALID'); }
          width = (data[6]! + 256 * data[7]!) & 0x3fff;
          height = (data[8]! + 256 * data[9]!) & 0x3fff;
        } else {
          if (data[0] !== 0x2f || data.length < 5) { invalid('IMAGE_INVALID'); }
          width = 1 + data[1]! + ((data[2]! & 0x3f) << 8);
          height = 1 + (data[2]! >> 6) + (data[3]! << 2) + ((data[4]! & 15) << 10);
        }
        dimensions(width, height);
        if (declaredWidth && (width !== declaredWidth || height !== declaredHeight)) { invalid('IMAGE_INVALID'); }
      }
    }
    position += 8 + size + size % 2;
  }
  if (frames !== 1) { invalid('IMAGE_INVALID'); }
  return {width, height, format: 'webp'};
}

/**
 * Proves supported raster inputs are static before any image decoder can flatten them.
 * @param {SeekableInput} input Selected image bytes.
 * @param {ProcessingContext} context Job cancellation/progress.
 * @returns {Promise<ImageInfo>} Supported static image metadata.
 */
export async function inspectImage(input: SeekableInput, context: ProcessingContext): Promise<ImageInfo> {
  const reader = new BinaryReader(input, context.signal);
  const head = await reader.read(0, Math.min(input.size, 16));
  if (matches(head, 0, [137, 80, 78, 71, 13, 10, 26, 10])) { return png(reader); }
  if (matches(head, 0, [255, 216, 255])) { return jpeg(reader); }
  if (fourCC(head) === 'GIF8') { return gif(reader); }
  if (fourCC(head) === 'RIFF' && fourCC(head, 8) === 'WEBP') { return webp(reader); }
  if (head[0] === 66 && head[1] === 77) {
    const header = await reader.read(0, 34);
    const view = new DataView(header.buffer);
    if (![40, 108, 124].includes(view.getUint32(14, true))) { invalid('IMAGE_UNSUPPORTED'); }
    if (![0, 3, 6].includes(view.getUint32(30, true))) { invalid('IMAGE_UNSUPPORTED'); }
    if (view.getUint32(2, true) !== input.size || view.getUint16(26, true) !== 1
      || view.getUint32(10, true) < 14 + view.getUint32(14, true) || view.getUint32(10, true) >= input.size) { invalid('IMAGE_INVALID'); }
    const width = view.getInt32(18, true);
    const height = Math.abs(view.getInt32(22, true));
    dimensions(width, height);
    return {width, height, format: 'bmp'};
  }
  if (matches(head, 0, [0, 0, 1, 0]) && (head[4]! + 256 * head[5]!) > 1) { invalid('IMAGE_MULTIPAGE'); }
  if (fourCC(head) === 'II*\0' || fourCC(head) === 'MM\0*') {
    const little = head[0] === 73;
    const offset = new DataView(head.buffer).getUint32(4, little);
    const count = new DataView((await reader.read(offset, 2)).buffer).getUint16(0, little);
    const next = new DataView((await reader.read(offset + 2 + 12 * count, 4)).buffer).getUint32(0, little);
    if (next) { invalid('IMAGE_MULTIPAGE'); }
  }
  return invalid('IMAGE_UNSUPPORTED');
}

/**
 * Converts a proven static raster to PNG while preserving its alpha channel.
 * @param {Blob} source File-backed original image.
 * @param {ImageInfo} info Validated static dimensions.
 * @param {ProcessingContext} context Job cancellation/progress.
 * @returns {Promise<Blob>} Browser-produced PNG, without a full input ArrayBuffer.
 */
export async function normalizeImage(source: Blob, info: ImageInfo, context: ProcessingContext): Promise<Blob> {
  checkCancelled(context.signal);
  if (typeof createImageBitmap !== 'function' || typeof OffscreenCanvas !== 'function') { invalid('IMAGE_DECODE_UNAVAILABLE'); }
  let bitmap: ImageBitmap | undefined;
  let canvas: OffscreenCanvas | undefined;
  try {
    bitmap = await createImageBitmap(source);
    checkCancelled(context.signal);
    dimensions(bitmap.width, bitmap.height);
    // EXIF orientation may swap dimensions; pixel count remains bounded after decoding.
    if (bitmap.width * bitmap.height !== info.width * info.height) { invalid('IMAGE_INVALID'); }
    canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const drawing = canvas.getContext('2d', {alpha: true});
    if (!drawing) { invalid('IMAGE_DECODE_UNAVAILABLE'); }
    drawing.drawImage(bitmap, 0, 0);
    const png = await canvas.convertToBlob({type: 'image/png'});
    checkCancelled(context.signal);
    return png;
  } catch(error) {
    if (error instanceof ProcessingError) { throw error; }
    return invalid('IMAGE_INVALID');
  } finally {
    bitmap?.close();
    if (canvas) { canvas.width = 0; canvas.height = 0; }
  }
}
