import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync, readdirSync} from 'node:fs';
import {resolve, sep} from 'node:path';
import {URL, fileURLToPath} from 'node:url';

// Independent packaging check: offline assets must match the exact bytes in Angular's manifest.
const root = fileURLToPath(new URL('../docs/', import.meta.url));
const prefix = '/beheader-web/';
const manifest = JSON.parse(readFileSync(resolve(root, 'ngsw.json'), 'utf8'));
assert.equal(manifest.index, `${prefix}index.html`);
for (const [url, expected] of Object.entries(manifest.hashTable)) {
  assert.ok(url.startsWith(prefix), `Unexpected cache scope: ${url}`);
  const path = resolve(root, decodeURIComponent(url.slice(prefix.length)));
  assert.ok(path.startsWith(resolve(root) + sep));
  assert.equal(createHash('sha1').update(readFileSync(path)).digest('hex'), expected, url);
}
for (const name of readdirSync(root).filter(name => /^(?:main-|chunk-|worker-[A-Z0-9]{8}\.js$)/.test(name))) {
  assert.ok(Object.hasOwn(manifest.hashTable, prefix + name), `Missing lazy/worker cache entry: ${name}`);
}
for (const name of ['picture.png', 'tone.mp3', 'page.html']) { assert.ok(Object.hasOwn(manifest.hashTable, `${prefix}assets/example/${name}`)); }
assert.ok(manifest.assetGroups.every(group => group.installMode === 'prefetch' && group.updateMode === 'prefetch'));
console.log(`Offline manifest: ${Object.keys(manifest.hashTable).length} asset hashes and all lazy/processing chunks verified`);
