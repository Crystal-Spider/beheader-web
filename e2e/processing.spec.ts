import {readdirSync} from 'node:fs';
import {buildSync} from 'esbuild';
import {expect, test} from '@playwright/test';

import type * as Harness from './processing-harness';

declare global {
  /** Test-only exports injected into a fresh browser context, without product debug hooks. */
  interface Window {
    bhwHarness: typeof Harness;
  }
}

const harness = buildSync({entryPoints: ['e2e/processing-harness.ts'], bundle: true, write: false, format: 'iife', globalName: 'bhwHarness', platform: 'browser'}).outputFiles[0]!.text;
const interruptedWorker = buildSync({entryPoints: ['e2e/interrupted-job.worker.ts'], bundle: true, write: false, format: 'iife', platform: 'browser'}).outputFiles[0]!.text;

test.beforeEach(async({page}) => {
  await page.goto('./');
  await page.addScriptTag({content: harness});
});

test('uses the production worker for real File cloning, inspection, planning, cancellation, and retry', async({page}) => {
  const workerFile = readdirSync('docs').find(name => /^worker-.*\.js$/.test(name));
  expect(workerFile).toBeDefined();
  const result = await page.evaluate(async workerFile => {
    const {WorkerClient, cleanupJob, diagnose} = window.bhwHarness;
    const client = new WorkerClient(() => new Worker(new URL(workerFile!, document.baseURI), {type: 'module'}), cleanupJob);
    const inputs = [{id: 'html', file: new File(['<!doctype html><title>città</title>'], 'page.html')}, {id: 'pdf', file: new File(['%PDF-1.4'], 'page.pdf')}];
    const inspection = await client.run({operation: 'inspect', inputs});
    const plan = await client.run({operation: 'plan', inputs});
    const cancelled = client.run({operation: 'inspect', inputs}).catch(diagnose);
    await client.cancel();
    const cancellation = await cancelled;
    const retry = await client.run({operation: 'inspect', inputs});
    return {inspection, plan, cancellation, retry, busy: client.busy, storage: Object.keys(localStorage)};
  }, workerFile);
  expect(result.inspection).toMatchObject({operation: 'inspect', inspection: {inputs: [{role: 'html'}, {role: 'pdf'}]}});
  expect(result.plan).toMatchObject({operation: 'plan', plan: {ready: false, families: ['html', 'pdf'], interpretations: []}});
  expect(result.cancellation).toMatchObject({code: 'CANCELLED'});
  expect(result.retry.operation).toBe('inspect');
  expect(result.busy).toBe(false);
  expect(result.storage).toEqual([]);
  await page.reload();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([]);
  await expect(page.getByRole('button', {name: 'Choose files', exact: true})).toBeDisabled();
});

test('writes, patches, and reads file-backed artifacts, then cleans only the owning job', async({page}) => {
  const result = await page.evaluate(async() => {
    const {TemporaryStorage, BlobInput, CHUNK_BYTES, STORAGE_DIRECTORY, diagnose} = window.bhwHarness;
    const origin = await navigator.storage.getDirectory();
    const otherApp = await origin.getDirectoryHandle('unrelated-test-app', {create: true});
    await otherApp.getFileHandle('keep', {create: true});
    const job = crypto.randomUUID();
    const storage = await TemporaryStorage.create(job);
    const otherJob = await TemporaryStorage.create(crypto.randomUUID());
    const {id, writer} = await storage.createOutput(3 * CHUNK_BYTES);
    const input = new BlobInput(new Blob([new Uint8Array(CHUNK_BYTES).fill(7), new Uint8Array(CHUNK_BYTES).fill(8), new Uint8Array([9])]));
    const signal = new AbortController().signal;
    await writer.copy(input, 0, input.size, {signal, progress: () => {}});
    await writer.patch(CHUNK_BYTES - 1, new Uint8Array([3, 4]), signal);
    const artifact = await writer.finish(job, id, 'application/octet-stream', signal);
    const file = await storage.resolve(artifact);
    const aroundPatch = Array.from(new Uint8Array(await file.slice(CHUNK_BYTES - 2, CHUNK_BYTES + 2).arrayBuffer()));
    const lastByte = Array.from(new Uint8Array(await file.slice(-1).arrayBuffer()));
    const duplicate = await TemporaryStorage.create(job).then(() => null, diagnose);
    const crossJob = await otherJob.resolve(artifact).then(() => null, diagnose);
    await storage.dispose();
    await storage.dispose();
    const root = await origin.getDirectoryHandle(STORAGE_DIRECTORY);
    const removed = await root.getDirectoryHandle(job).then(() => false, () => true);
    const retainedOtherJob = (await root.getDirectoryHandle(otherJob.jobId)).name === otherJob.jobId;
    const retainedOtherApp = (await otherApp.getFileHandle('keep')).name === 'keep';
    await otherJob.dispose();
    await origin.removeEntry('unrelated-test-app', {recursive: true});
    return {size: artifact.size, aroundPatch, lastByte, duplicate, crossJob, removed, retainedOtherJob, retainedOtherApp};
  });
  expect(result).toMatchObject({size: 2 * 1024 * 1024 + 1, aroundPatch: [7, 3, 4, 8], lastByte: [9], duplicate: {code: 'JOB_BUSY'}, crossJob: {code: 'INVALID_REQUEST'}, removed: true, retainedOtherJob: true, retainedOtherApp: true});
});

