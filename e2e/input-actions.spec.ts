import {readFileSync} from 'node:fs';
import {expect, test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({locale: 'en-GB'});

test('retains same-button cancellation when selection checks take long enough to show progress', async({page}) => {
  await page.route('**/worker-*.js', async route => {
    const response = await route.fetch();
    await route.fulfill({response, body: "self.addEventListener('message',event=>{if(event.data.type==='run')event.stopImmediatePropagation();});\n" + await response.text()});
  });
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles('e2e/fixture/classic.pdf');
  const button = page.locator('.combine-control button');
  await expect(page.locator('bhw-job-progress')).toBeVisible();
  await expect(button).toHaveAccessibleName('Cancel');
  await expect(button).toBeEnabled();
  await button.click();
  await expect(page.locator('.diagnostics')).toContainText('CANCELLED');
  await expect(page.locator('bhw-job-progress')).toBeHidden();
  await expect(button).toHaveAccessibleName('Combine files');
});

for (const explicit of [false, true]) {
  test(`detaches the asset ZIP when replacing ${explicit ? 'explicit' : 'auto-detected'} HTML`, async({page}) => {
    await page.goto('./');
    await page.getByTestId('file-picker').setInputFiles([
      {name: 'old.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><p>Original</p>')},
      {name: 'classic.pdf', mimeType: 'application/pdf', buffer: readFileSync('e2e/fixture/classic.pdf')},
      {name: 'first.zip', mimeType: 'application/zip', buffer: readFileSync('e2e/fixture/first.zip')}
    ]);
    const combine = page.getByRole('button', {name: 'Combine files', exact: true});
    await expect(combine).toBeEnabled();
    const html = page.getByRole('article', {name: 'old.html', exact: true});
    if (explicit) {
      await html.getByRole('combobox', {name: 'Role', exact: true}).click();
      await page.getByRole('option', {name: 'HTML', exact: true}).click();
      await expect(combine).toBeEnabled();
    }
    const attach = page.waitForEvent('filechooser');
    await html.getByRole('button', {name: 'Add asset ZIP', exact: true}).click();
    await (await attach).setFiles({name: 'old-assets.zip', mimeType: 'application/zip', buffer: readFileSync('e2e/fixture/first.zip')});
    await expect(combine).toBeEnabled();
    await expect(html.locator('.asset-file')).toContainText('old-assets.zip');
    const replacePdf = page.waitForEvent('filechooser');
    await page.getByRole('article', {name: 'classic.pdf', exact: true}).getByRole('button', {name: 'Replace', exact: true}).click();
    await (await replacePdf).setFiles({name: 'new.pdf', mimeType: 'application/pdf', buffer: readFileSync('e2e/fixture/classic.pdf')});
    await expect(combine).toBeEnabled();
    await expect(html.locator('.asset-file')).toContainText('old-assets.zip');
    const replace = page.waitForEvent('filechooser');
    await html.getByRole('button', {name: 'Replace', exact: true}).click();
    await (await replace).setFiles({name: 'new.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><p>Replacement</p>')});
    await expect(combine).toBeEnabled();
    await expect(page.locator('.asset-file')).toHaveCount(0);
    await expect(page.getByRole('article', {name: 'old.html', exact: true})).toHaveCount(0);
    await expect(page.getByRole('article', {name: 'new.html', exact: true}).getByRole('button', {name: 'Add asset ZIP', exact: true})).toBeEnabled();
    await expect(page.locator('.archive-file h3')).toHaveText(['first.zip']);
    await expect(page.locator('.diagnostics .error')).toHaveCount(0);
    await combine.click();
    await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
  });
}

