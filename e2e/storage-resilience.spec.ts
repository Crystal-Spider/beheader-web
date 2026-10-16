import {expect, test} from '@playwright/test';
import {readFileSync} from 'node:fs';

test.use({locale: 'en-GB'});

test('preserves live-tab storage and other applications, then cleans abandoned workspaces on reopening', async({page, context}) => {
  await page.goto('./');
  await expect.poll(async() => page.evaluate(async() => (await navigator.locks.query()).held?.some(lock => lock.name === 'beheader-web:storage-session-v1' && lock.mode === 'shared'))).toBe(true);
  const id = await page.evaluate(async() => {
    const origin = await navigator.storage.getDirectory();
    await origin.getDirectoryHandle('other-application', {create: true});
    const root = await origin.getDirectoryHandle('beheader-web-polyglot-v1', {create: true});
    await root.getDirectoryHandle('not-a-job', {create: true});
    const id = crypto.randomUUID(); const directory = await root.getDirectoryHandle(id, {create: true});
    const writer = await (await directory.getFileHandle('retained', {create: true})).createWritable(); await writer.write('retained output'); await writer.close();
    return id;
  });
  const second = await context.newPage(); await second.goto('./');
  await expect.poll(async() => second.evaluate(async() => (await navigator.locks.query()).held?.filter(lock => lock.name === 'beheader-web:storage-session-v1').length)).toBe(2);
  expect(await second.evaluate(async id => (await (await navigator.storage.getDirectory()).getDirectoryHandle('beheader-web-polyglot-v1')).getDirectoryHandle(id).then(() => true), id)).toBe(true);
  await page.close(); await second.close();
  const reopened = await context.newPage(); await reopened.goto('./');
  await expect.poll(async() => reopened.evaluate(async id => {
    const origin = await navigator.storage.getDirectory(); const root = await origin.getDirectoryHandle('beheader-web-polyglot-v1');
    return {job: await root.getDirectoryHandle(id).then(() => true, () => false), other: await origin.getDirectoryHandle('other-application').then(() => true), unknown: await root.getDirectoryHandle('not-a-job').then(() => true)};
  }, id)).toEqual({job: false, other: true, unknown: true});
});

test('recovers temporary storage after closing a tab during actual audio conversion', async({page, context}) => {
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles([{name: 'tone.mp3', mimeType: 'audio/mpeg', buffer: readFileSync('e2e/fixture/audio-long.mp3')}, {name: 'index.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><p>Interrupted</p>')}]);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Combine files', exact: true}).click();
  await expect.poll(async() => page.evaluate(async() => {
    const root = await (await navigator.storage.getDirectory()).getDirectoryHandle('beheader-web-polyglot-v1');
    const names: string[] = []; for await (const [name] of root as FileSystemDirectoryHandle & AsyncIterable<[string, FileSystemHandle]>) { names.push(name); }
    return names.filter(name => /^[0-9a-f-]{36}$/.test(name)).length;
  })).toBeGreaterThan(0);
  await page.close();
  const reopened = await context.newPage(); await reopened.goto('./');
  await expect.poll(async() => reopened.evaluate(async() => {
    const root = await (await navigator.storage.getDirectory()).getDirectoryHandle('beheader-web-polyglot-v1');
    let count = 0; for await (const [name] of root as FileSystemDirectoryHandle & AsyncIterable<[string, FileSystemHandle]>) { if (/^[0-9a-f-]{36}$/.test(name)) { count++; } }
    return count;
  })).toBe(0);
  await reopened.getByRole('button', {name: 'Try an example', exact: true}).click();
  await expect(reopened.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
});
