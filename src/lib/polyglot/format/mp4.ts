import {ProcessingContext, SeekableInput} from '../model/contract';
import {BinaryReader, fourCC, invalid, uint32, uint64} from '../io/binary';

/** Absolute box positions are retained so original bytes can be copied and patched. */
export interface Mp4Box {
  readonly type: string;
  readonly start: number;
  readonly size: number;
  readonly header: number;
}

/** Chunk tables are read and repaired in bounded batches, never copied into one large array. */
export interface ChunkTable {
  readonly start: number;
  readonly count: number;
  readonly width: 4 | 8;
}

/** Validated relocation information; all payload and playback boxes stay encoded as supplied. */
export interface Mp4Info {
  readonly ftyp: Mp4Box;
  readonly mdats: readonly Mp4Box[];
  readonly tables: readonly ChunkTable[];
  readonly audio: boolean;
}

/** Structural work limits protect metadata parsing without buffering media payloads. */
const MAX_BOXES = 100000;
const MAX_ENTRIES = 4000000;

/**
 * Walks only declared boxes within a parent, including large-size and final mdat boxes.
 * @param {BinaryReader} reader Exact bounded reader.
 * @param {number} start First child position.
 * @param {number} end Parent end position.
 * @returns {Promise<Mp4Box[]>} Bounded structural index.
 */
export async function readBoxes(reader: BinaryReader, start: number, end: number): Promise<Mp4Box[]> {
  const boxes: Mp4Box[] = [];
  while (start < end) {
    if (end - start < 8) { invalid('MP4_INVALID'); }
    const bytes = await reader.read(start, Math.min(16, end - start));
    const type = fourCC(bytes, 4);
    const short = uint32(bytes);
    const header = short === 1 ? 16 : 8;
    const size = short === 1 ? uint64(bytes, 8) : short === 0 ? end - start : short;
    if (size < header || size > end - start || (short === 0 && type !== 'mdat')) { invalid('MP4_INVALID'); }
    boxes.push({type, start, size, header});
    if (boxes.length > MAX_BOXES) { invalid('FORMAT_RESOURCE_LIMIT'); }
    start += size;
  }
  return boxes;
}

/**
 * Finds a required single child, rejecting absent or duplicate structures.
 * @param {readonly Mp4Box[]} boxes Parent's children.
 * @param {string} type Required type.
 * @returns {Mp4Box} Single required box.
 */
function single(boxes: readonly Mp4Box[], type: string): Mp4Box {
  const found = boxes.filter(box => box.type === type);
  if (found.length !== 1 || !found[0]) { invalid('MP4_INVALID'); }
  return found[0];
}

/**
 * Rejects relocation-sensitive/unknown structures rather than preserving invalid offsets.
 * @param {readonly Mp4Box[]} boxes Child boxes.
 * @param {readonly string[]} allowed Supported non-fragmented structures.
 */
function allow(boxes: readonly Mp4Box[], allowed: readonly string[]): void {
  for (const box of boxes) {
    if (['moof', 'mvex', 'mfra', 'sidx', 'ssix', 'tfra'].includes(box.type)) { invalid('MP4_FRAGMENTED'); }
    if (['pssh', 'senc', 'saiz', 'saio', 'sinf', 'encv', 'enca'].includes(box.type)) { invalid('MP4_ENCRYPTED'); }
    if (!allowed.includes(box.type)) { invalid('MP4_STRUCTURE'); }
  }
}

/**
 * Reads a full-box payload prefix, checking size and version/flags before table use.
 * @param {BinaryReader} reader Exact bounded reader.
 * @param {Mp4Box} box Full box.
 * @param {number} length Prefix bytes, including version/flags.
 * @returns {Promise<Uint8Array<ArrayBuffer>>} Validated prefix.
 */
async function full(reader: BinaryReader, box: Mp4Box, length: number): Promise<Uint8Array<ArrayBuffer>> {
  if (box.size < box.header + length) { invalid('MP4_INVALID'); }
  return reader.read(box.start + box.header, length);
}

/**
 * Checks fixed playback headers and time bases before retaining their original bytes.
 * @param {BinaryReader} reader Exact bounded reader.
 * @param {Mp4Box} box Movie, track, or media header.
 * @returns {Promise<void>} Completion of header validation.
 */
