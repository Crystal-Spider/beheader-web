# Milestone 6: common audio conversion

Completed on 2026-10-16; commit and push authorized after successful checks. Milestone 5 was committed and pushed as `3342bcf`. `AGENTS.md` remains local and untracked. Stop before Milestone 7.

## Deliverables

- MP3, supported PCM WAV, Ogg Vorbis/Opus, and compatible AAC audio now occupy the existing single media slot. Separate simultaneous audio and video inputs remain unsupported; a video's existing soundtrack is permitted.
- Mediabunny 1.61.6 inspects supported audio and checks decoding capability before generation. Its pinned `@mediabunny/aac-encoder` 1.61.6 extension supplies a focused, locally bundled AAC-LC WASM encoder, with an initial target bitrate of 192 kb/s. It is loaded only when encoding is necessary.
- Compatible audio-only MP4/M4A follows the existing encoded MP4 relocation path. Compatible ADTS AAC-LC is transmuxed without changing its AAC access units. Other supported audio is decoded and converted to AAC-LC, preserving the channel count.
- Conversion produces a non-fragmented, file-backed MP4 intermediate inside the job workspace, then uses the existing composition and offset-repair implementation. Its intermediate is discarded after copying; cancellation and failures dispose the entire job workspace. Output descriptions offer `.m4a` and `.mp4` for identical artifact bytes.
- Seekable reads, a bounded cache, and positioned backpressured writes avoid a complete large payload in one `ArrayBuffer`. Conversion progress measures processed media time in microseconds. Stable audio diagnostics distinguish malformed structures, unsupported tracks/codecs/channels, missing decoding capability, and conversion failures.
- The availability model now enables audio, preserving shared-slot audio/video exclusion, role validation outside picker filters, and removal/replacement transitions. The shell's unfinished picker/generation controls remain disabled until Milestone 8.

The encoder extension internally creates its own bundled helper worker. The application's dedicated processing worker still owns the job, media objects, streams, and workspace; none enter NgRx. WASM and helper code are bundled locally, with no CDN or remote processing. Offline reopening/caching remains Milestone 9 work. No content preview or uploaded-content execution was introduced.

## Validation environment and audio matrix

| Tool/consumer | Verified version and use |
| --- | --- |
| Node / pnpm | nvm-selected Node 24.19.0; pnpm 11.25.0 through Corepack; frozen lockfile |
| Playwright | 1.64.1; production assets under `/beheader-web/` on Windows |
| Chromium | 156.0.8078.4; full pipeline, playback, cancellation, and failure checks |
| Firefox | 157.0; full audio pipeline, playback, cancellation, and failure checks |
| Windows WebKit runner | 27.2; runtime capability probe only; functional audio flows explicitly skipped after OPFS fails |
| Independent readers | FFmpeg/FFprobe 2025-01-27 git-959b799c8d; Pillow 12.0.0; Poppler 26.07.0; Python standard-library ZIP reader |

Each positive row below generates audio + HTML and plays the resulting complete audio track in Chromium and Firefox. The final row also includes image, PDF, and archive inputs. Fixtures are original synthetic 440 Hz tones at 48 kHz, approximately two seconds long; their generation script and provenance are checked in.

| Fixture | Channels | Chromium | Firefox | Windows WebKit / actual Safari |
| --- | --- | --- | --- | --- |
| MP3 | 1 | Pass | Pass | Unverified |
| PCM WAV, signed 16-bit | 1 | Pass | Pass | Unverified |
| Ogg Vorbis | 1 | Pass | Pass | Unverified |
| Ogg Opus | 1 | Pass | Pass | Unverified |
| AAC-LC M4A | 1 | Pass; encoded audio preserved | Pass; encoded audio preserved | Unverified |
| AAC-LC ADTS | 1 | Pass; encoded audio preserved | Pass; encoded audio preserved | Unverified |
| PCM WAV, signed 24-bit | 2 | Pass | Pass | Unverified |
| PCM WAV, float32 | 2 | Pass | Pass | Unverified |
| PCM WAV, signed 16-bit, 5.1 | 6 | Pass | Pass | Unverified |
| AAC-LC M4A, 5.1 | 6 | Pass; encoded audio preserved | Pass; encoded audio preserved | Unverified |
| MP3 with all five families | 1 | Pass | Pass | Unverified |

