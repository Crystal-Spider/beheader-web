# Milestone 4 — image, compatible MP4, and HTML

Completed on 2026-10-16. Generation is available through the processing API and tested production worker. The app's file controls remain disabled until Milestone 8, and there are no content previews. Stop before Milestone 5.

## Implemented behavior

The current matrix is image + compatible MP4, optionally plus an HTML file. Preparation returns a ready plan only after static image, MP4, and HTML validation. PDF, archives, auxiliary payloads, image-less/media-less combinations, and audio conversion remain explicitly unavailable rather than being reported as incompatible format laws.

Static PNG, JPEG, GIF, WebP, and supported Windows BMP inputs normalize to PNG through worker-local `createImageBitmap` and `OffscreenCanvas`. PNG/APNG chunks, GIF frame boundaries, WebP animation chunks, JPEG MPO/concatenation, and TIFF/ICO multipage markers are checked before decoding. Unsupported static image formats fail explicitly. Dimensions remain unchanged, transparency is retained, and browser color conversion/premultiplication may round low-alpha color channels. Decoded dimensions are capped at 32,767 per side and 32×1024×1024 pixels to bound attempted allocations independently of compressed input size. These bounds do not guarantee enough device memory.

The ICO/MP4 layout follows upstream: a 256-byte ICO directory also serves as an unknown MP4 box; a canonical `ftyp` follows, then a `skip` box containing optional HTML and PNG, then the original media boxes. The full artifact is an ICO, not a PNG. `.ico`, `.mp4`, and optionally `.html`/`.htm` are extension alternatives for identical bytes. Derivation is attributed in the source and `NOTICE.md` under the retained GPL license.

MP4 validation supports one self-contained, non-fragmented, unencrypted `avc1` H.264 video track and zero or one AAC-LC mono/stereo track. It checks declared box boundaries (including extended-size and final zero-size `mdat` boxes), decoder descriptions/configuration, chunk/sample/timing tables, chunk containment in `mdat`, data references, edit lists, required playback headers, and the supported metadata-container subset. Both `stco` and `co64` are repaired in bounded batches; arithmetic never silently wraps. Encoded payloads, edit timings, track headers, and ordinary metadata remain unchanged. The original file-type brands are replaced with canonical `isom`/`iso2`/`avc1`/`mp41` brands. Unsupported codecs, external references, extra track kinds, fragmentation, encryption markers, and unknown structural boxes receive specific diagnostics.

HTML is validated as UTF-8 incrementally; an optional BOM is skipped. Encoding offsets use actual byte counts, fixing upstream's multibyte-length issue. The document is wrapped for binary-prefix hiding, with an early UTF-8 declaration. A hidden `plaintext` tail prevents arbitrary trailing binary from becoming markup, including strings containing `-->` or `</plaintext>`. Input HTML is never executed during processing. Referenced assets remain unchanged and are never fetched by the processor; standalone bundling remains Milestone 7.

Output remains in a job-scoped OPFS file. The current output limit is 2 GiB; all copying/patching stays within the bounded I/O layer. A successful worker exit retains the artifact for explicit resolve/release. Decode/write failure and cancellation remove the partial job. Browser/process crashes and storage/resource preflight remain Milestone 9 work.

## Validation evidence

Environment: Windows, nvm-managed Node 24.19.0, pnpm 11.25.0, Playwright 1.64.1 with headless Chromium 156.0.8078.4, Pillow 12.0.0, and installed FFprobe/FFmpeg `2025-01-27-git-959b799c8d`. Fixtures are original synthetic data; see `e2e/fixture/README.md` and the regeneration scripts.

