# Attribution

Beheader Web is an independent browser port inspired by [Beheader](https://github.com/p2r3/beheader), created by [p2r3](https://github.com/p2r3). It is not affiliated with or endorsed by upstream.

The project is distributed under GPL version 3; the full license is in `LICENSE`. Retain upstream attribution and source-specific notices when redistributing the application or derived code.

The ICO/MP4 container layout, baseline HTML wrapping, and classic PDF relocation approach in `src/lib/polyglot/logic/generate.ts` and `src/lib/polyglot/format/pdf.ts` are adapted from Beheader's `beheader.js`, by p2r3, under GPL-3.0. The browser I/O, format validation, bounded relocation, and seekable ZIP pipeline are part of this port. Upstream's license remains included in `LICENSE`.

Third-party dependencies retain their own licenses. Production builds emit their license notices in `docs/3rdpartylicenses.txt`.

The optional MP3 decoding fallback uses unmodified `mpg123-decoder` 1.0.3 and its mpg123 WebAssembly library. Wrapper code is MIT licensed; the underlying decoder is LGPL-2.1. Exact source revisions, attribution and license text ship in `assets/license/MP3-NOTICES.txt` and `LGPL-2.1.txt`, including in the offline cache.

Audio processing uses the unmodified, pinned Mediabunny and `@mediabunny/aac-encoder` 1.61.6 packages, by Vanilagy and contributors, under MPL-2.0. The extension bundles a focused FFmpeg AAC encoder as WebAssembly. Local audio component notices and MPL/LGPL license texts are retained under `public/assets/license` and copied to `docs/assets/license`. Exact package/source references and upstream build instructions are recorded there.

Material Design SVG icons are distributed by the `@material-design-icons/svg` package under Apache License 2.0. The selected icon assets and their license are included under `public/assets/icon` and copied into the static build.

The monochrome GitHub, Patreon, and Ko-fi SVG marks come from [Simple Icons](https://github.com/simple-icons/simple-icons), distributed under CC0-1.0; the license is retained in `public/assets/license/SIMPLE-ICONS-CC0.txt`. Brand marks remain the property of their respective owners.

Link-state styling and vertical handle/placeholder drag patterns follow [Game of Life: Tribes](https://github.com/rChimisso/game-of-life-tribes) at commit `6dc4d34e8234791c8cb7c7e7e43a17733535ca4e`. The reference's MIT license is retained in `public/assets/license/GOLT-MIT.txt`; the implementation uses this project's signal APIs, runtime ownership, theme, and accessibility behavior.

The complete project license and attribution also ship as `assets/license/GPL-3.0.txt` and `assets/license/BEHEADER-NOTICES.txt`, and are retained with the static dependency license texts in the offline application cache. Angular’s collected `3rdpartylicenses.txt` is also included at the distribution root.