async function inspectHeader(reader: BinaryReader, box: Mp4Box): Promise<void> {
  const prefix = await full(reader, box, 4);
  const version = prefix[0];
  if (version !== 0 && version !== 1) { invalid('MP4_STRUCTURE'); }
  const minimum = box.type === 'mvhd' ? (version ? 112 : 100) : box.type === 'tkhd' ? (version ? 96 : 84) : (version ? 36 : 24);
  if (box.size !== box.header + minimum) { invalid('MP4_INVALID'); }
  if (box.type !== 'tkhd') {
    const data = await full(reader, box, version ? 24 : 16);
    if (!uint32(data, version ? 20 : 12)) { invalid('MP4_INVALID'); }
  }
}

/**
 * Allows ordinary movie/track metadata while refusing item-location structures with other offsets.
 * @param {BinaryReader} reader Exact bounded reader.
 * @param {Mp4Box} box User-data or metadata box.
 * @returns {Promise<void>} Completion of supported metadata checks.
 */
async function inspectMetadata(reader: BinaryReader, box: Mp4Box): Promise<void> {
  if (box.type === 'meta') {
    if (uint32(await full(reader, box, 4))) { invalid('MP4_STRUCTURE'); }
    const children = await readBoxes(reader, box.start + box.header + 4, box.start + box.size);
    allow(children, ['hdlr', 'ilst', 'keys', 'free']);
    const handler = await full(reader, single(children, 'hdlr'), 24);
    if (!['mdir', 'mdta'].includes(fourCC(handler, 8))) { invalid('MP4_STRUCTURE'); }
  } else {
    const children = await readBoxes(reader, box.start + box.header, box.start + box.size);
    allow(children, ['meta', 'chpl', 'cprt', 'name', '©nam', '©ART', '©alb', '©too', '©cmt', '©day', '©gen', 'free']);
    for (const child of children.filter(child => child.type === 'meta')) { await inspectMetadata(reader, child); }
  }
}

/**
 * Checks edit-list sizes and rates; edit timings remain unchanged during relocation.
 * @param {BinaryReader} reader Exact bounded reader.
 * @param {Mp4Box} edts Edit container.
 * @returns {Promise<void>} Completion of edit-list validation.
 */
async function inspectEdits(reader: BinaryReader, edts: Mp4Box): Promise<void> {
  const children = await readBoxes(reader, edts.start + edts.header, edts.start + edts.size);
  allow(children, ['elst']);
  const elst = single(children, 'elst');
  const prefix = await full(reader, elst, 8);
  if (prefix[0] !== 0 && prefix[0] !== 1) { invalid('MP4_STRUCTURE'); }
  const count = uint32(prefix, 4);
  const width = prefix[0] === 0 ? 12 : 20;
  tableSize(elst, 8, count, width);
  for (let index = 0; index < count; index++) {
    const data = await reader.read(elst.start + elst.header + 8 + index * width, width);
    if (uint32(data, width - 4) !== 0x00010000) { invalid('MP4_STRUCTURE'); }
  }
}

/** Cached bounded access to integer tables, including arbitrarily distant sample entries. */
class NumberTable {
  /** @type {Uint8Array<ArrayBuffer>} */
  private cache = new Uint8Array(0);
  /** @type {number} */
  private first = -1;

  /**
   * @param {BinaryReader} reader Exact bounded reader.
   * @param {number} start First entry position.
   * @param {number} count Entry count.
   * @param {4 | 8} width Byte width.
   */
  public constructor(private readonly reader: BinaryReader, private readonly start: number, private readonly count: number, private readonly width: 4 | 8 = 4) {}

  /**
   * @param {number} index Entry index.
   * @returns {Promise<number>} Exactly representable unsigned value.
   */
  public async get(index: number): Promise<number> {
    if (!Number.isSafeInteger(index) || index < 0 || index >= this.count) { invalid('MP4_INVALID'); }
    if (index < this.first || index >= this.first + this.cache.length / this.width) {
      this.first = index;
      this.cache = await this.reader.read(this.start + index * this.width, Math.min(16384, this.count - index) * this.width);
    }
    const offset = (index - this.first) * this.width;
    return this.width === 4 ? uint32(this.cache, offset) : uint64(this.cache, offset);
  }
}

/**
 * Confirms table byte count and work bounds before reading any entries.
 * @param {Mp4Box} box Table box.
 * @param {number} prefix Bytes before the entries, excluding box header.
 * @param {number} count Declared entries.
 * @param {number} width Bytes per entry.
 */
