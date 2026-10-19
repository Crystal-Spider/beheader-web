# Compatibility

A polyglot contains several valid interpretations of the same bytes, but readers differ in how they handle extra headers, trailing data and mixed containers. This document describes the formats and readers covered by the project's checks. It does not guarantee that every application will open every generated file.

## Input scope

The five independent families are image, media, HTML, PDF and archive. A selection needs at least two families, with one image, one media input, one HTML and one PDF at most. Multiple archives are allowed. Audio and video share the media slot; a video's existing soundtrack is allowed, but separate audio and video inputs cannot occupy it together. An HTML asset ZIP is auxiliary and does not count as another family.

| Input | Supported scope | Output interpretation |
| --- | --- | --- |
| Image | Static PNG, JPEG, GIF, WebP and BMP. Animation, multipage images and unsupported formats such as SVG, TIFF, ICO and AVIF/HEIF are rejected. | PNG inside `.ico`, retaining dimensions and transparency |
| Video | Unencrypted, self-contained, non-fragmented H.264 MP4 with optional AAC-LC audio and supported track/sample tables | `.mp4`, with encoded payloads preserved and offsets repaired |
| Audio | MP3, tested integer/float PCM WAV variants, Ogg Vorbis/Opus, compatible AAC-LC MP4/M4A and ADTS AAC | AAC-LC in `.m4a`; compatible packets are preserved, other supported audio is converted at 192 kb/s |
| HTML | Valid UTF-8 without NUL; optional local asset ZIP with images, fonts, CSS and ordinary scripts | `.html` or `.htm`, with supplied static assets inlined |
| PDF | A single classic cross-reference revision, including LF/CRLF, multiple subsections, valid free-list links, comments, escaped names and extended trailers | `.pdf`, with object and cross-reference offsets relocated |
| Archive | Unencrypted single-disk classic ZIP using STORE or DEFLATE | `.zip`, merged in displayed order; later matching paths overwrite earlier ones |

PDF cross-reference streams, linearized documents, incremental/hybrid revisions and encryption are outside the supported subset. These restrictions can reject an otherwise valid PDF. Re-exporting with a supported classic table may help, but changing its extension will not change its structure.

ZIP64, split/encrypted archives, unsupported compression, symlinks, unsafe paths and file/directory conflicts are rejected. Office, JAR and APK inputs receive ZIP treatment only; application behavior, installation and signatures have not been verified.

MP3 uses a local `mpg123-decoder` WASM fallback when native decoding is unavailable. It runs inside the processing worker without requiring AudioData. Ogg still requires native decoding. No full ffmpeg.wasm runtime or video transcoder is included.

HTML is uploaded separately and resolved at the asset ZIP root. Nested stylesheets resolve their own relative paths; an HTML-authored `<base>` retains its meaning. CSS imports/URLs, static images/fonts and ordinary external scripts can be bundled. Module graphs, dynamic requests, iframe sources, opaque SVG dependencies and restrictive CSP may leave unresolved references. The app never fetches remote assets or executes supplied content. Missing or unsupported references require correction or explicit consent to leave them unchanged.

## When validation happens

Selecting files checks size/count limits, signatures and roles, plus bounded PDF, media and image headers. ZIP indexes are inspected for metadata limits, declared sizes and overwrite warnings without extracting contents. The HTML asset ZIP shares index budgets but is excluded from independent archive collisions. A header probe that lacks enough evidence leaves the full check to Combine.

Combine performs full structure/object validation, audio metadata and decoder checks, HTML resolution, extraction/integrity checks and generation in one operation. Quick selection readiness means that generation can be attempted; it is not a claim that all inputs have passed full validation. Errors include a specific reason where possible, distinguishing unsupported layouts, damaged structures and resource limits.

## Browser and device evidence

The recorded desktop automation uses Windows and Playwright 1.64.1. Versions below identify those test engines, rather than a minimum supported version for each browser.

