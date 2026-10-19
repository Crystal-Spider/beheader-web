# Attribution and licenses

Beheader Web is an independent browser app inspired by [Beheader](https://github.com/p2r3/beheader), created by [p2r3](https://github.com/p2r3). It is not affiliated with or endorsed by upstream.

The project is distributed under GPL-3.0-only; the full text is in [LICENSE](LICENSE). Retain upstream attribution and source-specific notices when redistributing the application or derived code. Third-party components retain their own licenses.

## Beheader

The ICO/MP4 container layout, baseline HTML wrapping and classic PDF relocation approach in `src/lib/polyglot/logic/generate.ts` and `src/lib/polyglot/format/pdf.ts` are adapted from Beheader's `beheader.js`, by p2r3, under GPL-3.0. Browser I/O, format validation, bounded relocation and the seekable ZIP pipeline are implemented in this port.

## Audio dependencies

Mediabunny and `@mediabunny/aac-encoder` 1.61.6, by Vanilagy and contributors, are used unmodified under MPL-2.0. The encoder extension includes a focused FFmpeg AAC encoder as WebAssembly. Package/source references, build instructions and MPL/LGPL license texts are included under `public/assets/license` and copied into the distribution.

The MP3 fallback uses unmodified `mpg123-decoder` 1.0.3 and its mpg123 WebAssembly library. The wrapper is MIT licensed; the underlying decoder is LGPL-2.1. Exact source revisions, attribution and license text are in `public/assets/license/MP3-NOTICES.txt` and `LGPL-2.1.txt`.

## Artwork and interface references

Material Design SVG interface icons come from `@material-design-icons/svg` under Apache License 2.0. Their license is retained under `public/assets/icon`.

The GitHub, Patreon and Ko-fi marks come from [Simple Icons](https://github.com/simple-icons/simple-icons), under CC0-1.0. The license is retained in `public/assets/license/SIMPLE-ICONS-CC0.txt`. Brand marks remain the property of their respective owners.

The application's transforming-tile artwork is `public/assets/brand/icon.svg`. It and its generated favicon, maskable and Apple-touch variants are distributed under this project's GPL-3.0-only license, also included under `public/favicon`.

Link-state styling and vertical drag-handle/placeholder patterns follow [Game of Life: Tribes](https://github.com/rChimisso/game-of-life-tribes) at commit `6dc4d34e8234791c8cb7c7e7e43a17733535ca4e`. Its MIT license is retained in `public/assets/license/GOLT-MIT.txt`.

## Distributed notices

Production builds include `3rdpartylicenses.txt` and local notices under `assets/license`, `assets/icon` and `favicon`. Project/upstream attribution is included in `assets/license/BEHEADER-NOTICES.txt`, with the GPL text in `assets/license/GPL-3.0.txt`. Required notices are retained in the offline cache as well as the static distribution.