function tableSize(box: Mp4Box, prefix: number, count: number, width: number): void {
  if (count > MAX_ENTRIES) { invalid('FORMAT_RESOURCE_LIMIT'); }
  if (box.size !== box.header + prefix + count * width) { invalid('MP4_INVALID'); }
}

/**
 * Parses MPEG-4 variable-length descriptor sizes within a bounded esds box.
 * @param {Uint8Array} bytes Descriptor bytes.
 * @param {number} start Descriptor position.
 * @param {number} end Parent descriptor boundary.
 * @returns {{tag: number; start: number; end: number}} Descriptor payload range.
 */
function descriptor(bytes: Uint8Array, start: number, end: number): {tag: number; start: number; end: number} {
  if (start >= end) { invalid('MP4_INVALID'); }
  const tag = bytes[start++]!;
  let size = 0;
  for (let index = 0; index < 4; index++) {
    if (start >= end) { invalid('MP4_INVALID'); }
    const byte = bytes[start++]!;
    size = size * 128 + (byte & 127);
    if (!(byte & 128)) {
      if (size > end - start) { invalid('MP4_INVALID'); }
      return {tag, start, end: start + size};
    }
  }
  return invalid('MP4_INVALID');
}

/**
 * Accepts AAC-LC with explicit MPEG-4 audio object type and self-contained configuration.
 * @param {BinaryReader} reader Exact bounded reader.
 * @param {Mp4Box} box Elementary-stream descriptor.
 * @returns {Promise<void>} Completion of codec validation.
 */
async function inspectAac(reader: BinaryReader, box: Mp4Box): Promise<void> {
  if (box.size > 65536) { invalid('FORMAT_RESOURCE_LIMIT'); }
  const bytes = await full(reader, box, box.size - box.header);
  if (uint32(bytes) !== 0) { invalid('MP4_CODEC'); }
  const es = descriptor(bytes, 4, bytes.length);
  if (es.tag !== 3 || es.end - es.start < 3) { invalid('MP4_CODEC'); }
  const flags = bytes[es.start + 2]!;
  let cursor = es.start + 3;
  if (flags & 128) { cursor += 2; }
  if (flags & 64) { cursor += 1 + (bytes[cursor] ?? es.end); }
  if (flags & 32) { cursor += 2; }
  const decoder = descriptor(bytes, cursor, es.end);
  if (decoder.tag !== 4 || decoder.end - decoder.start < 13 || bytes[decoder.start] !== 0x40 || (bytes[decoder.start + 1]! >> 2) !== 5) { invalid('MP4_CODEC'); }
  const config = descriptor(bytes, decoder.start + 13, decoder.end);
  if (config.tag !== 5 || config.end - config.start < 2) { invalid('MP4_CODEC'); }
  const audioType = bytes[config.start]! >> 3;
  const frequency = ((bytes[config.start]! & 7) << 1) | (bytes[config.start + 1]! >> 7);
  const channels = (bytes[config.start + 1]! >> 3) & 15;
  if (audioType !== 2 || frequency > 12 || channels < 1 || channels > 2) { invalid('MP4_CODEC'); }
  if (bytes[config.start + 1]! & 7) { invalid('MP4_CODEC'); }
  if (config.end - config.start >= 5) {
    const sync = (bytes[config.start + 2]! << 3) | (bytes[config.start + 3]! >> 5);
    if (sync === 0x2b7 && (bytes[config.start + 3]! & 31) === 5 && (bytes[config.start + 4]! & 128)) { invalid('MP4_CODEC'); }
  }
}

/**
 * Validates a single H.264/AAC sample description and its decoder initialization data.
 * @param {BinaryReader} reader Exact bounded reader.
 * @param {Mp4Box} stsd Sample description box.
 * @param {string} handler Track handler type.
 * @returns {Promise<void>} Completion of codec/entry checks.
 */
