import {mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {buildSync} from 'esbuild';
import {expect, test} from '@playwright/test';

import {evidenceDirectory} from './evidence';

const harness = buildSync({entryPoints: ['e2e/processing-harness.ts'], bundle: true, write: false, format: 'iife', globalName: 'bhwHarness', platform: 'browser'}).outputFiles[0]!.text;
const families = ['image', 'media', 'html', 'pdf', 'archive'] as const;
const fixtures = {'image': 'transparent.png', 'media': 'video-aac.mp4', 'pdf': 'classic.pdf', 'archive': 'first.zip'};

test.beforeEach(async({page}) => {
  await page.goto('./');
  await page.addScriptTag({content: harness});
});

for (let mask = 1; mask < 32; mask++) {
  const selected = families.filter((_, index) => mask & (1 << index));
  if (selected.length < 2) { continue; }
  test(`validates the ${selected.join(' + ')} combination`, async({page, browser, browserName}) => {
    const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
    const inputs = selected.map(family => ({id: family, name: family === 'html' ? 'page.html' : fixtures[family], bytes: family === 'html'
      ? Array.from(new TextEncoder().encode('<!doctype html><html><head><meta charset="utf-8"><title>Città 🙂</title></head><body><h1 id="fixture">Città, 日本語, 🙂</h1><script>parent.postMessage({fixture:document.getElementById("fixture").textContent,charset:document.characterSet},"*")</script></body></html>'))
      : Array.from(readFileSync(`e2e/fixture/${fixtures[family]}`))}));
    const result = await page.evaluate(async({inputs, workerFile, selected}) => {
      const {WorkerClient, cleanupJob, resolveArtifact} = window.bhwHarness;
      const client = new WorkerClient(() => new Worker(new URL(workerFile, document.baseURI), {type: 'module'}), cleanupJob);
      const files = inputs.map(input => ({id: input.id, file: new File([new Uint8Array(input.bytes)], input.name)}));
      if (selected.includes('media') && selected.includes('pdf') && selected.includes('archive')) {
        const media = inputs.find(input => input.id === 'media')!;
        const bytes = new Uint8Array(media.bytes);
        const view = new DataView(bytes.buffer);
        for (let offset = 0; offset < bytes.length;) {
          const size = view.getUint32(offset);
          if (offset + size === bytes.length && String.fromCharCode(...bytes.subarray(offset + 4, offset + 8)) === 'mdat') { view.setUint32(offset, 0); }
          offset += size;
        }
        files.find(input => input.id === 'media')!.file = new File([bytes], media.name);
      }
      const plan = await client.run({operation: 'plan', inputs: files});
      if (plan.operation !== 'plan' || !plan.plan.ready) { throw new Error(JSON.stringify(plan)); }
      const generated = await client.run({operation: 'generate', inputs: files});
      if (generated.operation !== 'generate') { throw new Error(JSON.stringify(generated)); }
      try {
        const file = await resolveArtifact(generated.artifact);
        if (selected.includes('image')) {
          const url = URL.createObjectURL(new Blob([file], {type: 'image/x-icon'}));
          try {
            const image = new Image();
            image.src = url;
            await image.decode();
            if (image.naturalWidth !== 32 || image.naturalHeight !== 24) { throw new Error('Image dimensions'); }
          } finally { URL.revokeObjectURL(url); }
        }
        if (selected.includes('media')) {
          const url = URL.createObjectURL(new Blob([file], {type: 'video/mp4'}));
          const video = document.createElement('video');
          video.muted = true;
          video.src = url;
          try {
            await new Promise<void>((resolve, reject) => {
              video.onloadeddata = () => { resolve(); };
              video.onerror = () => { reject(new Error('Media decoding failed')); };
            });
            if (video.duration !== 1 || video.videoWidth !== 64 || video.videoHeight !== 48) { throw new Error(`Media metadata ${video.duration} ${video.videoWidth} ${video.videoHeight}`); }
            await video.play();
            await new Promise<void>(resolve => { video.onended = () => { resolve(); }; });
          } finally { video.removeAttribute('src'); video.load(); URL.revokeObjectURL(url); }
        }
        if (selected.includes('html')) {
          const url = URL.createObjectURL(new Blob([file], {type: 'text/html'}));
          const frame = document.createElement('iframe');
          frame.setAttribute('sandbox', 'allow-scripts');
          frame.src = url;
          let message: unknown;
          const listener = (event: MessageEvent<unknown>): void => { if (event.source === frame.contentWindow) { message = event.data; } };
          window.addEventListener('message', listener);
          try {
            await new Promise<void>(resolve => { frame.onload = () => { resolve(); }; document.body.append(frame); });
            await new Promise(resolve => { setTimeout(resolve, 0); });
            if (JSON.stringify(message) !== JSON.stringify({fixture: 'Città, 日本語, 🙂', charset: 'UTF-8'})) { throw new Error(`HTML: ${JSON.stringify(message)}`); }
          } finally { window.removeEventListener('message', listener); frame.remove(); URL.revokeObjectURL(url); }
        }
        // Test fixtures are tiny; the production path resolves a file-backed artifact without materializing it.
        return {bytes: Array.from(new Uint8Array(await file.arrayBuffer())), families: generated.interpretations.map(item => item.family)};
      } finally { await cleanupJob(generated.artifact.jobId); }
    }, {inputs, workerFile, selected});
    expect(result.families).toEqual(selected);
    const directory = evidenceDirectory(browserName);
    mkdirSync(`${directory}/combinations`, {recursive: true});
    writeFileSync(`${directory}/combinations/${selected.join('-')}.polyglot`, new Uint8Array(result.bytes));
    writeFileSync(`${directory}/combination-browser.json`, JSON.stringify({engine: browserName, version: browser.version(), platform: process.platform}));
  });
}

for (const [name, expected] of [
  ['encrypted.pdf', 'PDF_ENCRYPTED'], ['incremental.pdf', 'PDF_STRUCTURE'],
  ['unsafe.zip', 'ARCHIVE_INVALID'], ['oversized-expanded.zip', 'ARCHIVE_EXPANDED_LIMIT'],
  ['encrypted.zip', 'ARCHIVE_ENCRYPTED'], ['split.zip', 'ARCHIVE_SPLIT'], ['corrupt.zip', 'ARCHIVE_INVALID'],
  ['dishonest-expanded.zip', 'ARCHIVE_INVALID'], ['crc-mismatch.zip', 'ARCHIVE_INVALID'],
  ['unsupported-method.zip', 'ARCHIVE_UNSUPPORTED']
] as const) {
  test(`rejects ${name} and cleans generation storage`, async({page}) => {
    const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
    const result = await page.evaluate(async({name, expected, bytes, workerFile}) => {
      const {WorkerClient, cleanupJob, storageRoot, diagnose} = window.bhwHarness;
      let jobId = '';
      const client = new WorkerClient(() => {
        const worker = new Worker(new URL(workerFile, document.baseURI), {type: 'module'});
        worker.addEventListener('message', (event: MessageEvent<{jobId: string}>) => { jobId = event.data.jobId; });
        return worker;
      }, cleanupJob);
      const result = await client.run({operation: 'generate', inputs: [
        {id: 'html', file: new File(['<!doctype html><title>fixture</title>'], 'page.html')},
        {id: 'bad', file: new File([new Uint8Array(bytes)], name)}
      ]}).catch(diagnose);
      const root = await storageRoot();
      return {result, expected, removed: await root.getDirectoryHandle(jobId).then(() => false, () => true)};
    }, {name, expected, bytes: Array.from(readFileSync(`e2e/fixture/${name}`)), workerFile});
    expect(result.result).toMatchObject({code: expected});
    expect(result.removed).toBe(true);
  });
}

for (const reverse of [false, true]) {
  test(`merges multiple archives in ${reverse ? 'reversed' : 'selected'} order with classic PDF subsections`, async({page, browserName}) => {
    const names = reverse ? ['second.zip', 'first.zip'] : ['first.zip', 'second.zip'];
    const files = ['subsections.pdf', ...names].map(name => ({name, bytes: Array.from(readFileSync(`e2e/fixture/${name}`))}));
    const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
    const result = await page.evaluate(async({files, workerFile}) => {
      const {WorkerClient, cleanupJob, resolveArtifact} = window.bhwHarness;
      const client = new WorkerClient(() => new Worker(new URL(workerFile, document.baseURI), {type: 'module'}), cleanupJob);
      const inputs = files.map(file => ({id: file.name, file: new File([new Uint8Array(file.bytes)], file.name)}));
      const plan = await client.run({operation: 'plan', inputs});
      const generated = await client.run({operation: 'generate', inputs});
      if (generated.operation !== 'generate') { throw new Error('Unexpected operation'); }
      try { return {plan, bytes: Array.from(new Uint8Array(await (await resolveArtifact(generated.artifact)).arrayBuffer()))}; }
      finally { await cleanupJob(generated.artifact.jobId); }
    }, {files, workerFile});
    expect(result.plan).toMatchObject({operation: 'plan', plan: {
      ready: true, archives: names.map(inputId => ({inputId})),
      collisions: [{path: 'shared.txt', earlierInputId: names[0], laterInputId: names[1]}],
      diagnostics: [{code: 'ARCHIVE_COLLISION', severity: 'warning', details: {count: 1}}]
    }});
    const directory = evidenceDirectory(browserName);
    mkdirSync(`${directory}/archive-order`, {recursive: true});
    writeFileSync(`${directory}/archive-order/${reverse ? 'reversed' : 'selected'}.polyglot`, new Uint8Array(result.bytes));
  });
}

for (const stage of ['extract', 'pack'] as const) {
  test(`cancels archive ${stage}, cleans its workspace, and permits retry`, async({page}) => {
    const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
    const bytes = Array.from(readFileSync('e2e/fixture/large-expanded.zip'));
    const result = await page.evaluate(async({workerFile, bytes, stage}) => {
      const {WorkerClient, cleanupJob, storageRoot, diagnose} = window.bhwHarness;
      let jobId = '';
      const client = new WorkerClient(() => {
        const worker = new Worker(new URL(workerFile, document.baseURI), {type: 'module'});
        worker.addEventListener('message', (event: MessageEvent<{jobId: string}>) => { jobId = event.data.jobId; });
        return worker;
      }, cleanupJob);
      const inputs = [{id: 'archive', file: new File([new Uint8Array(bytes)], 'large.zip')}, {id: 'html', file: new File(['<!doctype html><title>cancel</title>'], 'page.html')}];
      const outcome = await client.run({operation: 'generate', inputs}, event => { if (event.stage === stage && (stage === 'pack' || event.completed > 0)) { void client.cancel(); } }).catch(diagnose);
      const root = await storageRoot();
      const removed = await root.getDirectoryHandle(jobId).then(() => false, () => true);
      const retry = await client.run({operation: 'plan', inputs});
      return {outcome, removed, retry: retry.operation === 'plan' && retry.plan.ready};
    }, {workerFile, bytes, stage});
    expect(result).toEqual({outcome: {code: 'CANCELLED', severity: 'info'}, removed: true, retry: true});
  });
}

for (const phase of ['expansion', 'repacking'] as const) {
  test(`reports quota exhaustion during archive ${phase} and removes partial intermediates`, async({page}) => {
    const result = await page.evaluate(async({bytes, phase}) => {
      const {BlobInput, TemporaryStorage, inspectInputs, prepareComposition, generateResult, storageRoot, diagnose} = window.bhwHarness;
      const jobId = crypto.randomUUID();
      const storage = await TemporaryStorage.create(jobId);
      let packing = false;
      const context = {signal: new AbortController().signal, progress: (event: {stage: string}) => { if (event.stage === 'pack') { packing = true; } }};
      const sources = [
        {id: 'html', name: 'page.html', mediaType: '', reader: new BlobInput(new Blob(['<!doctype html><title>quota</title>']))},
        {id: 'archive', name: 'first.zip', mediaType: '', reader: new BlobInput(new Blob([new Uint8Array(bytes)]))}
      ];
      const prepared = await prepareComposition(await inspectInputs(sources, context), sources, context);
      // eslint-disable-next-line @typescript-eslint/unbound-method -- Restore the original prototype method and call it with its owning handle.
      const original = FileSystemFileHandle.prototype.createWritable;
      let opened = 0;
      FileSystemFileHandle.prototype.createWritable = async function(options) {
        const stream = await original.call(this, options);
        const index = ++opened;
        const write = stream.write.bind(stream);
        stream.write = data => (phase === 'expansion' && index === 2) || (phase === 'repacking' && index === 1 && packing)
          ? Promise.reject(new DOMException('Fixture quota', 'QuotaExceededError')) : write(data);
        return stream;
      };
      let outcome;
      try { outcome = await generateResult(prepared, storage, context).catch(diagnose); }
      finally { FileSystemFileHandle.prototype.createWritable = original; await storage.dispose(); }
      const root = await storageRoot();
      return {outcome, removed: await root.getDirectoryHandle(jobId).then(() => false, () => true)};
    }, {bytes: Array.from(readFileSync('e2e/fixture/first.zip')), phase});
    expect(result).toEqual({outcome: {code: 'STORAGE_FULL', severity: 'warning'}, removed: true});
  });
}
