import {mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {buildSync} from 'esbuild';
import {ZipWriter, Uint8ArrayReader, Uint8ArrayWriter} from '@zip.js/zip.js';
import {expect, test} from '@playwright/test';

const harness = buildSync({entryPoints: ['e2e/processing-harness.ts'], bundle: true, write: false, format: 'iife', globalName: 'bhwHarness', platform: 'browser'}).outputFiles[0]!.text;

test('bundles nested assets offline and retains all interpretations with ordered advanced payloads', async({page, context}) => {
  const zip = new ZipWriter(new Uint8ArrayWriter(), {useWebWorkers: false});
  for (const [name, bytes] of [
    ['site/css/main.css', new TextEncoder().encode('@import "nested.css" screen;h1{background-image:url(../image.png)}')],
    ['site/css/nested.css', new TextEncoder().encode('h1{color:rgb(1, 2, 3)}')],
    ['site/main.js', new TextEncoder().encode('window.bhwMessage="Città 日本語 🙂 </script>";')],
    ['site/image.png', new Uint8Array(readFileSync('e2e/fixture/transparent.png'))]
  ] as const) { await zip.add(name, new Uint8ArrayReader(bytes)); }
  const files = ['transparent.png', 'video-aac.mp4', 'classic.pdf', 'first.zip'].map(name => ({name, bytes: Array.from(readFileSync(`e2e/fixture/${name}`))}));
  const worker = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
  await page.goto('./');
  await page.addScriptTag({content: harness});
  const result = await page.evaluate(async({files, worker, assets}) => {
    const {WorkerClient, cleanupJob, resolveArtifact} = window.bhwHarness;
    const client = new WorkerClient(() => new Worker(new URL(worker, document.baseURI), {type: 'module'}), cleanupJob);
    const inputs = [
      ...files.map(({name, bytes}) => ({id: name, file: new File([new Uint8Array(bytes)], name)})),
      {id: 'html', file: new File(['<!doctype html><link rel="stylesheet" href="css/main.css"><script src="main.js"></script><h1>Città 日本語 🙂</h1><img src="image.png" srcset="image.png 1x, image.png 2x">'], 'index.html')},
      {id: 'assets', file: new File([new Uint8Array(assets)], 'assets.zip'), role: 'html-assets' as const},
      {id: 'first', file: new File(['FIRST-APPENDABLE'], 'first.bin'), role: 'appendable' as const},
      {id: 'second', file: new File(['SECOND-APPENDABLE'], 'second.bin'), role: 'appendable' as const},
      {id: 'header', file: new File(['HEADER-PAYLOAD'], 'header.bin'), role: 'extra-header' as const}
    ];
    const generated = await client.run({operation: 'generate', inputs, options: {htmlPath: 'site/index.html'}});
    if (generated.operation !== 'generate') { throw new Error('generation failed'); }
    try { return Array.from(new Uint8Array(await (await resolveArtifact(generated.artifact)).arrayBuffer())); }
    finally { await cleanupJob(generated.artifact.jobId); }
  }, {files, worker, assets: Array.from(await zip.close())});
  const bytes = new Uint8Array(result);
  const text = new TextDecoder().decode(bytes);
  expect(text).toContain('HEADER-PAYLOAD');
  expect(text).toContain('FIRST-APPENDABLESECOND-APPENDABLE');
  mkdirSync('test-results/advanced', {recursive: true});
  writeFileSync('test-results/advanced/all.polyglot', bytes);
  await context.setOffline(true);
  await page.evaluate(async bytes => {
    const url = URL.createObjectURL(new Blob([new Uint8Array(bytes)], {type: 'text/html'}));
    const frame = document.createElement('iframe');
    frame.src = url;
    document.body.append(frame);
    await new Promise<void>(resolve => { frame.onload = () => { resolve(); }; });
  }, result);
  const frame = page.frames()[1]!;
  await expect(frame.locator('h1')).toHaveText('Città 日本語 🙂');
  await expect(frame.locator('h1')).toHaveCSS('color', 'rgb(1, 2, 3)');
  expect(await frame.evaluate(() => (window as unknown as {bhwMessage: string}).bhwMessage)).toBe('Città 日本語 🙂 </script>');
  expect(await frame.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
});

test('requires an explicit decision for unresolved resources and rejects unsafe header data', async({page}) => {
  await page.goto('./'); await page.addScriptTag({content: harness});
  const pdf = Array.from(readFileSync('e2e/fixture/classic.pdf'));
  const result = await page.evaluate(async pdf => {
    const {inspectInputs, prepareComposition, BlobInput} = window.bhwHarness;
    const context = {signal: new AbortController().signal, progress: () => {}};
    const sources = [{id: 'html', name: 'index.html', mediaType: '', reader: new BlobInput(new Blob(['<!doctype html><img src="missing.png">']))}, {id: 'pdf', name: 'file.pdf', mediaType: '', reader: new BlobInput(new Blob([new Uint8Array(pdf)]))}];
    const inspection = await inspectInputs(sources, context);
    const blocked = await prepareComposition(inspection, sources, context);
    const allowed = await prepareComposition(inspection, sources, context, {allowUnresolved: true});
    const unsafe = [...sources, {id: 'raw', name: 'header.bin', mediaType: '', reader: new BlobInput(new Blob(['-->'])), role: 'extra-header' as const}];
    const badHeader = await prepareComposition(await inspectInputs(unsafe, context), unsafe, context, {allowUnresolved: true});
    return {blocked: blocked.plan.ready, allowed: allowed.plan.ready, unsafe: badHeader.plan.diagnostics.map(item => item.code)};
  }, pdf);
  expect(result).toEqual({blocked: false, allowed: true, unsafe: ['HTML_UNRESOLVED', 'HEADER_CONTENT']});
});