| Fixture / check | Consumer or validator | Interpretation / outcome |
| --- | --- | --- |
| Frozen-lockfile installation, lint, Angular/tooling/worker types, production build | Pinned toolchain | Passed; static app and local worker built beneath `/beheader-web/` |
| 72 unit tests across seven files | Vitest | Passed, including static/animated images, malformed boxes/tables, unsupported codecs/encryption/fragmentation, offsets, bounded UTF-8, cancellation, and prior milestones |
| 24 complete browser flows | Chromium 156.0.8078.4 | Passed, including prior shell/I/O flows and actual generation/failure cleanup |
| PNG/JPEG/GIF/WebP/BMP + video/AAC | Chromium ICO decoder, canvas, video element | Icons decode at 32×24; alpha retained where present; video duration/dimensions and a decoded frame hash match the input; playback completes |
| PNG + video with `co64` + UTF-8 HTML | Chromium, Pillow, FFprobe/FFmpeg | All three interpretations validated; 64-bit relocation passes |
| 320×240 PNG + video with trailing `moov` + HTML | Pillow 12.0.0 | ICO opens at full 320×240 with alpha 128; emits the expected directory-size warning |
| Same large-image output, embedded PNG interpretation | Chromium PNG decoder | Full embedded PNG decodes at 320×240 with unchanged dimensions; no automatic resizing |
| Same large-image output, full ICO interpretation | Chromium ICO decoder | Known consumer limitation: directory reports at most 256 pixels, and the oversized PNG entry does not render correctly |
| UTF-8 HTML with Italian/Japanese/emoji | Chromium, controlled sandboxed output document | Text and UTF-8 charset survive; supplied script executes only when the test deliberately opens the output as HTML |
| HTML-like bytes in trailing MP4 `free` box | Chromium, controlled sandboxed output document | Binary markup stays inert; only the intended HTML fixture script runs |
| Seven generated artifacts | Independent Pillow ICO reader | All load at original image dimensions with matching alpha |
| Seven generated artifacts | Independent Python box walker + SHA-256 | Every complete `mdat` payload hash matches its corresponding source |
| Seven generated artifacts | FFprobe | Video/audio codec, dimensions/channels/rate, time bases, starts/durations/frame counts, and title metadata match the sources |
| Seven generated artifacts | FFmpeg decode with `-xerror` | All media fully decodes without errors |
| Cancellation after output writing begins | Real production worker + OPFS | Partial workspace removed, client released, retry succeeds |
| Decoder failure after workspace creation | Real production worker + OPFS | `IMAGE_INVALID`, partial workspace removed, retry succeeds |

Run `pnpm check` for the application suite. After its browser tests, `python scripts/verify-polyglot-fixtures.py` independently checks the seven saved artifacts and records `test-results/independent-validation.json`. These optional external validation tools are not bundled in the app. Tests materialize only tiny fixture outputs; production processing does not read a complete large artifact into an ArrayBuffer.

## Scope and consumer limitations

ICO directory width/height fields represent at most 256 pixels. Following the user's clarification, large images remain at their original resolution; no resizing, rejection, or app preview was introduced to work around a test consumer. Pillow uses the embedded PNG dimensions successfully; Chromium's oversized-ICO behavior is recorded as a consumer limitation, not counted as successful image display. This is a consequence of the upstream-style container, separate from browser input decoding. Other image viewers remain unverified.

SVG, AVIF/HEIF, single-image ICO, and static TIFF decoding are currently unimplemented. Animated and multipage inputs are rejected. The MP4 reader deliberately supports a bounded structural subset: `avc3`, other codecs, HE-AAC, AAC program-config/explicit-rate modes, extra track kinds, arbitrary metadata/reference layouts, and unknown boxes are not claimed. Format-specific resource bounds are 100,000 sibling boxes and 4,000,000 table entries. These restrictions are visible through diagnostics; no source media is silently dropped or transcoded.

Only Chromium was exercised for the browser processing pipeline. Firefox/WebKit, actual Safari/iOS, Android, Windows shell image viewers, VLC, and other consumers remain unverified. Large real media workloads are not an acceptance claim here. No release or deployment was performed, and no Milestone 5 work was started.
