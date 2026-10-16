import {ProcessingContext, SeekableInput} from '../model/contract';
import {BinaryReader, fourCC, invalid} from '../io/binary';
import {CHUNK_BYTES} from '../io/bytes';

/** Ogg's non-reflected CRC-32 lookup table; checksum bytes are zeroed during calculation. */
const OGG_CRC = Uint32Array.from({length: 256}, (_, index) => {
  let value = index << 24;
  for (let bit = 0; bit < 8; bit++) { value = value & 0x80000000 ? (value << 1) ^ 0x04c11db7 : value << 1; }
  return value >>> 0;
});

/**
 * Checks framing before demuxing, bounding tag/packet metadata and refusing truncated or chained inputs.
 * @param {SeekableInput} input Original audio bytes.
 * @param {ProcessingContext} context Cancellation during structural reads.
 * @returns {Promise<void>} Valid supported framing; PCM/media payloads remain seekable.
 */
export async function inspectAudioStructure(input: SeekableInput, context: ProcessingContext): Promise<void> {
  const reader = new BinaryReader(input, context.signal);
  const view = (bytes: Uint8Array): DataView => new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const head = await reader.read(0, Math.min(12, input.size));
  const type = fourCC(head);
  if (type === 'RIFF') {
    if (head.length < 12 || fourCC(head, 8) !== 'WAVE' || view(head).getUint32(4, true) + 8 !== input.size) { invalid('AUDIO_INVALID'); }
    let offset = 12;
    let chunks = 0;
    let block = 0;
    let dataSize = -1;
    while (offset < input.size) {
      if (++chunks > 10000) { invalid('FORMAT_RESOURCE_LIMIT'); }
      const chunk = await reader.read(offset, 8);
      const size = view(chunk).getUint32(4, true);
      const name = fourCC(chunk);
      if (size > input.size - offset - 8) { invalid('AUDIO_INVALID'); }
      if (name === 'data') {
        if (dataSize >= 0) { invalid('AUDIO_TRACKS'); }
        dataSize = size;
      } else {
        if (size > CHUNK_BYTES) { invalid('FORMAT_RESOURCE_LIMIT'); }
        if (name === 'fmt ') {
          if (block || size < 16) { invalid('AUDIO_INVALID'); }
          block = view(await reader.read(offset + 8, 16)).getUint16(12, true);
        }
      }
      offset += 8 + size + (size & 1);
    }
    if (offset !== input.size || !block || dataSize <= 0 || dataSize % block) { invalid('AUDIO_INVALID'); }
  } else if (type === 'OggS') {
    let offset = 0;
    let serial: number | undefined;
    let sequence = 0;
    let packetSize = 0;
    let ended = false;
    while (offset < input.size) {
      if (sequence >= 1000000) { invalid('FORMAT_RESOURCE_LIMIT'); }
      const prefix = await reader.read(offset, 27);
      const header = view(prefix);
      if (fourCC(prefix) !== 'OggS' || prefix[4] !== 0 || ended || (prefix[5]! & ~7)) { invalid('AUDIO_INVALID'); }
      const flags = prefix[5]!;
      if (serial === undefined) {
        if (!(flags & 2)) { invalid('AUDIO_INVALID'); }
        serial = header.getUint32(14, true);
      } else if (flags & 2 || header.getUint32(14, true) !== serial) { invalid('AUDIO_TRACKS'); }
      if (header.getUint32(18, true) !== sequence++ || !!(flags & 1) !== (packetSize > 0)) { invalid('AUDIO_INVALID'); }
      const lacing = await reader.read(offset + 27, prefix[26]!);
      let payloadSize = 0;
      for (const length of lacing) {
        payloadSize += length;
        packetSize += length;
        if (packetSize > CHUNK_BYTES) { invalid('FORMAT_RESOURCE_LIMIT'); }
        if (length < 255) { packetSize = 0; }
      }
      const checksum = header.getUint32(22, true);
      const page = await reader.read(offset, 27 + lacing.length + payloadSize);
      let crc = 0;
      for (let index = 0; index < page.length; index++) {
        const byte = index >= 22 && index < 26 ? 0 : page[index]!;
        crc = (crc << 8) ^ OGG_CRC[((crc >>> 24) ^ byte) & 255]!;
      }
      if ((crc >>> 0) !== checksum) { invalid('AUDIO_INVALID'); }
      ended = !!(flags & 4);
      offset += page.length;
    }
    if (!ended || packetSize) { invalid('AUDIO_INVALID'); }
  } else if (String.fromCharCode(...head.subarray(0, 3)) === 'ID3') {
    if (head.length < 10 || head.subarray(6, 10).some(byte => byte & 128)) { invalid('AUDIO_INVALID'); }
    const size = head.subarray(6, 10).reduce((size, byte) => size * 128 + byte, 0);
    if (size > CHUNK_BYTES) { invalid('FORMAT_RESOURCE_LIMIT'); }
    if (size + 10 > input.size) { invalid('AUDIO_INVALID'); }
  }
}
