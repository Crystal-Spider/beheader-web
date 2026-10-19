import {expect, test} from '@playwright/test';

test.use({locale: 'en-GB'});

test('explains unavailable badges on hover and keyboard focus, then enables them after removal', async({page}) => {
  await page.setViewportSize({width: 320, height: 800});
  await page.goto('./');
  await page.getByRole('button', {name: 'Try an example', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  const audio = page.locator('.format-list li').filter({has: page.getByRole('button', {name: 'Audio', exact: true})});
  const reason = 'Audio and video share one slot.';
  await expect(audio).toHaveCSS('cursor', 'not-allowed');
  await audio.hover();
  await expect(page.locator('.mat-mdc-tooltip-surface')).toHaveText(reason);
  const tooltip = await page.locator('.mat-mdc-tooltip-surface').boundingBox();
  expect(tooltip!.x).toBeGreaterThanOrEqual(0);
  expect(tooltip!.x + tooltip!.width).toBeLessThanOrEqual(320);
  await page.mouse.move(0, 0);
  await expect(page.locator('.mat-mdc-tooltip-surface')).toBeHidden();
  await page.locator('.format-list li').first().focus();
  await page.keyboard.press('Tab');
  await expect(audio).toBeFocused();
  await expect(page.locator('.mat-mdc-tooltip-surface')).toHaveText(reason);
  await page.keyboard.press('Escape');
  await page.getByRole('article', {name: 'tone.mp3', exact: true}).getByRole('button', {name: 'Remove', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Audio', exact: true})).toBeEnabled();
  await expect(audio).not.toHaveAttribute('tabindex');
});

test('offers a full-width example button with an icon and no additional-payload panel', async({page}) => {
  await page.goto('./');
  const example = page.getByRole('button', {name: 'Try an example', exact: true});
  const combine = page.getByRole('button', {name: 'Combine files', exact: true});
  expect((await example.boundingBox())!.width).toBe((await combine.boundingBox())!.width);
  await expect(example.locator('bhw-icon')).toBeVisible();
  await expect(example.locator('mat-icon')).toHaveAttribute('data-mat-icon-name', 'example');
  await expect(combine.locator('.primary-action mat-icon')).toHaveAttribute('data-mat-icon-name', 'magic');
  await expect(combine).toHaveCSS('font-size', await example.evaluate(element => getComputedStyle(element).fontSize));
  await expect(page.getByText('Combine two or more supported file types.', {exact: true})).toHaveCount(0);
  await expect(page.locator('bhw-expansion')).toHaveCount(0);
});

test('sorts only archive cards by dragging with a stable final order and faint placeholder', async({page}) => {
  await page.route('**/worker-*.js', async route => {
    await new Promise(resolve => setTimeout(resolve, 500));
    await route.continue();
  });
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/first.zip', 'e2e/fixture/classic.pdf', 'e2e/fixture/second.zip']);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  const source = page.getByRole('article', {name: 'second.zip', exact: true});
  const target = page.getByRole('article', {name: 'first.zip', exact: true});
  await expect(page.getByRole('article', {name: 'classic.pdf', exact: true}).locator('.drag-handle')).toHaveCount(0);
  // Center the whole list so the destination stays inside Firefox's viewport during release.
  await page.locator('.selected-files').evaluate(element => element.scrollIntoView({block: 'center'}));
  const handle = await source.getByRole('button', {name: 'Reorder archive', exact: true}).boundingBox();
  const destination = await target.boundingBox();
  await page.mouse.move(handle!.x + handle!.width / 2, handle!.y + handle!.height / 2);
  await page.mouse.down();
  await page.mouse.move(handle!.x + handle!.width / 2, destination!.y + 10, {steps: 15});
  await expect(page.locator('.cdk-drag-placeholder')).toHaveCSS('opacity', '0.2');
  await expect(page.locator('.cdk-drag-preview')).toBeVisible();
  const preview = page.locator('.cdk-drag-preview');
  const previewRole = (await preview.locator('bhw-choice').boundingBox())!;
  const previewMetadata = (await preview.locator('.file-metadata').boundingBox())!;
  expect(previewMetadata.x + previewMetadata.width).toBeLessThan(previewRole.x);
  // Record every rendered frame while worker reinspection is deliberately delayed.
  await page.evaluate(() => {
    const frames: string[][] = [];
    Object.assign(window, {bhwOrderFrames: frames});
    const end = performance.now() + 900;
    const sample = (): void => {
      if (!document.querySelector('.cdk-drag-preview')) {
        frames.push(Array.from(document.querySelectorAll('.selected-file h3')).map(element => element.textContent || ''));
      }
      if (performance.now() < end) { requestAnimationFrame(sample); }
    };
    requestAnimationFrame(sample);
  });
  await page.mouse.up();
  await expect(page.locator('.selected-file h3')).toHaveText(['second.zip', 'first.zip', 'classic.pdf']);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  const frames = await page.evaluate(() => (window as unknown as {bhwOrderFrames: string[][]}).bhwOrderFrames);
  expect(frames.length).toBeGreaterThan(0);
  expect(frames.every(frame => frame.join() === 'second.zip,first.zip,classic.pdf')).toBe(true);
  await target.getByRole('combobox', {name: 'Role', exact: true}).click();
  await expect(page.getByRole('listbox')).toHaveClass(/bhw-select-panel/);
  await expect(page.getByRole('listbox')).toHaveCSS('border-radius', '16px');
  await page.keyboard.press('Escape');
});

for (const width of [320, 1280]) {
  test(`centers card actions and aligns scrollable role panels at ${width}px`, async({page}) => {
    await page.setViewportSize({width, height: 900});
    await page.goto('./');
    await page.getByRole('button', {name: 'Try an example', exact: true}).click();
    await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
    const card = page.getByRole('article', {name: 'picture.png', exact: true});
    await expect(card.locator('.drag-handle')).toHaveCount(0);
    await expect(page.locator('.drag-handle')).toHaveCount(2);
    await expect(page.locator('.archive-order-hint')).toHaveCount(1);
    for (const name of ['Remove', 'Replace']) {
      const button = card.getByRole('button', {name, exact: true});
      const outer = await button.boundingBox();
      const icon = await button.locator('svg').boundingBox();
      expect(Math.abs(outer!.x + outer!.width / 2 - icon!.x - icon!.width / 2)).toBeLessThanOrEqual(0.5);
      expect(Math.abs(outer!.y + outer!.height / 2 - icon!.y - icon!.height / 2)).toBeLessThanOrEqual(0.5);
    }
    const close = await card.getByRole('button', {name: 'Remove', exact: true}).boundingBox();
    const replace = await card.getByRole('button', {name: 'Replace', exact: true}).boundingBox();
    const bounds = await card.boundingBox();
    expect(close!.x).toBe(replace!.x);
    expect(Math.abs(bounds!.y + bounds!.height - replace!.y - replace!.height - 9)).toBeLessThanOrEqual(1);
    await expect(card).toHaveCSS('padding-left', width <= 560 ? '12px' : '16px');
    const role = card.getByRole('combobox', {name: 'Role', exact: true});
    // Force scrolling now that the role menu has fewer supported entries.
    await page.addStyleTag({content: '.bhw-select-panel-compact { max-height: 120px !important; }'});
    await role.click();
    const panel = page.getByRole('listbox');
    expect(await panel.evaluate(element => element.scrollHeight > element.clientHeight)).toBe(true);
    await expect.poll(async() => {
      const control = await role.boundingBox();
      const list = await panel.boundingBox();
      return Math.max(Math.abs(control!.x - list!.x), Math.abs(control!.x + control!.width - list!.x - list!.width));
    }).toBeLessThanOrEqual(1);
    await page.screenshot({path: `test-results/role-panel-${width}.png`, fullPage: true});
    await page.keyboard.press('End');
    expect(await panel.evaluate(element => element.scrollTop)).toBeGreaterThan(0);
    const control = await role.boundingBox();
    const list = await panel.boundingBox();
    expect(Math.abs(control!.x - list!.x)).toBeLessThanOrEqual(1);
    await page.keyboard.press('Escape');
    await expect(page.locator('bhw-language-picker img')).toHaveCSS('border-radius', '4px');
    await page.getByRole('button', {name: 'Combine files', exact: true}).click();
    await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
    const name = page.getByRole('textbox', {name: 'Output name', exact: true});
    await name.focus();
    await page.mouse.move(0, 0);
    await expect(name).toHaveCSS('outline-style', 'none');
    await expect(name).toHaveCSS('border-top-color', 'rgb(197, 142, 255)');
  });
}

for (const media of ['audio.mp3', 'video-aac.mp4']) {
  test(`explains the shared audio/video slot after selecting ${media}`, async({page}) => {
    await page.goto('./');
    await page.getByTestId('file-picker').setInputFiles([`e2e/fixture/${media}`, 'e2e/fixture/transparent.png']);
    await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
    for (const label of ['Audio', 'Video']) {
      const badge = page.locator('.format-list li').filter({has: page.getByRole('button', {name: label, exact: true})});
      await expect(badge).toHaveAttribute('aria-disabled', 'true');
      await badge.hover();
      await expect(page.locator('.mat-mdc-tooltip-surface')).toContainText('Audio and video share one slot');
      await page.mouse.move(0, 0);
      await expect(page.locator('.mat-mdc-tooltip-surface')).toBeHidden();
    }
  });
}

test('keeps pointer cursors while selects are open and clears mouse-dismissed borders', async({page}) => {
  await page.goto('./');
  await page.getByRole('button', {name: 'Try an example', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  const controls = [page.getByRole('combobox', {name: 'Language', exact: true}), page.getByRole('article', {name: 'picture.png', exact: true}).getByRole('combobox', {name: 'Role', exact: true})];
  for (const control of controls) {
    await control.scrollIntoViewIfNeeded();
    await control.click();
    await expect(page.getByRole('listbox')).toBeVisible();
    const bounds = await control.boundingBox();
    const position = {x: bounds!.x + bounds!.width / 2, y: bounds!.y + bounds!.height / 2};
    await page.mouse.move(position.x, position.y);
    await expect.poll(() => page.evaluate(({x, y}) => getComputedStyle(document.elementFromPoint(x, y)!).cursor, position)).toBe('pointer');
    await page.mouse.move(2, 2);
    expect(await page.evaluate(() => getComputedStyle(document.elementFromPoint(2, 2)!).cursor)).toBe('auto');
    await page.mouse.click(position.x, position.y);
    await expect(page.getByRole('listbox')).toBeHidden();
    await control.click();
    await expect(control).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('listbox')).toBeVisible();
    await expect.poll(() => page.evaluate(() => !!document.elementFromPoint(2, 2)?.closest('.cdk-overlay-backdrop'))).toBe(true);
    await page.mouse.click(2, 2);
    await expect(page.getByRole('listbox')).toBeHidden();
    await expect(control.locator('.mat-mdc-select-trigger')).toHaveCSS('border-top-color', 'rgb(66, 64, 74)');
    await control.focus();
    // Real keyboard traversal establishes :focus-visible consistently across engines.
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');
    await expect(control.locator('.mat-mdc-select-trigger')).toHaveCSS('border-top-color', 'rgb(197, 142, 255)');
    await page.keyboard.press('Tab');
  }
});

for (const language of ['en', 'it']) {
  test(`stays responsive through 320px with a reserved scrollbar in ${language}`, async({page}) => {
    test.setTimeout(60000);
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    await page.addStyleTag({content: 'html { scrollbar-gutter: stable; }'});
    const checkWidths = async(): Promise<void> => {
      for (const width of [800, 770, 769, 650, 620, 610, 600, 590, 390, 335, 334, 333, 321, 320]) {
        await page.setViewportSize({width, height: 800});
        const sizes = await page.evaluate(() => ({scroll: document.documentElement.scrollWidth, viewport: document.documentElement.clientWidth, body: document.body.getBoundingClientRect().width, available: document.documentElement.getBoundingClientRect().width}));
        expect(sizes.scroll, `scrollable page at ${width}px`).toBeLessThanOrEqual(sizes.viewport);
        expect(sizes.body).toBeLessThanOrEqual(sizes.available);
        const badgesFit = await page.locator('.format-list button').evaluateAll(buttons => buttons.every(button => {
          const bounds = button.getBoundingClientRect();
          const content = button.querySelector('.button-content')!.getBoundingClientRect();
          return content.left >= bounds.left && content.right <= bounds.right;
        }));
        expect(badgesFit, `badge content at ${width}px`).toBe(true);
        const cards = await page.locator('.selected-file').all();
        for (const card of cards) {
          const bounds = (await card.boundingBox())!;
          const role = (await card.locator('bhw-choice').boundingBox())!;
          const label = (await card.locator('.field-label').boundingBox())!;
          const select = (await card.getByRole('combobox').boundingBox())!;
          const metadata = (await card.locator('.file-metadata').boundingBox())!;
          if (await card.locator('.drag-handle').count()) {
            const drag = (await card.locator('.drag-handle').boundingBox())!;
            expect(Math.abs(drag.y + drag.height / 2 - bounds.y - bounds.height / 2), `drag center at ${width}px`).toBeLessThanOrEqual(0.5);
          }
          expect(Math.abs(label.y + label.height / 2 - select.y - select.height / 2), `inline role at ${width}px`).toBeLessThanOrEqual(0.5);
          expect(label.x + label.width).toBeLessThan(select.x);
          if (width >= 800) {
            expect(metadata.x + metadata.width).toBeLessThan(role.x);
          } else if (width <= 390) {
            expect(role.y).toBeGreaterThanOrEqual(metadata.y + metadata.height);
          }
        }
        const outerCards = await page.locator('.selected-files > .selected-file, .selected-files > .archive-group').all();
        if (outerCards.length) {
          const example = (await page.locator('.example-button').boundingBox())!;
          const first = (await outerCards[0]!.boundingBox())!;
          const last = (await outerCards.at(-1)!.boundingBox())!;
          const combine = (await page.getByRole('button', {name: language === 'it' ? 'Combina file' : 'Combine files', exact: true}).boundingBox())!;
          expect(first.y - example.y - example.height, `example/card gap at ${width}px`).toBeCloseTo(16, 1);
          const noticesBeforeCombine = page.locator('.message-panel.open');
          if (await noticesBeforeCombine.count()) {
            await expect(noticesBeforeCombine).toHaveCSS('opacity', '1');
            const notices = (await noticesBeforeCombine.boundingBox())!;
            expect(notices.y).toBeGreaterThanOrEqual(last.y + last.height);
            expect(combine.y - notices.y - notices.height, `notice/combine gap at ${width}px`).toBeCloseTo(16, 1);
          } else {
            expect(combine.y - last.y - last.height, `card/combine gap at ${width}px`).toBeCloseTo(16, 1);
          }
          for (let index = 1; index < outerCards.length; index++) {
            const previous = (await outerCards[index - 1]!.boundingBox())!;
            const current = (await outerCards[index]!.boundingBox())!;
            expect(current.y - previous.y - previous.height, `card/card gap at ${width}px`).toBeCloseTo(12, 1);
          }
        }
      }
    };
    await expect(page.getByRole('separator')).toHaveCount(2);
    expect((await page.locator('.app-footer').innerText()).match(/Beheader/g)).toHaveLength(1);
    await checkWidths();
    await page.getByRole('button', {name: language === 'it' ? 'Prova un esempio' : 'Try an example', exact: true}).click();
    const combine = page.getByRole('button', {name: language === 'it' ? 'Combina file' : 'Combine files', exact: true});
    await expect(combine).toBeEnabled();
    await checkWidths();
    await combine.click();
    await expect(page.getByRole('button', {name: language === 'it' ? 'Scarica file' : 'Download file', exact: true})).toBeEnabled();
    await checkWidths();
    await page.setViewportSize({width: 319, height: 800});
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(true);
  });
}

test('starts tab navigation in the header and keeps larger badge content within the existing button size', async({page}) => {
  await page.goto('./');
  await expect(page.getByRole('heading', {name: 'Your files', exact: true})).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.locator('.wordmark')).toBeFocused();
  await expect(page.getByRole('link', {name: 'Skip to content', exact: true})).toHaveCount(0);
  const example = page.getByRole('button', {name: 'Try an example', exact: true});
  const height = (await example.boundingBox())!.height;
  const font = await example.evaluate(element => getComputedStyle(element).fontSize);
  for (const button of await page.locator('.format-list button').all()) {
    await expect(button).toHaveCSS('font-size', font);
    expect((await button.boundingBox())!.height).toBe(height);
  }
  for (const width of [320, 334, 769, 800, 1280]) {
    await page.setViewportSize({width, height: 900});
    for (const button of await page.locator('.format-list button').all()) {
      const bounds = await button.boundingBox();
      const content = await button.locator('.button-content').boundingBox();
      expect(content!.width).toBeLessThanOrEqual(bounds!.width);
      expect(content!.x).toBeGreaterThanOrEqual(bounds!.x);
      expect(content!.x + content!.width).toBeLessThanOrEqual(bounds!.x + bounds!.width);
    }
  }
});
