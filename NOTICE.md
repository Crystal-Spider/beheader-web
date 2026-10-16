# Attribution

Beheader Web is an independent browser port inspired by [Beheader](https://github.com/p2r3/beheader), created by [p2r3](https://github.com/p2r3). It is not affiliated with or endorsed by upstream.

The project is distributed under GPL version 3; the full license is in `LICENSE`. Retain upstream attribution and any source-specific notices as processing code is ported in subsequent milestones.

The ICO/MP4 container layout, baseline HTML wrapping, and classic PDF relocation approach in `src/lib/polyglot/logic/generate.ts` and `src/lib/polyglot/format/pdf.ts` are adapted from Beheader's `beheader.js`, by p2r3, under GPL-3.0. The browser I/O, format validation, bounded relocation, and seekable ZIP pipeline are part of this port. Upstream's license remains included in `LICENSE`.

Third-party dependencies retain their own licenses. Production builds emit their license notices in `docs/3rdpartylicenses.txt`.

Audio processing uses the unmodified, pinned Mediabunny and `@mediabunny/aac-encoder` 1.61.6 packages, by Vanilagy and contributors, under MPL-2.0. The extension bundles a focused FFmpeg AAC encoder as WebAssembly. Local audio component notices and MPL/LGPL license texts are retained under `public/assets/license` and copied to `docs/assets/license`. Exact package/source references and upstream build instructions are recorded there.

Material Design SVG icons are distributed by the `@material-design-icons/svg` package under Apache License 2.0. The selected icon assets and their license are included under `public/assets/icon` and copied into the static build.
