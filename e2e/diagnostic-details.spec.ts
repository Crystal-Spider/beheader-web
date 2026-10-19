import {readFileSync} from 'node:fs';
import {expect, test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {evidenceDirectory} from './evidence';

test.use({locale: 'en-GB'});

for (const language of ['en', 'it']) {
  test(`explains stream-based PDFs immediately in ${language}, with private diagnostic exports`, async({page}) => {
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    const pdf = '%PDF-1.5\n1 0 obj<</Type/XRef /Size 1 /Length 0 /W[1 1 1]>>\nstream\n\nendstream\nendobj\nstartxref\n9\n%%EOF\n';
    await page.getByTestId('file-picker').setInputFiles([
      {name: 'private-document.pdf', mimeType: 'application/pdf', buffer: Buffer.from(pdf)},
      {name: 'ordinary.zip', mimeType: 'application/zip', buffer: readFileSync('e2e/fixture/first.zip')}
    ]);
    const error = page.locator('.diagnostics .error');
    await expect(error).toContainText('PDF_STRUCTURE');
    await expect(error).toContainText(language === 'en' ? 'That valid PDF layout is not supported yet.' : 'Questa organizzazione PDF valida non è ancora supportata.');
    await expect(error.locator('strong')).toHaveText('private-document.pdf');
    await expect(page.locator('.combine-control button')).toBeDisabled();
    const downloaded = page.waitForEvent('download');
    await page.getByRole('button', {name: language === 'en' ? 'Diagnostics' : 'Diagnostica', exact: true}).click();
    const report = readFileSync((await (await downloaded).path()), 'utf8');
    expect(report).toContain('XREF_STREAM'); expect(report).not.toContain('private-document');
    expect((JSON.parse(report) as {diagnostics: {message: string}[]}).diagnostics[0]?.message).toBe(await error.locator('p').innerText());
    await page.setViewportSize({width: 320, height: 900});
    await page.mouse.move(0, 0); await page.keyboard.press('Escape');
    await expect(page.locator('.message-panel')).toHaveCSS('opacity', '1');
    expect((await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test(`explains measured limits and early asset ZIP errors in ${language}`, async({page}) => {
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    const png = new Uint8Array(readFileSync('e2e/fixture/transparent.png'));
    new DataView(png.buffer).setUint32(16, 32768);
    await page.getByTestId('file-picker').setInputFiles({name: 'oversized.png', mimeType: 'image/png', buffer: Buffer.from(png)});
    await expect(page.locator('.diagnostics .error')).toContainText('32768');
    await expect(page.locator('.diagnostics .error')).toContainText('32767');
    await page.getByRole('article', {name: 'oversized.png', exact: true}).getByRole('button', {name: language === 'en' ? 'Remove' : 'Rimuovi', exact: true}).click();
    await expect(page.getByRole('button', {name: language === 'en' ? 'Choose files' : 'Scegli file', exact: true})).toBeEnabled();
    await page.getByTestId('file-picker').setInputFiles([
      {name: 'page.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><p>Assets</p>')},
      {name: 'picture.png', mimeType: 'image/png', buffer: readFileSync('e2e/fixture/transparent.png')}
    ]);
    const combine = page.getByRole('button', {name: language === 'en' ? 'Combine files' : 'Combina file', exact: true});
    await expect(combine).toBeEnabled();
    const bytes = new Uint8Array(readFileSync('e2e/fixture/first.zip'));
    const end = Buffer.from(bytes).lastIndexOf('PK\x05\x06');
    new DataView(bytes.buffer).setUint16(end + 8, 65535, true); new DataView(bytes.buffer).setUint16(end + 10, 65535, true);
    const chosen = page.waitForEvent('filechooser');
    await page.getByRole('button', {name: language === 'en' ? 'Add asset ZIP' : 'Aggiungi ZIP delle risorse', exact: true}).click();
    await (await chosen).setFiles({name: 'assets.zip', mimeType: 'application/zip', buffer: Buffer.from(bytes)});
    await expect(page.locator('.diagnostics .error')).toContainText('ZIP64');
    await expect(combine).toBeDisabled();
  });
}

test('preserves a classic PDF with nonzero free-list links, rich trailer syntax and every interpretation', async({page, browserName}) => {
  await page.goto('./');
  const original = readFileSync('e2e/fixture/classic.pdf', 'utf8');
  const free = original.replace('0 6\n', '0 7\n').replace('0000000000 65535 f', '0000000006 65535 f').replace('trailer\n', '0000000000 00001 f \n% xref comment\ntrailer\n').replace('/Size 6', '/Size 7');
  const rich = free.replace('/Root 1 0 R', '/Ro#6Ft 1% root reference\n0 R /En#63rypt null /ID[<01><ab>] /Extra<</Note(literal /Encrypt /Prev) /Nested[true null [1 2]]>>');
  await page.getByTestId('file-picker').setInputFiles([
    {name: 'classic-rich.pdf', mimeType: 'application/pdf', buffer: Buffer.from(rich)},
    {name: 'first.zip', mimeType: 'application/zip', buffer: readFileSync('e2e/fixture/first.zip')}
  ]);
  const combine = page.getByRole('button', {name: 'Combine files', exact: true});
  await expect(combine).toBeEnabled();
  await combine.click();
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
  const download = page.waitForEvent('download');
  await page.getByRole('button', {name: 'Download file', exact: true}).click();
  await (await download).saveAs(`${evidenceDirectory(browserName)}/pdf-rich.polyglot`);
  await expect(page.locator('.diagnostics .error')).toHaveCount(0);
});

test('describes conflicting roles and names archive overwrite winners without exporting private names', async({page}) => {
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/first.zip', 'e2e/fixture/second.zip', 'e2e/fixture/transparent.png']);
  await expect(page.locator('.archive-collisions')).toContainText('second.zip overwrites first.zip.');
  await page.getByRole('article', {name: 'second.zip', exact: true}).locator('.drag-handle button').press('ArrowUp');
  await expect(page.locator('.archive-collisions')).toContainText('first.zip overwrites second.zip.');
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByTestId('file-picker').setInputFiles('e2e/fixture/static.jpg');
  await expect(page.locator('.diagnostics .error')).toContainText('2 inputs use the Image role');
  const download = page.waitForEvent('download');
  await page.getByRole('button', {name: 'Diagnostics', exact: true}).click();
  const report = readFileSync((await (await download).path()), 'utf8');
  expect(report).not.toMatch(/first\.zip|second\.zip|shared\.txt|static\.jpg|transparent\.png/);
  expect(report).toContain('"actual": 2');
});
