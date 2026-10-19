# Beheader Web

[Beheader Web](https://crystal-spider.github.io/beheader-web/) combines files into a single **polyglot file**: the same bytes can be opened as an image, media, HTML, PDF or ZIP by changing the extension. It is inspired by [Beheader](https://github.com/p2r3/beheader), by [p2r3](https://github.com/p2r3), and is an independent, unaffiliated project.

Everything runs in the browser. Files are not uploaded, and processing does not fetch remote resources. The app supports English and Italian and can reopen offline after its first successful cache.

## Use the app

1. Choose files or drop them on the page. **Try an example** loads a complete set in the selected language, including two archives whose order changes the result.
2. Select at least two different format families. The app detects file roles; use the role selector if a file needs an explicit assignment.
3. If the HTML references local assets, attach an asset ZIP inside its card. Fix unresolved references or explicitly choose to leave them unchanged.
4. Select **Combine files**, then choose the output name and extension and download it. Every extension offered for a result downloads identical bytes.

Keep the original files. A polyglot may work in one reader and be rejected by another. There are no content editors or previews, and supplied HTML and scripts are never executed during processing. Selected files and results are cleared on reload; preferences are remembered.

## Supported files

The five families are image, media, HTML, PDF and archive. Audio and video share one media slot, so a separate audio file cannot be combined with a separate video file. A video's existing soundtrack is allowed. Select one input for each other family, except archives, which can be merged from several files.

| Input | Output and restrictions |
| --- | --- |
| Static PNG, JPEG, GIF, WebP or BMP | Converted to PNG inside an `.ico` file, preserving resolution and transparency. Animated and multipage images are rejected. Some ICO readers, including Chromium's decoder, cannot display entries larger than 256×256 correctly. |
| H.264 MP4 video | Retained as `.mp4`, including optional AAC-LC audio, without video transcoding. Encryption, fragmentation and unsupported track/container structures are rejected. |
| MP3, supported WAV, Ogg Vorbis/Opus, AAC-LC MP4/M4A or ADTS AAC | Compatible AAC packets are preserved; other supported audio is converted to AAC-LC in `.m4a` at 192 kb/s. MP3 has a bundled WASM decoder fallback; Ogg decoding depends on the browser. |
| UTF-8 HTML | Available as `.html` or `.htm`. An optional asset ZIP can supply static images, fonts, CSS and ordinary scripts for inlining. Module dependency rewriting, dynamic requests and remote fetching are outside the bundler's scope. |
| Classic PDF | Available as `.pdf` with object offsets repaired. Only a single classic cross-reference revision is supported. Cross-reference streams, linearization, incremental/hybrid revisions and encryption are rejected. These can be valid PDF layouts that this app does not support. |
| Classic ZIP using STORE or DEFLATE | Extracted and repacked as `.zip`. Later archives overwrite matching earlier paths. ZIP64, encrypted/split archives, unsupported compression, symlinks and unsafe or conflicting paths are rejected. |

Archive inputs appear as reorderable entries inside one shared card. An HTML asset ZIP belongs to its HTML card and does not count as a separate format family. ZIP-based Office, JAR and APK files receive archive treatment only; application behavior and signatures are not guaranteed.

All 26 combinations of two or more families have fixture coverage in Chromium and Firefox. This verifies the tested files and readers, rather than every possible file or application. Real-device checks are still incomplete, particularly Safari audio with the MP3 fallback.

## HTML assets

Upload the HTML separately. Its asset ZIP contains the files it references, with their relative folders preserved:

```text
page.html                         Uploaded as the HTML input
assets.zip                        Attached to the HTML card
  styles/style.css
  images/picture.png
```

In this example, the HTML can refer to `styles/style.css` and `images/picture.png`. It is resolved at the ZIP root; there is no entry-path setting and no need to put another copy of the HTML in the ZIP. A stylesheet's references are relative to that stylesheet, and an HTML-authored `<base>` retains its normal meaning. Replacing the HTML removes the attached ZIP.

## Limits and feedback

The selection limit is 16 files, including an HTML asset ZIP. Each file may be at most 1 GiB, with 2 GiB total input. Expanded contents must stay below 1 GiB per independent archive and for the merged archive. HTML and its expanded assets share a 1 GiB allowance; the bundled HTML may also be at most 1 GiB, including base64 growth. Final output is limited to 2 GiB and live temporary storage to 4 GiB.

Decoded images are limited to 64 × 1,024² pixels and 32,767 pixels per dimension. Parsers also bound metadata and text allocations: PDF and ZIP metadata use 32 MiB budgets, and parsed HTML/CSS text is limited to 64 MiB per document. The format inspectors enforce record, path and traversal limits as well.

These limits do not guarantee that a device has enough memory or storage. Reads and writes are bounded, and large intermediates use browser-managed temporary files. Known size violations are rejected before expensive processing; runtime storage and decoding failures can still occur.

Selecting files runs quick header, size, role and archive-index checks. **Combine files** performs full validation and generation, including long audio scans, HTML asset resolution and archive integrity checks. Its button becomes **Cancel** while combining.

Messages use light blue for information, yellow for warnings and red for errors. Archive overwrite warnings appear during selection. Existing messages remain visible until replacement results arrive. Errors offer **Diagnostics** and **Report**; exports exclude filenames, paths, file contents and raw browser exceptions, retaining fixed codes, specific reasons and safe measurements.

## Run locally

Use **Node 24.19.0** through nvm and **pnpm 11.25.0**, as pinned in the project. With nvm for Windows, install the Node version if needed and run `nvm use 24.19.0`. With nvm-sh, use `nvm install` and `nvm use`. Check `node --version` before installing dependencies.

```sh
pnpm install --frozen-lockfile
pnpm serve
```

Open http://localhost:4200/beheader-web/. If the standalone pnpm launcher fails, a working Corepack installation can run these commands as `corepack pnpm …`, or `corepack.cmd pnpm …` in PowerShell.

To test the production build:

```sh
pnpm build
pnpm preview
```

Open http://127.0.0.1:4173/beheader-web/. Offline reopening requires HTTPS or localhost, a completed initial cache and retained browser site data. The development server does not install the service worker. For an offline check, open the production preview online, allow caching to finish, close it, disable the network and reopen the same URL. Plain HTTP on a LAN IP does not provide the secure context required for storage and offline features.

Updates cache automatically on navigation or reload. A subsequent page load uses the newest completely cached build; the app does not reload an active page or show a manual update button.

## Development

The app uses Angular 22, standalone components, zoneless change detection, OnPush, signals, NgRx Store/Effects and RxJS. Templates and SCSS are separate files. Files, streams and workers stay outside NgRx; the store holds serializable metadata.

| Location | Purpose |
| --- | --- |
| `src/app/core` | App infrastructure, localization, branding and processing service |
| `src/app/feature/generator` | File selection, job state, messages and downloads |
| `src/app/shared` | Reusable Angular Material controls |
| `src/lib/polyglot` | Framework-independent inspection, planning, generation and worker I/O |
| `public` | Assets copied into the production build |
| `e2e` | Browser flows and redistributable fixtures |
| `scripts` | Build checks, asset generators and independent output validators |
| `docs` | Generated production site |

Use two-space indentation, single-quoted TypeScript strings, compact named imports, semicolons and no trailing commas. Prefer signal inputs/outputs, constructor injection, `bhw-` selectors and `~bhw/...` imports. JSDoc should explain contracts and unusual decisions, with typed annotations but no redundant access tags. Markdown paragraphs are not hard-wrapped.

Transloco catalogs live in `src/app/core/i18n`. Adding a language requires a catalog, an entry in `src/app/core/model/language.ts`, registration in the translation loader and a local flag. Catalog tests check matching keys and interpolation parameters.

Edit localized example filenames and contents in `scripts/example-content.json`, then run `python scripts/create-example-documents.py` and rebuild. Regenerate icons with `pnpm icons:generate`; the source artwork is `public/assets/brand/icon.svg`.

## Checks

```sh
pnpm exec playwright install chromium firefox webkit
pnpm check
```

`pnpm check` runs lint, strict application/tooling/worker types, unit tests, the production build, browser and audio suites, and offline asset verification. Individual commands are `pnpm lint`, `pnpm typecheck`, `pnpm test:unit`, `pnpm test:e2e`, `pnpm test:acceptance` and `pnpm test:audio`. There are no Angular component unit tests.

Browser suites normally build and start a production preview. To reuse one, build first and set `BHW_TEST_REUSE_SERVER=1`; `BHW_TEST_PREBUILT=1` skips rebuilding. In PowerShell, use `$env:BHW_TEST_REUSE_SERVER='1'`. Run suites sequentially because they share a preview port and output locations. The large-output checks need temporary disk space and Poppler on PATH.

After browser checks, validate outputs with independent readers. These scripts require Python with Pillow, FFmpeg/FFprobe and Poppler:

```sh
python scripts/verify-advanced-fixtures.py
python scripts/verify-polyglot-fixtures.py
python scripts/verify-audio-fixtures.py
python scripts/verify-mp3-fallback.py
python scripts/verify-resource-limits.py
```

The advanced check covers all 26 combinations and both archive orders. For Firefox outputs, repeat the advanced, polyglot and resource-limit checks with `BHW_VALIDATION_ROOT=test-results/acceptance/firefox`. Audio validators read both engine directories. Reports, traces and generated outputs stay under ignored `test-results/`.

Windows WebKit cannot access the required temporary storage in the test runner. Its shell and standalone decoder checks are useful, but skipped generation tests do not establish Safari support. Mobile emulation also does not replace actual-device testing.

Private test files and their outputs belong in ignored `local-validation/`. Do not add them to fixtures, production assets or commits.

## Hosting and licenses

`pnpm build` writes the static site to `docs/` with base URL `/beheader-web/`. Generated bytes must survive Git checkout unchanged because the service worker verifies their hashes. Run `node scripts/verify-static-assets.mjs` after building.

GitHub Pages can serve committed `docs/` from a branch, or use the manual [deployment workflow](.github/workflows/deploy.yml). That workflow verifies and uploads committed assets without installing dependencies or building them. Automatic publication on push depends on the repository's Pages configuration; the workflow itself runs only when dispatched.

The initial HTML includes search and sharing metadata, a canonical URL and readable startup content. English and Italian use one URL. The project omits a sitemap and project-level `robots.txt`.

Beheader Web is GPL-3.0-only. See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md) for attribution and third-party notices. Dependency licenses are also included in the offline build.

[Source](https://github.com/Crystal-Spider/beheader-web) · [Patreon](https://www.patreon.com/crystalspider) · [Ko-fi](https://ko-fi.com/crystalspider)
