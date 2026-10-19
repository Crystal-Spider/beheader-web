import {readFileSync} from 'node:fs';
import {ZipWriter, Uint8ArrayReader, Uint8ArrayWriter} from '@zip.js/zip.js';
import type {Entry} from '@zip.js/zip.js';
import {describe, expect, it} from 'vitest';

import {BlobInput} from '../io/blob-input';
import {InputSource, ProcessingContext} from '../model/contract';
import {inspectInputs} from '../logic/inspect';
import {prepareComposition} from '../logic/compose';
import {inspectArchive} from './archive';
import {bundleHtml} from './html-bundle';
import {HtmlBundle} from './html-bundle';
import {OutputWriter} from '../io/output-writer';

const context: ProcessingContext = {signal: new AbortController().signal, progress: () => {}};
const source = (id: string, name: string, bytes: BlobPart): InputSource => ({id, name, mediaType: '', reader: new BlobInput(new Blob([bytes]))});
const html = (text: string): InputSource => source('html', 'index.html', `<!doctype html><base href="site/">${text}`);
const rendered = async(bundle: HtmlBundle): Promise<string> => {
  const chunks: Uint8Array<ArrayBuffer>[] = [];
  const output = new OutputWriter({write: (_offset, bytes) => { chunks.push(bytes.slice()); return Promise.resolve(); }, close: async() => {}, abort: async() => {}}, bundle.size);
  await bundle.write(output, context);
  expect(output.size).toBe(bundle.size);
  return new Blob(chunks).text();
};
const zip = async(files: Record<string, string>): Promise<InputSource> => {
  const writer = new ZipWriter(new Uint8ArrayWriter(), {useWebWorkers: false});
  for (const [path, text] of Object.entries(files)) { await writer.add(path, new Uint8ArrayReader(new TextEncoder().encode(text))); }
  return {...source('assets', 'assets.zip', await writer.close()), role: 'html-assets'};
};

