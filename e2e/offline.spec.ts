import {expect, test} from '@playwright/test';
import {readFileSync} from 'node:fs';

test.use({serviceWorkers: 'allow', locale: 'en-GB'});

test('closes and reopens offline, switches language, converts audio and downloads without network responses', async({page, context}) => {
  test.setTimeout(60000);
  await page.goto('./');
  await expect(page.getByTestId('offline-ready')).toBeVisible({timeout: 30000});
  await page.close();
  await context.setOffline(true);
  const reopened = await context.newPage();
  const responses: {url: string; cached: boolean}[] = [];
  const failures: string[] = [];
  reopened.on('response', response => { if (response.url().startsWith('http:')) { responses.push({url: response.url(), cached: response.fromServiceWorker()}); } });
  reopened.on('requestfailed', request => failures.push(request.url()));
  await reopened.goto('./');
  await expect(reopened.locator('.selected-file')).toHaveCount(0);
  await reopened.getByRole('combobox', {name: 'Language', exact: true}).click();
  await reopened.getByRole('option', {name: 'IT Italiano'}).click();
  await reopened.getByRole('button', {name: 'Prova un esempio', exact: true}).click();
  await expect(reopened.getByRole('button', {name: 'Combina file', exact: true})).toBeEnabled();
  await reopened.getByRole('button', {name: 'Combina file', exact: true}).click();
  await expect(reopened.getByRole('button', {name: 'Scarica file', exact: true})).toBeEnabled();
  const downloaded = reopened.waitForEvent('download');
  await reopened.getByRole('button', {name: 'Scarica file', exact: true}).click();
  expect(readFileSync((await (await downloaded).path())).length).toBeGreaterThan(30000);
  expect(failures).toEqual([]);
  expect(responses.length).toBeGreaterThan(5);
  expect(responses.filter(response => !response.cached)).toEqual([]);
});

test('defers a ready update while a generation is active', async({page}) => {
  await page.goto('./');
  await expect(page.getByTestId('offline-ready')).toBeVisible({timeout: 30000});
  await page.getByTestId('file-picker').setInputFiles([{name: 'tone.mp3', mimeType: 'audio/mpeg', buffer: readFileSync('e2e/fixture/audio-long.mp3')}, {name: 'index.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><p>Update</p>')}]);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Combine files', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Cancel', exact: true})).toBeVisible();
  await page.evaluate(() => navigator.serviceWorker.dispatchEvent(new MessageEvent('message', {data: {type: 'VERSION_READY', currentVersion: {hash: 'old'}, latestVersion: {hash: 'test'}}})));
  await expect(page.getByRole('button', {name: 'Reload application', exact: true})).toBeDisabled();
  await page.getByRole('button', {name: 'Cancel', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Reload application', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Reload application', exact: true}).click();
  await expect(page.locator('.selected-file')).toHaveCount(0);
});
