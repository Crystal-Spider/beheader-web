import {expect, test} from '@playwright/test';

import {startUpdateServer} from './update-server';

/** Install metadata consumed by browsers, independent of Angular's offline manifest. */
interface WebManifest {
  readonly id: string;
  readonly start_url: string;
  readonly scope: string;
  readonly display: string;
  readonly theme_color: string;
  readonly icons: readonly {src: string; sizes: string; type: string; purpose?: string}[];
}

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

  await expect(page).toHaveTitle('Beheader Web — Local Polyglot File Generator');
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

test('loads app identity and decodable, mask-safe icons beneath the project path', async({page}) => {
  const server = await startUpdateServer();
  try {
    await page.goto(server.url);
    const manifestUrl = await page.locator('link[rel="manifest"]').evaluate(element => (element as HTMLLinkElement).href);
    const response = await page.request.get(manifestUrl);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('application/manifest+json');
    const manifest = await response.json() as WebManifest;
    for (const key of ['id', 'start_url', 'scope'] as const) { expect(new URL(manifest[key], manifestUrl).href).toBe(server.url); }
    expect(manifest.display).toBe('standalone');
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', manifest.theme_color);
    const urls = await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').evaluateAll(elements => elements.map(element => (element as HTMLLinkElement).href));
    const icons = manifest.icons.map(icon => ({...icon, url: new URL(icon.src, manifestUrl).href}));
    for (const url of new Set([...urls, ...icons.map(icon => icon.url)])) {
      expect(url.startsWith(`${server.url}favicon/`)).toBe(true);
      expect((await page.request.get(url)).ok()).toBe(true);
    }
    const decoded = await page.evaluate(async urls => Promise.all(urls.map(async url => {
      const image = new Image(); image.src = url; await image.decode();
      return {url, size: `${image.naturalWidth}x${image.naturalHeight}`};
    })), [...new Set([...urls, ...icons.map(icon => icon.url)])]);
    for (const icon of icons.filter(icon => icon.sizes !== 'any')) {
      expect(decoded.find(image => image.url === icon.url)?.size).toBe(icon.sizes);
    }
    const touch = await page.locator('link[rel="apple-touch-icon"]').evaluate(element => (element as HTMLLinkElement).href);
    expect(decoded.find(image => image.url === touch)?.size).toBe('180x180');
    const maskable = icons.find(icon => icon.purpose === 'maskable' && icon.type === 'image/png')!;
    const regular = icons.find(icon => !icon.purpose && icon.sizes === '512x512')!;
    const geometry = await page.evaluate(async urls => {
      const inspect = async(url: string): Promise<{opaque: boolean; radius: number; limit: number; width: number; height: number; padding: number}> => {
        const image = new Image(); image.src = url; await image.decode();
        const canvas = document.createElement('canvas'); canvas.width = canvas.height = image.naturalWidth;
        const context = canvas.getContext('2d')!; context.drawImage(image, 0, 0);
        const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
        let opaque = true; let radius = 0;
        let minX = canvas.width; let maxX = 0; let minY = canvas.height; let maxY = 0;
        for (let index = 0; index < pixels.length; index += 4) {
          if (pixels[index + 3] !== 255) { opaque = false; }
          if (pixels[index]! > 40) {
            const x = index / 4 % canvas.width;
            const y = Math.floor(index / 4 / canvas.width);
            radius = Math.max(radius, Math.hypot(x - canvas.width / 2, y - canvas.height / 2));
            minX = Math.min(minX, x); maxX = Math.max(maxX, x);
            minY = Math.min(minY, y); maxY = Math.max(maxY, y);
          }
        }
        return {opaque, radius, limit: canvas.width * 0.4, width: maxX - minX + 1, height: maxY - minY + 1, padding: Math.min(minX, minY, canvas.width - maxX - 1, canvas.height - maxY - 1)};
      };
      return {maskable: await inspect(urls.maskable), regular: await inspect(urls.regular)};
    }, {maskable: maskable.url, regular: regular.url});
    expect(geometry.maskable.opaque).toBe(true);
    expect(geometry.maskable.radius).toBeGreaterThan(0);
    expect(geometry.maskable.radius).toBeLessThan(geometry.maskable.limit);
    expect(geometry.regular.height).toBeGreaterThan(geometry.maskable.height);
    expect(Math.abs(geometry.regular.width - geometry.regular.height)).toBeLessThanOrEqual(1);
    expect(geometry.regular.padding).toBeGreaterThan(0);
  } finally { await page.close(); await server.close(); }
});
