import {readFileSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {Reader, ZipWriter, Uint8ArrayWriter} from '@zip.js/zip.js';
import {buildSync} from 'esbuild';
import {expect, test} from '@playwright/test';

import {evidenceDirectory} from './evidence';

const harness = buildSync({entryPoints: ['e2e/processing-harness.ts'], bundle: true, write: false, format: 'iife', globalName: 'bhwHarness', platform: 'browser'}).outputFiles[0]!.text;

/** Deterministic compressible fixture, generated in bounded reads rather than a complete payload buffer. */
class PatternReader extends Reader<Uint8Array> {
  /** @param {number} size Desired uncompressed fixture bytes. */
  public constructor(size: number) { super(new Uint8Array(0)); this.size = size; }
  /**
   * @param {number} offset Requested source position.
   * @param {number} length Bounded requested bytes.
   * @returns {Promise<Uint8Array<ArrayBuffer>>} Reproducible original bytes.
   */
  public override readUint8Array(offset: number, length: number): Promise<Uint8Array<ArrayBuffer>> {
    expect(length).toBeLessThanOrEqual(1024 * 1024);
    return Promise.resolve(Uint8Array.from({length}, (_, index) => (offset + index) % 251));
  }
}

test('generates with a streamed large HTML asset, larger PDF index and 5,000-entry ZIP', async({page, browserName, browser}) => {
  test.setTimeout(180000);
  const size = 64 * 1024 * 1024 + 5;
  const assets = new ZipWriter(new Uint8ArrayWriter(), {useWebWorkers: false, level: 1});
  await assets.add('large.bin', new PatternReader(size));
  const assetBytes = await assets.close();
  const zip = new ZipWriter(new Uint8ArrayWriter(), {useWebWorkers: false, extendedTimestamp: false});
  for (let index = 0; index < 5000; index++) { await zip.add(`${index}-${'x'.repeat(200)}/`, undefined, {directory: true}); }
  const archive = await zip.close();
  const original = readFileSync('e2e/fixture/classic.pdf', 'latin1');
  const xref = Number(/startxref\s+(\d+)\s+%%EOF\s*$/.exec(original)![1]);
  const rows = original.slice(xref).match(/\d{10} \d{5} [nf](?: \n| \r|\r\n)/g)!;
  const pdf = original.slice(0, xref) + 'xref\n0 60000\n' + rows.join('') + '0000000000 00000 f \n'.repeat(60000 - rows.length)
    + original.slice(original.indexOf('trailer', xref)).replace(/\/Size\s+\d+/, '/Size 60000');
  await page.goto('./');
  const storage = await page.evaluate(async() => navigator.storage.getDirectory().then(() => true, () => false));
  test.skip(!storage, 'This runner cannot open OPFS; the large generation flow requires temporary storage.');
  await page.addScriptTag({content: harness});
  const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
  const downloading = page.waitForEvent('download', {timeout: 150000});
  const result = await page.evaluate(async({workerFile, assets, archive, pdf, expectedSize}) => {
    const {WorkerClient, cleanupJob, resolveArtifact} = window.bhwHarness;
    const client = new WorkerClient(() => new Worker(new URL(workerFile, document.baseURI), {type: 'module'}), cleanupJob);
    const inputs = [
      {id: 'html', file: new File(['<!doctype html><p>Large asset</p><img src="large.bin">'], 'page.html')},
      {id: 'assets', file: new File([new Uint8Array(assets)], 'assets.zip'), role: 'html-assets' as const},
      {id: 'pdf', file: new File([new Uint8Array(pdf)], 'document.pdf')},
      {id: 'archive', file: new File([new Uint8Array(archive)], 'archive.zip')}
    ];
    const inspection = await client.run({operation: 'inspect', inputs});
    if (inspection.operation !== 'inspect' || inspection.inspection.diagnostics.length) { throw new Error(JSON.stringify(inspection)); }
    const generated = await client.run({operation: 'generate', inputs});
    if (generated.operation !== 'generate') { throw new Error(JSON.stringify(generated)); }
    const file = await resolveArtifact(generated.artifact);
    if (file.size <= expectedSize * 4 / 3) { throw new Error('Missing expanded HTML asset'); }
    const url = URL.createObjectURL(file);
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'large-resources.polyglot';
    document.body.append(anchor); anchor.click(); anchor.remove();
    return {artifact: generated.artifact, interpretations: generated.interpretations, url};
  }, {workerFile, assets: Array.from(assetBytes), archive: Array.from(archive), pdf: Array.from(Buffer.from(pdf, 'latin1')), expectedSize: size});
  // Blob-backed browser download remains valid while the owning workspace is retained.
  const download = await downloading;
  const directory = `${evidenceDirectory(browserName)}/resource-limits`;
  mkdirSync(directory, {recursive: true});
  await download.saveAs(`${directory}/large-resources.polyglot`);
  await page.evaluate(async({artifact, url}) => { URL.revokeObjectURL(url); await window.bhwHarness.cleanupJob(artifact.jobId); }, result);
  expect(result.interpretations.map(item => item.family)).toEqual(['html', 'pdf', 'archive']);
  writeFileSync(`${directory}/environment.json`, JSON.stringify({engine: browserName, version: browser.version(), platform: process.platform, assetBytes: size, archiveEntries: 5000, pdfEntries: 60000}));
});
