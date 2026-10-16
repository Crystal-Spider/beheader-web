# beheader-web

A browser-only polyglot generator inspired by [Beheader](https://github.com/p2r3/beheader). This is an independent project.

**Status: Milestone 9 — offline operation and large-job resilience.** The processing API accepts MP3, supported PCM WAV, Ogg Vorbis/Opus, and compatible AAC/MP4 audio in its shared media slot. It retains all 26 subsets of two or more families: image, media, UTF-8 HTML, supported classic PDF, and ZIP archives. Chromium/Firefox audio flows pass; the reviewed Windows WebKit runner gap and pending real Safari verification are documented in [Milestone 6](MILESTONE-6.md). The responsive English/Italian interface now supports file selection, role correction, planning, generation, cancellation, examples, and extension-specific downloads. There are no in-app content previews.

## Requirements

- Node **24.19.0**, managed through nvm (`.nvmrc`).
- pnpm **11.25.0**, pinned in `packageManager`.

With nvm for Windows, run `nvm install 24.19.0` if needed, then `nvm use 24.19.0`. On nvm-sh, use `nvm install` and `nvm use`. Verify `node --version` before installing dependencies. Use a Node-based pnpm installation or Corepack configured for the pinned version; older standalone pnpm executables can run their own embedded Node instead of the selected nvm Node.

## Development

```sh
pnpm install --frozen-lockfile
pnpm serve
```

The development server runs at `http://localhost:4200/beheader-web/`.

```sh
pnpm lint
pnpm typecheck
pnpm test:unit
pnpm exec playwright install chromium firefox webkit
pnpm test:e2e
pnpm test:audio
pnpm build
pnpm preview
```

`pnpm check` runs lint, application/tooling/worker type checking, tests, and the production build. Browser tests build and serve the real production assets under `/beheader-web/`, checking Angular bootstrap, asset paths, localization, keyboard interaction, responsive layouts, dedicated-worker operations, and browser-managed file I/O.

Vitest covers processing/state/logic behavior. No Angular component tests are generated. Playwright covers the full existing suite in Chromium and an audio-specific matrix in Chromium, Firefox, and WebKit. The Windows WebKit runner has a reviewed OPFS/worker-codec limitation; its audio flows are explicitly skipped after a runtime storage probe, and capabilities are recorded separately. Real Safari/iOS and broader device acceptance remain Milestone 10 work. The processing harness is bundled by esbuild in memory for tests only and adds no debug hooks or test assets to the application.

If the standalone Windows `pnpm.exe` fails in the execution sandbox, invoke the pnpm JavaScript entry point with the active nvm-managed `node`. The check runner also invokes local tools with that same Node, rather than redispatching through a global pnpm installation. Do not substitute another Node runtime.

## Structure and conventions

- `src/app/core`: application infrastructure and services.
- `src/app/feature/generator`: generator page and feature state.
- `src/app/shared/component`: reusable Material-based UI components.
- `src/lib/polyglot`: framework-independent contracts, inspection/planning, bounded I/O, and worker lifecycle.
- `e2e`: complete browser flows.

Use standalone zoneless Angular, OnPush components, separate HTML/SCSS, constructor injection, signal inputs/outputs, and strict TypeScript. Use `bhw-` selectors and `~bhw/...` aliases. Formatting follows the reference project's two-space indentation, compact named imports, single-quoted TS strings, semicolons, and no trailing commas. Keep useful JSDoc type annotations and omit redundant access tags. Markdown prose has no column limit: `.editorconfig` disables line-length constraints and Prettier preserves paragraphs without wrapping.

## Languages and local assets

Both translation catalogs are bundled with the app through Transloco. A saved `bhw.language` preference takes precedence over browser languages; regional codes are matched to supported languages, with English as the fallback. Language selection still works if browser storage is unavailable. The document's `lang` attribute updates with the interface.

To add a language, extend the registry in `src/app/core/model/language.ts`, add its catalog and register it in the translation loader, then include its flag SVG under `public/assets/flag`. The Material-based picker reads its trigger and options from the same registry.

Material Design icons and country flags are shipped as local SVGs; no external icon font, translation CDN, or runtime media service is required. Production builds prefetch the complete application, lazy processing dependencies and examples for offline reopening after the first successful cache. Use `pnpm preview` to test this; development `pnpm serve` intentionally does not install a service worker.

## Processing foundation

The shared contract defines inspection, composition planning, and generation with stable diagnostic codes, serializable metadata/progress, interpretation descriptions, cancellation, and opaque artifact references. `Processing` owns a lazy dedicated worker through `WorkerClient`; each worker handles one operation and is terminated on completion, failure, or cancellation. Files and worker/storage handles stay outside NgRx and browser preference storage. Inspection does not require temporary storage.

Before reading content, inspection rejects inputs over 1 GiB, totals over 2 GiB, invalid sizes, and duplicate IDs. Exact limits are accepted for an attempted operation. Detection reads at most 64 KiB from the head and 65,557 bytes from the tail. Signatures and extension/MIME hints are recorded separately; conflicting families require an explicit `FileInput.role` override and reinspection. Detection is provisional: it does not validate codecs, animation, PDF cross-references, archive integrity, or whether a consumer will accept a generated file.

Planning permits one image, one media input, one HTML input, one PDF, and ordered multiple archives, within 128 total inputs. All subsets of two or more families are supported for the validated input structures; image and media are optional. HTML asset ZIPs, appendables, and extra-header data have explicit auxiliary roles and never count toward the minimum of two different families. Asset ZIPs require an HTML input. Auxiliary roles now support an HTML asset ZIP, ordered appendables, and composition-bounded extra-header data; none counts toward the family minimum. Separate audio/video inputs share one media slot, while a video may retain its existing soundtrack.

Preparation validates static PNG, JPEG, GIF, WebP, and supported BMP inputs before browser PNG normalization, rejecting animation and unsupported multipage inputs. Images retain their dimensions and transparency; a 32-megapixel decoded-pixel limit and 32,767-pixel dimension limit bound allocation attempts. SVG, AVIF/HEIF, single-image ICO, and static TIFF decoding are outside the current implementation. ICO directory dimensions cannot represent more than 256 pixels, so larger embedded PNGs depend on the consumer: Pillow opens the full-resolution fixture, while Chromium's ICO decoder fails to render it. The full PNG is retained without automatic resizing. See the compatibility evidence before assuming universal viewer support.

Compatible MP4 means non-fragmented, unencrypted, self-contained H.264 video with optional AAC-LC audio, or AAC-LC audio alone, using supported classic sample tables and explicit AAC channel configurations. Preparation validates box boundaries, decoder descriptions, sample/chunk counts, chunk spans within `mdat`, edit lists, and required playback headers. The writer replaces `ftyp` with canonical compatible brands, copies encoded data and playback metadata, and repairs every `stco`/`co64` entry using checked arithmetic. Compatible encoded MP4 is not transcoded; video transcoding is not implemented. Unknown relocation-sensitive structures, unsupported codecs/tracks, and malformed tables fail explicitly.

Common audio inputs are inspected through Mediabunny 1.61.6 and, when needed, converted to AAC-LC using its locally bundled `@mediabunny/aac-encoder` 1.61.6 extension at an initial target of 192 kb/s. Compatible ADTS AAC is transmuxed without changing its AAC access units; compatible audio-only MP4 is relocated directly. Conversion uses a seekable source with a bounded cache, a backpressured positioned output, and a job-owned OPFS intermediate. The final artifact offers `.m4a` and `.mp4` interpretations of identical bytes. Native decoding capability is checked before conversion; unsupported decoder configurations report `AUDIO_DECODE_UNAVAILABLE`. Ogg checksums/framing, PCM framing, tag/packet bounds, cancellation, and storage errors have dedicated checks. See [Milestone 6](MILESTONE-6.md) for channel/rate scope and the reviewed browser limitation.

HTML is checked as UTF-8 through bounded reads and embedded using byte lengths. Its document is copied without execution or remote fetching during processing. A body wrapper hides the binary prefix, and a hidden `plaintext` tail prevents trailing binary from becoming active markup, even if it contains HTML comment terminators. The optional asset ZIP supplies static image/font/CSS/script resources for parser-based bundling. Unresolved references require correction or explicit continuation; no remote resources are fetched. See [Milestone 7](MILESTONE-7.md) for entry-path resolution, parser/resource bounds, and advanced payload scope. Results offer only supplied, validated interpretations of identical bytes: `.ico`, `.mp4`/audio `.m4a`, `.html`/`.htm`, `.pdf`, and `.zip`. `.png` is not an interpretation of the complete file; ZIP-derived application/install/signature behavior is not advertised.

PDF preparation validates a single classic cross-reference revision, object offsets, and a conservative trailer grammar; generation relocates only in-use entries and rewrites `startxref`. Multiple subsections and LF/CRLF records are supported. Encrypted, incremental, hybrid, and cross-reference-stream PDFs fail explicitly. Metadata is limited to 1 MiB and object numbers below 40,000. See the exact trailer scope and independent rendering evidence in [Milestone 5](MILESTONE-5.md).

Archives use pinned zip.js with a custom seekable reader. The EOCD is checked before loading a central directory of at most 1 MiB. Each archive and the merged contents must expand to less than 1 GiB; the selected archives' total expansion may not exceed 2 GiB. Metadata is limited to 4,096 entries across the selection. Generation validates CRCs and actual byte counts, including overwritten entries, uses job-owned file-backed intermediates, and repacks with corrected absolute ZIP offsets. Later selected archives overwrite matching earlier paths; plans expose their order and collision metadata. Encrypted, split, ZIP64, unsupported compression methods, symbolic links, unsafe paths, and file/directory ancestry conflicts are rejected. PDF + ZIP outputs retain the final PDF marker in the ZIP comment so long archive suffixes do not hide it from PDF readers.

`BlobInput` exposes seekable bounded reads, used for seekable archive-directory inspection without a whole-archive stream buffer. `OutputWriter` copies sequential chunks with backpressure, patches existing offsets, enforces caller-supplied output limits, and rejects unsafe arithmetic or further writes after a sink failure. Each read/write is limited to 1 MiB. The same bounded file-backed path serves small and large jobs. Plans expose storage estimates; known-insufficient headroom is rejected before generation and actual live temporary files share a 4 GiB budget. See [Milestone 9](MILESTONE-9.md).

`TemporaryStorage` writes to job UUID directories inside the application's `beheader-web-polyglot-v1` OPFS namespace. Artifacts remain file-backed and must be consumed while their workspace is retained. Disposal aborts unfinished streams and removes only the owning job. Forced cancellation terminates the worker before generation-workspace cleanup. Storage denial, quota exhaustion, and cleanup failure produce safe diagnostic codes, without raw browser messages or file names. Abrupt browser/process termination can leave an abandoned workspace. Startup cleanup uses an exclusive Web Lock and removes only UUID workspaces in this namespace when no live app session holds its shared lease; other origin/app data is preserved. Without Web Locks automatic cleanup is conservatively skipped.

`Processing.run({operation: 'plan' | 'generate', inputs})` prepares or generates the selected `FileInput` records. A successful generation returns an artifact reference and supported interpretations. Use `Processing.resolve(artifact)` for a file-backed download source and `Processing.release(artifact)` after downloads no longer need it. The current output limit is 2 GiB. Successful worker termination retains the artifact; cancellation or processing failure removes its partial workspace.

## Selection availability

The shared availability model derives from the verified compatibility matrix, occupied roles, ambiguity, resource limits, and implemented conversions. NgRx selectors recompute it whenever inspected selection metadata changes, including removal, replacement, reassignment, and archive reordering. Separate Audio and Video badges retain one shared media slot; a video can still include its own soundtrack. Six badges appear in rows of six, three, or two as space allows.

Unavailable badges are gray and carry translated accessible explanations. Audio conversion is implemented; selecting audio or video occupies the shared media slot and disables further additions to either kind. Removing a conflicting input restores availability; the shared model permits multiple archives. Removal/replacement controls remain enabled when additions to an occupied slot are disabled.

The exported accept-filter selector excludes unavailable types from Choose files. The picker and drop controls use this same model and authoritative inspection/planning. Operating-system filters can be bypassed, and extensions/MIME types alone do not prove compatibility. State/core tests cover availability transitions, audio/video exclusion, re-enabling after removal, multiple archives, and rejection of duplicate roles outside the picker filter. The live picker and page-wide drop use this model and authoritative inspection. Selected files are removable, replaceable, reassignable, and reorderable.

## Static output

`pnpm build` writes the static application directly to `docs/`, with `/beheader-web/` as its base URL. `pnpm preview` serves it at `http://127.0.0.1:4173/beheader-web/`. Generated `docs/` files are intentionally versionable for the eventual GitHub Pages workflow. Deployment automation is a later milestone; nothing is published by a build.

The intended public URL is [crystal-spider.github.io/beheader-web](https://crystal-spider.github.io/beheader-web/).

## Verification

Verified on 2026-10-16 with nvm-managed Node 24.19.0 and pnpm 11.25.0:

- Frozen-lockfile dependency installation.
- ESLint with zero warnings and strict Angular/tooling/worker type checks.
- Production build directly into `docs/`.
- Unit tests cover language resolution, detection/role ambiguity, static size rejection, bounded random access, output patching/limits/backpressure, cancellation, worker crashes/protocol failures, stale messages, and cleanup races. A synthetic 1 GiB source is copied without allocating a complete payload; this does not establish that every device can process a real 1 GiB composition.
- Chromium flows under `/beheader-web/` cover the shell and both languages at 320, 390, 768, and 1280 pixels, actual production-worker File cloning/inspection/planning/retry, file-backed output/patching, storage denial/quota errors, and cleanup after forced worker termination. A separate job and another application's OPFS directory survive cleanup.
- Milestone 4 totals: 72 unit tests and 24 Chromium flows, including actual generation, image/media decoding, HTML execution only when opening a controlled output fixture, cancellation during output, and cleanup after decoder failure.
- Independent Pillow 12.0.0 and FFprobe/FFmpeg checks passed for seven outputs, including retained full-resolution image dimensions/alpha, exact `mdat` SHA-256 matches, unchanged probed playback metadata, and full media decoding. Run `python scripts/verify-polyglot-fixtures.py` after Playwright to reproduce these additional checks; Pillow and FFmpeg are test tools, not application dependencies.

Milestone 6 brought the suite to 102 unit tests, the 66 existing Chromium flows, and an audio matrix with 32 passing Chromium/Firefox flows plus three platform capability probes. Sixteen Windows WebKit audio flows are explicitly skipped for the reviewed runner limitation. Independent checks cover 22 audio outputs, all 26 family combinations, both archive orders, and the seven earlier image/media fixtures. Run `python scripts/verify-audio-fixtures.py`, `python scripts/verify-combinations.py`, and `python scripts/verify-polyglot-fixtures.py` after `pnpm check`; they require developer installations of Pillow, Poppler (`pdftoppm`/`pdfinfo`), and FFmpeg. See [Milestone 6 evidence and limitations](MILESTONE-6.md). The [Milestone 5](MILESTONE-5.md), [Milestone 4](MILESTONE-4.md), and [Milestone 3](MILESTONE-3.md) reports remain historical evidence.

Asset bundling, full generator controls, offline caching, deployment automation, abandoned-job recovery, and broader browser/device acceptance remain later milestones.

## License

GPL-3.0-only. See `LICENSE` and [attribution](NOTICE.md).

Milestone 7 adds four processing tests and two Chromium flows (106 unit tests and 68 Chromium flows total). Run `python scripts/verify-advanced-fixtures.py` after the full suite to validate the advanced all-family artifact independently. See [Milestone 7](MILESTONE-7.md).

[Milestone 8](MILESTONE-8.md) connects the full generator through NgRx Store/Effects and a separate runtime file owner. The current suite contains 110 unit tests and 76 Chromium flows, plus the retained audio matrix. Diagnostic downloads exclude file names, input IDs, reference paths/URLs and contents; issue links are short and user initiated. Output name/extension preferences are remembered, while input selection and results are ephemeral.

[Milestone 9](MILESTONE-9.md) adds production offline reopening, explicit idle-only updates, storage headroom checks, a live temporary-byte cap, and cross-tab-safe abandoned-job cleanup. The suite now contains 113 unit tests and 82 Chromium flows plus the retained audio matrix. A real output above 512 MiB is generated and downloaded with bounded reads, streamed payload hashing, and independent PDF parsing. Maximum-size success on every device is not guaranteed. Actual Safari/iOS, Android and release acceptance remain Milestone 10; no deployment has been performed.
