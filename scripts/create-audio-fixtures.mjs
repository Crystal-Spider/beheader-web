import {spawnSync} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import process from 'node:process';

const formats = [
  ['audio.mp3', ['-c:a', 'libmp3lame', '-b:a', '128k']],
  ['audio-stereo.mp3', ['-af', 'pan=stereo|c0=c0|c1=0.5*c0', '-c:a', 'libmp3lame', '-q:a', '3']],
  ['audio-low-rate.mp3', ['-ar', '22050', '-c:a', 'libmp3lame', '-b:a', '48k']],
  ['audio.wav', ['-c:a', 'pcm_s16le']],
  ['audio-vorbis.ogg', ['-c:a', 'libvorbis', '-q:a', '5']],
  ['audio-opus.ogg', ['-c:a', 'libopus', '-b:a', '128k']],
  ['audio.m4a', ['-c:a', 'aac', '-b:a', '192k']],
  ['audio.aac', ['-c:a', 'aac', '-b:a', '192k', '-f', 'adts']],
  ['audio-stereo.wav', ['-ac', '2', '-c:a', 'pcm_s24le']],
  ['audio-float.wav', ['-ac', '2', '-c:a', 'pcm_f32le']],
  ['audio-surround.wav', ['-af', 'pan=5.1|FL=c0|FR=c0|FC=c0|LFE=c0|BL=c0|BR=c0', '-c:a', 'pcm_s16le']],
  ['audio-surround.m4a', ['-af', 'pan=5.1|FL=c0|FR=c0|FC=c0|LFE=c0|BL=c0|BR=c0', '-c:a', 'aac', '-b:a', '192k']],
  ['audio-long.mp3', ['-t', '60', '-c:a', 'libmp3lame', '-b:a', '128k']]
];

for (const [name, options] of formats) {
  const args = ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=48000:duration=2', ...options];
  // The cancellation fixture must run long enough to interrupt during active conversion.
  if (name === 'audio-long.mp3') { args[args.indexOf('sine=frequency=440:sample_rate=48000:duration=2')] = 'sine=frequency=440:sample_rate=48000:duration=60'; }
  args.push(`e2e/fixture/${name}`);
  const result = spawnSync('ffmpeg', args, {stdio: 'inherit'});
  if (result.status !== 0) { process.exit(result.status ?? 1); }
}
writeFileSync('e2e/fixture/audio-corrupt.wav', 'RIFF\x10\0\0\0WAVEbroken');
