import {mkdirSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {buildSync} from 'esbuild';
import {expect, test} from '@playwright/test';

const harness = buildSync({entryPoints: ['e2e/processing-harness.ts'], bundle: true, write: false, format: 'iife', globalName: 'bhwHarness', platform: 'browser'}).outputFiles[0]!.text;
const fixture = (name: string): number[] => Array.from(readFileSync(`e2e/fixture/${name}`));

test.beforeEach(async({page}) => {
  await page.goto('./');
  await page.addScriptTag({content: harness});
});

for (const [image, media, withHtml] of [
  ['transparent.png', 'video-aac.mp4', true],
  ['static.jpg', 'video-aac.mp4', false],
  ['static.gif', 'video-aac.mp4', false],
  ['static.webp', 'video-aac.mp4', false],
  ['static.bmp', 'video-aac.mp4', false],
  ['transparent.png', 'video-co64.mp4', true],
  ['large-dimensions.png', 'video-tail-moov.mp4', true]
] as const) {
  test(`generates ${image} + ${media}${withHtml ? ' + UTF-8 HTML' : ''} with independent browser decoding`, async({page}) => {
    const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
    const result = await page.evaluate(async({image, media, imageBytes, mediaBytes, workerFile, withHtml}) => {
      const {WorkerClient, cleanupJob, resolveArtifact} = window.bhwHarness;
      const createFile = (name: string, bytes: number[]): File => new File([new Uint8Array(bytes)], name);
      const imageFile = createFile(image, imageBytes);
      const binaryPayload = new TextEncoder().encode('</plaintext>--><script>parent.postMessage({fixture:"binary"},"*")</script>');
      const free = new Uint8Array(8 + binaryPayload.length);
      new DataView(free.buffer).setUint32(0, free.length);
      free.set(new TextEncoder().encode('free'), 4);
      free.set(binaryPayload, 8);
      const mediaFile = createFile(media, [...mediaBytes, ...free]);
      const html = '<!doctype html><html><head><title>Città 🙂</title></head><body><h1 id="message">Città, 日本語, 🙂</h1><script>parent.postMessage({fixture:"html",text:document.getElementById("message").textContent,charset:document.characterSet},"*")</script></body></html>';
      const inputs = [{id: 'image', file: imageFile}, {id: 'media', file: mediaFile}, ...(withHtml ? [{id: 'html', file: new File([html], 'page.html')}] : [])];
      const client = new WorkerClient(() => new Worker(new URL(workerFile, document.baseURI), {type: 'module'}), cleanupJob);
      const plan = await client.run({operation: 'plan', inputs});
      const progress: number[] = [];
      const generated = await client.run({operation: 'generate', inputs}, event => {
        if (event.stage === 'generate') { progress.push(event.completed); }
      });
      if (generated.operation !== 'generate') { throw new Error(JSON.stringify(generated)); }
      try {
        const file = await resolveArtifact(generated.artifact);
        const bytes = new Uint8Array(await file.arrayBuffer()); // Only this tiny test fixture is materialized.
        const directory = new DataView(bytes.buffer);
        const pngOffset = directory.getUint32(18, true);
        const pngSize = directory.getUint32(14, true);
        const embedded = await createImageBitmap(new Blob([file.slice(pngOffset, pngOffset + pngSize)], {type: 'image/png'}));
        const embeddedSize = {width: embedded.width, height: embedded.height};
        embedded.close();
        const icoUrl = URL.createObjectURL(new Blob([file], {type: 'image/x-icon'}));
        const img = new Image();
        img.src = icoUrl;
        await img.decode();
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const drawing = canvas.getContext('2d')!;
        drawing.drawImage(img, 0, 0);
        const alpha = drawing.getImageData(0, 0, 1, 1).data[3];
        URL.revokeObjectURL(icoUrl);
        const sample = async(blob: Blob): Promise<{duration: number; width: number; height: number; hash: string}> => {
          const url = URL.createObjectURL(new Blob([blob], {type: 'video/mp4'}));
          const video = document.createElement('video');
          video.muted = true;
          video.preload = 'auto';
          video.src = url;
          try {
            await new Promise<void>((resolve, reject) => {
              video.onloadeddata = () => { resolve(); };
              video.onerror = () => { reject(new Error(`Media decode: ${video.error?.code}`)); };
            });
            video.currentTime = 0.5;
            await new Promise<void>(resolve => { video.onseeked = () => { resolve(); }; });
            const frame = document.createElement('canvas');
            frame.width = video.videoWidth;
            frame.height = video.videoHeight;
            const pixels = frame.getContext('2d')!;
            pixels.drawImage(video, 0, 0);
            const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', pixels.getImageData(0, 0, frame.width, frame.height).data))).map(byte => byte.toString(16).padStart(2, '0')).join('');
            const metadata = {duration: video.duration, width: video.videoWidth, height: video.videoHeight, hash};
            await video.play();
            await new Promise<void>(resolve => { video.onended = () => { resolve(); }; });
            return metadata;
          } finally { video.removeAttribute('src'); video.load(); URL.revokeObjectURL(url); }
        };
        const originalVideo = await sample(mediaFile);
        const outputVideo = await sample(file);
        let htmlResult: unknown = null;
        if (withHtml) {
          const frame = document.createElement('iframe');
          frame.setAttribute('sandbox', 'allow-scripts');
          const url = URL.createObjectURL(new Blob([file], {type: 'text/html'}));
          frame.src = url;
          const messages: unknown[] = [];
          const listener = (event: MessageEvent<unknown>): void => {
            if (event.source === frame.contentWindow) { messages.push(event.data); }
          };
          window.addEventListener('message', listener);
          try {
            await new Promise<void>(resolve => {
              frame.onload = () => { resolve(); };
              document.body.append(frame);
            });
            await new Promise(resolve => { setTimeout(resolve, 0); });
            htmlResult = messages;
          } finally { window.removeEventListener('message', listener); frame.remove(); URL.revokeObjectURL(url); }
        }
        return {plan, interpretations: generated.interpretations, image: {width: img.naturalWidth, height: img.naturalHeight, alpha}, embeddedSize, originalVideo, outputVideo, htmlResult, monotonic: progress.every((value, index) => index === 0 || value >= progress[index - 1]!), bytes: Array.from(bytes)};
      } finally { await cleanupJob(generated.artifact.jobId); }
    }, {image, media, imageBytes: fixture(image), mediaBytes: fixture(media), workerFile, withHtml});
    expect(result.plan).toMatchObject({operation: 'plan', plan: {ready: true, diagnostics: []}});
    expect(result.interpretations.map(interpretation => interpretation.family)).toEqual(withHtml ? ['image', 'media', 'html'] : ['image', 'media']);
    expect(result.image.width).toBe(image === 'large-dimensions.png' ? 256 : 32);
    expect(result.image.height).toBe(image === 'large-dimensions.png' ? 240 : 24);
    expect(result.embeddedSize).toEqual(image === 'large-dimensions.png' ? {width: 320, height: 240} : {width: 32, height: 24});
    if (image === 'large-dimensions.png') {
      // Chromium's ICO decoder does not render oversized PNG entries; full PNG and other readers are checked separately.
      expect(result.image.alpha).toBe(0);
    } else if (image.endsWith('.png') || image.endsWith('.webp')) { expect(result.image.alpha).toBe(128); }
    expect(result.outputVideo).toEqual(result.originalVideo);
    expect(result.outputVideo.duration).toBeCloseTo(1, 3);
    expect(result.monotonic).toBe(true);
    if (withHtml) { expect(result.htmlResult).toEqual([{fixture: 'html', text: 'Città, 日本語, 🙂', charset: 'UTF-8'}]); }
    const filename = `test-results/${image.replace('.', '-')}-${media.replace('.mp4', '')}.polyglot`;
    mkdirSync('test-results', {recursive: true});
    writeFileSync(filename, new Uint8Array(result.bytes));
  });
}

for (const mode of ['cancel-during-output', 'image-decode-failure'] as const) {
  test(`cleans the actual generation workspace after ${mode} and allows a retry`, async({page}) => {
    const workerFile = readdirSync('docs').find(name => /^worker-[A-Z0-9]{8}\.js$/.test(name))!;
    const result = await page.evaluate(async({workerFile, imageBytes, mediaBytes, mode}) => {
      const {WorkerClient, cleanupJob, storageRoot, diagnose} = window.bhwHarness;
      let jobId = '';
      const client = new WorkerClient(() => {
        const worker = new Worker(new URL(workerFile, document.baseURI), {type: 'module'});
        worker.addEventListener('message', (event: MessageEvent<{jobId: string}>) => { jobId = event.data.jobId; });
        return worker;
      }, cleanupJob);
      if (mode === 'image-decode-failure') { imageBytes[24] = 3; }
      const inputs = [{id: 'image', file: new File([new Uint8Array(imageBytes)], 'image.png')}, {id: 'media', file: new File([new Uint8Array(mediaBytes)], 'video.mp4')}];
      const outcome = await client.run({operation: 'generate', inputs}, event => {
        if (mode === 'cancel-during-output' && event.stage === 'generate' && event.completed > 0) { void client.cancel(); }
      }).catch(diagnose);
      const root = await storageRoot();
      const removed = await root.getDirectoryHandle(jobId).then(() => false, () => true);
      const retry = await client.run({operation: 'inspect', inputs});
      return {outcome, removed, retry: retry.operation, busy: client.busy};
    }, {workerFile, imageBytes: fixture('transparent.png'), mediaBytes: fixture('video-aac.mp4'), mode});
    expect(result).toEqual({outcome: {code: mode === 'cancel-during-output' ? 'CANCELLED' : 'IMAGE_INVALID', severity: 'error'}, removed: true, retry: 'inspect', busy: false});
  });
}
