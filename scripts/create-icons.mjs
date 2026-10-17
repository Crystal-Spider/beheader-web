import {Buffer} from 'node:buffer';
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {URL, fileURLToPath} from 'node:url';
import {chromium} from '@playwright/test';

// The selected transforming-tile artwork is the canonical source; leave the concept originals alone.
const destination = new URL('../public/favicon/', import.meta.url);
const source = await readFile(new URL('../public/assets/brand/icon.svg', import.meta.url), 'utf8');
if (!source.includes('viewBox="0 0 512 512"')) { throw new Error('Expected the original 512px icon viewport'); }
// Center the 352px square tile with 6% padding for regular exports.
const regular = source.replace('viewBox="0 0 512 512"', 'viewBox="56 56 400 400"');
// Shrink the rounded tile into the central 80% safe circle, retaining an opaque full-size canvas.
const maskable = source.replace(/(<svg\b[^>]*>)/, '$1\n  <path fill="#101114" d="M0 0H512V512H0Z"/>\n  <g transform="translate(30.72 30.72) scale(0.88)">')
  .replace('</svg>', '  </g>\n</svg>');
const browser = await chromium.launch();
let rasters;
try {
  const page = await browser.newPage();
  rasters = await page.evaluate(async({regular, maskable}) => {
    const images = {};
    for (const [name, size, svg] of [
      ['favicon.png', 512, regular],
      ['favicon-192.png', 192, regular],
      ['maskable.png', 512, maskable],
      ['apple-touch.png', 180, regular],
      ...[16, 32, 48].map(size => [`ico-${size}`, size, regular])
    ]) {
      const image = new globalThis.Image();
      image.src = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      await image.decode();
      const canvas = globalThis.document.createElement('canvas');
      canvas.width = canvas.height = size;
      canvas.getContext('2d').drawImage(image, 0, 0, size, size);
      images[name] = canvas.toDataURL('image/png').split(',')[1];
    }
    return images;
  }, {regular, maskable});
} finally { await browser.close(); }

await mkdir(destination, {recursive: true});
await writeFile(new URL('favicon.svg', destination), regular);
await writeFile(new URL('maskable.svg', destination), maskable);
const license = await readFile(new URL('../LICENSE', import.meta.url), 'utf8');
await writeFile(new URL('LICENSE', destination), `${license.trimEnd()}\n`);
for (const name of ['favicon.png', 'favicon-192.png', 'maskable.png', 'apple-touch.png']) {
  await writeFile(new URL(name, destination), Buffer.from(rasters[name], 'base64'));
}

// ICO directory entries point to independently rasterized PNG frames, avoiding a new image dependency.
const sizes = [16, 32, 48];
const frames = sizes.map(size => Buffer.from(rasters[`ico-${size}`], 'base64'));
const directory = Buffer.alloc(6 + sizes.length * 16);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(sizes.length, 4);
let offset = directory.length;
for (const [index, size] of sizes.entries()) {
  const entry = 6 + index * 16;
  directory[entry] = directory[entry + 1] = size;
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frames[index].length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frames[index].length;
}
await writeFile(new URL('favicon.ico', destination), Buffer.concat([directory, ...frames]));
console.log(`Transforming-tile SVG, PNG, maskable, Apple-touch and ICO assets written to ${fileURLToPath(destination)}`);
