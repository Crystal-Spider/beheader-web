# Beheader Web

A local browser app that combines two or more supported format families into one polyglot file. Download the same bytes with different extensions to open their different interpretations. Inspired by [Beheader](https://github.com/p2r3/beheader), by p2r3; this is an independent, unaffiliated project.

**Release preparation:** generation, static HTML asset bundling, audio conversion, English/Italian localization, offline reopening and large-file I/O are implemented. Milestone 10 automated acceptance and release preparation are complete; real Safari and Android results are still pending. The intended public URL is https://crystal-spider.github.io/beheader-web/; publication remains a separate action.

## Use the app

1. Choose files or drop them anywhere on the page. Start with **Try an example** for an original picture, MP3 tone and HTML page.
2. Include at least two different families: image, media, HTML, PDF and archive. Audio and video share one media slot; a video's existing soundtrack is allowed. Correct ambiguous roles using the file card's selector.
3. Optionally supply an HTML asset ZIP, extra-header data or ordered appendables under **Additional payloads**. These do not count as another family. Resolve missing HTML assets or explicitly choose to retain unresolved references.
4. Combine the files, choose an output name and extension, then download. Each extension contains identical bytes. Use a compatible reader for that interpretation and retain the originals.

Files stay on the device. There are no uploads, content editors or in-app previews. Uploaded HTML/scripts are never executed during processing. Generation does not fetch remote resources. Preferences are remembered; selected files and results disappear on reload/close.

Compatible structures matter more than filenames: supported static images become PNG-in-ICO; H.264/AAC MP4 retains encoded media; common audio becomes AAC-LC MP4; PDFs need supported classic cross-reference tables; archives need supported ZIP structures. All 26 subsets of two or more families are covered by fixture checks. See the [image/media](MILESTONE-4.md), [PDF/archive](MILESTONE-5.md), [audio](MILESTONE-6.md) and [HTML asset](MILESTONE-7.md) reports for input scope and consumer limitations. Chromium and Firefox pass the complete combination matrix; Windows WebKit generation remains unverified because of its documented storage limitation.

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

Open http://127.0.0.1:4173/beheader-web/. Wait for **Ready to reopen offline**, close the page, then reopen the same URL with the network disabled. Offline reopening requires an initial successful cache, retained site data and HTTPS or localhost. The development server intentionally does not install the service worker. Updates offer an explicit reload action only while no job is active. Reload clears selected files and results.

Do not test offline/storage features through plain HTTP on a LAN IP: it is not a secure browser context.

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

Processing exposes inspect, plan and generate operations with stable diagnostics, progress, cancellation and file-backed artifact references. One worker job is active at a time. Job UUID directories live only inside `beheader-web-polyglot-v1`; Web Locks protect live tabs during abandoned-job cleanup. See the milestone reports for format constraints, parser/resource limits and implementation evidence.

## Release and attribution

`pnpm build` writes production assets directly to `docs/` beneath `/beheader-web/`. Generated bytes must remain unchanged for service-worker hashes. The [Pages workflow](.github/workflows/deploy.yml) verifies and uploads **committed `docs/`**; it installs no dependencies and performs no build. It is manual-only and restricted to `main`, so a push does not publish the app. After release authorization, configure the repository's Pages source as GitHub Actions and deliberately run the workflow. It has not been dispatched during implementation.

Beheader Web is GPL-3.0-only; see [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md). Upstream-derived layout/PDF code retains attribution. Local audio dependency licenses/source references, icon licenses and reference-project notices ship under `assets/license` and `assets/icon`; production dependency notices ship in `3rdpartylicenses.txt`. Original examples and processing fixtures are redistributable under this project's license.

Source and funding destinations are [GitHub](https://github.com/Crystal-Spider/beheader-web), [Patreon](https://www.patreon.com/crystalspider) and [Ko-fi](https://ko-fi.com/crystalspider).
