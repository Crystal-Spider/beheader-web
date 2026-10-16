import {readFileSync} from 'node:fs';
import {ZipWriter, Uint8ArrayReader, Uint8ArrayWriter} from '@zip.js/zip.js';
import {describe, expect, it} from 'vitest';

import {BlobInput} from '../io/blob-input';
import {InputSource, ProcessingContext} from '../model/contract';
import {inspectInputs} from '../logic/inspect';
import {headerPayloadOffset, prepareComposition} from '../logic/compose';
import {inspectArchive} from './archive';
import {bundleHtml} from './html-bundle';

const context: ProcessingContext = {signal: new AbortController().signal, progress: () => {}};
const source = (id: string, name: string, bytes: BlobPart): InputSource => ({id, name, mediaType: '', reader: new BlobInput(new Blob([bytes]))});
const html = (text: string): InputSource => source('html', 'site/index.html', `<!doctype html>${text}`);
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
    const text = await result.blob.text();
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
    const big = {...html(''), reader: {size: 9 * 1024 * 1024, read: (): Promise<Uint8Array<ArrayBuffer>> => Promise.reject(new Error('must not read'))}};
    await expect(bundleHtml(big, undefined, {}, context)).rejects.toMatchObject({diagnostic: {code: 'FORMAT_RESOURCE_LIMIT'}});
    const controller = new AbortController(); controller.abort();
    await expect(bundleHtml(html('<img src="a.png">'), undefined, {}, {...context, signal: controller.signal})).rejects.toMatchObject({diagnostic: {code: 'CANCELLED'}});
  });

  it('does not count auxiliary roles and derives available header space from selected framing', async() => {
    const payload = {...source('raw', 'payload.bin', 'payload'), role: 'appendable' as const};
    const insufficient = [html('<p>Text</p>'), payload];
    expect((await prepareComposition(await inspectInputs(insufficient, context), insufficient, context)).plan.diagnostics).toContainEqual({code: 'MINIMUM_FAMILIES', severity: 'error'});
    const inputs = [html('<p>Text</p>'), source('pdf', 'file.pdf', new Uint8Array(readFileSync('e2e/fixture/classic.pdf'))), {...source('header', 'header.bin', new Uint8Array(234)), role: 'extra-header' as const}];
    const prepared = await prepareComposition(await inspectInputs(inputs, context), inputs, context);
    expect(prepared.plan.diagnostics.some(item => item.code === 'HEADER_SPACE')).toBe(true);
    expect(prepared.plan.headerSpace).toBeLessThan(256 - headerPayloadOffset(true));
  });
});