| Environment | Recorded version | Checked behavior | Remaining gap |
| --- | --- | --- | --- |
| Chromium automation | 156.0.8078.4 | Generator, all family combinations, audio, offline use, cancellation/storage recovery, large file-backed download, EN/IT layout and accessibility | Oversized ICO entries are not decoded correctly |
| Firefox automation | 157.0 | Same format combinations, audio, offline, large-output and recovery checks | Fixture coverage does not establish every codec/profile or device capacity |
| WebKit automation on Windows | 27.2 | Shell, localization, keyboard/selects, layout/accessibility, storage-error recovery and standalone MP3 fallback decoding | OPFS access fails with UnknownError; full generation remains unverified in this runner |
| Pixel 7 emulation in Chromium | 156.0.8078.4 | Touch controls, example generation, responsive layout and accessibility | Not Android hardware, codec or storage verification |
| iPhone 13 emulation in WebKit | 27.2 | Touch language switching, shell/layout and storage-error recovery | Same Windows WebKit storage limit; not actual iPhone generation |
| Mac Safari | Not yet recorded | Hands-on checks pending | Browser/OS version and generated outputs need verification |
| iPhone Safari | iOS 17.6.1 | General operation was reported to work; the MP3 example failed on the earlier decoder pipeline | The bundled MP3 fallback, offline use and external readers need a device retest |
| Android Chrome | Android 13; browser version not yet recorded | Hands-on checks pending | Device/browser version and generated outputs need verification |

Opera and Brave have not been tested separately. Mobile emulation and Windows WebKit results do not replace Safari/iPhone/Android checks. Use [DEVICE-CHECKS.md](DEVICE-CHECKS.md) to record those results.

The reported iPhone error was `AUDIO_DECODE_UNAVAILABLE` while running the MP3 example. The MP3 fallback is now implemented, but its complete pipeline has not been confirmed on that phone. Compatible AAC-LC M4A avoids decoding and is a separate path to check. `ARCHIVE_COLLISION` in the same example is an expected overwrite warning, unrelated to audio decoding.

## Family combinations

All 26 combinations below pass the Chromium and Firefox fixture checks. The media fixture is compatible H.264/AAC MP4; separate audio conversion is covered by the audio suite. This table describes family combinations, not every possible encoding within each family.

| Selected families | Chromium | Firefox |
| --- | --- | --- |
| Image + Media | Pass | Pass |
| Image + HTML | Pass | Pass |
| Image + PDF | Pass | Pass |
| Image + Archive | Pass | Pass |
| Media + HTML | Pass | Pass |
| Media + PDF | Pass | Pass |
| Media + Archive | Pass | Pass |
| HTML + PDF | Pass | Pass |
| HTML + Archive | Pass | Pass |
| PDF + Archive | Pass | Pass |
| Image + Media + HTML | Pass | Pass |
| Image + Media + PDF | Pass | Pass |
| Image + Media + Archive | Pass | Pass |
| Image + HTML + PDF | Pass | Pass |
| Image + HTML + Archive | Pass | Pass |
| Image + PDF + Archive | Pass | Pass |
| Media + HTML + PDF | Pass | Pass |
| Media + HTML + Archive | Pass | Pass |
| Media + PDF + Archive | Pass | Pass |
| HTML + PDF + Archive | Pass | Pass |
| Image + Media + HTML + PDF | Pass | Pass |
| Image + Media + HTML + Archive | Pass | Pass |
| Image + Media + PDF + Archive | Pass | Pass |
| Image + HTML + PDF + Archive | Pass | Pass |
| Media + HTML + PDF + Archive | Pass | Pass |
| Image + Media + HTML + PDF + Archive | Pass | Pass |

The combination fixtures use `transparent.png`, `video-aac.mp4`, controlled UTF-8 HTML, `classic.pdf` and `first.zip`. Both archive orders are also checked with `subsections.pdf`, `first.zip` and `second.zip`. Bundled-HTML and audio compositions exercise the complete five-family result.

| Interpretation | Validation |
| --- | --- |
| Image | Browser decoding and Pillow dimensions, pixels and alpha |
| Media | Browser playback, FFprobe metadata, full FFmpeg decoding and encoded-payload hashes |
| HTML | UTF-8 and bundled-resource checks, with controlled fixture execution in a sandbox |
| PDF | Poppler page rendering compared with source pixels |
| Archive | Python zipfile extraction, exact paths/contents, CRC and stored offset checks |