async function inspectDescription(reader: BinaryReader, stsd: Mp4Box, handler: string): Promise<void> {
  const prefix = await full(reader, stsd, 8);
  if (uint32(prefix) || uint32(prefix, 4) !== 1) { invalid('MP4_CODEC'); }
  const entries = await readBoxes(reader, stsd.start + stsd.header + 8, stsd.start + stsd.size);
  if (entries.length !== 1 || !entries[0]) { invalid('MP4_INVALID'); }
  const entry = entries[0];
  if (['encv', 'enca'].includes(entry.type)) { invalid('MP4_ENCRYPTED'); }
  if (entry.type !== (handler === 'vide' ? 'avc1' : 'mp4a')) { invalid('MP4_CODEC'); }
  const fixed = handler === 'vide' ? 78 : 28;
  if (entry.size < entry.header + fixed) { invalid('MP4_INVALID'); }
  const data = await reader.read(entry.start + entry.header, fixed);
  if (data[6] !== 0 || data[7] !== 1) { invalid('MP4_STRUCTURE'); }
  if (handler === 'soun' && (data[8] !== 0 || data[9] !== 0)) { invalid('MP4_CODEC'); }
  const children = await readBoxes(reader, entry.start + entry.header + fixed, entry.start + entry.size);
  allow(children, handler === 'vide' ? ['avcC', 'pasp', 'btrt', 'colr', 'clap', 'fiel'] : ['esds', 'btrt']);
  if (handler === 'soun') { await inspectAac(reader, single(children, 'esds')); return; }
  const avcc = single(children, 'avcC');
  if (avcc.size > 65536) { invalid('FORMAT_RESOURCE_LIMIT'); }
  const config = await reader.read(avcc.start + avcc.header, avcc.size - avcc.header);
  if (config.length < 7 || config[0] !== 1 || (config[4]! & 0xfc) !== 0xfc || (config[5]! & 0xe0) !== 0xe0
    || (config[4]! & 3) === 2 || !(config[5]! & 31)) { invalid('MP4_CODEC'); }
  let cursor = 6;
  for (let type = 0; type < 2; type++) {
    const count = type === 0 ? config[5]! & 31 : config[cursor++] ?? 0;
    if (!count) { invalid('MP4_CODEC'); }
    for (let index = 0; index < count; index++) {
      if (cursor + 2 > config.length) { invalid('MP4_INVALID'); }
      const size = (config[cursor]! << 8) | config[cursor + 1]!;
      cursor += 2;
      if (!size || size > config.length - cursor) { invalid('MP4_INVALID'); }
      if ((config[cursor]! & 31) !== (type === 0 ? 7 : 8)) { invalid('MP4_CODEC'); }
      cursor += size;
    }
  }
}

/**
 * Validates sample counts/chunk spans and every chunk's containment in an mdat payload.
 * @param {BinaryReader} reader Exact bounded reader.
 * @param {readonly Mp4Box[]} boxes Sample-table children.
 * @param {readonly Mp4Box[]} mdats Original payload ranges.
 * @returns {Promise<ChunkTable>} Bounded relocation table descriptor.
 */
