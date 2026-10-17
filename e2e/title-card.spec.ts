import AxeBuilder from '@axe-core/playwright';
import {expect, test} from '@playwright/test';

test.use({locale: 'en-GB'});

/**
 * Reads the decorative bitmap independently of its emitter implementation.
 * @param {HTMLElement | SVGElement} element Located canvas surface.
 * @returns {number[]} RGBA samples, including transparent pixels.
 */
function readPixels(element: HTMLElement | SVGElement): number[] {
  const canvas = element as HTMLCanvasElement;
  return Array.from(canvas.getContext('2d')!.getImageData(0, 0, canvas.width, canvas.height).data);
}

test('keeps the button visible, hints once per browser and never opens the guide on hover', async({page}, testInfo) => {
  await page.goto('./');
  const card = page.locator('bhw-title-card');
  const toggle = card.locator('.flip-toggle');
  await expect(toggle).toHaveClass(/inviting/);
  await expect(toggle).toHaveCSS('opacity', '1');
  await expect(card.locator('.face-label.current')).toHaveText('.title');
  await card.hover();
  await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'true');
  const trail = card.locator('bhw-sparkle-trail');
  await expect(trail).toHaveAttribute('aria-hidden', 'true');
  await expect(trail).toHaveCSS('pointer-events', 'none');
  await expect(trail).toHaveCSS('transform', 'none');
  await card.screenshot({path: testInfo.outputPath('first-visit-trail.png')});
  await expect(toggle).toHaveClass(/inviting/);
  expect(await page.evaluate(() => localStorage.getItem('bhw.hero-introduced'))).toBeNull();
  await page.reload();
  await expect(toggle).toHaveClass(/inviting/);
  const before = await card.boundingBox();
  await card.getByRole('button').click();
  await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'false');
  await expect(card.locator('.face-label.current')).toHaveText('.desc');
  await expect(card.locator('.front')).toHaveAttribute('inert', '');
  await expect(toggle).not.toHaveClass(/inviting/);
  await expect(trail).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('bhw.hero-introduced'))).toBe('true');
  expect((await card.boundingBox())!.height).toBe(before!.height);
  await page.reload();
  await expect(toggle).not.toHaveClass(/inviting/);
  await expect(toggle).toHaveCSS('opacity', '1');
  await card.hover();
  await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'true');
});

test('generates fresh scattered stars each lap and releases the surface when dismissed', async({page}, testInfo) => {
  await page.clock.install();
  await page.goto('./');
  const card = page.locator('bhw-title-card');
  const canvas = card.locator('canvas');
  await expect(canvas).toBeVisible();
  await page.clock.runFor(700);
  const first = await canvas.evaluate(readPixels);
  expect(first.filter((value, index) => index % 4 === 3 && value > 0).length).toBeGreaterThan(20);
  await card.screenshot({path: testInfo.outputPath('scattered-stars-first.png')});
  await page.clock.runFor(3000);
  const second = await canvas.evaluate(readPixels);
  expect(second).not.toEqual(first);
  await card.screenshot({path: testInfo.outputPath('scattered-stars-next-lap.png')});
  const surface = await canvas.elementHandle();
  if (!surface) { throw new Error('Missing sparkle surface'); }
  await card.getByRole('button').click();
  await expect(card.locator('bhw-sparkle-trail')).toHaveCount(0);
  expect((await surface.evaluate(readPixels)).every(value => value === 0)).toBe(true);
});

test('clears and pauses sparkles while the page is hidden, then resumes without a burst', async({page}) => {
  await page.clock.install();
  await page.goto('./');
  const canvas = page.locator('bhw-sparkle-trail canvas');
  await expect(canvas).toBeVisible();
  await page.clock.runFor(500);
  expect((await canvas.evaluate(readPixels)).some(value => value > 0)).toBe(true);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', {configurable: true, value: true});
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.clock.runFor(5000);
  expect((await canvas.evaluate(readPixels)).every(value => value === 0)).toBe(true);
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', {configurable: true, value: false});
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.clock.runFor(200);
  expect((await canvas.evaluate(readPixels)).some(value => value > 0)).toBe(true);
});

