import {expect, test} from '@playwright/test';

test.use({locale: 'en-GB'});

test('boots the production shell beneath the GitHub Pages project path', async({page, request}) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('response', response => {
    if (response.status() >= 400) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });

  await page.goto('./');

  await expect(page).toHaveTitle('Beheader Web');
  await expect(page.getByRole('heading', {name: 'One file. Many possibilities.'})).toBeVisible();
  await expect(page.locator('bhw-root')).toHaveAttribute('ng-version', /^22\./);
  await expect(page.getByRole('link', {name: 'Beheader', exact: true})).toHaveAttribute('href', 'https://github.com/p2r3/beheader');
  await expect(page.getByRole('button', {name: 'Choose files', exact: true})).toBeEnabled();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeDisabled();

  const assetUrls = await page.locator('script[src]').evaluateAll(scripts => scripts.map(script => script.getAttribute('src')));
  expect(assetUrls.length).toBeGreaterThan(0);
  expect(assetUrls.every(url => url !== null && !url.startsWith('/'))).toBe(true);

  const missingAsset = await request.get('missing.js');
  expect(missingAsset.status()).toBe(404);
  expect(errors).toEqual([]);
});
