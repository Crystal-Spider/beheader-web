import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {expect, test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {TextWriter, Uint8ArrayReader, Uint8ArrayWriter, ZipReader, ZipWriter} from '@zip.js/zip.js';

test.use({locale: 'en-GB'});

/**
 * Read the shared example path from a downloaded archive interpretation.
 * @param {string} path Downloaded polyglot.
 * @param {string} messagePath Localized shared path.
 * @returns {Promise<string>} Winning archive's message.
 */
async function exampleMessage(path: string, messagePath: string): Promise<string> {
  const archive = new ZipReader(new Uint8ArrayReader(new Uint8Array(readFileSync(path))), {useWebWorkers: false});
  try {
    const entry = (await archive.getEntries()).find(entry => entry.filename === messagePath);
    if (!entry || entry.directory) { throw new Error('Missing example message'); }
    return await entry.getData(new TextWriter(), {checkCrc32: true});
  } finally { await archive.close(); }
}

for (const language of ['en', 'it']) {
  test(`generates the example in ${language}, downloads identical variants, remembers preferences and forgets files`, async({page}, testInfo) => {
    test.setTimeout(60000);
    const english = language === 'en';
    const names = english ? ['picture.png', 'page.html', 'tone.mp3', 'document.pdf', 'archive-a.zip', 'archive-b.zip'] as const
      : ['immagine.png', 'pagina.html', 'tono.mp3', 'documento.pdf', 'archivio-a.zip', 'archivio-b.zip'] as const;
    const messagePath = english ? 'hello.txt' : 'ciao.txt';
    const downloadLabel = english ? 'Download file' : 'Scarica file';
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    await page.getByRole('button', {name: english ? 'Try an example' : 'Prova un esempio', exact: true}).click();
    const combine = page.getByRole('button', {name: english ? 'Combine files' : 'Combina file', exact: true});
    await expect(combine).toBeEnabled();
    await expect(page.locator('.selected-file h3')).toHaveText([...names]);
    await expect(page.getByRole('button', {name: 'Audio', exact: true})).toBeDisabled();
    await expect(page.getByRole('button', {name: 'Video', exact: true})).toBeDisabled();
    await expect(page.locator('.archive-group')).toHaveCount(1);
    await expect(page.locator('.archive-file')).toHaveCount(2);
    await expect(page.locator('.drag-handle')).toHaveCount(2);
    await expect(page.locator('.diagnostics')).toContainText('ARCHIVE_COLLISION');
    expect(await page.getByTestId('file-picker').getAttribute('accept')).not.toContain('.mp3');
    await combine.click();
    await expect(page.getByRole('button', {name: downloadLabel, exact: true})).toBeEnabled();
    await page.getByRole('textbox', {name: english ? 'Output name' : 'Nome del risultato', exact: true}).fill('my-result');
    await page.getByRole('textbox', {name: english ? 'Output name' : 'Nome del risultato', exact: true}).press('Tab');
    const hashes: string[] = [];
    for (const extension of ['html', 'm4a', 'ico', 'pdf', 'zip']) {
      await page.getByRole('combobox', {name: english ? 'Extension' : 'Estensione', exact: true}).click();
      await page.getByRole('option', {name: `.${extension}`, exact: true}).click();
      const downloaded = page.waitForEvent('download');
      await page.getByRole('button', {name: downloadLabel, exact: true}).click();
      const download = await downloaded;
      expect(download.suggestedFilename()).toBe(`my-result.${extension}`);
      if (extension === 'zip') {
        await download.saveAs(testInfo.outputPath('example.polyglot'));
        expect(await exampleMessage((await download.path()), messagePath)).toBe(english ? 'Hi!\n' : 'Salve!\n');
      }
      hashes.push(createHash('sha256').update(readFileSync((await download.path()))).digest('hex'));
    }
    expect(new Set(hashes).size).toBe(1);
    await page.getByRole('article', {name: names[5], exact: true}).locator('.drag-handle button').press('ArrowUp');
    await expect(page.locator('.archive-file h3')).toHaveText([names[5], names[4]]);
    await expect(combine).toBeEnabled();
    await combine.click();
    await expect(page.getByRole('button', {name: downloadLabel, exact: true})).toBeEnabled();
    const reversedDownload = page.waitForEvent('download');
    await page.getByRole('button', {name: downloadLabel, exact: true}).click();
    const reversed = await reversedDownload;
    await reversed.saveAs(testInfo.outputPath('example-reversed.polyglot'));
    expect(await exampleMessage((await reversed.path()), messagePath)).toBe(english ? 'Hello!\n' : 'Ciao!\n');
    await page.screenshot({path: `test-results/generator-example-${language}.png`, fullPage: true});
    await page.reload();
    await expect(page.locator('.selected-file')).toHaveCount(0);
    await expect(combine).toBeDisabled();
    expect(await page.evaluate(() => localStorage.getItem('bhw.output.name'))).toBe('my-result');
    expect(await page.evaluate(() => Object.keys(localStorage).filter(key => /file|input|selection/.test(key)))).toEqual([]);
  });
}

test('loads the example for a newly selected language and ignores an older pending load', async({page}) => {
  let release = (): void => {};
  let started = (): void => {};
  const gate = new Promise<void>(resolve => { release = resolve; });
  const requested = new Promise<void>(resolve => { started = resolve; });
  await page.route('**/assets/example/en/page.html', async route => { started(); await gate; await route.continue(); });
  await page.goto('./');
  await page.getByRole('button', {name: 'Try an example', exact: true}).click();
  await requested;
  await page.getByRole('combobox', {name: 'Language', exact: true}).click();
  await page.getByRole('option', {name: 'IT Italiano'}).click();
  await page.getByRole('button', {name: 'Prova un esempio', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combina file', exact: true})).toBeEnabled();
  const oldResponse = page.waitForResponse(response => response.url().endsWith('/example/en/page.html'));
  release();
  await (await oldResponse).finished();
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
  await expect(page.locator('.selected-file h3')).toHaveText(['immagine.png', 'pagina.html', 'tono.mp3', 'documento.pdf', 'archivio-a.zip', 'archivio-b.zip']);
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

test('filters replacements by explicit role, preserves the role and restores broad auto detection', async({page}) => {
  for (const [file, role, extensions] of [
    ['transparent.png', 'Image', ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp']],
    ['audio.mp3', 'Audio / video', ['.mp3', '.wav', '.ogg', '.oga', '.opus', '.aac', '.m4a', '.mp4', '.m4v']],
    ['classic.pdf', 'PDF', ['.pdf']],
    ['first.zip', 'Archive', ['.zip', '.docx', '.xlsx', '.pptx', '.odt', '.ods', '.odp', '.jar', '.apk', '.epub']],
    ['index.html', 'HTML', ['.html', '.htm']]
  ] as const) {
    await page.goto('./');
    const buffer = file === 'index.html' ? Buffer.from('<!doctype html><p>Local HTML</p>') : readFileSync(`e2e/fixture/${file}`);
    await page.getByTestId('file-picker').setInputFiles({name: file, mimeType: '', buffer});
    const card = page.getByRole('article', {name: file, exact: true});
    const choice = card.getByRole('combobox', {name: 'Role', exact: true});
    await expect(choice).toBeEnabled();
    await choice.click();
    await page.getByRole('option', {name: role, exact: true}).click();
    await expect(choice).toContainText(role);
    const replacement = page.waitForEvent('filechooser');
    await card.getByRole('button', {name: 'Replace', exact: true}).click();
    const chooser = await replacement;
    expect(chooser.isMultiple()).toBe(false);
    expect((await chooser.element().getAttribute('accept'))!.split(',')).toEqual(extensions);
    await chooser.setFiles({name: `replacement-${file}`, mimeType: '', buffer});
    const replaced = page.getByRole('article', {name: `replacement-${file}`, exact: true});
    const selected = replaced.getByRole('combobox', {name: 'Role', exact: true});
    await expect(selected).toBeEnabled();
    await expect(selected).toContainText(role);
    await selected.click();
    await page.getByRole('option', {name: 'Auto detect', exact: true}).click();
    const automatic = page.waitForEvent('filechooser');
    await replaced.getByRole('button', {name: 'Replace', exact: true}).click();
    const broad = await automatic;
    expect((await broad.element().getAttribute('accept'))!.split(',')).toEqual(expect.arrayContaining(['.png', '.mp3', '.mp4', '.html', '.pdf', '.zip']));
    await broad.setFiles({name: 'auto.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><p>Auto detected replacement</p>')});
    const detected = page.getByRole('article', {name: 'auto.html', exact: true});
    await expect(detected.getByRole('combobox', {name: 'Role', exact: true})).toContainText('Auto detect');
    await expect(detected.locator('.file-metadata')).toContainText('HTML');
  }
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

test('reorders archive inputs and resolves collisions according to selected order', async({page}, testInfo) => {
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/first.zip', 'e2e/fixture/classic.pdf', 'e2e/fixture/second.zip']);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await expect(page.locator('.diagnostics')).toContainText('ARCHIVE_COLLISION');
  await expect(page.locator('.drag-handle')).toHaveCount(2);
  await expect(page.locator('.archive-group')).toHaveCount(1);
  await expect(page.locator('.archive-file h3')).toHaveText(['first.zip', 'second.zip']);
  await expect(page.getByRole('article', {name: 'classic.pdf', exact: true}).locator('.drag-handle')).toHaveCount(0);
  await expect(page.locator('.archive-order-hint')).toHaveText('Later archives overwrite matching paths. Drag archives to change their order.');
  const handle = page.getByRole('article', {name: 'second.zip', exact: true}).getByRole('button', {name: 'Reorder archive', exact: true});
  await handle.focus();
  await handle.press('ArrowUp');
  await expect(page.locator('.selected-file h3')).toHaveText(['second.zip', 'first.zip', 'classic.pdf']);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await expect(handle).toBeFocused();
  await handle.press('ArrowUp');
  await expect(page.locator('.selected-file h3')).toHaveText(['second.zip', 'first.zip', 'classic.pdf']);
  await page.getByRole('button', {name: 'Combine files', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
  await page.getByRole('combobox', {name: 'Extension', exact: true}).click();
  await page.getByRole('option', {name: '.zip', exact: true}).click();
  const downloaded = page.waitForEvent('download');
  await page.getByRole('button', {name: 'Download file', exact: true}).click();
  await (await downloaded).saveAs(testInfo.outputPath('reordered.polyglot'));
  await page.getByRole('article', {name: 'second.zip', exact: true}).getByRole('button', {name: 'Remove', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await expect(page.locator('.drag-handle')).toHaveCount(0);
  await expect(page.locator('.archive-order-hint')).toHaveCount(0);
  await page.getByTestId('file-picker').setInputFiles('e2e/fixture/second.zip');
  await expect(page.locator('.drag-handle')).toHaveCount(2);
  await expect(page.locator('.archive-order-hint')).toHaveCount(1);
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

test('attaches, replaces and removes HTML asset ZIPs inside the owning card', async({page}) => {
  const zip = new ZipWriter(new Uint8ArrayWriter(), {useWebWorkers: false});
  await zip.add('site/style.css', new Uint8ArrayReader(new TextEncoder().encode('h1{color:blue}')));
  const buffer = Buffer.from(await zip.close());
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles([
    {name: 'index.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><link rel="stylesheet" href="style.css"><h1>Assets</h1>')},
    {name: 'picture.png', mimeType: 'image/png', buffer: readFileSync('e2e/fixture/transparent.png')}
  ]);
  await expect(page.locator('.diagnostics')).toContainText('HTML_UNRESOLVED');
  const html = page.getByRole('article', {name: 'index.html', exact: true});
  const attach = page.waitForEvent('filechooser');
  await html.getByRole('button', {name: 'Add asset ZIP', exact: true}).click();
  const chooser = await attach;
  expect(chooser.isMultiple()).toBe(false);
  expect(await chooser.element().getAttribute('accept')).toBe('.zip');
  await chooser.setFiles({name: 'assets.zip', mimeType: 'application/zip', buffer});
  const path = html.getByRole('textbox', {name: 'HTML entry path inside the asset ZIP', exact: true});
  await expect(path).toBeEnabled();
  await path.fill('site/index.html'); await path.press('Tab');
  const combine = page.getByRole('button', {name: 'Combine files', exact: true});
  await expect(combine).toBeEnabled();
  await expect(page.locator('.selected-file')).toHaveCount(2);
  await expect(html.locator('.asset-file')).toContainText('assets.zip');
  const replace = page.waitForEvent('filechooser');
  await html.getByRole('button', {name: 'Replace asset ZIP', exact: true}).click();
  await (await replace).setFiles({name: 'replacement.zip', mimeType: 'application/zip', buffer});
  await expect(combine).toBeEnabled();
  await expect(html.locator('.asset-file')).toContainText('replacement.zip');
  await html.getByRole('button', {name: 'Remove asset ZIP', exact: true}).click();
  await expect(page.locator('.diagnostics')).toContainText('HTML_UNRESOLVED');
  await expect(html.getByRole('button', {name: 'Add asset ZIP', exact: true})).toBeEnabled();
  const again = page.waitForEvent('filechooser');
  await html.getByRole('button', {name: 'Add asset ZIP', exact: true}).click();
  await (await again).setFiles({name: 'assets.zip', mimeType: 'application/zip', buffer});
  await expect(combine).toBeEnabled();
  await page.getByRole('article', {name: 'picture.png', exact: true}).getByRole('button', {name: 'Remove', exact: true}).click();
  await expect(page.locator('.diagnostics')).toContainText('MINIMUM_FAMILIES');
  await page.getByTestId('file-picker').setInputFiles({name: 'picture.png', mimeType: 'image/png', buffer: readFileSync('e2e/fixture/transparent.png')});
  await expect(combine).toBeEnabled();
  // An HTML asset ZIP does not enable archive sorting or become a separate card.
  await expect(page.locator('.drag-handle')).toHaveCount(0);
  await expect(page.locator('.archive-order-hint')).toHaveCount(0);
  await expect(page.locator('.selected-file h3')).toHaveText(['index.html', 'picture.png']);
  await expect(combine).toBeEnabled();
  await html.getByRole('button', {name: 'Remove', exact: true}).click();
  await expect(page.locator('.selected-file')).toHaveCount(1);
  await expect(page.locator('.diagnostics')).toContainText('MINIMUM_FAMILIES');
  await expect(page.locator('.diagnostics')).not.toContainText('MISSING_HTML');
});

for (const language of ['en', 'it']) {
  test(`groups archives separately from HTML assets and keeps nested controls responsive in ${language}`, async({page}) => {
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    await page.getByTestId('file-picker').setInputFiles([
      'e2e/fixture/classic.pdf', 'e2e/fixture/first.zip', 'public/assets/example/en/page.html', 'e2e/fixture/second.zip'
    ]);
    const combine = page.getByRole('button', {name: language === 'en' ? 'Combine files' : 'Combina file', exact: true});
    await expect(combine).toBeEnabled();
    const html = page.getByRole('article', {name: 'page.html', exact: true});
    const chooser = page.waitForEvent('filechooser');
    await html.locator('.html-assets bhw-button button').click();
    await (await chooser).setFiles('e2e/fixture/first.zip');
    await expect(combine).toBeEnabled();
    await expect(page.locator('.archive-group')).toHaveCount(1);
    await expect(page.locator('.archive-file')).toHaveCount(2);
    await expect(html.locator('.asset-file')).toBeVisible();
    await expect(html.locator('.drag-handle')).toHaveCount(0);
    for (const width of [320, 390, 800, 1280]) {
      await page.setViewportSize({width, height: 900});
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      for (const card of await page.locator('.archive-file').all()) {
        const bounds = (await card.boundingBox())!;
        const handle = (await card.locator('.drag-handle').boundingBox())!;
        expect(Math.abs(handle.y + handle.height / 2 - bounds.y - bounds.height / 2)).toBeLessThanOrEqual(0.5);
        const remove = (await card.locator('.remove-action').boundingBox())!;
        const replace = (await card.locator('.replace-action').boundingBox())!;
        expect(remove.y + remove.height).toBeLessThanOrEqual(replace.y);
        for (const control of await card.locator('button, mat-select').all()) {
          const position = (await control.boundingBox())!;
          expect(position.x).toBeGreaterThanOrEqual(bounds.x);
          expect(position.x + position.width).toBeLessThanOrEqual(bounds.x + bounds.width);
        }
      }
    }
    await page.locator('.archive-file').first().locator('.drag-handle button').press('ArrowDown');
    await expect(page.locator('.archive-file h3')).toHaveText(['second.zip', 'first.zip']);
    await expect(html.locator('.asset-file')).toBeVisible();
    await expect(combine).toBeEnabled();
    await page.setViewportSize({width: 390, height: 900});
    await page.locator('.archive-group').screenshot({path: `test-results/archive-group-${language}.png`});
    for (const name of ['first.zip', 'second.zip']) {
      await page.getByRole('article', {name, exact: true}).locator('.remove-action button').click();
      await expect(combine).toBeEnabled();
    }
    await expect(page.locator('.archive-group')).toHaveCount(0);
    await expect(html.locator('.asset-file')).toBeVisible();
  });

  test(`keeps nested HTML asset controls accessible and responsive in ${language}`, async({page}, testInfo) => {
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    const zip = new ZipWriter(new Uint8ArrayWriter(), {useWebWorkers: false});
    await zip.add('style.css', new Uint8ArrayReader(new TextEncoder().encode('h1{color:blue}')));
    await page.goto('./');
    await page.getByTestId('file-picker').setInputFiles([
      {name: 'index.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><link rel="stylesheet" href="style.css"><h1>Assets</h1>')},
      {name: 'picture.png', mimeType: 'image/png', buffer: readFileSync('e2e/fixture/transparent.png')}
    ]);
    await expect(page.locator('.diagnostics')).toContainText('HTML_UNRESOLVED');
    await page.addStyleTag({content: 'html { overflow-y: scroll; scrollbar-gutter: stable; }'});
    const html = page.getByRole('article', {name: 'index.html', exact: true});
    const check = async(): Promise<void> => {
      for (const width of [320, 1280]) {
        await page.setViewportSize({width, height: 900});
        const overflow = await page.evaluate(() => Array.from(document.querySelectorAll('bhw-input-list button, bhw-input-list input')).filter(element => {
          const bounds = element.getBoundingClientRect();
          return bounds.left < 0 || bounds.right > document.documentElement.clientWidth;
        }).length);
        expect(overflow).toBe(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(html.locator('.drag-handle')).toHaveCount(0);
        const hint = html.locator('.asset-invitation p');
        await expect(hint).not.toContainText(language === 'en' ? 'Does not count' : 'Non conta');
        if (!await html.locator('.asset-file').count()) {
          const add = (await html.locator('.asset-invitation bhw-button').boundingBox())!;
          const text = (await hint.boundingBox())!;
          if (width === 1280) { expect(text.x).toBeGreaterThan(add.x + add.width); }
          else { expect(text.y).toBeGreaterThanOrEqual(add.y + add.height); }
        }
        // Resizing can move a disabled badge under the pointer; dismiss its animated tooltip before auditing the card.
        await page.mouse.move(0, 0);
        await page.keyboard.press('Escape');
        await expect(page.locator('.mat-mdc-tooltip-surface')).toBeHidden();
        const result = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(result.violations).toEqual([]);
        await html.screenshot({path: testInfo.outputPath(`html-${language}-${width}-${await html.locator('.asset-file').count()}.png`)});
      }
    };
    await check();
    const chooser = page.waitForEvent('filechooser');
    await html.locator('.html-assets bhw-button button').click();
    await (await chooser).setFiles({name: 'a-long-asset-archive-name-without-spaces.zip', mimeType: 'application/zip', buffer: Buffer.from(await zip.close())});
    await expect(page.getByRole('button', {name: language === 'en' ? 'Combine files' : 'Combina file', exact: true})).toBeEnabled();
    await check();
  });
}
