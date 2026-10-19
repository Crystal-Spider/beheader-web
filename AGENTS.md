# Development guide

Beheader Web is a browser app for combining two or more file-format families into one polyglot. It is inspired by [Beheader](https://github.com/p2r3/beheader), but is independent and unaffiliated. The [README](README.md) covers usage, supported files, setup and validation. [COMPATIBILITY.md](COMPATIBILITY.md) records format and browser evidence; [DEVICE-CHECKS.md](DEVICE-CHECKS.md) contains the remaining hands-on checks.

This guide records current development conventions and product constraints. Keep it focused on decisions that still affect the code, rather than transcripts, completed milestones or build logs.

## Scope and workflow

- Keep version **1.0.0** unchanged unless a version change is explicitly requested. Builds, fixes and releases do not imply a version bump.
- Keep changes local until a commit or push is requested. Publication and manual deployment need explicit authorization; a previous completed push is not authorization for the next one.
- Keep `AGENTS.md`, `COMPATIBILITY.md` and `DEVICE-CHECKS.md` out of commits unless their inclusion is explicitly requested. Preserve existing staged work rather than changing the index as part of unrelated edits.
- Plan substantial changes in Plan mode, then implement one agreed milestone at a time. Stop at the agreed boundary. Raise material scope changes or demonstrated format/browser limits for review instead of silently dropping a capability.
- Resolve routine implementation details within the agreed scope. Discuss material conflicts between the established conventions and newer Angular practices.
- Preserve upstream attribution and useful behavior; exact upstream bytes and known bugs are not compatibility requirements.

## Toolchain and layout

Use **Node 24.19.0 selected through nvm** and **pnpm 11.25.0**. Leave global installations unchanged. `corepack pnpm` (`corepack.cmd pnpm` in PowerShell) can replace a broken standalone pnpm launcher. Dependencies and the package manager are pinned exactly; retain the lockfile.

The application is Angular 22, standalone, zoneless and OnPush. NgRx Store/Effects and RxJS manage serializable state; signals expose component state and inputs/outputs. Use Angular Material wrappers for shared controls and separate HTML/SCSS files.

| Directory | Responsibility |
| --- | --- |
| `src/app/core` | Infrastructure, localization and processing service |
| `src/app/feature/generator` | Generator interface, state and runtime file ownership |
| `src/app/shared` | Reusable Material-based controls |
| `src/lib/polyglot` | Framework-independent processing and worker contracts |
| `public` | Redistributable static assets |
| `e2e` | Browser tests and original fixtures |
| `scripts` | Validation and reproducible asset generation |
| `docs` | Generated production site, using `/beheader-web/` |

Use singular directory names such as `component`, `service`, `model`, `logic`, `worker` and `redux`. Files use kebab-case; component classes do not need a `Component` suffix. Use `bhw-` selectors and `~bhw/...` aliases.

## Code style

- Two-space indentation, single-quoted TypeScript strings, semicolons and no trailing commas.
- Compact named imports, grouped consistently with nearby code.
- Explicit member accessibility and `readonly` where appropriate.
- Constructor injection and stable signal APIs for component inputs/outputs.
- Strict TypeScript, including unchecked-index protection, and strict Angular templates.
- Concise JSDoc with type annotations: retain typed `@param`, `@returns` and `@type` where applicable. Explain contracts, offsets, format restrictions and unusual decisions. Omit redundant tags such as `@public` and `@readonly`.
- Markdown paragraphs have no maximum column width and must not be manually hard-wrapped.

[Game of Life: Tribes](https://github.com/rChimisso/game-of-life-tribes) is the reference for organization and code style. Follow the conventions above rather than copying its dependencies, CI or obsolete Angular patterns. Attribution for reused patterns is in [NOTICE.md](NOTICE.md).

## Processing contracts

The core exposes inspection, compatibility planning and generation. One job runs in a dedicated worker at a time. Files, streams, temporary storage and worker handles stay outside NgRx; only serializable metadata, progress, diagnostics and artifact references enter the store. Keep translated prose out of the core: use stable diagnostic codes, reason tokens and safe structured context.

Selection checks are quick and bounded: sizes/counts, signatures, role conflicts, known PDF/media/image header restrictions, and ZIP indexes for declared sizes and early archive collisions. Do not scan long audio or extract archives during selection. Incomplete header evidence is deferred to full validation. Readiness to attempt generation is distinct from a validated composition plan.

Combine performs full validation and generation in one operation. Avoid a separate full planning pass that repeats expensive reads. Retain all compatibility diagnostics before allocating output storage. Support cancellation, stale-message rejection, failure cleanup and retry.

Use seekable files and bounded I/O, with reads/writes at most 1 MiB. Do not assemble complete large payloads in an ArrayBuffer or string. ZIP inspection must seek into the file rather than use an adapter that buffers the whole archive. Stream large assets and intermediates to browser-managed temporary storage; parsed text and metadata have separate allocation budgets.

Temporary jobs live only under `beheader-web-polyglot-v1`. Protect live tabs with Web Locks and clean abandoned job directories without touching other applications' data. Input, expansion, output and workspace bounds must be enforced against actual streamed bytes as well as declared metadata. A device can still run out of memory or storage below the allowed limits.

## Format rules

- Support combinations of at least two of image, media, HTML, PDF and archive. Advertise only interpretations backed by fixture and independent-reader checks.
- Allow one image, one media input, one HTML and one PDF, plus multiple archives. Audio and video share the media slot; a video's existing soundtrack is retained.
- Preserve full-resolution static images and transparency. Reject animation and unsupported multipage inputs. Do not resize or reject an otherwise supported image merely to accommodate Chromium's oversized-ICO decoder restriction.
- Retain compatible H.264 MP4 video without transcoding. Preserve compatible AAC; convert other supported audio to AAC-LC at 192 kb/s. The local MP3 fallback is loaded only when native decoding is unavailable; Ogg still depends on native decoders.
- Accept supported classic PDF structures and reject unsupported layouts with specific explanations. A valid PDF can be outside the supported subset.
- Merge archives in displayed order; later matching paths win. Reject unsafe paths, file/directory conflicts, unsupported compression, encryption and unsupported ZIP variants. ZIP-based application formats receive archive treatment only; do not promise preserved signatures or application behavior.
- An HTML asset ZIP belongs to its HTML card and does not count as a family. Resolve the separate HTML at the ZIP root, retain stylesheet-relative references and HTML-authored `<base>` behavior, and remove the ZIP when replacing its HTML.
- Bundle supplied static HTML assets with parsers and safe escaping. Never execute uploaded HTML/scripts or fetch remote assets. Modules and dynamic request rewriting are outside scope. Unresolved references require correction or explicit consent to retain them.
- Raw appendables, extra-header payloads, content editors, previews, a backend and video transcoding are outside the application scope.

Keep the reviewed resource budgets in the inspectors and tests. The main limits are 16 selected files, 1 GiB per input, 2 GiB total input, 2 GiB final output and 4 GiB live temporary storage. Independent archive expansion and merged expansion must stay below 1 GiB. HTML plus expanded assets and the final bundled HTML each have a 1 GiB allowance. Detailed metadata, image and traversal bounds are documented in `COMPATIBILITY.md`.

## Interface behavior

The app has a dark theme with lavender/pink accents and per-format badge tints. Preserve the title gradient and existing artwork. Do not reintroduce hover lifting or added shadows. Corners use 1rem or 50%, with a 0.25rem exception for language flags.

The layout must fit viewports at least 320 CSS pixels wide, including reserved scrollbars. Do not hide overflow to mask layout defects. Keep titles and descriptions free of arbitrary maximum text widths. Respect reduced motion and keyboard/touch interaction. Tab navigation starts in the header and continues into content, without a separate skip-to-content control.

- The header icon and wordmark form the home link. The separate version is 0.75rem and vertically centered; narrow layouts center it below the wordmark and hide the dot.
- The title/guide switch uses a simple text/background crossfade, with aligned headings and an always-visible control. Hovering never switches it. A generated sparkle trail highlights first use until the guide is explicitly opened, remembering that preference per browser. Reduced motion disables the decoration.
- Disabled input badges are visibly gray, use a not-allowed cursor and explain the reason on hover or keyboard focus. Audio/video explanations must mention their shared slot. Picker filters follow availability, but dropped/selected files still need authoritative validation.
- Keep roles to the right of metadata when space allows, and keep each role label/select together when wrapping. Normal cards have restored left padding; only archive subcards reserve a drag rail.
- Archives share one card with nested reorderable entries, per-file replace/remove actions and an overall remove action. Show handles only for multiple archives. Publish the new order before drag cleanup. Support keyboard sorting, immediate touch dragging and ordinary scrolling outside handles; suppress handle tooltips on touch and during dragging.
- Keep 0.75rem between cards and 1rem between cards/messages and adjacent action buttons. Empty messages must occupy no space. Example, combine and download buttons span their available width.
- Preserve normal pointer behavior for select triggers/options, a normal backdrop cursor and visible keyboard focus. Text inputs retain their colored focus border without the unwanted outline.
- The language trigger uses 0.5rem 0.75rem padding, and its option panel aligns to the full padded control, including when scrollable.
- Footer credit links Beheader once, states non-affiliation and includes Source, Patreon and Ko-fi with icons and middle dots. Preserve 1.5rem block padding; center both text groups when the footer wraps.

## Messages and progress

Information is light blue, warnings yellow and errors red. Severity and whether a message blocks generation are separate concerns. Invalid/unsupported formats, role conflicts and resource violations are errors. Archive overwrites and explicitly accepted unresolved references are nonblocking warnings. Unresolved references before consent are errors; storage availability/capacity problems are blocking warnings. Cancellation and role reassignment are information.

Explain the two-family minimum through the disabled Combine tooltip rather than a visible message. Other disabled reasons point to errors/warnings above or active processing. Show Diagnostics and Report only for errors, with Diagnostics on the left and Report on the right; stack them full-width in that order when necessary.

Keep the last completed message snapshot visible while checking or generating. Replace it when new results arrive, even when the list is empty. Only then close the section, retaining inert content for its closing animation. Disable reporting/consent actions while pending. Filenames and archive overwrite details may appear locally; exports must omit names, paths, input IDs, file content and raw exceptions. Retain only codes, allowlisted reasons, safe measurements/enums and translated explanations. Reporting is an explicit user action.

Overall progress is monotonic within an operation and distinct from stage counters. Use format-specific labels, elapsed time, measured remaining estimates and an activity indicator for unmeasured work. Do not add “about” to estimates. Hide progress for work shorter than 250ms; once shown, keep successful progress visible for at least 500ms without delaying finished controls. Errors and cancellation bypass that hold. Combine crossfades to an immediately usable Cancel/close action in the same button.

## Localization, offline use and assets

Bundle English and Italian catalogs, browser-language detection, English fallback and a remembered explicit language choice. Display flags and codes in both the language trigger and option panel. Selected files and results must not survive reload or closure.

Cache the shell, translations, fonts/icons, workers, examples and required WASM locally. Updates cache through normal navigation/reload and take effect on a subsequent load; there is no offline-ready banner, manual update button or forced active-page reload. Local offline/storage checks require HTTPS or localhost.

Examples are generated from `scripts/example-content.json` by `scripts/create-example-documents.py`. The selected language determines filenames and contents. Each example includes all five families, two ordered archives with different greetings at the same path, and a separate HTML asset ZIP. Block generation while an example is loading so it cannot combine an old selection. A newer language request can supersede a pending example.

The canonical icon is `public/assets/brand/icon.svg`; `pnpm icons:generate` produces the regular, maskable, Apple-touch and favicon exports. Keep search/sharing metadata and the single canonical app URL consistent. The project omits a sitemap and project-level `robots.txt`.

## Validation and repository housekeeping

Use meaningful processing/state/logic tests and complete browser flows; there are no Angular component unit tests. Successful generation alone is insufficient: verify outputs with independent image, media, PDF and ZIP readers. Test malformed inputs, offsets, UTF-8, unsupported combinations, collisions, actual expansion, cancellation, quota failures and cleanup as relevant to a change.

Run lint, strict types, relevant tests and the production build for code changes. Verify offline asset hashes after building and against the exact Git bytes before publishing. Run browser suites sequentially unless their shared preview/output ownership is explicitly managed. The README lists commands and independent validators.

Keep automated engine results, mobile emulation and real-device results distinct. Windows WebKit's OPFS failure does not prove a Safari limitation. Current real-device gaps, including iPhone MP3 fallback acceptance, belong in `DEVICE-CHECKS.md`.

Private source PDFs, derived outputs, renders and the external-file audit belong in ignored `local-validation/`, never in fixtures, commits or production assets. Test fixtures must be original or redistributable. Report any external user files inspected or copied during local validation.

Production output is committed under `docs/` when requested. The manual Pages workflow uploads those committed bytes without rebuilding; repository-level Pages settings may separately publish branch content on push. Do not assume that a manual-only workflow prevents automatic branch-based publication.
