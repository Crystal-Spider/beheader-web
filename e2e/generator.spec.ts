import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {expect, test} from '@playwright/test';
import {Uint8ArrayReader, Uint8ArrayWriter, ZipWriter} from '@zip.js/zip.js';

test.use({locale: 'en-GB'});

test('generates the example, downloads identical variants, remembers preferences and forgets files', async({page}) => {
  await page.goto('./');
  await page.getByRole('button', {name: 'Try an example', exact: true}).click();
  const combine = page.getByRole('button', {name: 'Combine files', exact: true});
  await expect(combine).toBeEnabled();
  await expect(page.getByRole('button', {name: 'Audio', exact: true})).toBeDisabled();
  await expect(page.getByRole('button', {name: 'Video', exact: true})).toBeDisabled();
  expect(await page.getByTestId('file-picker').getAttribute('accept')).not.toContain('.mp3');
  await combine.click();
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
  await page.getByRole('textbox', {name: 'Output name', exact: true}).fill('my-result');
  await page.getByRole('textbox', {name: 'Output name', exact: true}).press('Tab');
  const hashes: string[] = [];
  for (const extension of ['html', 'm4a', 'ico']) {
    await page.getByRole('combobox', {name: 'Extension', exact: true}).click();
    await page.getByRole('option', {name: `.${extension}`, exact: true}).click();
    const downloaded = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download file', exact: true}).click();
    const download = await downloaded;
    expect(download.suggestedFilename()).toBe(`my-result.${extension}`);
    hashes.push(createHash('sha256').update(readFileSync((await download.path()))).digest('hex'));
  }
  expect(new Set(hashes).size).toBe(1);
  await page.screenshot({path: 'test-results/generator-desktop.png', fullPage: true});
  await page.reload();
  await expect(page.locator('.selected-file')).toHaveCount(0);
  await expect(combine).toBeDisabled();
  expect(await page.evaluate(() => localStorage.getItem('bhw.output.name'))).toBe('my-result');
  expect(await page.evaluate(() => Object.keys(localStorage).filter(key => /file|input|selection/.test(key)))).toEqual([]);
});

