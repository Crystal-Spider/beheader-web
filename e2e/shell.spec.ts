import {expect, test} from '@playwright/test';

test.use({locale: 'en-GB'});

test('switches language by keyboard, shows flags in both places, and remembers the choice', async({page}) => {
  await page.goto('./');
  const picker = page.getByRole('combobox', {name: 'Language', exact: true});
  await expect(picker.locator('img')).toHaveAttribute('src', 'assets/flag/gb.svg');
  await picker.focus();
  await picker.press('Enter');
  const panel = page.getByRole('listbox');
  await expect(panel.getByRole('option')).toHaveCount(2);
  await expect(panel.locator('img')).toHaveCount(2);
  await expect(panel.locator('img').nth(1)).toHaveAttribute('src', 'assets/flag/it.svg');
  await picker.press('ArrowDown');
  await picker.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('lang', 'it');
  await expect(page.getByRole('heading', {name: 'Un file. Tante possibilità.'})).toBeVisible();
  await expect(page.getByRole('combobox', {name: 'Lingua'}).locator('mat-select-trigger img')).toHaveAttribute('src', 'assets/flag/it.svg');
  await expect(page.getByRole('button', {name: 'Combina file', exact: true})).toBeDisabled();

  await page.reload();
  await expect(page.getByRole('heading', {name: 'Un file. Tante possibilità.'})).toBeVisible();
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(['bhw.language']);
});

test('uses a regional Italian browser preference on a first visit', async({browser}) => {
  const context = await browser.newContext({locale: 'it-IT', baseURL: 'http://127.0.0.1:4173/beheader-web/'});
  try {
    const page = await context.newPage();
    await page.goto('./');
    await expect(page.getByRole('heading', {name: 'Un file. Tante possibilità.'})).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'it');
    expect(await page.evaluate(() => localStorage.length)).toBe(0);
  } finally {
    await context.close();
  }
});

test('falls back to English for an unsupported browser locale', async({browser}) => {
  const context = await browser.newContext({locale: 'fr-FR', baseURL: 'http://127.0.0.1:4173/beheader-web/'});
  try {
    const page = await context.newPage();
    await page.goto('./');
    await expect(page.getByRole('heading', {name: 'One file. Many possibilities.'})).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  } finally {
    await context.close();
  }
});

test('ignores an invalid saved language', async({page}) => {
  await page.addInitScript(() => localStorage.setItem('bhw.language', 'not-a-language'));
  await page.goto('./');
  await expect(page.getByRole('heading', {name: 'One file. Many possibilities.'})).toBeVisible();
});

test('keeps language switching functional when storage is denied', async({page}) => {
  await page.addInitScript(() => {
    for (const method of ['getItem', 'setItem']) {
      Object.defineProperty(Storage.prototype, method, {value: () => {
        throw new DOMException('Storage denied', 'SecurityError');
      }});
    }
  });
  await page.goto('./');
  await page.getByRole('combobox', {name: 'Language', exact: true}).click();
  await page.getByRole('option', {name: 'IT Italiano'}).click();
  await expect(page.getByRole('heading', {name: 'Un file. Tante possibilità.'})).toBeVisible();
});

test('ships its UI assets locally and links to the source and funding destinations', async({page}) => {
  const external: string[] = [];
  page.on('request', request => {
    if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') {
      external.push(request.url());
    }
  });
  await page.goto('./');
  await expect(page.getByRole('heading', {name: 'Your polyglot', exact: true})).toBeVisible();
  await expect(page.getByRole('link', {name: 'Source', exact: true})).toHaveAttribute('href', 'https://github.com/Crystal-Spider/beheader-web');
  await expect(page.getByRole('link', {name: 'Patreon', exact: true})).toHaveAttribute('href', 'https://www.patreon.com/crystalspider');
  await expect(page.getByRole('link', {name: 'Ko-fi', exact: true})).toHaveAttribute('href', 'https://ko-fi.com/crystalspider');
  await expect(page.locator('bhw-icon svg')).toHaveCount(10);
  const audio = page.getByRole('list', {name: 'Available input types'}).getByRole('listitem').filter({has: page.getByRole('button', {name: 'Audio', exact: true})});
  await expect(audio).toHaveAttribute('aria-disabled', 'false');
  await expect(page.getByRole('list', {name: 'Available input types'}).getByRole('listitem').filter({has: page.getByRole('button', {name: 'Video', exact: true})})).toHaveAttribute('aria-disabled', 'false');
  expect(external).toEqual([]);
});

for (const width of [320, 390, 768, 1280]) {
  test(`fits the English and Italian shell at ${width}px`, async({page}) => {
    await page.setViewportSize({width, height: 900});
    await page.goto('./');
    await expect(page.getByRole('heading', {name: 'Your files', exact: true})).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole('combobox', {name: 'Language', exact: true}).click();
    await page.getByRole('option', {name: 'IT Italiano'}).click();
    await expect(page.getByRole('heading', {name: 'I tuoi file', exact: true})).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.getByRole('list', {name: 'Tipi di file disponibili'}).getByRole('listitem')).toHaveCount(6);
    await expect(page.getByRole('listbox')).toBeHidden();
    const picker = page.getByRole('combobox', {name: 'Lingua'});
    await picker.click();
    await expect.poll(async() => {
      const input = await picker.boundingBox();
      const panel = await page.getByRole('listbox').boundingBox();
      if (!input || !panel) { return Infinity; }
      return Math.min(Math.abs(input.x - panel.x), Math.abs(input.x + input.width - panel.x - panel.width));
    }).toBeLessThanOrEqual(1);
    if (width === 390 || width === 1280) {
      await page.screenshot({path: `test-results/language-panel-${width}.png`, fullPage: true});
    }
    await picker.press('Escape');
    await expect(page.getByRole('listbox')).toBeHidden();
    if (width === 390 || width === 1280) {
      await page.screenshot({path: `test-results/milestone-2-${width}.png`, fullPage: true});
    }
  });
}