Independent acceptance passed for all 22 generated audio outputs: AAC-LC profile, expected sample rate/channel count, duration within 150 ms of the source, complete decoding to finite PCM, and the retained dominant 440 Hz tone. Compatible M4A/ADTS access units match the source exactly after independent extraction. Both all-family outputs also retain the image's dimensions/alpha, exact PDF rendering, and archive contents/serialized offsets. This verifies useful behavior for these fixtures and consumers, rather than identical encoded bytes for lossy conversions or universal format compatibility.

### Reviewed WebKit limitation

The Windows WebKit worker reports no `AudioDecoder` or `AudioEncoder`, and `navigator.storage.getDirectory()` throws `UnknownError` before generation can allocate a workspace. The production pipeline reports `STORAGE_UNAVAILABLE` without replacing it with a second cleanup error. The audio suite probes storage at runtime and explicitly skips its 16 functional WebKit flows on this failure; a separate test records the real worker capabilities. Chromium/Firefox do not use this skip.

The user reviewed this evidence and chose to keep the current pipeline, with real Safari verification in Milestone 10. These results do not establish a Safari/iOS failure or a Safari/iOS pass. Actual Safari/iOS, Android, and other devices remain unverified. A broader decoder fallback alone would not fix the runner's storage failure.

The ffmpeg.wasm fallback was evaluated against the observed gap at the documentation/API level, without installation or performance claims. Its standard full-file transfer API and documented 2 GB WebAssembly memory limit would require additional work to fit this project's bounded-I/O requirements; it does not resolve unavailable OPFS. No broader fallback was added under the reviewed decision. If actual Safari testing exposes a codec gap, revisit it using the failing fixture and available storage behavior.