Fixture HTML execution exists only in tests; the app never executes uploaded HTML. Independent PDF and ZIP readers cover those interpretations rather than relying on browser-native viewers. Other consumers, including Acrobat, Preview, Office and OS default viewers, remain unverified unless a device result identifies them.

## Audio coverage

Native-path fixtures cover MP3, integer/float PCM WAV, stereo and surround WAV, Ogg Vorbis/Opus, AAC-LC M4A and ADTS AAC. Fallback fixtures cover mono MP3, stereo VBR with unequal channel amplitudes and MPEG-2 MP3 at 22,050 Hz. Both paths exercise cancellation, retry, unavailable decoding and storage failures.

Independent audio checks verify AAC-LC profile, channels, sample rate, duration, complete decoding and the retained 440 Hz tone. Compatible AAC access units must stay unchanged. The all-family audio outputs also pass image, PDF and ZIP readers.

Windows WebKit's standalone fallback tests verify PCM channels, rate, duration and timestamps without OPFS or native audio APIs. Full-pipeline cases are skipped when its storage probe fails; they are not counted as successful generation. The fixtures do not cover every WAV encoding, Ogg codec or channel layout.

## Resource bounds

A compressed file's byte size does not bound its decoded pixels, expanded entries or parser allocations. The app therefore applies separate limits before expensive work where possible, then checks actual bytes during processing.

| Resource | Limit |
| --- | --- |
| Selected records, including HTML asset ZIP | 16 |
| Single input / total input | 1 GiB / 2 GiB |
| Final output / individual intermediate file | 2 GiB |
| Live temporary workspace | 4 GiB |
| Expansion per archive and merged archive | Strictly below 1 GiB each |
| Total declared expansion across independent archives | 2 GiB |
| Decoded image | 64 × 1,024² pixels; 32,767 pixels per dimension |
| PDF cross-reference/trailer metadata | 32 MiB and 1,000,000 actual records |
| ZIP index metadata across independent and asset archives | 32 MiB and 100,000 inspected entries |
| Final classic ZIP entries | 65,534 |
| ZIP relative path | 65,535 UTF-8 bytes, with path-safety checks |
| HTML plus expanded asset ZIP | 1 GiB combined |
| Final bundled HTML, including base64 expansion | 1 GiB |
| Parsed HTML/CSS text | 64 MiB per document |
| HTML nodes / reference operations | 1,000,000 / 65,536 |
| Individual I/O read or write | At most 1 MiB |

Image pixel limits bound RGBA allocations independently of compressed size. Metadata and record budgets bound index parsing; sparse PDF object IDs do not cause allocation up to the highest number. Text and node limits bound DOM/CSS parsing. CSS imports use iterative traversal and cycle detection without a fixed depth ceiling. Binary assets and nested data URLs stream to file-backed output rather than becoming complete large strings or ArrayBuffers. Inspectors also reject excessive format records and unsafe offset arithmetic.

Actual output above 512 MiB, cancellation, quota exhaustion and recovery have browser coverage. A larger fixture also checks a streamed asset above 64 MiB, a 60,000-record PDF index and a 5,000-entry ZIP. This does not establish maximum-size success on every device. Browser or OS termination cannot reliably be caught as an in-app error.

## Reader and offline limits

ICO directory dimensions represent at most 256×256. The app retains the full embedded PNG without resizing. The 320×240 fixture opens at full resolution in Pillow and Firefox, but Chromium's ICO decoder reports 256×240 and fails to render it correctly. Use a reader that accepts the full PNG entry, or choose another generated interpretation.

Offline reopening requires HTTPS/localhost, a completed initial cache and retained site data. Private-session storage, browser eviction or denied permissions can prevent it. Navigation/reload caches new builds in the background; a subsequent page load uses a complete cached version. The app does not force a reload during work.

## Reproducing checks

Use the commands in [README.md](README.md). Browser evidence is written under ignored `test-results/`, including engine/version information, capability attachments, traces and explicit skip reasons. Independent scripts validate the generated outputs; default Chromium evidence is under `test-results/`, while Firefox format evidence is under `test-results/acceptance/firefox`.

Private test inputs and derived evidence stay in ignored `local-validation/`. They are not redistributable fixtures and must not be included in the production site or commits.
