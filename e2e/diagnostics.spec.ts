import {expect, test} from '@playwright/test';

test.use({locale: 'en-GB'});

for (const language of ['en', 'it']) {
  test(`explains disabled generation and offers reports only for compatibility errors in ${language}`, async({page}) => {
    await page.setViewportSize({width: 320, height: 800});
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    const english = language === 'en';
    const combine = page.getByRole('button', {name: english ? 'Combine files' : 'Combina file', exact: true});
    const wrapper = page.locator('.combine-control');
    const tooltip = page.locator('.mat-mdc-tooltip-surface');
    const logs = page.getByRole('button', {name: english ? 'Diagnostics' : 'Diagnostica', exact: true});
    const issue = page.getByRole('link', {name: english ? 'Report' : 'Segnala', exact: true});
    await expect(combine).toBeDisabled();
    await expect(page.locator('.diagnostics')).toBeEmpty();
    await expect(wrapper).toHaveCSS('cursor', 'not-allowed');
    await wrapper.hover();
    await expect(tooltip).toHaveText(english ? 'Choose at least two different file types.' : 'Scegli almeno due tipi di file diversi.');
    await page.mouse.move(0, 0);
    await expect(tooltip).toBeHidden();
    await page.getByRole('button', {name: english ? 'Try an example' : 'Prova un esempio', exact: true}).focus();
    await page.keyboard.press('Tab');
    await expect(wrapper).toBeFocused();
    await expect(tooltip).toBeVisible();
    await page.keyboard.press('Escape');
    await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/transparent.png', 'e2e/fixture/static.jpg']);
    await expect(page.locator('.diagnostics .error')).toContainText('ROLE_CONFLICT');
    await expect(logs).toBeVisible();
    await expect(issue).toBeVisible();
    await expect(issue).toHaveAttribute('target', '_blank');
    await expect(issue.locator('mat-icon')).toHaveAttribute('data-mat-icon-name', 'external');
    await expect(issue).toHaveCSS('min-height', await logs.evaluate(button => getComputedStyle(button).minHeight));
    expect(await issue.evaluate(link => link.closest('bhw-button') === link.closest('.report-actions')?.lastElementChild)).toBe(true);
    for (const width of [1280, 600, 480, 440, 390, 320]) {
      await page.setViewportSize({width, height: 900});
      await expect.poll(() => page.locator('.report-actions').evaluate(actions => {
        const first = actions.querySelector('button')!.getBoundingClientRect();
        const last = actions.querySelector('a')!.getBoundingClientRect();
        const box = actions.getBoundingClientRect();
        return actions.classList.contains('stacked')
          ? Math.abs(first.width - box.width) < 1 && Math.abs(last.width - box.width) < 1 && last.y >= first.bottom + 11
          : Math.abs(first.x - box.x) < 1 && Math.abs(last.right - box.right) < 1 && Math.abs(first.y - last.y) < 1;
      })).toBe(true);
      if (width === 320) { await expect(page.locator('.report-actions')).toHaveClass(/stacked/); }
      if (width === 1280) { await expect(page.locator('.report-actions')).not.toHaveClass(/stacked/); }
    }
    await wrapper.hover();
    await expect(tooltip).toHaveText(english ? 'Check the errors above.' : 'Controlla gli errori sopra.');
    await page.mouse.move(0, 0);
    await page.getByRole('article', {name: 'static.jpg', exact: true}).getByRole('button', {name: english ? 'Remove' : 'Rimuovi', exact: true}).click();
    await expect(page.locator('.diagnostics')).toBeEmpty();
    await expect(logs).toHaveCount(0);
    await expect(issue).toHaveCount(0);
    await expect(combine).toBeDisabled();
    await expect(page.getByRole('button', {name: english ? 'Choose files' : 'Scegli file', exact: true})).toBeEnabled();
    await page.getByTestId('file-picker').setInputFiles('e2e/fixture/encrypted.pdf');
    await expect(combine).toBeDisabled();
    await expect(page.locator('.diagnostics .error')).toContainText('PDF_ENCRYPTED');
    await expect(page.locator('.diagnostics .error')).toHaveCSS('color', 'rgb(255, 146, 146)');
    await expect(logs).toBeVisible();
    await expect(issue).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.locator('.diagnostics').screenshot({path: `test-results/messages-error-${language}.png`});
  });
}

test('shows role guidance in light blue and archive overwrites in yellow without reporting actions', async({page}) => {
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/transparent.png', 'e2e/fixture/classic.pdf']);
  const role = page.getByRole('article', {name: 'transparent.png', exact: true}).getByRole('combobox', {name: 'Role', exact: true});
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await role.click();
  await page.getByRole('option', {name: 'HTML', exact: true}).click();
  await expect(page.locator('.diagnostics .info')).toContainText('ROLE_REASSIGNED');
  await expect(page.locator('.diagnostics .info')).toHaveCSS('color', 'rgb(171, 199, 255)');
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Combine files', exact: true}).click();
  await expect(page.locator('.diagnostics .error')).toContainText('HTML_ENCODING');
  await page.locator('.diagnostics').screenshot({path: 'test-results/messages-info.png'});
  await page.getByRole('button', {name: 'Try an example', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await expect(page.locator('.diagnostics .warning')).toContainText('ARCHIVE_COLLISION');
  await expect(page.locator('.diagnostics .warning')).toHaveCSS('color', 'rgb(245, 215, 110)');
  await expect(page.getByRole('button', {name: 'Diagnostics', exact: true})).toHaveCount(0);
  await expect(page.getByRole('link', {name: 'Report', exact: true})).toHaveCount(0);
  await expect(page.locator('.combine-control')).not.toHaveAttribute('tabindex');
  await page.locator('.diagnostics').screenshot({path: 'test-results/messages-warning.png'});
});

test('reports insufficient storage as a warning through the actual worker without issue or log actions', async({page}) => {
  await page.route('**/worker-*.js', async route => {
    const response = await route.fetch();
    await route.fulfill({response, body: `Object.defineProperty(navigator.storage, 'estimate', {value: async() => ({quota: 0, usage: 0})});\n${await response.text()}`});
  });
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/classic.pdf', 'e2e/fixture/first.zip']);
  const combine = page.getByRole('button', {name: 'Combine files', exact: true});
  await expect(combine).toBeEnabled();
  await combine.click();
  await expect(page.locator('.diagnostics .warning')).toContainText('STORAGE_FULL');
  await expect(page.locator('.diagnostics .error')).toHaveCount(0);
  await expect(page.getByRole('button', {name: 'Diagnostics', exact: true})).toHaveCount(0);
  await expect(page.getByRole('link', {name: 'Report', exact: true})).toHaveCount(0);
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toHaveCount(0);
  await expect(combine).toBeEnabled();
});