test('keeps a manually opened guide open after leaving and supports Escape without losing focus', async({page}) => {
  await page.addInitScript(() => localStorage.setItem('bhw.hero-introduced', 'true'));
  await page.goto('./');
  const card = page.locator('bhw-title-card');
  const toggle = card.getByRole('button', {name: 'How it works', exact: true});
  await toggle.click();
  await expect(card.getByRole('button', {name: 'Back to title', exact: true})).toHaveAttribute('aria-expanded', 'true');
  await page.mouse.move(0, 0);
  await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'false');
  await card.getByRole('button').press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await toggle.press('Enter');
  await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'false');
});

test('crossfades text, background, icon and extension without moving the layout', async({page}) => {
  await page.addInitScript(() => localStorage.setItem('bhw.hero-introduced', 'true'));
  await page.goto('./');
  const card = page.locator('bhw-title-card');
  const hero = card.locator('.hero');
  const height = (await hero.boundingBox())!.height;
  const title = await card.locator('.front h1').boundingBox();
  const guideTitle = await card.locator('.guide h2').boundingBox();
  expect(title!.x).toBe(guideTitle!.x); expect(title!.y).toBe(guideTitle!.y);
  await card.getByRole('button').click();
  const middle = await hero.evaluate(element => {
    for (const animation of element.getAnimations({subtree: true})) {
      animation.pause(); animation.currentTime = Number(animation.effect!.getTiming().duration) / 2;
    }
    return {
      text: Array.from(element.querySelectorAll('.face'), face => Number(getComputedStyle(face).opacity)),
      icons: Array.from(element.querySelectorAll('.icon-stack bhw-icon'), icon => Number(getComputedStyle(icon).opacity)),
      labels: Array.from(element.querySelectorAll('.face-label'), label => Number(getComputedStyle(label).opacity)),
      background: Number(getComputedStyle(element, '::before').opacity),
      transforms: Array.from(element.querySelectorAll('.face'), face => getComputedStyle(face).transform)
    };
  });
  for (const opacities of [middle.text, middle.icons, middle.labels]) {
    expect(opacities.every(value => value > 0.1 && value < 0.9)).toBe(true);
    expect(opacities.reduce((sum, value) => sum + value, 0)).toBeCloseTo(1, 2);
  }
  expect(middle.background).toBeGreaterThan(0.1); expect(middle.background).toBeLessThan(0.9);
  expect(middle.transforms).toEqual(['none', 'none']);
  await hero.evaluate(element => element.getAnimations({subtree: true}).forEach(animation => animation.finish()));
  await expect(card.locator('.guide')).toHaveCSS('opacity', '1');
  expect((await hero.boundingBox())!.height).toBe(height);
  await expect(card.locator('.face canvas, svg filter')).toHaveCount(0);
  await card.getByRole('button').click();
  await expect(card.locator('.front')).toHaveCSS('opacity', '1');
});

test('removes transition motion when the preference changes', async({page}) => {
  await page.goto('./');
  const card = page.locator('bhw-title-card');
  const canvas = card.locator('canvas');
  await expect(canvas).toBeVisible();
  await page.emulateMedia({reducedMotion: 'reduce'});
  await expect(canvas).toBeHidden();
  await expect.poll(async() => (await canvas.evaluate(readPixels)).every(value => value === 0)).toBe(true);
  await card.getByRole('button').click();
  await expect(card.locator('.guide')).toHaveCSS('opacity', '1');
  await expect(card.locator('.front')).toHaveCSS('opacity', '0');
  await expect(card.locator('.guide')).toHaveCSS('transition-duration', '0s');
});

