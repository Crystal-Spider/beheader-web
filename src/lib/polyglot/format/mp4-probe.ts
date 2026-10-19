import {ProcessingContext, SeekableInput} from '../model/contract';
import {BinaryReader, fourCC, invalid, uint32, uint64} from '../io/binary';
import {checkCancelled} from '../logic/diagnostic';

/** Positive codec/fragmentation evidence from at most 128 headers and 16 KiB of reads. */
export const MEDIA_PROBE_HEADERS = 128;
export const MEDIA_PROBE_BYTES = 16384;
/** Shared major brands supported by the full relocation inspector. */
export const MP4_BRANDS = ['isom', 'iso2', 'iso4', 'iso5', 'iso6', 'mp41', 'mp42', 'avc1', 'M4V ', 'M4A '];

/**
 * Seeks over encoded payloads. Reaching the budget defers remaining checks, without claiming validity.
 * @param {SeekableInput} input MP4 input.
 * @param {ProcessingContext} context Cancellation.
 * @returns {Promise<void>} Early known compatibility failures only.
 */
export async function probeMp4(input: SeekableInput, context: ProcessingContext): Promise<void> {
  const reader = new BinaryReader(input, context.signal);
  const stack = [{position: 0, end: input.size}];
  let bytes = 0; let headers = 0;
  while (stack.length && headers < MEDIA_PROBE_HEADERS && bytes + 32 <= MEDIA_PROBE_BYTES) {
    checkCancelled(context.signal);
    const frame = stack[stack.length - 1]!;
    if (frame.position >= frame.end) { stack.pop(); continue; }
    if (frame.end - frame.position < 8) { return; }
    const start = frame.position;
    const head = await reader.read(start, Math.min(32, frame.end - start));
    bytes += head.length; headers++;
    const short = uint32(head); const type = fourCC(head, 4); const header = short === 1 ? 16 : 8;
    if (short === 1 && head.length < 16) { return; }
    const size = short === 1 ? uint64(head, 8) : short || frame.end - start;
    if (size < header || size > frame.end - start) { return; }
    frame.position += size;
    if (['moof', 'mvex', 'mfra', 'sidx', 'ssix', 'tfra'].includes(type)) { invalid('MP4_FRAGMENTED'); }
    if (['pssh', 'senc', 'sinf', 'encv', 'enca'].includes(type)) { invalid('MP4_ENCRYPTED'); }
    if (type === 'ftyp' && size >= header + 8 && head.length >= header + 4 && !MP4_BRANDS.includes(fourCC(head, header))) { invalid('MP4_STRUCTURE', {reason: 'MEDIA_BRAND'}); }
    if (['moov', 'trak', 'mdia', 'minf', 'stbl'].includes(type)) { stack.push({position: start + header, end: start + size}); }
    if (type === 'stsd' && size >= header + 16 && head.length >= header + 16 && uint32(head, header + 4) === 1) {
      const codec = fourCC(head, header + 12);
      if (codec === 'encv' || codec === 'enca') { invalid('MP4_ENCRYPTED'); }
      const known: Readonly<Record<string, string>> = {hvc1: 'h265', hev1: 'h265', av01: 'av1', vp09: 'vp9', vp08: 'vp8', Opus: 'opus', '.mp3': 'mp3'};
      if (known[codec]) { invalid('MP4_CODEC', {reason: 'MEDIA_CODEC', codec: known[codec]}); }
      if (codec !== 'avc1' && codec !== 'mp4a') { invalid('MP4_STRUCTURE', {reason: 'MEDIA_BOX', feature: 'sample'}); }
    }
  }
}
