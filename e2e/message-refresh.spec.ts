import {readFileSync} from 'node:fs';
import {expect, test} from '@playwright/test';

test.use({locale: 'en-GB'});

test.beforeEach(async({page}) => {
  await page.addInitScript({content: `
    const OriginalWorker = window.Worker;
    window.Worker = class extends OriginalWorker {
      postMessage(message, ...args) {
        if (message.type === 'run' && message.request.operation === window.bhwHeldOperation) {
          window.bhwReleaseOperation = () => { window.bhwHeldOperation = null; super.postMessage(message, ...args); };
          return;
        }
        super.postMessage(message, ...args);
      }
    };
    window.bhwWatchMessages = () => {
      const panel = document.querySelector('.message-panel');
      window.bhwMessageVisibility = [];
      new MutationObserver(records => {
        for (const record of records) {
          window.bhwMessageVisibility.push(record.oldValue.split(' ').includes('open'), panel.classList.contains('open'));
        }
      }).observe(panel, {attributes: true, attributeFilter: ['class'], attributeOldValue: true});
    };
  `});
  await page.goto('./');
});

test('retains settled errors until replacement checks finish, then replaces or closes once', async({page}) => {
  await page.getByTestId('file-picker').setInputFiles([
    {name: 'bad.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\n')},
    {name: 'first.zip', mimeType: 'application/zip', buffer: readFileSync('e2e/fixture/first.zip')}
  ]);
  const panel = page.locator('.message-panel');
  await expect(panel).toHaveCSS('opacity', '1');
  await expect(panel).toContainText('PDF_INVALID');
  await page.evaluate(() => { (Reflect.get(window, 'bhwWatchMessages') as () => void)(); Reflect.set(window, 'bhwHeldOperation', 'inspect'); });
  let choosing = page.waitForEvent('filechooser');
  await page.getByRole('article', {name: 'bad.pdf', exact: true}).getByRole('button', {name: 'Replace', exact: true}).click();
  await (await choosing).setFiles('e2e/fixture/encrypted.pdf');
  await expect(panel).toHaveAttribute('aria-busy', 'true');
  await expect(panel).toContainText('bad.pdf');
  await expect(panel).toContainText('PDF_INVALID');
  await expect(panel).toHaveAttribute('aria-hidden', 'false');
  await expect(page.getByRole('button', {name: 'Diagnostics', exact: true})).toBeDisabled();
  await expect(page.getByRole('link', {name: 'Report', exact: true})).toHaveAttribute('aria-disabled', 'true');
  await page.evaluate(() => (Reflect.get(window, 'bhwReleaseOperation') as () => void)());
  await expect(panel).toHaveAttribute('aria-busy', 'false');
  await expect(panel).toContainText('PDF_ENCRYPTED');
  await expect(panel).toContainText('encrypted.pdf');
  expect(await page.evaluate(() => Reflect.get(window, 'bhwMessageVisibility') as boolean[])).not.toContain(false);
  await page.evaluate(() => Reflect.set(window, 'bhwHeldOperation', 'inspect'));
  choosing = page.waitForEvent('filechooser');
  await page.getByRole('article', {name: 'encrypted.pdf', exact: true}).getByRole('button', {name: 'Replace', exact: true}).click();
  await (await choosing).setFiles('e2e/fixture/classic.pdf');
  await expect(panel).toHaveAttribute('aria-busy', 'true');
  await expect(panel).toContainText('PDF_ENCRYPTED');
  await expect(panel).toHaveCSS('opacity', '1');
  await page.evaluate(() => (Reflect.get(window, 'bhwReleaseOperation') as () => void)());
  await expect(panel).toHaveAttribute('aria-hidden', 'true');
  await expect(panel).toHaveAttribute('inert');
  await expect(panel).toHaveCSS('opacity', '0');
  await expect(panel.locator('.diagnostics')).toBeEmpty();
});

for (const fails of [false, true]) {
  test(`keeps archive warnings open through generation ${fails ? 'failure' : 'success'}`, async({page}) => {
    const source = readFileSync('e2e/fixture/classic.pdf', 'utf8');
    await page.getByTestId('file-picker').setInputFiles([
      {name: 'document.pdf', mimeType: 'application/pdf', buffer: Buffer.from(fails ? source.replace('1 0 obj', '7 0 obj') : source)},
      ...['first.zip', 'second.zip'].map(name => ({name, mimeType: 'application/zip', buffer: readFileSync(`e2e/fixture/${name}`)}))
    ]);
    const panel = page.locator('.message-panel');
    await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
    await expect(panel).toHaveCSS('opacity', '1');
    const previous = await panel.innerText();
    await page.evaluate(() => { (Reflect.get(window, 'bhwWatchMessages') as () => void)(); Reflect.set(window, 'bhwHeldOperation', 'generate'); });
    await page.getByRole('button', {name: 'Combine files', exact: true}).click();
    await expect(panel).toHaveAttribute('aria-busy', 'true');
    await expect.poll(() => panel.innerText()).toBe(previous);
    await expect(panel).toHaveAttribute('aria-hidden', 'false');
    await page.evaluate(() => (Reflect.get(window, 'bhwReleaseOperation') as () => void)());
    await expect(panel).toHaveAttribute('aria-busy', 'false');
    await expect(panel).toContainText('ARCHIVE_COLLISION');
    if (fails) { await expect(panel).toContainText('PDF_INVALID'); }
    else { await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled(); }
    expect(await page.evaluate(() => Reflect.get(window, 'bhwMessageVisibility') as boolean[])).not.toContain(false);
  });
}
