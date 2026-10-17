import {closeSync, createReadStream, mkdirSync, openSync, readSync, statSync, writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {buildSync} from 'esbuild';
import {expect, test} from '@playwright/test';

import {evidenceDirectory} from './evidence';

const worker = buildSync({entryPoints: ['e2e/large-job.worker.ts'], bundle: true, write: false, format: 'iife', platform: 'browser'}).outputFiles[0]!.text;
const harness = buildSync({entryPoints: ['e2e/processing-harness.ts'], bundle: true, write: false, format: 'iife', globalName: 'bhwHarness', platform: 'browser'}).outputFiles[0]!.text;

/** Test-worker metadata only; the generated large payload stays in OPFS. */
interface LargeResult {
  artifact: {jobId: string; id: string; size: number; mediaType: string};
  resources: {large: boolean};
  maxRead: number;
  error?: string;
}
/** Cancellation evidence from the isolated synthetic-source worker. */
interface CancelResult {diagnostic: {code: string}; jobId: string; maxRead: number}

test('generates and downloads an actual output above 512 MiB through bounded file-backed I/O', async({page, browser, browserName}) => {
  test.setTimeout(180000);
  await page.goto('./'); await page.addScriptTag({content: harness});
  const download = page.waitForEvent('download');
  const result = await page.evaluate(async worker => {
    const url = URL.createObjectURL(new Blob([worker], {type: 'text/javascript'}));
    const instance = new Worker(url);
    try {
      const result = await new Promise<LargeResult>((resolve, reject) => {
        instance.onmessage = (event: MessageEvent<LargeResult>) => resolve(event.data); instance.onerror = reject; instance.postMessage({cancel: false});
      });
      if (result.error || !result.artifact) { throw new Error(JSON.stringify(result)); }
      const file = await window.bhwHarness.resolveArtifact(result.artifact);
      const output = URL.createObjectURL(file);
      const link = document.createElement('a'); link.href = output; link.download = 'large-polyglot.pdf'; link.click();
      return result;
    } finally { instance.terminate(); URL.revokeObjectURL(url); }
  }, worker);
  const downloaded = await download;
  const path = (await downloaded.path());
  expect(result.resources.large).toBe(true);
  expect(result.maxRead).toBeLessThanOrEqual(1024 ** 2);
  expect(statSync(path).size).toBe(result.artifact.size);
  expect(result.artifact.size).toBeGreaterThan(512 * 1024 ** 2);
  expect(execFileSync('pdfinfo', [path], {encoding: 'utf8'})).toContain('Pages:           1');
  const handle = openSync(path, 'r'); const prefix = Buffer.alloc(4096);
  try { readSync(handle, prefix, 0, prefix.length, 0); } finally { closeSync(handle); }
  const offset = prefix.indexOf(Buffer.alloc(32, 65)); expect(offset).toBeGreaterThan(0);
  const actual = createHash('sha256');
  for await (const chunk of createReadStream(path, {start: offset, end: offset + 512 * 1024 ** 2})) { actual.update(chunk as Buffer); }
  const expected = createHash('sha256'); const bytes = Buffer.alloc(1024 ** 2, 65);
  for (let index = 0; index < 512; index++) { expected.update(bytes); } expected.update(Buffer.from([65]));
  const hash = actual.digest('hex'); expect(hash).toBe(expected.digest('hex'));
  const directory = evidenceDirectory(browserName);
  mkdirSync(directory, {recursive: true});
  writeFileSync(`${directory}/large-validation.json`, JSON.stringify({engine: browserName, version: browser.version(), size: result.artifact.size, maxRead: result.maxRead, payloadBytes: 512 * 1024 ** 2 + 1, payloadSha256: hash, pdfPages: 1}, null, 2));
  await page.evaluate(async artifact => window.bhwHarness.cleanupJob(artifact.jobId), result.artifact);
});

test('cancels a large streaming composition and removes its actual partial output', async({page}) => {
  await page.goto('./'); await page.addScriptTag({content: harness});
  const result = await page.evaluate(async worker => {
    const url = URL.createObjectURL(new Blob([worker], {type: 'text/javascript'})); const instance = new Worker(url);
    try {
      const result = await new Promise<CancelResult>((resolve, reject) => { instance.onmessage = (event: MessageEvent<CancelResult>) => resolve(event.data); instance.onerror = reject; instance.postMessage({cancel: true}); });
      const root = await window.bhwHarness.storageRoot();
      return {...result, removed: await root.getDirectoryHandle(result.jobId).then(() => false, () => true)};
    } finally { instance.terminate(); URL.revokeObjectURL(url); }
  }, worker);
  expect(result.diagnostic.code).toBe('CANCELLED'); expect(result.removed).toBe(true); expect(result.maxRead).toBeLessThanOrEqual(1024 ** 2);
});
