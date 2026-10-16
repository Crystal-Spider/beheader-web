# beheader-web

A browser-only polyglot generator inspired by [Beheader](https://github.com/p2r3/beheader). This is an independent project.

**Status: Milestone 2 — responsive shell and localization.** The app has its initial desktop/mobile interface, English and Italian translations, a keyboard-accessible language selector, and remembered language preferences. File selection and generation are visibly unavailable until their processing milestones are complete.

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

`pnpm check` runs lint, type checking, tests, and the production build. Browser tests build and serve the real production assets under `/beheader-web/`, checking Angular bootstrap, asset paths, localization, keyboard interaction, and responsive layouts.

Vitest covers processing/state/logic behavior, starting with language resolution. No Angular component tests are generated. Playwright covers complete user flows in Chromium; other engine/device acceptance belongs to later milestones.

If the standalone Windows `pnpm.exe` fails in the execution sandbox, invoke the pnpm JavaScript entry point with the active nvm-managed `node`. The check runner also invokes local tools with that same Node, rather than redispatching through a global pnpm installation. Do not substitute another Node runtime.

## Structure and conventions

- `src/app/core`: application infrastructure and services.
- `src/app/feature/generator`: generator page and feature state.
- `src/app/shared/component`: reusable Material-based UI components.
- `src/lib/polyglot`: framework-independent processing, introduced later.
- `e2e`: complete browser flows.

Use standalone zoneless Angular, OnPush components, separate HTML/SCSS, constructor injection, signal inputs/outputs, and strict TypeScript. Use `bhw-` selectors and `~bhw/...` aliases. Formatting follows the reference project's two-space indentation, compact named imports, single-quoted TS strings, semicolons, and no trailing commas. Keep useful JSDoc type annotations and omit redundant access tags. Markdown prose has no column limit: `.editorconfig` disables line-length constraints and Prettier preserves paragraphs without wrapping.

## Languages and local assets

Both translation catalogs are bundled with the app through Transloco. A saved `bhw.language` preference takes precedence over browser languages; regional codes are matched to supported languages, with English as the fallback. Language selection still works if browser storage is unavailable. The document's `lang` attribute updates with the interface.

To add a language, extend the registry in `src/app/core/model/language.ts`, add its catalog and register it in the translation loader, then include its flag SVG under `public/assets/flag`. The Material-based picker reads its trigger and options from the same registry.

Material Design icons and country flags are shipped as local SVGs; no external icon font, translation CDN, or runtime media service is required. This prepares assets for future offline caching, but offline reopening is not implemented yet.

## Static output

`pnpm build` writes the static application directly to `docs/`, with `/beheader-web/` as its base URL. `pnpm preview` serves it at `http://127.0.0.1:4173/beheader-web/`. Generated `docs/` files are intentionally versionable for the eventual GitHub Pages workflow. Deployment automation is a later milestone; nothing is published by a build.

The intended public URL is [crystal-spider.github.io/beheader-web](https://crystal-spider.github.io/beheader-web/).

## Verification

Verified on 2026-10-16 with nvm-managed Node 24.19.0 and pnpm 11.25.0:

- Frozen-lockfile dependency installation.
- ESLint with zero warnings and strict Angular/tooling type checks.
- Production build directly into `docs/`.
- Six passing language-resolution tests: saved preference, browser order/regions, invalid values, and English fallback.
- Eleven passing Chromium production flows under `/beheader-web/`: startup, keyboard language switching, persistence, storage-denied operation, local assets, credit/funding links, and English/Italian layouts at 320, 390, 768, and 1280 pixels.

File processing, generation, offline caching, deployment automation, and non-Chromium browser acceptance remain later milestones.

## License

GPL-3.0-only. See `LICENSE` and [attribution](NOTICE.md).
