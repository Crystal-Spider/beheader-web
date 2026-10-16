import {execFileSync} from 'node:child_process';
import {Buffer} from 'node:buffer';
import {readFileSync, writeFileSync} from 'node:fs';

// Original synthetic media; regenerating requires FFmpeg with libx264 and AAC support.
execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-f', 'lavfi', '-i', 'testsrc2=size=64x48:rate=10:duration=1', '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=48000:duration=1', '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-profile:v', 'baseline', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', '-metadata', 'title=Beheader Web fixture', '-y', 'e2e/fixture/video-aac.mp4']);
execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', 'e2e/fixture/video-aac.mp4', '-map', '0:v', '-c', 'copy', '-y', 'e2e/fixture/video-tail-moov.mp4']);

const original = readFileSync('e2e/fixture/video-aac.mp4');
const containers = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl']);

/**
 * Builds a standards-valid co64 fixture independently of the application inspector/writer.
 * @param {Buffer} bytes Original box sequence.
 * @param {number} shift Growth before the original media data.
 * @returns {Buffer} Box sequence using 64-bit chunk offsets.
 */
function convert(bytes, shift) {
  const parts = [];
  for (let offset = 0; offset < bytes.length;) {
    const size = bytes.readUInt32BE(offset);
    const type = bytes.toString('latin1', offset + 4, offset + 8);
    const box = bytes.subarray(offset, offset + size);
    if (type === 'stco') {
      const count = box.readUInt32BE(12);
      const converted = Buffer.alloc(16 + 8 * count);
      converted.writeUInt32BE(converted.length);
      converted.write('co64', 4);
      converted.writeUInt32BE(count, 12);
      for (let index = 0; index < count; index++) { converted.writeBigUInt64BE(BigInt(box.readUInt32BE(16 + index * 4) + shift), 16 + index * 8); }
      parts.push(converted);
    } else if (containers.has(type)) {
      const children = convert(box.subarray(8), shift);
      const header = Buffer.from(box.subarray(0, 8));
      header.writeUInt32BE(8 + children.length);
      parts.push(Buffer.concat([header, children]));
    } else { parts.push(box); }
    offset += size;
  }
  return Buffer.concat(parts);
}

const growth = convert(original, 0).length - original.length;
writeFileSync('e2e/fixture/video-co64.mp4', convert(original, growth));
