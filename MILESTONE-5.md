# Milestone 5: PDF, archives, combinations, and input availability

Completed on 2026-10-16; commit and push authorized after milestone review. This milestone includes the earlier shell refinements. No publication or Milestone 6 implementation is included. `AGENTS.md` remains local and untracked.

## Deliverables

- Classic PDF inspection and bounded relocation, including multiple cross-reference subsections and LF/CRLF records. In-use byte offsets are repaired; free-list object numbers are preserved. Encrypted, incremental, hybrid, and cross-reference-stream structures fail explicitly.
- Seekable ZIP inspection and CRC-checked extraction/repacking through pinned `@zip.js/zip.js` 2.24.0. Expanded data uses job-owned file-backed intermediates, which are discarded after repacking. No complete large archive payload is buffered in memory.
- Selected archive ordering, last-selected overwrite behavior, collision counts, and separate path/input metadata in composition plans. Paths belong to display metadata and must not be included in downloaded diagnostics by default.
- All 26 subsets of two or more supported families. Image and media are optional; only selected, validated families receive output interpretations. Media payloads remain encoded as supplied.
- Separate audio/video badges backed by NgRx selection metadata. Availability derives from the verified combination matrix, occupied roles, ambiguity, size/count limits, and implemented input conversions. Disabled badges are gray, marked with `aria-disabled`, and have translated explanations. A shared accept-filter selector excludes unavailable types for the future picker.
- Bounded cleanup retries for transient OPFS locks after worker termination. Storage-full diagnostics survive ZIP stream wrappers during both expansion and repacking.

The full picker/drop/removal/replacement/archive-order controls remain Milestone 8 work. Its actions must update the existing metadata selection, use the exported availability/filter selectors, and continue to rely on core inspection/planning when picker filters are bypassed. This milestone does not enable the unfinished controls early.

## Validation environment

| Tool/consumer | Verified version and use |
| --- | --- |
| Node | 24.19.0 selected through nvm |
| pnpm | 11.25.0 through Corepack, exact package versions and frozen lockfile |
| Playwright / Chromium | Playwright 1.64.1; Chromium 156.0.8078.4 on Windows; production build served under `/beheader-web/` |
| Pillow | 12.0.0; independent ICO decoding, dimensions, and alpha |
| Poppler | 26.07.0; independent `pdfinfo` parsing and page rendering |
| Python ZIP reader | Standard-library `zipfile`; CRC/content comparisons and independent serialized ZIP-offset checks |
| FFmpeg / FFprobe | Installed 2025-01-27 git-959b799c8d build; full decoding, encoded-payload hashing, and prior-fixture metadata comparisons |

Firefox, WebKit, actual Safari/iOS, Android, and other external consumers remain unverified. Browser/device acceptance is Milestone 10 work. These results establish useful behavior for these fixtures and consumers, not universal consumer compatibility.

## Reproducible family matrix

Each row below passed every selected interpretation check. Image uses `transparent.png`, media uses `video-aac.mp4`, PDF uses `classic.pdf`, and archive uses `first.zip`. HTML is the controlled UTF-8 fixture in `e2e/combinations.spec.ts`, containing accented text, Japanese, and an emoji. Media + PDF + archive rows also exercise relocation of a terminal size-zero `mdat` before appending more containers.

All rows were generated in Chromium 156.0.8078.4. Image, media, and HTML are checked in the browser; all applicable image, media, PDF, and archive interpretations are then checked with independent readers by `scripts/verify-combinations.py`.

| Selected families | Browser interpretations | Independent interpretations | Result |
| --- | --- | --- | --- |
| Image + media | Image, media | Image, media | Pass |
| Image + HTML | Image, HTML | Image | Pass |
| Media + HTML | Media, HTML | Media | Pass |
| Image + media + HTML | Image, media, HTML | Image, media | Pass |
| Image + PDF | Image | Image, PDF | Pass |
| Media + PDF | Media | Media, PDF | Pass |
| Image + media + PDF | Image, media | Image, media, PDF | Pass |
| HTML + PDF | HTML | PDF | Pass |
| Image + HTML + PDF | Image, HTML | Image, PDF | Pass |
| Media + HTML + PDF | Media, HTML | Media, PDF | Pass |
| Image + media + HTML + PDF | Image, media, HTML | Image, media, PDF | Pass |
| Image + archive | Image | Image, archive | Pass |
| Media + archive | Media | Media, archive | Pass |
| Image + media + archive | Image, media | Image, media, archive | Pass |
| HTML + archive | HTML | Archive | Pass |
| Image + HTML + archive | Image, HTML | Image, archive | Pass |
| Media + HTML + archive | Media, HTML | Media, archive | Pass |
| Image + media + HTML + archive | Image, media, HTML | Image, media, archive | Pass |
| PDF + archive | Generation/worker lifecycle | PDF, archive | Pass |
| Image + PDF + archive | Image | Image, PDF, archive | Pass |
| Media + PDF + archive | Media | Media, PDF, archive | Pass |
| Image + media + PDF + archive | Image, media | Image, media, PDF, archive | Pass |
| HTML + PDF + archive | HTML | PDF, archive | Pass |
| Image + HTML + PDF + archive | Image, HTML | Image, PDF, archive | Pass |
| Media + HTML + PDF + archive | Media, HTML | Media, PDF, archive | Pass |
| Image + media + HTML + PDF + archive | Image, media, HTML | Image, media, PDF, archive | Pass |

