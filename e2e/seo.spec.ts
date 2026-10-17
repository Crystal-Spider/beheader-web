import {readFileSync} from 'node:fs';
import {expect, test} from '@playwright/test';

import english from '../src/app/core/i18n/en.json' with {type: 'json'};
import italian from '../src/app/core/i18n/it.json' with {type: 'json'};
import {startUpdateServer} from './update-server';

/** The public structured-data fields checked independently of their Angular writer. */
interface StructuredPage {
  readonly '@type': string;
  readonly name: string;
  readonly url: string;
  readonly description: string;
  readonly inLanguage: readonly string[];
}

test.use({locale: 'en-GB'});

test.describe('without JavaScript', () => {
  test.use({javaScriptEnabled: false});

  test('serves readable content and sharing metadata before Angular runs', async({page}) => {
    const server = await startUpdateServer();
    try {
      await page.goto(server.url);
      const canonical = 'https://crystal-spider.github.io/beheader-web/';
      await expect(page).toHaveTitle(english.seo.title);
      await expect(page.getByRole('heading', {name: 'Beheader Web', exact: true})).toBeVisible();
      await expect(page.getByText('A free, local polyglot file generator.', {exact: true})).toBeVisible();
      await expect(page.getByText('Enable JavaScript to choose and combine files. No files are uploaded.', {exact: true})).toBeVisible();
      await expect(page.getByRole('link', {name: 'Source code', exact: true})).toHaveAttribute('href', 'https://github.com/Crystal-Spider/beheader-web');
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
      for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
        await expect(page.locator(selector)).toHaveAttribute('content', english.seo.description);
      }
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
      await expect(page.locator('meta[name="robots"]')).not.toHaveAttribute('content', /noindex|nofollow/);
      const schema = JSON.parse((await page.locator('#application-schema').textContent())!) as StructuredPage;
      expect(schema['@type']).toBe('WebApplication');
      expect(schema.name).toBe('Beheader Web');
      expect(schema.url).toBe(canonical);
      expect(schema.description).toBe(english.seo.description);
      expect(schema.inLanguage).toEqual(['en', 'it']);
      const image = (await page.locator('meta[property="og:image"]').getAttribute('content'))!;
      expect(image.startsWith(canonical)).toBe(true);
      const response = await page.request.get(new URL(new URL(image).pathname, server.url).href);
      expect(response.ok()).toBe(true);
      const pixels = await response.body();
      expect(String(pixels.readUInt32BE(16))).toBe(await page.locator('meta[property="og:image:width"]').getAttribute('content'));
      expect(String(pixels.readUInt32BE(20))).toBe(await page.locator('meta[property="og:image:height"]').getAttribute('content'));
    } finally { await page.close(); await server.close(); }
  });
});

test('localizes metadata without duplicating tags, changing canonical identity or exposing selected filenames', async({page}) => {
  await page.goto('./');
  for (const [code, label, copy, locale] of [
    ['en', 'EN English', english.seo, 'en_GB'],
    ['it', 'IT Italiano', italian.seo, 'it_IT'],
    ['en', 'EN English', english.seo, 'en_GB']
  ] as const) {
    await page.locator('bhw-language-picker mat-select').click();
    await page.getByRole('option', {name: label, exact: true}).click();
    await expect(page.locator('html')).toHaveAttribute('lang', code);
    await expect(page).toHaveTitle(copy.title);
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
      await expect(page.locator(selector)).toHaveCount(1);
      await expect(page.locator(selector)).toHaveAttribute('content', copy.description);
    }
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
      await expect(page.locator(selector)).toHaveCount(1);
      await expect(page.locator(selector)).toHaveAttribute('content', copy.title);
    }
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', locale);
    const schema = JSON.parse((await page.locator('#application-schema').textContent())!) as StructuredPage;
    expect(schema.description).toBe(copy.description);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://crystal-spider.github.io/beheader-web/');
  }
  const before = await page.locator('head title, head meta, head link[rel="canonical"], #application-schema').evaluateAll(nodes => nodes.map(node => node.outerHTML));
  await page.getByTestId('file-picker').setInputFiles([
    {name: 'private-filename-do-not-index.png', mimeType: 'image/png', buffer: readFileSync('e2e/fixture/transparent.png')},
    {name: 'private-filename-do-not-index.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><h1>Private uploaded content</h1>')}
  ]);
  await expect(page.getByRole('button', {name: 'Choose files', exact: true})).toBeEnabled();
  expect(await page.locator('head title, head meta, head link[rel="canonical"], #application-schema').evaluateAll(nodes => nodes.map(node => node.outerHTML))).toEqual(before);
  await expect(page.locator('.startup-content')).toHaveCount(0);
});