for (const language of ['en', 'it']) {
  test(`wraps Choose files only when its readable row no longer fits in ${language}`, async({page}, testInfo) => {
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    const placeholder = page.locator('.file-placeholder');
    await expect(placeholder.locator('button')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    for (const width of [1280, 800, 768, 660, 600, 580, 560, 540, 520, 500, 480, 390, 320, 580, 800]) {
      await page.setViewportSize({width, height: 900});
      await expect.poll(() => placeholder.evaluate(element => {
        const button = element.querySelector('button')!;
        const invitation = element.querySelector('.file-invitation')!;
        const box = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const action = button.getBoundingClientRect();
        const text = invitation.getBoundingClientRect();
        const stacked = element.classList.contains('stacked');
        return stacked ? action.y >= text.bottom && Math.abs(action.width - (element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight))) < 1
          : action.x >= text.right && action.right <= box.right && Math.abs(action.y + action.height / 2 - text.y - text.height / 2) < 1;
      })).toBe(true);
      if (width >= 580) { await expect(placeholder).not.toHaveClass(/stacked/); }
      if (width <= 390) { await expect(placeholder).toHaveClass(/stacked/); }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (width === 580 || width === 320) { await placeholder.screenshot({path: testInfo.outputPath(`choose-${width}.png`)}); }
    }
    const languageSelect = page.getByRole('combobox', {name: language === 'en' ? 'Language' : 'Lingua', exact: true});
    await languageSelect.click();
    await page.getByRole('option', {name: language === 'en' ? /IT/ : /EN/}).click();
    await page.setViewportSize({width: 580, height: 900});
    await expect(placeholder).not.toHaveClass(/stacked/);
    expect((await new AxeBuilder({page}).disableRules(['region']).analyze()).violations).toEqual([]);
  });

  for (const reduced of [false, true]) {
    test(`crossfades Combine to immediate keyboard Cancel in ${language}${reduced ? ' with reduced motion' : ''}`, async({page}) => {
      await page.emulateMedia({reducedMotion: reduced ? 'reduce' : 'no-preference'});
      await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
      await page.route('**/worker-*.js', async route => {
        const response = await route.fetch();
        // Keep a real generate request pending before its worker handler runs.
        await route.fulfill({response, body: "self.addEventListener('message',event=>{if(event.data.type==='run'&&event.data.request.operation==='generate')event.stopImmediatePropagation();});\n" + await response.text()});
      });
      await page.goto('./');
      await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/classic.pdf', 'e2e/fixture/first.zip']);
      const button = page.locator('.combine-control button');
      await expect(page.getByRole('button', {name: language === 'en' ? 'Combine files' : 'Combina file', exact: true})).toBeEnabled();
      await expect(page.locator('bhw-job-progress')).toBeHidden();
      const before = (await button.boundingBox())!;
      await button.evaluate(element => {
        Reflect.set(window, 'bhwActionButton', element);
        new MutationObserver(() => {
          if (element.getAttribute('aria-label')?.match(/Cancel|Annulla/)) {
            Reflect.set(window, 'bhwImmediateCancel', !element.hasAttribute('disabled') && !document.querySelector('bhw-job-progress.visible'));
            element.getAnimations({subtree: true}).forEach(animation => { animation.pause(); animation.currentTime = 140; });
          }
        }).observe(element, {attributes: true, attributeFilter: ['aria-label']});
      });
      await button.focus();
      await page.keyboard.press('Enter');
      await expect(button).toHaveAccessibleName(language === 'en' ? 'Cancel' : 'Annulla');
      await expect(button).toBeEnabled();
      await expect(button).toBeFocused();
      expect(await page.evaluate(() => Reflect.get(window, 'bhwImmediateCancel') as boolean)).toBe(true);
      expect(await button.evaluate(element => element === Reflect.get(window, 'bhwActionButton'))).toBe(true);
      await expect(page.getByRole('button', {name: language === 'en' ? 'Cancel' : 'Annulla', exact: true})).toHaveCount(1);
      const opacity = await button.locator('.button-content').evaluateAll(elements => elements.map(element => Number(getComputedStyle(element).opacity)));
      if (reduced) { expect(opacity).toEqual([0, 1]); }
      else { expect(opacity.every(value => value > 0.1 && value < 0.9)).toBe(true); }
      await expect(button.locator('.alternate-action mat-icon')).toHaveAttribute('data-mat-icon-name', 'close');
      const after = (await button.boundingBox())!;
      expect(after.width).toBeCloseTo(before.width, 1); expect(after.height).toBeCloseTo(before.height, 1);
      await button.evaluate(element => element.getAnimations({subtree: true}).forEach(animation => animation.finish()));
      await page.keyboard.press('Enter');
      await expect(page.locator('.diagnostics')).toContainText('CANCELLED');
      await expect(button).toHaveAccessibleName(language === 'en' ? 'Combine files' : 'Combina file');
      await expect(button).toBeEnabled();
      await expect(button).toBeFocused();
      await expect(page.locator('bhw-job-progress')).toBeHidden();
    });
  }

  test(`shows and exports the specific PDF check in ${language} without private data`, async({page}) => {
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    await page.getByTestId('file-picker').setInputFiles([
      {name: 'private-document.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\nprivate-content')},
      {name: 'first.zip', mimeType: 'application/zip', buffer: readFileSync('e2e/fixture/first.zip')}
    ]);
    await expect(page.locator('.combine-control button')).toBeDisabled();
    const error = page.locator('.diagnostics .error');
    await expect(error).toContainText('PDF_INVALID');
    await expect(error).toContainText('startxref');
    await expect(error).toContainText('%%EOF');
    await expect(error).not.toContainText('(invalid)');
    const download = page.waitForEvent('download');
    await page.getByRole('button', {name: language === 'en' ? 'Diagnostics' : 'Diagnostica', exact: true}).click();
    const report = readFileSync((await (await download).path()), 'utf8');
    expect((JSON.parse(report) as {diagnostics: unknown}).diagnostics).toEqual([{code: 'PDF_INVALID', severity: 'error', reason: 'ENDING', message: await error.locator('p').innerText()}]);
    expect(report).not.toMatch(/private-document|private-content/);
    const issue = await page.getByRole('link', {name: language === 'en' ? 'Report' : 'Segnala', exact: true}).getAttribute('href');
    expect(decodeURIComponent(issue!)).toContain('ENDING');
    expect(issue).not.toMatch(/private-document|private-content/);
    expect(issue!.length).toBeLessThan(1800);
  });
}