async function inspectSamples(reader: BinaryReader, boxes: readonly Mp4Box[], mdats: readonly Mp4Box[]): Promise<ChunkTable> {
  const offsets = boxes.filter(box => box.type === 'stco' || box.type === 'co64');
  if (offsets.length !== 1 || !offsets[0]) { invalid('MP4_INVALID'); }
  const offsetBox = offsets[0];
  const offsetPrefix = await full(reader, offsetBox, 8);
  if (uint32(offsetPrefix)) { invalid('MP4_INVALID'); }
  const count = uint32(offsetPrefix, 4);
  const width = offsetBox.type === 'co64' ? 8 : 4;
  tableSize(offsetBox, 8, count, width);
  if (!count) { invalid('MP4_INVALID'); }
  const table: ChunkTable = {start: offsetBox.start + offsetBox.header + 8, count, width};
  const chunks = new NumberTable(reader, table.start, count, width);
  const stsz = single(boxes, 'stsz');
  const sizes = await full(reader, stsz, 12);
  if (uint32(sizes)) { invalid('MP4_INVALID'); }
  const constant = uint32(sizes, 4);
  const samples = uint32(sizes, 8);
  if (!samples || samples > MAX_ENTRIES) { invalid('FORMAT_RESOURCE_LIMIT'); }
  tableSize(stsz, 12, constant ? 0 : samples, 4);
  const sampleSizes = new NumberTable(reader, stsz.start + stsz.header + 12, samples);
  const stsc = single(boxes, 'stsc');
  const mapping = await full(reader, stsc, 8);
  const runs = uint32(mapping, 4);
  if (uint32(mapping) || !runs || runs > count) { invalid('MP4_INVALID'); }
  tableSize(stsc, 8, runs, 12);
  const mappings = new NumberTable(reader, stsc.start + stsc.header + 8, runs * 3);
  let sample = 0;
  let chunk = 1;
  for (let run = 0; run < runs; run++) {
    const first = await mappings.get(run * 3);
    const perChunk = await mappings.get(run * 3 + 1);
    const description = await mappings.get(run * 3 + 2);
    const next = run + 1 === runs ? count + 1 : await mappings.get((run + 1) * 3);
    if (first !== chunk || next <= first || next > count + 1 || !perChunk || description !== 1) { invalid('MP4_INVALID'); }
    for (; chunk < next; chunk++) {
      if (perChunk > samples - sample) { invalid('MP4_INVALID'); }
      let length = constant * perChunk;
      if (!constant) {
        for (let index = 0; index < perChunk; index++) { length += await sampleSizes.get(sample + index); }
      }
      sample += perChunk;
      const offset = await chunks.get(chunk - 1);
      if (!length || !mdats.some(mdat => offset >= mdat.start + mdat.header && length <= mdat.start + mdat.size - offset)) { invalid('MP4_INVALID'); }
    }
  }
  if (sample !== samples) { invalid('MP4_INVALID'); }
  const dependency = boxes.filter(box => box.type === 'sdtp');
  if (dependency.length > 1) { invalid('MP4_INVALID'); }
  if (dependency[0] && (dependency[0].size !== dependency[0].header + 4 + samples || uint32(await full(reader, dependency[0], 4)))) { invalid('MP4_INVALID'); }
  for (const groups of boxes.filter(box => box.type === 'sgpd' || box.type === 'sbgp')) {
    const prefix = await full(reader, groups, 8);
    if (fourCC(prefix, 4) === 'seig') { invalid('MP4_ENCRYPTED'); }
  }
  const stts = single(boxes, 'stts');
  const timing = await full(reader, stts, 8);
  const times = uint32(timing, 4);
  if (uint32(timing)) { invalid('MP4_INVALID'); }
  tableSize(stts, 8, times, 8);
  const durations = new NumberTable(reader, stts.start + stts.header + 8, times * 2);
  let timed = 0;
  for (let index = 0; index < times; index++) {
    const entries = await durations.get(index * 2);
    if (!entries || !(await durations.get(index * 2 + 1))) { invalid('MP4_INVALID'); }
    timed += entries;
  }
  if (timed !== samples) { invalid('MP4_INVALID'); }
  for (const optional of boxes.filter(box => box.type === 'ctts' || box.type === 'stss')) {
    const prefix = await full(reader, optional, 8);
    const version = prefix[0];
    if ((optional.type === 'stss' && uint32(prefix)) || (optional.type === 'ctts' && ((version !== 0 && version !== 1) || (uint32(prefix) & 0xffffff)))) { invalid('MP4_INVALID'); }
    const entries = uint32(prefix, 4);
    tableSize(optional, 8, entries, optional.type === 'ctts' ? 8 : 4);
    const values = new NumberTable(reader, optional.start + optional.header + 8, entries * (optional.type === 'ctts' ? 2 : 1));
    let previous = 0;
    for (let index = 0; index < entries; index++) {
      const value = await values.get(index * (optional.type === 'ctts' ? 2 : 1));
      if (!value || (optional.type === 'stss' && (value <= previous || value > samples))) { invalid('MP4_INVALID'); }
      previous = optional.type === 'ctts' ? previous + value : value;
    }
    if (optional.type === 'ctts' && previous !== samples) { invalid('MP4_INVALID'); }
  }
  return table;
}

/**
 * Confirms dref points to this file; external data cannot survive a local composition.
 * @param {BinaryReader} reader Exact bounded reader.
 * @param {Mp4Box} dinf Data information container.
 * @returns {Promise<void>} Completion of self-contained reference checks.
 */
async function inspectReferences(reader: BinaryReader, dinf: Mp4Box): Promise<void> {
  const children = await readBoxes(reader, dinf.start + dinf.header, dinf.start + dinf.size);
  allow(children, ['dref']);
  const dref = single(children, 'dref');
  const prefix = await full(reader, dref, 8);
  if (uint32(prefix) || uint32(prefix, 4) !== 1) { invalid('MP4_STRUCTURE'); }
  const urls = await readBoxes(reader, dref.start + dref.header + 8, dref.start + dref.size);
  const url = single(urls, 'url ');
  if (urls.length !== 1 || url.size !== url.header + 4 || uint32(await full(reader, url, 4)) !== 1) { invalid('MP4_STRUCTURE'); }
}

