# Beheader Web

A local browser app that combines two or more supported format families into one polyglot file. Download the same bytes with different extensions to open their different interpretations. Inspired by [Beheader](https://github.com/p2r3/beheader), by [p2r3](https://github.com/p2r3); this is an independent, unaffiliated project.

**Release preparation:** generation, static HTML asset bundling, audio conversion, English/Italian localization, offline reopening and large-file I/O are implemented. Automated acceptance is complete; hands-on review and real Safari and Android results are still pending. The intended public URL is https://crystal-spider.github.io/beheader-web/; publication remains a separate action.

## Use the app

1. Choose files or drop them anywhere on the page. Start with **Try an example** for a localized picture, MP3 tone, HTML page, PDF and two archives with matching paths that demonstrate overwrite order.
2. Include at least two different families: image, media, HTML, PDF and archive. Audio and video share one media slot; a video's existing soundtrack is allowed. Correct ambiguous roles using the file card's selector.
3. Optionally attach an asset ZIP inside the HTML file card. It does not count as another family. Resolve missing HTML assets or explicitly choose to retain unresolved references.
4. Combine the files, choose an output name and extension, then download. Each extension contains identical bytes. Use a compatible reader for that interpretation and retain the originals.

Files stay on the device. There are no uploads, content editors or in-app previews. Uploaded HTML/scripts are never executed during processing. Generation does not fetch remote resources. Preferences are remembered; selected files and results disappear on reload/close.

Compatible structures matter more than filenames. All 26 subsets of two or more families are covered by fixture checks in Chromium and Firefox. Individual consumers can still reject mixed-format files; keep the originals and test the applications you intend to use. Windows WebKit's test runner cannot open the required temporary storage, so its UI checks do not establish Safari generation support. Actual Safari/iOS and Android acceptance remains pending.

| Family | Supported scope and limits |
| --- | --- |
| Image | Supported static PNG, JPEG, GIF, WebP and BMP inputs become transparent-capable PNG-in-ICO. Animation and multipage inputs are rejected. Full resolution is retained; Chromium's ICO decoder may reject entries larger than 256×256 even when other readers open them. |
| Video | Compatible unencrypted, non-fragmented H.264 MP4 with optional AAC-LC audio. Encoded payloads and playback metadata are retained; video is not transcoded. Unsupported tracks and box layouts are rejected. |
| Audio | Supported MP3, PCM/float WAV, Ogg Vorbis/Opus and AAC inputs become AAC-LC MP4 at 192 kb/s when conversion is needed. Compatible AAC is preserved. MP3 has a local WASM decoder fallback; Ogg decoding depends on browser capabilities. Not every codec, channel layout or container variant is supported. |
| HTML | UTF-8 HTML with an optional asset ZIP for static images, CSS, fonts and ordinary scripts. Supplied assets are inlined locally. Module graphs, dynamic requests and remote fetching are outside the bundler's scope; unresolved references require an explicit choice. |
| PDF | One classic cross-reference revision, including ordinary nonzero free-list links, comments and additional trailer fields. Cross-reference streams, linearized layouts, incremental/hybrid updates and encryption are explicitly rejected. Pages and offsets are retained using the supported structure subset. |
| Archive | Supported classic ZIP with stored/deflated entries. Encrypted, split, ZIP64, corrupt and unsupported entry variants are rejected. Archives merge in the nested-card order; later matching paths win. Unsafe paths and file/directory conflicts are rejected. ZIP-derived Office/JAR/APK files receive archive treatment; application behavior, installation and signatures are unverified. |

Inputs are limited to 1 GiB each and 2 GiB total; expanded archive contents must remain below 1 GiB per archive and after merging. The output limit is 2 GiB and live temporary storage is bounded to 4 GiB. These are best-effort limits, not a promise that every device can process the maximum. Files are read and written in bounded chunks using temporary browser storage, including above 512 MiB.

## Run locally

Use nvm-managed **Node 24.19.0** and **pnpm 11.25.0**. With nvm for Windows, run `nvm use 24.19.0` after installing it; with nvm-sh use `nvm install` and `nvm use`. Verify `node --version`. Leave global tool installations unchanged. A working Corepack installation can run the commands below as `corepack pnpm …` (`corepack.cmd pnpm …` in PowerShell).

```sh
pnpm install --frozen-lockfile
pnpm serve
```

Open http://localhost:4200/beheader-web/. To exercise the real production build and offline behavior:

```sh
pnpm build
pnpm preview
```

Open http://127.0.0.1:4173/beheader-web/ online and allow the initial cache to finish, then close the page and reopen the same URL with the network disabled. Offline reopening requires a successful initial cache, retained site data and HTTPS or localhost. The development server intentionally does not install the service worker. Normal navigation/reloading automatically checks for and caches new builds in the background; a subsequent page load uses the newest completely cached build. There is no offline-ready message or manual update control, and the app does not reload itself during use. Reloading clears selected files and results.

Do not test offline/storage features through plain HTTP on a LAN IP: it is not a secure browser context.

"Try an example" loads the set for the currently selected language. Edit localized filenames, HTML/PDF text and ZIP entries in `scripts/example-content.json`, then run `python scripts/create-example-documents.py` and rebuild. The script generates both language sets and `public/assets/example/manifest.json`; the image and instrumental tone share language-neutral bytes with translated selection filenames. Both sets are cached for offline use.

## Validate

```sh
pnpm exec playwright install chromium firefox webkit
pnpm check
```

The check runner uses the selected Node for lint, strict application/tooling/worker types, Vitest processing/state/logic tests, a production build, Chromium flows, Firefox/WebKit/mobile acceptance, the audio matrix, and offline asset hashes. No Angular component tests are used. Acceptance results distinguish desktop engines, mobile emulation and real devices; Windows WebKit's reviewed OPFS failure is reported rather than counted as successful Safari generation.

Individual commands are `pnpm lint`, `pnpm typecheck`, `pnpm test:unit`, `pnpm test:e2e`, `pnpm test:acceptance`, and `pnpm test:audio`. Browser suites normally build and start their own production preview. If you deliberately reuse an existing preview, build first and set `BHW_TEST_REUSE_SERVER=1`; `BHW_TEST_PREBUILT=1` also avoids redundant builds. In PowerShell use `$env:BHW_TEST_REUSE_SERVER='1'`. Run suites sequentially because they share the preview port and evidence directory.

After browser checks, validate generated outputs with independent readers (developer Python/Pillow, FFmpeg/FFprobe and Poppler must be available on PATH):

```sh
python scripts/verify-advanced-fixtures.py
python scripts/verify-polyglot-fixtures.py
python scripts/verify-audio-fixtures.py
```

The advanced check includes all 26 combinations and both archive orders. Repeat the first two checks with `BHW_VALIDATION_ROOT=test-results/acceptance/firefox` for Firefox outputs; default evidence is under `test-results/`. The audio check reads both engine directories. Independent readers verify image pixels/transparency, media payload hashes and decoding, PDF rendering and archive contents/offsets. The browser suite also generates and downloads an actual output above 512 MiB, so allow temporary disk space. Reports, traces and generated fixtures are ignored by Git.

## Code and localization

Angular 22 is standalone, zoneless and OnPush, with constructor injection, signal inputs/outputs, NgRx Store/Effects and RxJS. `src/app/core` owns infrastructure, `src/app/feature/generator` owns generator UI/state, `src/app/shared` owns reusable Material-based controls, and `src/lib/polyglot` is framework-independent worker processing. NgRx contains serializable metadata; files, streams and workers stay outside it.

Use `bhw-` selectors, `~bhw/...` aliases, separate HTML/SCSS, two-space indentation, single-quoted TypeScript strings, compact named imports, semicolons and no trailing commas. Keep concise explanatory JSDoc with type annotations. Markdown paragraphs have no maximum column width.

Transloco bundles English and Italian locally, detects browser language, falls back to English and remembers explicit selection. To add a language, extend `src/app/core/model/language.ts`, register its catalog in the translation loader and add a local flag. Catalog tests check key/interpolation parity; the diagnostic code contract is shared across languages.

Processing exposes inspect, plan and generate operations with stable diagnostics, progress, cancellation and file-backed artifact references. One worker job is active at a time. Job UUID directories live only inside `beheader-web-polyglot-v1`; Web Locks protect live tabs during abandoned-job cleanup. Format inspectors enforce additional structure/resource bounds; the processing tests and independent-reader scripts cover their contracts and generated outputs.

Selecting files runs static size/count checks and bounded header/tail detection, then checks roles and supported family combinations. Fixed-budget PDF and media probes identify known unsupported layouts/codecs; image headers expose known unsupported formats, dimensions and animation flags when present. Incomplete metadata is deferred to Combine. Archive indexes, including the HTML asset ZIP, are inspected without extracting payloads; independent archives provide early collision warnings, and HTML/assets declared expanded sizes share their logical allowance. Combine performs full structure/object validation, audio metadata scanning, asset resolution, extraction/integrity checks and generation in one worker operation. Unresolved HTML references require correction or explicit consent before retrying. Quick selection readiness does not advertise validated output interpretations. Selection is limited to 16 input records, including the optional HTML asset ZIP.

The HTML asset ZIP contains local resources referenced by the separately uploaded HTML, preserving relative folders. The HTML is resolved at the ZIP root, with no configurable entry path: `styles/style.css` refers to that exact path inside the ZIP. Nested stylesheets resolve their own relative references, and an explicit `<base>` already present in the HTML retains its normal meaning. No HTML copy is needed inside the ZIP. The localized example uses `page.html` with `styles/style.css` and `images/picture.png` (translated in Italian), then embeds both resources in the standalone result.

Replacing the HTML file also removes its attached asset ZIP. Attach a new ZIP for the replacement document if needed. During combination, the Combine files action becomes Cancel in the same button, immediately available even before progress appears.

Diagnostics identify supported-scope restrictions, measured resource limits, media codec/track problems, image constraints, archive integrity/variant/path failures and HTML/CSS asset problems in both languages. Affected filenames and archive overwrite winners are shown locally. Downloads retain only codes, fixed reason tokens, allowlisted numeric/enum context and catalog explanations; the short Report link includes codes and reasons. Filenames, paths, document contents and raw browser errors remain excluded. Unexpected failures include a known processing stage when available. A previous report containing only `PDF_INVALID` cannot identify the failed check; reproduce it in the current build to obtain the detailed reason. Compatibility progress names the current format-specific work without scanning audio twice.

Private local validation material belongs in `local-validation/`, excluded from Git, lint and production assets. Never commit or publish copied PDFs, generated private polyglots, rendered pages or their source-path audit. Redistributable tests construct their own PDF variations from the existing project fixture.

Additional resource bounds are 64 × 1,024² decoded image pixels (32,767 per dimension), 32 MiB of PDF cross-reference/trailer metadata and one million actual xref records. Sparse PDF object numbers do not cause allocations by their maximum value. ZIP indexes share 32 MiB and 100,000 inspected entries across selected archives and the HTML asset ZIP; the final classic ZIP supports at most 65,534 entries. Paths must fit ZIP's 65,535-byte UTF-8 filename field and remain safe relative paths.

HTML plus the expanded asset ZIP share a 1 GiB logical input allowance. Final bundled HTML is also limited to 1 GiB, including base64 expansion. Parsed HTML/CSS text is limited to 64 MiB per document; HTML allocation/traversal is bounded to one million nodes and reference work to 65,536 operations. CSS import graphs use iterative traversal and cycle detection without a fixed import-depth limit. Binary assets and nested data URLs are streamed directly into the file-backed result; they are not assembled as complete large strings or ArrayBuffers. PDF indexes use bounded windows and batched patches; ZIP directories have explicitly bounded metadata allocations with source reads at most 1 MiB.

The MP3 fallback loads only after the native decoder probe fails and runs inside the existing worker. Its WASM is embedded in a local cached JavaScript chunk. The dependency's small CommonJS browser-worker compatibility adapter is explicitly allowed by the build; the application uses the synchronous decoder inside its own worker and never starts that dependency's nested-worker interface. See `assets/license/MP3-NOTICES.txt` for source and LGPL/MIT notices.

## Release and attribution

The selected square transforming-tile application icon lives in `public/assets/brand/icon.svg`. Run `pnpm icons:generate` to reproduce the larger regular/header/favicon exports and safely padded maskable exports under `public/favicon`, including PNG, SVG, Apple-touch and multi-size ICO variants. The header, install metadata and sharing cards use these same generated assets.

Search metadata is included in the initial HTML: a descriptive title, canonical URL, Open Graph/X cards, WebApplication JSON-LD and readable startup content for clients without JavaScript. English/Italian titles and sharing descriptions follow the runtime language choice; both share one canonical URL, so no separate language URLs are advertised. This single-page app omits a sitemap. A `robots.txt` would have to live at the domain root, outside this project's Pages directory, so none is included. No custom domain is required. Search Console verification and publication remain separate actions.

`pnpm build` writes production assets directly to `docs/` beneath `/beheader-web/`. Generated bytes must remain unchanged for service-worker hashes. The [Pages workflow](.github/workflows/deploy.yml) verifies and uploads **committed `docs/`**; it installs no dependencies and performs no build. It is manual-only and restricted to `main`, so a push does not publish the app. After release authorization, configure the repository's Pages source as GitHub Actions and deliberately run the workflow. It has not been dispatched during implementation.

Beheader Web is GPL-3.0-only; see [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md). Upstream-derived layout/PDF code retains attribution. Local audio dependency licenses/source references, icon licenses and reference-project notices ship under `assets/license` and `assets/icon`; production dependency notices ship in `3rdpartylicenses.txt`. Original examples and processing fixtures are redistributable under this project's license.

Source and funding destinations are [GitHub](https://github.com/Crystal-Spider/beheader-web), [Patreon](https://www.patreon.com/crystalspider) and [Ko-fi](https://ko-fi.com/crystalspider).