test('offers a keyboard control on the first visit without needing a pointer hover', async({page}) => {
  await page.goto('./');
  await expect(page.getByRole('heading', {name: 'One file. Many possibilities.'})).toBeVisible();
  // Start from the preceding control; Safari's native link tabbing preference varies.
  await page.getByRole('combobox', {name: 'Language', exact: true}).focus();
  await page.keyboard.press('Tab');
  const toggle = page.locator('bhw-title-card').getByRole('button');
  await expect(toggle).toBeFocused();
  await expect(page.locator('.flip-toggle')).toHaveCSS('opacity', '1');
  await toggle.press('Enter');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await toggle.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('keeps the one-time interaction usable when preference storage is denied', async({page}) => {
  await page.addInitScript(() => {
    for (const name of ['getItem', 'setItem']) {
      Object.defineProperty(Storage.prototype, name, {value: () => { throw new DOMException('Denied', 'SecurityError'); }});
    }
  });
  await page.goto('./');
  const card = page.locator('bhw-title-card');
  await expect(card.locator('.flip-toggle')).toHaveCSS('opacity', '1');
  await card.hover();
  await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'true');
  await card.getByRole('button').click();
  await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'false');
});

test('keeps both guide languages accessible and responsive at mobile and desktop widths', async({page}, testInfo) => {
  await page.addInitScript(() => localStorage.setItem('bhw.hero-introduced', 'true'));
  await page.goto('./');
  const card = page.locator('bhw-title-card');
  for (const width of [320, 1280]) {
    await page.setViewportSize({width, height: 900});
    for (const language of ['en', 'it']) {
      const label = language === 'en' ? 'EN English' : 'IT Italiano';
      await page.locator('bhw-language-picker mat-select').click();
      await page.getByRole('option', {name: label}).click();
      await card.getByRole('button').click();
      await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'false');
      await expect.poll(() => card.locator('.face').evaluateAll(elements => elements.reduce((count, element) => count + element.getAnimations().length, 0))).toBe(0);
      // Read the settled card after the trigger's hover tooltip has faded out.
      await page.mouse.move(0, 0);
      await expect(page.locator('.mat-mdc-tooltip-surface')).toBeHidden();
      const contentBottom = await card.locator('.faces').evaluate(element => element.getBoundingClientRect().bottom - parseFloat(getComputedStyle(element).paddingBottom));
      for (const selector of ['.privacy', '.guide ol']) {
        const footer = (await card.locator(selector).boundingBox())!;
        expect(Math.abs(footer.y + footer.height - contentBottom)).toBeLessThanOrEqual(1);
      }
      const result = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(result.violations).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await card.screenshot({path: testInfo.outputPath(`guide-${language}-${width}.png`)});
      await card.getByRole('button').click();
      await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'true');
    }
  }
});

test.describe('reduced motion', () => {
  test.use({reducedMotion: 'reduce'});

  test('starts with a button and changes faces without motion or automatic hover', async({page}) => {
    await page.goto('./');
    const card = page.locator('bhw-title-card');
    await expect(card.locator('.flip-toggle')).toHaveCSS('opacity', '1');
    await expect(card.locator('.flip-toggle')).not.toHaveClass(/inviting/);
    await card.hover();
    await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'true');
    await card.getByRole('button').click();
    await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'false');
    await expect(card.locator('.guide')).toHaveCSS('opacity', '1');
    await expect(card.locator('.guide')).toHaveCSS('transition-duration', '0s');
    await expect(card.locator('.face-label.current')).toHaveCSS('transition-duration', '0s');
  });
});

test.describe('touch emulation', () => {
  test.use({hasTouch: true, viewport: {width: 390, height: 844}});

  test('shows the button immediately and supports tapping between faces', async({page}) => {
    await page.goto('./');
    const card = page.locator('bhw-title-card');
    await expect(card.locator('.flip-toggle')).toHaveCSS('opacity', '1');
    await card.getByRole('button', {name: 'How it works', exact: true}).tap();
    await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'false');
    await card.getByRole('button', {name: 'Back to title', exact: true}).tap();
    await expect(card.locator('.guide')).toHaveAttribute('aria-hidden', 'true');
    expect(await page.evaluate(() => localStorage.getItem('bhw.hero-introduced'))).toBe('true');
  });
});