/**
 * Validates the supported non-fragmented H.264 MP4 subset without decoding/re-encoding it.
 * @param {SeekableInput} input Original MP4.
 * @param {ProcessingContext} context Cancellation and progress.
 * @returns {Promise<Mp4Info>} Checked payload ranges and chunk tables for relocation.
 */
export async function inspectMp4(input: SeekableInput, context: ProcessingContext): Promise<Mp4Info> {
  const reader = new BinaryReader(input, context.signal);
  const top = await readBoxes(reader, 0, input.size);
  allow(top, ['ftyp', 'moov', 'mdat', 'free', 'skip', 'wide']);
  const ftyp = single(top, 'ftyp');
  if (ftyp.start !== 0 || ftyp.size < ftyp.header + 8 || (ftyp.size - ftyp.header) % 4) { invalid('MP4_STRUCTURE'); }
  const brand = fourCC(await reader.read(ftyp.start + ftyp.header, 4));
  if (!['isom', 'iso2', 'iso4', 'iso5', 'iso6', 'mp41', 'mp42', 'avc1', 'M4V '].includes(brand)) { invalid('MP4_STRUCTURE'); }
  const mdats = top.filter(box => box.type === 'mdat');
  if (!mdats.length) { invalid('MP4_INVALID'); }
  const moov = single(top, 'moov');
  const movie = await readBoxes(reader, moov.start + moov.header, moov.start + moov.size);
  allow(movie, ['mvhd', 'trak', 'udta', 'meta']);
  await inspectHeader(reader, single(movie, 'mvhd'));
  for (const box of movie.filter(box => box.type === 'udta' || box.type === 'meta')) { await inspectMetadata(reader, box); }
  const tracks = movie.filter(box => box.type === 'trak');
  if (!tracks.length || tracks.length > 2) { invalid('MP4_TRACKS'); }
  const tables: ChunkTable[] = [];
  const handlers: string[] = [];
  for (const track of tracks) {
    const children = await readBoxes(reader, track.start + track.header, track.start + track.size);
    allow(children, ['tkhd', 'edts', 'mdia', 'udta']);
    await inspectHeader(reader, single(children, 'tkhd'));
    for (const box of children.filter(box => box.type === 'udta')) { await inspectMetadata(reader, box); }
    const edits = children.filter(box => box.type === 'edts');
    if (edits.length > 1) { invalid('MP4_INVALID'); }
    if (edits[0]) { await inspectEdits(reader, edits[0]); }
    const mdia = single(children, 'mdia');
    const media = await readBoxes(reader, mdia.start + mdia.header, mdia.start + mdia.size);
    allow(media, ['mdhd', 'hdlr', 'minf']);
    await inspectHeader(reader, single(media, 'mdhd'));
    const hdlr = await full(reader, single(media, 'hdlr'), 24);
    if (uint32(hdlr)) { invalid('MP4_INVALID'); }
    const handler = fourCC(hdlr, 8);
    if (!['vide', 'soun'].includes(handler) || handlers.includes(handler)) { invalid('MP4_TRACKS'); }
    handlers.push(handler);
    const minf = single(media, 'minf');
    const info = await readBoxes(reader, minf.start + minf.header, minf.start + minf.size);
    allow(info, ['vmhd', 'smhd', 'dinf', 'stbl']);
    const mediaHeader = single(info, handler === 'vide' ? 'vmhd' : 'smhd');
    if (info.some(box => box.type === (handler === 'vide' ? 'smhd' : 'vmhd'))
      || mediaHeader.size !== mediaHeader.header + (handler === 'vide' ? 12 : 8)) { invalid('MP4_INVALID'); }
    await inspectReferences(reader, single(info, 'dinf'));
    const stbl = single(info, 'stbl');
    const samples = await readBoxes(reader, stbl.start + stbl.header, stbl.start + stbl.size);
    allow(samples, ['stsd', 'stts', 'ctts', 'stsc', 'stsz', 'stco', 'co64', 'stss', 'sdtp', 'sgpd', 'sbgp', 'free']);
    await inspectDescription(reader, single(samples, 'stsd'), handler);
    tables.push(await inspectSamples(reader, samples, mdats));
  }
  if (!handlers.includes('vide')) { invalid('IMPLEMENTATION_UNAVAILABLE'); }
  return {ftyp, mdats, tables, audio: handlers.includes('soun')};
}
