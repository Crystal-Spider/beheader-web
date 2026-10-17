import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync, readdirSync} from 'node:fs';
import {resolve, sep} from 'node:path';
import {URL, fileURLToPath} from 'node:url';
import {parse} from 'parse5';

// Independent packaging check: offline assets must match the exact bytes in Angular's manifest.
const root = fileURLToPath(new URL('../docs/', import.meta.url));
const prefix = '/beheader-web/';
const manifest = JSON.parse(readFileSync(resolve(root, 'ngsw.json'), 'utf8'));
assert.equal(manifest.index, `${prefix}index.html`);
assert.match(readFileSync(resolve(root, 'index.html'), 'utf8'), /<base href="\/beheader-web\/">/);
for (const [url, expected] of Object.entries(manifest.hashTable)) {
  assert.ok(url.startsWith(prefix), `Unexpected cache scope: ${url}`);
  const path = resolve(root, decodeURIComponent(url.slice(prefix.length)));
  assert.ok(path.startsWith(resolve(root) + sep));
  assert.equal(createHash('sha1').update(readFileSync(path)).digest('hex'), expected, url);
}
for (const name of readdirSync(root).filter(name => /^(?:main-|chunk-|worker-[A-Z0-9]{8}\.js$)/.test(name))) {
  assert.ok(Object.hasOwn(manifest.hashTable, prefix + name), `Missing lazy/worker cache entry: ${name}`);
}
const examples = JSON.parse(readFileSync(resolve(root, 'assets/example/manifest.json'), 'utf8'));
assert.ok(Object.hasOwn(manifest.hashTable, `${prefix}assets/example/manifest.json`));
for (const language of ['en', 'it']) {
  assert.equal(examples[language].length, 6);
  for (const asset of examples[language]) { assert.ok(Object.hasOwn(manifest.hashTable, `${prefix}assets/example/${asset.path}`)); }
}
for (const name of ['GPL-3.0.txt', 'BEHEADER-NOTICES.txt', 'AUDIO-NOTICES.txt', 'MPL-2.0.txt', 'LGPL-2.1.txt', 'GOLT-MIT.txt', 'SIMPLE-ICONS-CC0.txt']) {
  assert.ok(Object.hasOwn(manifest.hashTable, `${prefix}assets/license/${name}`), `Missing offline license: ${name}`);
}
assert.ok(readFileSync(resolve(root, '3rdpartylicenses.txt')).length > 0);
const appManifest = JSON.parse(readFileSync(resolve(root, 'site.webmanifest'), 'utf8'));
for (const key of ['id', 'start_url', 'scope']) { assert.equal(appManifest[key], prefix); }
assert.ok(Object.hasOwn(manifest.hashTable, `${prefix}site.webmanifest`));
for (const icon of appManifest.icons) {
  const url = new URL(icon.src, `https://example.invalid${prefix}site.webmanifest`);
  assert.equal(url.origin, 'https://example.invalid');
  assert.ok(url.pathname.startsWith(`${prefix}favicon/`));
  assert.ok(Object.hasOwn(manifest.hashTable, url.pathname), `Missing offline app icon: ${icon.src}`);
  if (icon.type === 'image/png') {
    const bytes = readFileSync(resolve(root, url.pathname.slice(prefix.length)));
    assert.equal(`${bytes.readUInt32BE(16)}x${bytes.readUInt32BE(20)}`, icon.sizes);
  }
}
for (const name of ['apple-touch.png', 'favicon.ico', 'LICENSE']) {
  assert.ok(Object.hasOwn(manifest.hashTable, `${prefix}favicon/${name}`), `Missing offline favicon asset: ${name}`);
}
assert.ok(Object.hasOwn(manifest.hashTable, `${prefix}assets/brand/icon.svg`), 'Missing offline canonical icon artwork');
const ico = readFileSync(resolve(root, 'favicon/favicon.ico'));
assert.equal(ico.readUInt16LE(0), 0);
assert.equal(ico.readUInt16LE(2), 1);
assert.equal(ico.readUInt16LE(4), 3);
for (const [index, size] of [16, 32, 48].entries()) {
  const entry = 6 + index * 16;
  assert.equal(ico[entry], size);
  assert.equal(ico[entry + 1], size);
  const offset = ico.readUInt32LE(entry + 12);
  assert.equal(ico.readUInt32BE(offset + 16), size);
  assert.equal(ico.readUInt32BE(offset + 20), size);
  assert.ok(offset + ico.readUInt32LE(entry + 8) <= ico.length);
}
assert.ok(manifest.assetGroups.every(group => group.installMode === 'prefetch' && group.updateMode === 'prefetch'));
const page = parse(readFileSync(resolve(root, 'index.html'), 'utf8'));
const elements = [];
const collect = node => {
  if (node.tagName) { elements.push(node); }
  for (const child of node.childNodes ?? []) { collect(child); }
};
collect(page);
const attribute = (node, name) => node.attrs.find(attr => attr.name === name)?.value;
const meta = name => elements.find(node => node.tagName === 'meta' && (attribute(node, 'name') === name || attribute(node, 'property') === name));
const homepage = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).homepage;
const copy = JSON.parse(readFileSync(new URL('../src/app/core/i18n/en.json', import.meta.url), 'utf8')).seo;
const canonicals = elements.filter(node => node.tagName === 'link' && attribute(node, 'rel') === 'canonical');
assert.equal(canonicals.length, 1);
assert.equal(attribute(canonicals[0], 'href'), homepage);
const title = elements.find(node => node.tagName === 'title').childNodes.map(node => node.value ?? '').join('');
assert.equal(title, copy.title);
for (const name of ['description', 'og:description', 'twitter:description']) { assert.equal(attribute(meta(name), 'content'), copy.description); }
for (const name of ['og:title', 'twitter:title']) { assert.equal(attribute(meta(name), 'content'), title); }
assert.equal(attribute(meta('og:url'), 'content'), homepage);
const schema = JSON.parse(elements.find(node => node.tagName === 'script' && attribute(node, 'id') === 'application-schema').childNodes.map(node => node.value ?? '').join(''));
assert.equal(schema.url, homepage);
assert.equal(schema.description, copy.description);
assert.equal(schema['@type'], 'WebApplication');
const image = attribute(meta('og:image'), 'content');
assert.equal(attribute(meta('twitter:image'), 'content'), image);
assert.equal(schema.image, image);
assert.ok(image.startsWith(homepage));
assert.ok(Object.hasOwn(manifest.hashTable, new URL(image).pathname));
console.log(`Offline manifest: ${Object.keys(manifest.hashTable).length} asset hashes and all lazy/processing chunks verified`);
