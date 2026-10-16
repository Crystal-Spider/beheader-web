# beheader-web

A browser-only polyglot generator inspired by [Beheader](https://github.com/p2r3/beheader). This is an independent project.

**Status: Milestone 3 — processing contracts, workers, and bounded I/O.** The responsive English/Italian shell now has a framework-independent processing foundation behind it. Inspection, role validation, worker ownership, cancellation, and temporary-file I/O are implemented. File selection and generation remain visibly unavailable; no polyglot composition is advertised yet.

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
pnpm exec playwright install chromium
pnpm test:e2e
pnpm build
pnpm preview
```

`pnpm check` runs lint, application/tooling/worker type checking, tests, and the production build. Browser tests build and serve the real production assets under `/beheader-web/`, checking Angular bootstrap, asset paths, localization, keyboard interaction, responsive layouts, dedicated-worker operations, and browser-managed file I/O.

Vitest covers processing/state/logic behavior. No Angular component tests are generated. Playwright covers complete user flows and browser-only processing primitives in Chromium; other engine/device acceptance belongs to later milestones. Its processing harness is bundled by esbuild in memory for tests only and adds no debug hooks or test assets to the application.

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

Material Design icons and country flags are shipped as local SVGs; no external icon font, translation CDN, or runtime media service is required. This prepares assets for future offline caching, but offline reopening is not implemented yet.

## Processing foundation

The shared contract defines inspection, composition planning, and generation with stable diagnostic codes, serializable metadata/progress, interpretation descriptions, cancellation, and opaque artifact references. `Processing` owns a lazy dedicated worker through `WorkerClient`; each worker handles one operation and is terminated on completion, failure, or cancellation. Files and worker/storage handles stay outside NgRx and browser preference storage. Inspection does not require temporary storage.

Before reading content, inspection rejects inputs over 1 GiB, totals over 2 GiB, invalid sizes, and duplicate IDs. Exact limits are accepted for an attempted operation. Detection reads at most 64 KiB from the head and 65,557 bytes from the tail. Signatures and extension/MIME hints are recorded separately; conflicting families require an explicit `FileInput.role` override and reinspection. Detection is provisional: it does not validate codecs, animation, PDF cross-references, archive integrity, or whether a consumer will accept a generated file.

Planning permits one image, one media input, one HTML input, one PDF, and ordered multiple archives. HTML asset ZIPs, appendables, and extra-header data have explicit auxiliary roles and never count toward the minimum of two different families. Asset ZIPs require an HTML input. No combination is ready in Milestone 3: plans contain `IMPLEMENTATION_UNAVAILABLE` and no supported output interpretations; generation fails explicitly at that boundary.

`BlobInput` exposes seekable bounded reads, suitable for future archive-directory inspection without a whole-archive stream buffer. `OutputWriter` copies sequential chunks with backpressure, patches existing offsets, enforces caller-supplied output limits, and rejects unsafe arithmetic or further writes after a sink failure. Each read/write is limited to 1 MiB. The same path works for small and large files; format-specific resource estimation and the full large-job policy remain later work.

`TemporaryStorage` writes to job UUID directories inside the application's `beheader-web-polyglot-v1` OPFS namespace. Artifacts remain file-backed and must be consumed while their workspace is retained. Disposal aborts unfinished streams and removes only the owning job. Forced cancellation terminates the worker before generation-workspace cleanup. Storage denial, quota exhaustion, and cleanup failure produce safe diagnostic codes, without raw browser messages or file names. Abrupt browser/process termination can leave an abandoned workspace; startup cleanup and cross-tab coordination belong to Milestone 9.

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

See [Milestone 3 evidence and limitations](MILESTONE-3.md). Format processing/generation, full generator controls, offline caching, deployment automation, abandoned-job recovery, and non-Chromium browser acceptance remain later milestones.

## License

GPL-3.0-only. See `LICENSE` and [attribution](NOTICE.md).
