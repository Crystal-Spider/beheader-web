import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';
import {readFileSync} from 'node:fs';

test.use({locale: 'en-GB'});

test('records engine capabilities and reports unavailable storage without hanging', async({page, browser, browserName}, testInfo) => {
  await page.goto('./');
  const capabilities = await page.evaluate(async() => {
    let storage = 'available';
    try { await navigator.storage.getDirectory(); }
    catch(error) { storage = error instanceof DOMException ? error.name : String(error); }
    return {storage, secureContext: isSecureContext, worker: typeof Worker, userAgent: navigator.userAgent};
  });
  await testInfo.attach('browser-capabilities', {body: JSON.stringify({engine: browserName, version: browser.version(), project: testInfo.project.name, ...capabilities}, null, 2), contentType: 'application/json'});
  expect(capabilities.secureContext).toBe(true);
  expect(capabilities.worker).toBe('function');
  if (capabilities.storage !== 'available') {
    await page.getByTestId('file-picker').setInputFiles([
      {name: 'page.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><title>Storage check</title>')},
      {name: 'classic.pdf', mimeType: 'application/pdf', buffer: readFileSync('e2e/fixture/classic.pdf')}
    ]);
    const combine = page.getByRole('button', {name: 'Combine files', exact: true});
    await expect(combine).toBeEnabled();
    await combine.click();
    await expect(page.locator('.diagnostics')).toContainText('STORAGE_UNAVAILABLE');
    await expect(page.getByRole('button', {name: 'Download file', exact: true})).toHaveCount(0);
    await expect(page.getByRole('button', {name: 'Try an example', exact: true})).toBeEnabled();
  }
});

for (const language of ['en', 'it'] as const) {
  test(`has no automated WCAG A/AA violations in the ${language} shell and open language panel`, async({page}) => {
    await page.addInitScript(code => localStorage.setItem('bhw.language', code), language);
    await page.goto('./');
    const label = language === 'en' ? 'Language' : 'Lingua';
    await expect(page.getByRole('combobox', {name: label, exact: true})).toBeVisible();
    const scan = async(): Promise<void> => {
      const result = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(result.violations).toEqual([]);
    };
    await scan();
    await page.getByRole('combobox', {name: label, exact: true}).click();
    await expect(page.getByRole('listbox')).toBeVisible();
    await scan();
    await page.getByRole('combobox', {name: label, exact: true}).press('Escape');
  });
}

test('keeps selected inputs, advanced controls and the generated result accessible', async({page}, testInfo) => {
  let generating = false;
  let release = (): void => {};
  const gate = new Promise<void>(resolve => { release = resolve; });
  await page.route('**/worker-*.js', async route => {
    if (generating) { await gate; }
    await route.continue();
  });
  await page.goto('./');
  const storage = await page.evaluate(async() => navigator.storage.getDirectory().then(() => true, () => false));
  test.skip(!storage, 'This runner cannot open OPFS; real Safari generation acceptance is tracked separately.');
  await page.getByRole('button', {name: 'Try an example', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Additional payloads', exact: true}).click();
  let result = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
  generating = true;
  await page.getByRole('button', {name: 'Combine files', exact: true}).click();
  try {
    await expect(page.getByRole('progressbar', {name: 'Checking compatibility', exact: true})).toBeVisible();
    result = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations).toEqual([]);
  } finally { release(); }
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
  result = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(result.violations).toEqual([]);
  await page.screenshot({path: testInfo.outputPath('result.png'), fullPage: true});
});

test('switches language with touch without horizontal overflow', async({page}, testInfo) => {
  test.skip(!testInfo.project.use.hasTouch, 'Touch interaction is exercised by the mobile emulation projects.');
  await page.goto('./');
  await page.getByRole('combobox', {name: 'Language', exact: true}).tap();
  await page.getByRole('option', {name: 'IT Italiano'}).tap();
  await expect(page.getByRole('heading', {name: 'Un file. Tante possibilità.'})).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('generates an example using touch controls', async({page}, testInfo) => {
  test.skip(!testInfo.project.use.hasTouch, 'Touch interaction is exercised by the mobile emulation projects.');
  await page.goto('./');
  const storage = await page.evaluate(async() => navigator.storage.getDirectory().then(() => true, () => false));
  test.skip(!storage, 'This runner cannot open OPFS; touch generation on real iOS remains unverified.');
  await page.getByRole('button', {name: 'Try an example', exact: true}).tap();
  const combine = page.getByRole('button', {name: 'Combine files', exact: true});
  await expect(combine).toBeEnabled();
  await combine.tap();
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
});