describe('standalone HTML bundling', () => {
  it('resolves nested CSS, escaped CSS URLs, fonts, images and scripts without executing them', async() => {
    const assets = await zip({'site/css/main.css': '@import "nested.css" screen;h1{background:url(../image.svg)}', 'site/css/nested.css': '@font-face{font-family:test;src:url(../font.woff2)}', 'site/image.svg': '<svg xmlns="http://www.w3.org/2000/svg"/>', 'site/font.woff2': 'font-bytes', 'site/main.js': 'globalThis.bhwExecuted=true;const text="</script>";'});
    const result = await bundleHtml(html('<link rel="stylesheet" href="css/main.css"><img src="image.svg"><script src="main.js"></script><h1>Città 日本語 🙂</h1>'), await inspectArchive(assets, context), {}, context);
    expect(result.references).toEqual([]);
    const text = await rendered(result);
    expect(text).toContain('data:text/css;base64,');
    expect(text).toContain('data:image/svg+xml;base64,');
    expect(text).toContain('data:text/javascript;base64,');
    expect(text).toContain('Città 日本語 🙂');
    expect(text).not.toContain('globalThis.bhwExecuted');
    expect('bhwExecuted' in globalThis).toBe(false);
    const css = Buffer.from(text.match(/data:text\/css;base64,([^"]+)/)![1]!, 'base64').toString();
    expect(css).toContain('data:text/css;base64,');
    expect(css).toContain('data:image/svg+xml;base64,');
  });

  it('terminates cycles and reports missing, remote and unsupported references with explicit continuation', async() => {
    const assets = await zip({'site/a.css': '@import "b.css";', 'site/b.css': '@import "a.css";'});
    const inputs = [html('<link rel="stylesheet" href="a.css"><img src="missing.png"><script type="module" src="module.js"></script><img src="https://example.com/x.png">'), assets, source('pdf', 'file.pdf', new Uint8Array(readFileSync('e2e/fixture/classic.pdf')))];
    const inspection = await inspectInputs(inputs, context);
    const blocked = await prepareComposition(inspection, inputs, context);
    expect(blocked.plan.ready).toBe(false);
    expect(blocked.plan.references?.map(item => item.reason).sort()).toEqual(['cycle', 'missing', 'remote', 'unsupported']);
    const allowed = await prepareComposition(inspection, inputs, context, {allowUnresolved: true});
    expect(allowed.plan.ready).toBe(true);
    expect(allowed.plan.diagnostics).toContainEqual({code: 'HTML_UNRESOLVED', severity: 'warning', details: {count: 4}});
  });

  it('bounds parser inputs before allocation and observes cancellation', async() => {
    const big = {...html(''), reader: {size: 65 * 1024 * 1024, read: (): Promise<Uint8Array<ArrayBuffer>> => Promise.reject(new Error('must not read'))}};
    await expect(bundleHtml(big, undefined, {}, context)).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
    const controller = new AbortController(); controller.abort();
    await expect(bundleHtml(html('<img src="a.png">'), undefined, {}, {...context, signal: controller.signal})).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
  });

  it('does not count an asset ZIP as a second interpretation', async() => {
    const inputs = [html('<p>Text</p>'), await zip({'site/style.css': 'body{color:blue}'})];
    const prepared = await prepareComposition(await inspectInputs(inputs, context), inputs, context);
    expect(prepared.plan.families).toEqual(['html']);
    expect(prepared.plan.diagnostics).toContainEqual({code: 'MINIMUM_FAMILIES', severity: 'info'});
  });

  it('resolves from the ZIP root regardless of the uploaded HTML filename', async() => {
    const assets = await zip({'style.css': 'body{color:blue}'});
    const result = await bundleHtml(source('html', 'arbitrary-name.html', '<!doctype html><link rel="stylesheet" href="style.css">'), await inspectArchive(assets, context), {}, context);
    expect(result.references).toEqual([]);
    expect(await rendered(result)).toContain('data:text/css;base64,');
  });

  it('supports import chains beyond 32 levels and still detects real cycles', async() => {
    const files: Record<string, string> = {};
    for (let index = 0; index < 40; index++) { files[`site/${index}.css`] = index === 39 ? 'p{color:blue}' : `@import "${index + 1}.css";`; }
    const assets = await zip(files);
    const result = await bundleHtml(html('<link rel="stylesheet" href="0.css">'), await inspectArchive(assets, context), {}, context);
    expect(result.references).toEqual([]);
    expect(result.size).toBeGreaterThan(1024 * 1024);
    expect(result.size).toBeLessThan(1024 ** 3);
    let text = await rendered(result);
    for (let index = 0; index < 40; index++) {
      text = Buffer.from(/data:text\/css;base64,([A-Za-z0-9+/=]+)/.exec(text)![1]!, 'base64').toString('utf8');
    }
    expect(text).toBe('p{color:blue}');
  }, 30000);

  it('preserves UTF-8 and resource placeholders across serializer fragment boundaries', async() => {
    const assets = await zip({'site/image.svg': '<svg/>'});
    const unicode = '\ud83d\ude42'.repeat(40000);
    const result = await bundleHtml(html(`<style>:root{--padding:${'x'.repeat(32720)};background:url(image.svg)}</style><p>${unicode}</p>`), await inspectArchive(assets, context), {}, context);
    const text = await rendered(result);
    expect(text).toContain(`<p>${unicode}</p>`);
    expect(text).toContain('data:image/svg+xml;base64,PHN2Zy8+');
    expect(text).not.toMatch(/bhw-[a-f0-9-]{36,}/);
  });

  it('accepts parsed HTML above 8 MiB and serializes deep DOMs without recursion', async() => {
    const text = '<!doctype html><p>' + 'x'.repeat(9 * 1024 * 1024) + '</p>';
    const result = await bundleHtml(source('html', 'page.html', text), undefined, {}, context);
    expect(result.size).toBeGreaterThan(9 * 1024 * 1024);
    const deep = await bundleHtml(source('html', 'page.html', '<!doctype html>' + '<div>'.repeat(12000) + 'deep' + '</div>'.repeat(12000)), undefined, {}, context);
    expect((await rendered(deep)).match(/<div>/g)).toHaveLength(12000);
  }, 30000);

  it('enforces actual asset expansion, cancellation and storage failures while streaming', async() => {
    const entry = (size: number): Entry => ({filename: 'data.bin', directory: false, uncompressedSize: size, getData: async(stream: WritableStream<Uint8Array<ArrayBuffer>>) => {
      const writer = stream.getWriter();
      try { for (let index = 0; index < 3; index++) { await writer.write(new Uint8Array(65536)); } }
      finally { writer.releaseLock(); }
    }}) as unknown as Entry;
    const asset = await zip({});
    const info = await inspectArchive(asset, context);
    const page = source('html', 'page.html', '<!doctype html><img src="data.bin">');
    const dishonest = await bundleHtml(page, {...info, entries: [entry(1)], expandedSize: 1}, {}, context);
    const sink = new OutputWriter({write: async() => {}, close: async() => {}, abort: async() => {}}, 1024 ** 3);
    await expect(dishonest.write(sink, context)).rejects.toMatchObject({diagnostic: {code: 'ARCHIVE_EXPANDED_LIMIT'}});
    const valid = await bundleHtml(page, {...info, entries: [entry(3 * 65536)], expandedSize: 3 * 65536}, {}, context);
    const controller = new AbortController();
    const cancelled = new OutputWriter({write: () => { controller.abort(); return Promise.resolve(); }, close: async() => {}, abort: async() => {}}, 1024 ** 3);
    await expect(valid.write(cancelled, {...context, signal: controller.signal})).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
    const full = new OutputWriter({write: () => Promise.reject(new DOMException('quota', 'QuotaExceededError')), close: async() => {}, abort: async() => {}}, 1024 ** 3);
    await expect(valid.write(full, context)).rejects.toMatchObject({diagnostic: {code: 'STORAGE_FULL'}});
  });
});