test('validates bypassed filters and supports removal, replacement and automatic page drops', async({page}) => {
  await page.goto('./');
  const picker = page.getByTestId('file-picker');
  await picker.setInputFiles(['e2e/fixture/transparent.png', 'e2e/fixture/static.jpg']);
  await expect(page.locator('.diagnostics')).toContainText('ROLE_CONFLICT');
  await page.getByRole('article', {name: 'static.jpg', exact: true}).getByRole('button', {name: 'Remove', exact: true}).click();
  await expect(page.locator('.diagnostics')).toContainText('MINIMUM_FAMILIES');
  const dialog = page.waitForEvent('filechooser');
  await page.getByRole('article', {name: 'transparent.png', exact: true}).getByRole('button', {name: 'Replace', exact: true}).click();
  await (await dialog).setFiles('e2e/fixture/static.jpg');
  await expect(page.getByRole('article', {name: 'static.jpg', exact: true})).toBeVisible();
  await expect(page.getByRole('button', {name: 'Choose files', exact: true})).toBeEnabled();
  await page.evaluate(() => {
    const transfer = new DataTransfer(); transfer.items.add(new File(['<!doctype html><h1>Dropped</h1>'], 'dropped.html', {type: 'text/html'}));
    document.dispatchEvent(new DragEvent('drop', {dataTransfer: transfer, bubbles: true, cancelable: true}));
  });
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByRole('article', {name: 'static.jpg', exact: true}).getByRole('button', {name: 'Remove', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Image', exact: true})).toBeEnabled();
});

test('requires unresolved-reference consent and never executes selected HTML in the app', async({page}) => {
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles([{name: 'private-page.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><img src="missing.png"><script>window.bhwUploaded=true</script>')}, {name: 'picture.png', mimeType: 'image/png', buffer: readFileSync('e2e/fixture/transparent.png')}]);
  await expect(page.locator('.diagnostics')).toContainText('HTML_UNRESOLVED');
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeDisabled();
  expect(await page.evaluate(() => 'bhwUploaded' in window)).toBe(false);
  await page.getByRole('checkbox', {name: 'Continue with unresolved references unchanged', exact: true}).check();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Combine files', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
  expect(await page.evaluate(() => 'bhwUploaded' in window)).toBe(false);
});

test('offers private diagnostics after an unexpected worker failure', async({page}) => {
  await page.route('**/worker-*.js', route => route.abort());
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles('e2e/fixture/transparent.png');
  await expect(page.locator('.diagnostics')).toContainText('WORKER_FAILED');
  const link = page.getByRole('link', {name: 'Open a GitHub issue', exact: true});
  expect((await link.getAttribute('href'))!.length).toBeLessThan(1800);
  expect(await link.getAttribute('href')).not.toContain('transparent');
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', {name: 'Download diagnostics', exact: true}).click();
  const text = readFileSync((await (await downloaded).path()), 'utf8');
  expect(text).toContain('WORKER_FAILED'); expect(text).not.toContain('transparent');
});

test('cancels generation and allows a corrected retry', async({page}) => {
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles([{name: 'audio-long.mp3', mimeType: 'audio/mpeg', buffer: readFileSync('e2e/fixture/audio-long.mp3')}, {name: 'index.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><p>Audio</p>')}]);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Combine files', exact: true}).click();
  await page.getByRole('button', {name: 'Cancel', exact: true}).click();
  await expect(page.locator('.diagnostics')).toContainText('CANCELLED');
  await page.getByRole('button', {name: 'Try an example', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Combine files', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
});

test('reorders archive inputs and resolves collisions according to selected order', async({page}) => {
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/classic.pdf', 'e2e/fixture/first.zip', 'e2e/fixture/second.zip']);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await expect(page.locator('.diagnostics')).toContainText('ARCHIVE_COLLISION');
  await page.getByRole('article', {name: 'second.zip', exact: true}).getByRole('button', {name: 'Move up', exact: true}).click();
  await expect(page.locator('.selected-file h3')).toHaveText(['classic.pdf', 'second.zip', 'first.zip']);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Combine files', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
});

test('supports the complete Italian workflow at 320 pixels', async({page}) => {
  await page.setViewportSize({width: 320, height: 800});
  await page.addInitScript(() => localStorage.setItem('bhw.language', 'it'));
  await page.goto('./');
  await page.getByRole('button', {name: 'Prova un esempio', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combina file', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Combina file', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Scarica file', exact: true})).toBeEnabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.locator('body').innerText()).not.toMatch(/\uFFFD|\u00C3|ui\.|diagnostic\./);
  await page.screenshot({path: 'test-results/generator-mobile-it.png', fullPage: true});
});

test('reassigns an asset ZIP and selects bounded additional payloads through the real controls', async({page}) => {
  const zip = new ZipWriter(new Uint8ArrayWriter(), {useWebWorkers: false});
  await zip.add('style.css', new Uint8ArrayReader(new TextEncoder().encode('h1{color:blue}')));
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles([
    {name: 'index.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><link rel="stylesheet" href="style.css"><h1>Assets</h1>')},
    {name: 'picture.png', mimeType: 'image/png', buffer: readFileSync('e2e/fixture/transparent.png')},
    {name: 'assets.zip', mimeType: 'application/zip', buffer: Buffer.from(await zip.close())}
  ]);
  await expect(page.locator('.diagnostics')).toContainText('HTML_UNRESOLVED');
  await page.getByRole('article', {name: 'assets.zip', exact: true}).getByRole('combobox', {name: 'Role', exact: true}).click();
  await page.getByRole('option', {name: 'HTML asset ZIP', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByText('Additional payloads', {exact: true}).click();
  const dialog = page.waitForEvent('filechooser');
  await page.getByRole('button', {name: 'Extra-header data', exact: true}).click();
  await (await dialog).setFiles({name: 'header.bin', mimeType: 'application/octet-stream', buffer: Buffer.alloc(1000, 65)});
  await expect(page.locator('.diagnostics')).toContainText('HEADER_SPACE');
  const replace = page.waitForEvent('filechooser');
  await page.getByRole('article', {name: 'header.bin', exact: true}).getByRole('button', {name: 'Replace', exact: true}).click();
  await (await replace).setFiles({name: 'header.bin', mimeType: 'application/octet-stream', buffer: Buffer.from('SMALL')});
  // Replacement redetects by default; explicitly restore its auxiliary role.
  await expect(page.locator('.diagnostics')).toContainText('INPUT_UNKNOWN');
  await page.getByRole('article', {name: 'header.bin', exact: true}).getByRole('combobox', {name: 'Role', exact: true}).click();
  await page.getByRole('option', {name: 'Extra-header data', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
});