test('cleans a partially written workspace after forcibly terminating its worker', async({page}) => {
  const result = await page.evaluate(async script => {
    const {WorkerClient, cleanupJob, storageRoot, diagnose} = window.bhwHarness;
    const url = URL.createObjectURL(new Blob([script], {type: 'text/javascript'}));
    let jobId = '';
    let ready: (() => void) | undefined;
    const writing = new Promise<void>(resolve => { ready = resolve; });
    const client = new WorkerClient(() => {
      const worker = new Worker(url);
      worker.addEventListener('message', (event: MessageEvent<{jobId: string}>) => { jobId = event.data.jobId; });
      return worker;
    }, cleanupJob);
    const completion = client.run({operation: 'generate', inputs: []}, () => { ready?.(); }).catch(diagnose);
    await writing;
    await client.cancel();
    const outcome = await completion;
    const root = await storageRoot();
    const removed = await root.getDirectoryHandle(jobId).then(() => false, () => true);
    URL.revokeObjectURL(url);
    return {outcome, removed, busy: client.busy};
  }, interruptedWorker);
  expect(result).toEqual({outcome: {code: 'CANCELLED', severity: 'error'}, removed: true, busy: false});
});

test('reports unsupported storage, quota failures, and invalid cleanup paths safely', async({page}) => {
  const result = await page.evaluate(async() => {
    const {TemporaryStorage, storageRoot, cleanupJob, diagnose} = window.bhwHarness;
    const manager = navigator.storage;
    const originalGetDirectory = manager.getDirectory.bind(manager);
    Object.defineProperty(manager, 'getDirectory', {value: () => Promise.reject(new DOMException('private details', 'SecurityError')), configurable: true});
    const denied = await storageRoot().then(() => null, diagnose);
    Object.defineProperty(manager, 'getDirectory', {value: originalGetDirectory, configurable: true});
    const storage = await TemporaryStorage.create(crypto.randomUUID());
    const originalCreate = Object.getOwnPropertyDescriptor(FileSystemFileHandle.prototype, 'createWritable')!;
    FileSystemFileHandle.prototype.createWritable = () => Promise.reject(new DOMException('private details', 'QuotaExceededError'));
    const quota = await storage.createOutput(10).then(() => null, diagnose);
    Object.defineProperty(FileSystemFileHandle.prototype, 'createWritable', originalCreate);
    await storage.dispose();
    const invalidPath = await cleanupJob('../other-app').then(() => null, diagnose);
    return {denied, quota, invalidPath};
  });
  expect(result).toEqual({denied: {code: 'STORAGE_UNAVAILABLE', severity: 'error'}, quota: {code: 'STORAGE_FULL', severity: 'error'}, invalidPath: {code: 'INVALID_REQUEST', severity: 'error'}});
});
