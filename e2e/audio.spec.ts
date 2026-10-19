import {mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {buildSync} from 'esbuild';
import {expect, test} from '@playwright/test';

const harness = buildSync({entryPoints: ['e2e/processing-harness.ts'], bundle: true, write: false, format: 'iife', globalName: 'bhwHarness', platform: 'browser'}).outputFiles[0]!.text;

test.beforeEach(async({page, browserName}) => {
  await page.goto('./');
  const storage = await page.evaluate(async() => navigator.storage.getDirectory().then(() => true, () => false));
  test.skip(browserName === 'webkit' && !storage, 'Reviewed Windows WebKit runner limitation: OPFS fails and worker audio codecs are absent; real Safari verification remains Milestone 10.');
  await page.addScriptTag({content: harness});
});

for (const {name, allFamilies, fallback} of [
  ...['audio.mp3', 'audio.wav', 'audio-vorbis.ogg', 'audio-opus.ogg', 'audio.m4a', 'audio.aac', 'audio-stereo.wav', 'audio-float.wav', 'audio-surround.wav', 'audio-surround.m4a'].map(name => ({name, allFamilies: false, fallback: false})),
  {name: 'audio.mp3', allFamilies: true, fallback: false},
  ...['audio.mp3', 'audio-stereo.mp3', 'audio-low-rate.mp3'].map(name => ({name, allFamilies: false, fallback: true}))
]) {
  test(`converts ${name}${allFamilies ? ' with all families' : ''}${fallback ? ' without native audio APIs' : ''} to playable AAC-LC without network processing`, async({page, browser, browserName}) => {
    if (fallback) {
      await page.route('**/worker-*.js', async route => {
        const response = await route.fetch();
        await route.fulfill({response, body: `Object.defineProperty(globalThis, 'AudioDecoder', {value: undefined}); Object.defineProperty(globalThis, 'AudioData', {value: undefined});\n${await response.text()}`});
      });
    }
    const decoderRequests: string[] = [];
    const decoderChunk = readdirSync('docs').find(name => /^chunk-.*\.js$/.test(name) && readFileSync(`docs/${name}`, 'utf8').includes('enableGapless'))!;
    page.on('request', request => { if (request.url().endsWith(decoderChunk)) { decoderRequests.push(request.url()); } });
    const external: string[] = [];
    page.on('request', request => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') { external.push(request.url()); } });
    const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
    const extras = allFamilies ? ['transparent.png', 'classic.pdf', 'first.zip'].map((name, index) => ({id: `extra-${index}`, name, bytes: Array.from(readFileSync(`e2e/fixture/${name}`))})) : [];
    const result = await page.evaluate(async({name, bytes, workerFile, extras}) => {
      const {WorkerClient, cleanupJob, resolveArtifact} = window.bhwHarness;
      const client = new WorkerClient(() => new Worker(new URL(workerFile, document.baseURI), {type: 'module'}), cleanupJob);
      const inputs = [{id: 'audio', file: new File([new Uint8Array(bytes)], name)}, {id: 'html', file: new File(['<!doctype html><title>Audio fixture</title>'], 'page.html')}, ...extras.map(file => ({id: file.id, file: new File([new Uint8Array(file.bytes)], file.name)}))];
      const plan = await client.run({operation: 'plan', inputs});
      if (plan.operation !== 'plan' || !plan.plan.ready) { throw new Error(JSON.stringify(plan)); }
      const progress: {completed: number; total: number}[] = [];
      const generated = await client.run({operation: 'generate', inputs}, event => { if (event.stage === 'convert') { progress.push({completed: event.completed, total: event.total}); } });
      if (generated.operation !== 'generate') { throw new Error(JSON.stringify(generated)); }
      try {
        const file = await resolveArtifact(generated.artifact);
        const url = URL.createObjectURL(new Blob([file], {type: 'audio/mp4'}));
        const audio = document.createElement('audio');
        audio.muted = true;
        audio.src = url;
        let duration;
        try {
          await new Promise<void>((resolve, reject) => {
            audio.onloadeddata = () => { resolve(); };
            audio.onerror = () => { reject(new Error(`Playback failed ${audio.error?.code}`)); };
          });
          duration = audio.duration;
          await audio.play();
          await new Promise<void>(resolve => { audio.onended = () => { resolve(); }; });
        } finally { audio.removeAttribute('src'); audio.load(); URL.revokeObjectURL(url); }
        return {bytes: Array.from(new Uint8Array(await file.arrayBuffer())), duration, progress, interpretations: generated.interpretations};
      } finally { await cleanupJob(generated.artifact.jobId); }
    }, {name, bytes: Array.from(readFileSync(`e2e/fixture/${name}`)), workerFile, extras});
    expect(result.duration).toBeGreaterThan(1.9);
    expect(result.duration).toBeLessThan(2.15);
    expect(result.interpretations).toEqual([
      ...(allFamilies ? [{family: 'image', extensions: ['ico']}] : []),
      {family: 'media', extensions: ['m4a', 'mp4']}, {family: 'html', extensions: ['html', 'htm']},
      ...(allFamilies ? [{family: 'pdf', extensions: ['pdf']}, {family: 'archive', extensions: ['zip']}] : [])
    ]);
    if (!name.endsWith('.m4a')) {
      expect(result.progress.length).toBeGreaterThan(1);
      expect(result.progress.every((event, index) => event.completed <= event.total && (!index || event.completed >= result.progress[index - 1]!.completed))).toBe(true);
    }
    expect(external).toEqual([]);
    if (name.endsWith('.mp3')) { expect(decoderRequests.length > 0).toBe(fallback); }
    const directory = `test-results/${fallback ? 'mp3-fallback' : 'audio'}/${browserName}`;
    mkdirSync(directory, {recursive: true});
    writeFileSync(`${directory}/${name}${allFamilies ? '-all-families' : ''}.polyglot`, new Uint8Array(result.bytes));
    writeFileSync(`test-results/audio/${browserName}/environment.json`, JSON.stringify({engine: browserName, version: browser.version(), platform: process.platform}));
  });
}

for (const {stage, fallback} of [false, true].flatMap(fallback => (['before-conversion', 'conversion', 'after-conversion'] as const).map(stage => ({stage, fallback})))) {
  test(`cancels ${stage}${fallback ? ' without native decoding' : ''}, cleans audio intermediates, and permits retry`, async({page}) => {
    if (fallback) {
      await page.route('**/worker-*.js', async route => {
        const response = await route.fetch();
        await route.fulfill({response, body: `Object.defineProperty(globalThis, 'AudioDecoder', {value: undefined});\n${await response.text()}`});
      });
    }
    const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
    const result = await page.evaluate(async({bytes, workerFile, stage}) => {
      const {WorkerClient, cleanupJob, storageRoot, diagnose} = window.bhwHarness;
      let jobId = '';
      const client = new WorkerClient(() => {
        const worker = new Worker(new URL(workerFile, document.baseURI), {type: 'module'});
        worker.addEventListener('message', (event: MessageEvent<{jobId: string}>) => { jobId = event.data.jobId; });
        return worker;
      }, cleanupJob);
      const inputs = [{id: 'audio', file: new File([new Uint8Array(bytes)], 'long.mp3')}, {id: 'html', file: new File(['<!doctype html><title>cancel</title>'], 'page.html')}];
      const running = client.run({operation: 'generate', inputs}, event => {
        if (stage === 'conversion' && event.stage === 'convert' && event.completed > 0 || stage === 'after-conversion' && event.stage === 'generate' && event.completed > 0) { void client.cancel(); }
      }).catch(diagnose);
      if (stage === 'before-conversion') { await client.cancel(); }
      const outcome = await running;
      const root = await storageRoot();
      const removed = !jobId || await root.getDirectoryHandle(jobId).then(() => false, () => true);
      const retry = await client.run({operation: 'plan', inputs});
      return {outcome, removed, retry: retry.operation === 'plan' && retry.plan.ready};
    }, {bytes: Array.from(readFileSync('e2e/fixture/audio-long.mp3')), workerFile, stage});
    expect(result).toEqual({outcome: {code: 'CANCELLED', severity: 'info'}, removed: true, retry: true});
  });
}

test('rejects a malformed WAV and separate audio/video inputs outside picker filters', async({page}) => {
  const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
  const result = await page.evaluate(async({workerFile, corrupt, audio, video}) => {
    const {WorkerClient, cleanupJob} = window.bhwHarness;
    const client = new WorkerClient(() => new Worker(new URL(workerFile, document.baseURI), {type: 'module'}), cleanupJob);
    const html = {id: 'html', file: new File(['<!doctype html><title>bad</title>'], 'page.html')};
    const malformed = await client.run({operation: 'plan', inputs: [html, {id: 'bad', file: new File([new Uint8Array(corrupt)], 'bad.wav')}]});
    const duplicate = await client.run({operation: 'plan', inputs: [html, {id: 'audio', file: new File([new Uint8Array(audio)], 'audio.mp3')}, {id: 'video', file: new File([new Uint8Array(video)], 'video.mp4')}]});
    return {malformed, duplicate};
  }, {workerFile, corrupt: Array.from(readFileSync('e2e/fixture/audio-corrupt.wav')), audio: Array.from(readFileSync('e2e/fixture/audio.mp3')), video: Array.from(readFileSync('e2e/fixture/video-aac.mp4'))});
  expect(result.malformed).toMatchObject({operation: 'plan', plan: {ready: false, diagnostics: [{code: 'AUDIO_INVALID'}]}});
  expect(result.duplicate).toMatchObject({operation: 'plan', plan: {ready: false, diagnostics: [{code: 'ROLE_CONFLICT', details: {role: 'media'}}]}});
});

test('keeps missing Ogg decoding explicit when only the MP3 fallback is available', async({page}) => {
  await page.route('**/worker-*.js', async route => {
    const response = await route.fetch();
    await route.fulfill({response, body: `Object.defineProperty(globalThis, 'AudioDecoder', {value: undefined});\n${await response.text()}`});
  });
  const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
  for (const name of ['audio-vorbis.ogg', 'audio-opus.ogg']) {
    const result = await page.evaluate(async({name, workerFile, bytes}) => {
      const {WorkerClient, cleanupJob} = window.bhwHarness;
      const client = new WorkerClient(() => new Worker(new URL(workerFile, document.baseURI), {type: 'module'}), cleanupJob);
      return client.run({operation: 'plan', inputs: [{id: 'html', file: new File(['<!doctype html>'], 'page.html')}, {id: 'audio', file: new File([new Uint8Array(bytes)], name)}]});
    }, {name, workerFile, bytes: Array.from(readFileSync(`e2e/fixture/${name}`))});
    expect(result).toMatchObject({operation: 'plan', plan: {ready: false, diagnostics: [{code: 'AUDIO_DECODE_UNAVAILABLE', severity: 'error', inputId: 'audio'}]}});
  }
});

test('preserves storage-full diagnostics and cleans audio conversion intermediates', async({page}) => {
  const result = await page.evaluate(async bytes => {
    const {BlobInput, TemporaryStorage, storageRoot, inspectInputs, prepareComposition, generateResult, diagnose} = window.bhwHarness;
    const jobId = crypto.randomUUID();
    const storage = await TemporaryStorage.create(jobId);
    const context = {signal: new AbortController().signal, progress: () => {}};
    const sources = [
      {id: 'audio', name: 'audio.wav', mediaType: '', reader: new BlobInput(new Blob([new Uint8Array(bytes)]))},
      {id: 'html', name: 'page.html', mediaType: '', reader: new BlobInput(new Blob(['<!doctype html><title>Quota</title>']))}
    ];
    const prepared = await prepareComposition(await inspectInputs(sources, context), sources, context);
    // eslint-disable-next-line @typescript-eslint/unbound-method -- Restore the original prototype method and call it with its owning handle.
    const original = FileSystemFileHandle.prototype.createWritable;
    FileSystemFileHandle.prototype.createWritable = async function(options) {
      const stream = await original.call(this, options);
      stream.write = () => Promise.reject(new DOMException('Fixture quota', 'QuotaExceededError'));
      return stream;
    };
    let outcome;
    try { outcome = await generateResult(prepared, storage, context).catch(diagnose); }
    finally { FileSystemFileHandle.prototype.createWritable = original; await storage.dispose(); }
    const root = await storageRoot();
    return {outcome, removed: await root.getDirectoryHandle(jobId).then(() => false, () => true)};
  }, Array.from(readFileSync('e2e/fixture/audio.wav')));
  expect(result).toEqual({outcome: {code: 'STORAGE_FULL', severity: 'warning'}, removed: true});
});