Every PDF page renders pixel-identically to the original fixture at the tested resolution. Every archive's extracted path/content map matches the source, including UTF-8 paths, binary bytes, and an empty directory. Serialized EOCD/central-directory/local-entry offsets are checked directly so ZIP reader recovery cannot conceal incorrect relocation. Every media `mdat` hash matches the source and full decoding succeeds. ICO dimensions and alpha match, and HTML text/character-set messages survive encoding.

Additional `subsections.pdf` + two-archive fixtures pass in both selected and reversed order. Their matching `shared.txt` paths resolve to the later selected archive, with one reported collision. An incompressible ZIP suffix over 128 KiB verifies that the final PDF `startxref`/EOF marker in the ZIP comment remains usable; both PDF renderings match the source. Original archives are never executed or extracted to user-controlled filesystem paths.

## Supported structure and resource limits

| Area | Current scope |
| --- | --- |
| Selection | At least two different families; one image, one media, one HTML, one PDF, multiple ordered archives; at most 128 total input records |
| Input/output bytes | 1 GiB per input, 2 GiB total input, 2 GiB output; these are best-effort bounds, not a device-capacity guarantee |
| Image/media/HTML | Milestone 4's validated raster formats, H.264 MP4 with optional AAC-LC soundtrack, and UTF-8 HTML; oversized ICO consumer limitations still apply |
| PDF revision | One classic cross-reference revision; `%PDF-1.0` through `%PDF-1.7` or `%PDF-2.0` at the beginning of the supplied input; fixed-width classic entries; LF/CRLF; multiple subsections |
| PDF trailer | Required `/Size` and indirect `/Root`; optional `/Info` and a two-hex-string `/ID`; other keys, comments, or unsupported value grammar are rejected conservatively rather than rewritten speculatively |
| PDF work bounds | Cross-reference/trailer metadata at most 1 MiB; object numbers below 40,000; referenced in-use offsets must point at matching object headers |
| Archive container | Single-disk, unencrypted classic ZIP; STORE/DEFLATE files and empty stored directories; CRC checking and strict local/central agreement during extraction |
| Archive metadata | Central directory at most 1 MiB per input; at most 4,096 entries across the selected archives; relative paths at most 1,024 characters |
| Archive expansion | Each archive and the merged contents must be strictly below 1 GiB; total declared expansion across selected archives at most 2 GiB; enforce actual bytes during extraction too, including overwritten entries |
| Archive paths | Exact slash-normalized matches overwrite in selected order; reject traversal, absolute/drive paths, control characters, symbolic links, and conflicting file/directory ancestry |

PDF validation is a conservative structural check for relocation, not a general PDF conformance validator. Unsupported PDF structures return `PDF_STRUCTURE`, encryption returns `PDF_ENCRYPTED`, and broken offsets/endings return `PDF_INVALID`.

ZIP64, split/encrypted archives, unsupported compression, and unsupported entry variants are format/implementation limits with explicit archive diagnostics. Malformed records, checksum mismatches, and dishonest extracted sizes are rejected. Some malformed structures are rejected inside zip.js before our extraction sink runs and therefore report `ARCHIVE_INVALID`; the application-side byte guard is tested independently. Duplicate raw names inside a single archive may be rejected by strict library validation; overwrite behavior is verified across separately selected archives. Self-extracting/prefixed archive inputs are not advertised as supported by this initial strict reader.

ZIP-derived Office/JAR/APK/EPUB inputs receive archive treatment only. Repacking does not establish application validity, installation, or signature preservation. Results advertise `.zip` until other interpretations have their own consumer evidence.

Unfinished capabilities remain distinguishable from these structure limits: audio conversion, HTML assets, appendables, and extra-header payloads report `IMPLEMENTATION_UNAVAILABLE`. Audio and video are separate input kinds sharing one media family and slot. Asset ZIPs and arbitrary payloads do not satisfy the minimum family count.

## Checks and reproduction

The final milestone checks passed:

- Frozen dependency installation using the selected nvm Node and pinned pnpm.
- ESLint with zero warnings; strict application, tooling, and worker type checks.
- 91 unit tests, including PDF offset/subsection/truncation/resource checks, archive metadata/path/expansion limits, the independent byte guard, role validation outside picker filters, and NgRx availability transitions.
- 66 Chromium flows, including the 26-row matrix, selected/reversed archive order, unsupported/corrupt/encrypted/split/dishonest inputs, CRC mismatch, cancellation/retry during expansion and repacking, and injected quota exhaustion in both archive phases.
- Independent interpretation checks for all 26 matrix outputs, both archive orders, and all seven previous image/media fixtures.
- Production build into `docs/`, with a 339.00 kB initial bundle, lazy worker/ZIP code, local assets, and retained third-party license notices.

```sh
pnpm install --frozen-lockfile
pnpm check
python scripts/verify-combinations.py
python scripts/verify-polyglot-fixtures.py
```

Regenerate document/archive fixtures with `python scripts/create-document-fixtures.py`. The independent checks require developer installations of Pillow, Poppler, and FFmpeg; none are shipped with the application. The bundled Poppler emits optional missing-system-font warnings even for the source PDF; validation allows only those known font-alias warnings and still compares exact rendered pixels. Other parser/render diagnostics fail validation.

Browser/version metadata, per-combination checks, generated files, and rendered pages are written to ignored `test-results/`. Public assets do not include the processing harness, fixtures, or generated examples. No in-app content preview was introduced.

## Next boundary

Stop here for review. Milestone 6 is common audio conversion; Milestone 8 connects the full generator controls to these processing and availability contracts. Offline caching, abandoned-job cleanup, broader browser/device acceptance, deployment automation, and publication remain in their agreed milestones.