Relevant primary documentation: [Mediabunny AAC extension](https://mediabunny.dev/guide/extensions/aac-encoder), [supported formats/codecs](https://mediabunny.dev/guide/supported-formats-and-codecs), [ffmpeg.wasm FAQ](https://ffmpegwasm.netlify.app/docs/faq/), and [Playwright WebKit](https://playwright.dev/docs/browsers#webkit). Runtime results above come from this repository's tests, rather than inferred browser support tables.

## Supported structures and resource bounds

| Area | Current scope and bounds |
| --- | --- |
| Audio containers | MP3, RIFF WAVE, single logical Ogg Vorbis/Opus stream, ADTS AAC-LC, and compatible classic AAC-LC MP4/M4A |
| Track count | Exactly one audio track, without independent video/other tracks in the audio-conversion path; video retains Milestone 4's separate compatible-MP4 path |
| Channels | 1, 2, 3, 4, 5, 6, or 8 with explicit AAC channel configuration; mono, stereo, and 5.1 have fixtures; other admitted counts remain unverified |
| Channel exclusions | Seven-channel/PCE layouts are outside the current classic AAC description scope and fail explicitly; no automatic downmix |
| Sample rates | Validated input range 7,350–192,000 Hz; preserve AAC-standard rates through 96 kHz, otherwise normalize PCM to 48 kHz; fixture acceptance currently covers 48 kHz |
| Decoding | PCM uses Mediabunny's supported decoder; MP3/Vorbis/Opus and other required decoding depend on the actual runtime/configuration; missing support reports `AUDIO_DECODE_UNAVAILABLE` |
| Copying | Compatible AAC-LC ADTS is copied into MP4; compatible non-fragmented audio MP4 is directly relocated; encrypted, fragmented, unsupported-description, or malformed MP4 remains rejected |
| Input/output | 1 GiB per input, 2 GiB total input; 2 GiB per intermediate/final output, enforced during writes; no guarantee of capacity on every device |
| Media I/O | Each source read/output write at most 1 MiB; source cache 2 MiB; positioned target uses up to two buffered 1 MiB chunks; file-backed MP4 with `fastStart: false` |
| Duration/resource estimate | Before conversion, estimated 192 kb/s payload must fit 2 GiB and estimated AAC frames must not exceed 4,000,000; actual output limits remain authoritative |
| WAV validation | Declared RIFF length, chunk boundaries, one data chunk, complete PCM frames; at most 10,000 chunks, non-data chunks at most 1 MiB; data payload skipped during structural inspection |
| Ogg validation | Complete pages, CRC, stream serial/sequence, continuation, BOS/EOS; reject chaining/multiplexing, truncation, or missing EOS; at most 1,000,000 pages and 1 MiB per packet |
| MP3 tags | Bounded syncsafe ID3 size, at most 1 MiB, within the supplied input |

These are conservative implementation/resource limits. They do not promise every WAV encoding or every codec/container variant. Metadata checks cannot predict all decoder allocations or device memory exhaustion. Synthetic 1 GiB PCM inspection verifies bounded reads without allocating its complete payload; actual maximum-size audio conversion and broader quota/storage policy remain Milestone 9 acceptance work.

## Checks and reproduction

The final exit checks passed:

- Frozen installation, ESLint with zero warnings, and strict application/tooling/worker type checks.
- 102 unit tests, including audio structure/capability metadata, a synthetic 1 GiB PCM source, positioned media writes/patches, range/quota/cancellation guards, and preservation of unavailable-storage diagnostics.
- All 66 existing Chromium flows, retaining Milestone 4/5 behavior and the 26-combination matrix.
- 32 functional audio flows across Chromium/Firefox, including the 22 positive outputs, cancellation before/during/after conversion, cleanup and retry, malformed input, bypassed audio/video role conflicts, and injected conversion storage exhaustion.
- Three browser capability probes passed; 16 Windows WebKit functional flows were explicitly skipped under the reviewed runtime limitation. These probes are diagnostics, not successful pipeline acceptance.
- Independent checks for all 22 audio outputs, all 26 previous family combinations, both archive orders, and all seven previous image/media outputs.
- Production build into `docs/`: 339.03 kB initial bundle (92.32 kB estimated transfer); lazy focused encoder chunk 992.16 kB (203.00 kB estimated transfer). Processing dependencies and notices are local assets.

```sh
pnpm install --frozen-lockfile
pnpm exec playwright install chromium firefox webkit
pnpm check
python scripts/verify-audio-fixtures.py
python scripts/verify-combinations.py
python scripts/verify-polyglot-fixtures.py
```

Use `pnpm test:audio` for the audio matrix alone. Regenerate the synthetic audio fixtures with `node scripts/create-audio-fixtures.mjs` using a developer FFmpeg installation. Independent validation also requires developer installations of Pillow and Poppler; native FFmpeg, Python, and Poppler are not application dependencies. The focused AAC encoder does include FFmpeg code compiled to WASM; it is not the full ffmpeg.wasm application.

Ignored `test-results/audio/` contains generated outputs, browser versions, and worker capability records; `test-results/audio-validation.json` records independent audio acceptance. The separate `test-results/audio-run/` Playwright output directory preserves the earlier combination artifacts for independent checks. Test harnesses, audio fixtures, and generated test outputs are not public application assets.

## Attribution and next boundary

`NOTICE.md` and local assets under `public/assets/license/` retain Mediabunny's MPL-2.0 notice, the focused encoder's LGPL-2.1 text, source-package links, published source commit, and upstream build-recipe reference. Production `3rdpartylicenses.txt` is regenerated with the build.

Git attributes preserve binary fixture bytes and generated JavaScript exactly, including the encoder's inline WASM string. Generated bundles must not undergo line-ending conversion or whitespace cleanup.

Stop before Milestone 7. Standalone HTML asset bundling and advanced payloads are next; the complete generator controls remain Milestone 8, offline/large-job resilience Milestone 9, and real Safari/device acceptance Milestone 10. No publication or deployment was performed.
