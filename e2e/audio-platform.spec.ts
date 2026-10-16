import {expect, test} from '@playwright/test';
import {mkdirSync, writeFileSync} from 'node:fs';

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
