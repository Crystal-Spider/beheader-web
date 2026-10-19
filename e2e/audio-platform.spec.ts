import {expect, test} from '@playwright/test';
import {mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {buildSync} from 'esbuild';

const mp3Harness = buildSync({entryPoints: ['e2e/mp3-harness.ts'], bundle: true, write: false, format: 'iife', globalName: 'bhwMp3', platform: 'browser'}).outputFiles[0]!.text;

for (const [name, channels, sampleRate] of [['audio.mp3', 1, 48000], ['audio-stereo.mp3', 2, 48000], ['audio-low-rate.mp3', 1, 22050]] as const) {
  test(`decodes ${name} inside a worker without native audio APIs or OPFS`, async({page}) => {
    await page.goto('./');
    const result = await page.evaluate(async({harness, bytes}) => {
      const source = `Object.defineProperty(globalThis, 'AudioDecoder', {value: undefined}); Object.defineProperty(globalThis, 'AudioData', {value: undefined}); ${harness}\n self.onmessage=async event=>{try{self.postMessage({result:await bhwMp3.decodeMp3(new Uint8Array(event.data))});}catch(error){self.postMessage({error:String(error)});}};`;
      const url = URL.createObjectURL(new Blob([source], {type: 'text/javascript'}));
      const worker = new Worker(url);
      try {
        return await new Promise<{result?: {channels: number; sampleRate: number; frames: number; continuous: boolean; rms: number[]}; error?: string}>((resolve, reject) => {
          worker.onmessage = (event: MessageEvent<{result?: {channels: number; sampleRate: number; frames: number; continuous: boolean; rms: number[]}; error?: string}>) => { resolve(event.data); };
          worker.onerror = () => { reject(new Error('Decoder worker failed')); };
          worker.postMessage(bytes);
        });
      } finally { worker.terminate(); URL.revokeObjectURL(url); }
    }, {harness: mp3Harness, bytes: Array.from(readFileSync(`e2e/fixture/${name}`))});
    expect(result.error).toBeUndefined();
    expect(result.result).toMatchObject({channels, sampleRate, continuous: true});
    expect(result.result!.frames / sampleRate).toBeGreaterThan(1.9);
    expect(result.result!.frames / sampleRate).toBeLessThan(2.15);
    expect(result.result!.rms.every(value => value > 0.02 && value < 0.2)).toBe(true);
    if (channels === 2) { expect(result.result!.rms[0]! / result.result!.rms[1]!).toBeCloseTo(2, 1); }
  });
}

test('records worker codec and temporary-storage capabilities', async({page, browserName, browser}) => {
  await page.goto('./');
  const result = await page.evaluate(async() => {
    const source = 'self.onmessage=async()=>{let storage;try{const root=await navigator.storage.getDirectory();const dir=await root.getDirectoryHandle(\'bhw-audio-capability-test\',{create:true});const file=await dir.getFileHandle(\'test\',{create:true});storage={writable:typeof file.createWritable,sync:typeof file.createSyncAccessHandle};await root.removeEntry(\'bhw-audio-capability-test\',{recursive:true});}catch(e){storage={error:e.name,message:e.message}}self.postMessage({decoder:typeof AudioDecoder,encoder:typeof AudioEncoder,storage});}';
    const url = URL.createObjectURL(new Blob([source], {type: 'text/javascript'}));
    const worker = new Worker(url);
    try { return await new Promise<unknown>((resolve, reject) => { worker.onmessage = event => { resolve(event.data); }; worker.onerror = () => { reject(new Error('Worker failed')); }; worker.postMessage(null); }); }
    finally { worker.terminate(); URL.revokeObjectURL(url); }
  });
  expect(result).toBeTruthy();
  mkdirSync(`test-results/audio/${browserName}`, {recursive: true});
  writeFileSync(`test-results/audio/${browserName}/capabilities.json`, JSON.stringify({engine: browserName, version: browser.version(), platform: process.platform, capabilities: result}));
});
