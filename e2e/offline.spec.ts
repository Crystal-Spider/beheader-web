import {Page, expect, test} from '@playwright/test';
import {readFileSync} from 'node:fs';

import {startUpdateServer} from './update-server';

const manifest = JSON.parse(readFileSync('docs/ngsw.json', 'utf8')) as {hashTable: Record<string, string>};

/**
 * Observe actual prefetched responses without relying on application status text or test hooks.
 * @param {Page} page Production page with service workers enabled.
 * @returns {Promise<void>} Completion once all published cache entries are present.
 */
async function waitForOfflineCache(page: Page): Promise<void> {
  await page.evaluate(async() => { await navigator.serviceWorker.ready; });
  await expect.poll(() => page.evaluate(async urls => {
    const cached = await Promise.all(urls.map(url => caches.match(new URL(url, location.origin))));
    return cached.every(response => !!response);
  }, Object.keys(manifest.hashTable)), {timeout: 30000}).toBe(true);
}

test.use({serviceWorkers: 'allow', locale: 'en-GB'});

for (const fallback of [false, true]) {
  test(`closes and reopens offline${fallback ? ' without native audio APIs' : ''}, switches language, converts audio and downloads without network responses`, async({page, context}) => {
    test.setTimeout(60000);
    // A same-origin fixture keeps Firefox's module workers under service-worker
    // control; blob worker wrappers do not preserve that offline cache path.
    const server = fallback ? await startUpdateServer("Object.defineProperty(globalThis, 'AudioDecoder', {value: undefined}); Object.defineProperty(globalThis, 'AudioData', {value: undefined});") : null;
    const url = server?.url ?? './';
    try {
      await page.goto(url);
      await waitForOfflineCache(page);
      await expect(page.getByTestId('offline-ready')).toHaveCount(0);
      await page.close();
      await context.setOffline(true);
      const reopened = await context.newPage();
      const responses: {url: string; cached: boolean}[] = [];
      const failures: string[] = [];
      reopened.on('response', response => { if (response.url().startsWith('http:')) { responses.push({url: response.url(), cached: response.fromServiceWorker()}); } });
      reopened.on('requestfailed', request => failures.push(request.url()));
      await reopened.goto(url);
      await expect(reopened.locator('.selected-file')).toHaveCount(0);
      const metadataCached = await reopened.evaluate(async() => {
        const manifestUrl = document.querySelector<HTMLLinkElement>('link[rel="manifest"]')!.href;
        const manifest = await (await fetch(manifestUrl)).json() as {icons: {src: string}[]};
        const urls = [manifestUrl, ...manifest.icons.map(icon => new URL(icon.src, manifestUrl).href), ...Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]'), link => link.href)];
        return (await Promise.all(urls.map(async url => (await fetch(url)).ok))).every(Boolean);
      });
      expect(metadataCached).toBe(true);
      await reopened.getByRole('combobox', {name: 'Language', exact: true}).click();
      await reopened.getByRole('option', {name: 'IT Italiano'}).click();
      await reopened.getByRole('button', {name: 'Prova un esempio', exact: true}).click();
      await expect(reopened.getByRole('button', {name: 'Combina file', exact: true})).toBeEnabled();
      await expect(reopened.locator('.selected-file h3')).toHaveText(['immagine.png', 'pagina.html', 'tono.mp3', 'documento.pdf', 'archivio-a.zip', 'archivio-b.zip']);
      await reopened.getByRole('button', {name: 'Combina file', exact: true}).click();
      await expect(reopened.getByRole('button', {name: 'Scarica file', exact: true})).toBeEnabled();
      const downloaded = reopened.waitForEvent('download');
      await reopened.getByRole('button', {name: 'Scarica file', exact: true}).click();
      expect(readFileSync((await (await downloaded).path())).length).toBeGreaterThan(30000);
      expect(failures).toEqual([]);
      expect(responses.length).toBeGreaterThan(5);
      expect(responses.filter(response => !response.cached)).toEqual([]);
      await reopened.close();
    } finally { await server?.close(); }
  });
}

test('caches a new deployment automatically on reload and uses it on the next load offline', async({page, context}) => {
  test.setTimeout(60000);
  const server = await startUpdateServer();
  try {
    await page.addInitScript(() => {
      Object.assign(window, {bhwUpdateReady: false});
      navigator.serviceWorker.addEventListener('message', (event: MessageEvent<{type?: string; latestVersion?: {appData?: {revision?: string}}}>) => {
        if (event.data.type === 'VERSION_READY' && event.data.latestVersion?.appData?.revision === 'next') { Object.assign(window, {bhwUpdateReady: true}); }
      });
    });
    await page.goto(server.url);
    await waitForOfflineCache(page);
    await expect(page.locator('meta[name="bhw-fixture-build"]')).toHaveCount(0);
    server.publish();
    let loads = 0;
    page.on('domcontentloaded', () => { loads++; });
    await page.reload();
    await expect(page.getByRole('heading', {name: 'One file. Many possibilities.'})).toBeVisible();
    await page.getByRole('button', {name: 'Try an example', exact: true}).click();
    await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
    await page.getByRole('button', {name: 'Combine files', exact: true}).click();
    await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
    await expect.poll(() => page.evaluate(() => (window as unknown as {bhwUpdateReady: boolean}).bhwUpdateReady), {timeout: 30000}).toBe(true);
    await expect(page.getByRole('button', {name: 'Reload application', exact: true})).toHaveCount(0);
    await expect(page.getByText('An update is ready.', {exact: false})).toHaveCount(0);
    await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
    await expect(page.locator('.selected-file')).toHaveCount(6);
    expect(loads).toBe(1);
    await expect(page.locator('meta[name="bhw-fixture-build"]')).toHaveCount(0);
    await context.setOffline(true);
    await page.reload();
    await expect(page.locator('meta[name="bhw-fixture-build"]')).toHaveAttribute('content', 'next');
    await expect(page.getByRole('heading', {name: 'One file. Many possibilities.'})).toBeVisible();
    await expect(page.locator('.selected-file')).toHaveCount(0);
  } finally { await page.close(); await server.close(); }
});
