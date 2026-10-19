import {readFileSync} from 'node:fs';
import {expect, test} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.use({locale: 'en-GB'});

test('keeps shown progress visible for 500ms without delaying completed selection controls', async({page}) => {
  await page.addInitScript(() => {
    const times = {shown: 0, hidden: 0};
    Reflect.set(window, 'bhwVisibility', times);
    new MutationObserver(() => {
      const visible = document.querySelector('bhw-job-progress')?.classList.contains('visible');
      if (visible && !times.shown) { times.shown = performance.now(); }
      if (!visible && times.shown && !times.hidden) { times.hidden = performance.now(); }
    }).observe(document, {subtree: true, attributes: true, attributeFilter: ['class']});
  });
  await page.route('**/worker-*.js', route => route.fulfill({contentType: 'text/javascript', body: `self.onmessage = event => {
    if(event.data.type !== 'run') return;
    setTimeout(() => self.postMessage({type: 'complete', jobId: event.data.jobId, result: {operation: 'inspect', inspection: {
      inputs: event.data.request.inputs.map(input => ({id: input.id, name: input.file.name, size: input.file.size, role: input.file.name.endsWith('.pdf') ? 'pdf' : 'html', candidates: []})), diagnostics: []
    }}}), 350);
  };`}));
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles([{name: 'page.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html>')}, {name: 'page.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4')}]);
  await expect(page.locator('bhw-job-progress')).toBeVisible();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await expect(page.locator('bhw-job-progress')).toBeVisible();
  await expect(page.locator('.progress-heading')).toContainText('100%');
  await expect(page.locator('bhw-job-progress')).toBeHidden();
  const times = await page.evaluate(() => Reflect.get(window, 'bhwVisibility') as {shown: number; hidden: number});
  expect(times.hidden - times.shown).toBeGreaterThanOrEqual(480);
});

test('returns every compatibility error after Combine and clears them after correction', async({page}) => {
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles([{name: 'bad.pdf', mimeType: 'application/pdf', buffer: Buffer.from(readFileSync('e2e/fixture/classic.pdf', 'utf8').replace('1 0 obj', '7 0 obj'))}, {name: 'bad.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html>\0')}]);
  const combine = page.getByRole('button', {name: 'Combine files', exact: true});
  await expect(combine).toBeEnabled();
  await expect(page.locator('.diagnostics')).toBeEmpty();
  await combine.click();
  await expect(page.locator('.diagnostics .error')).toHaveCount(2);
  await expect(page.locator('.diagnostics')).toContainText('PDF_INVALID');
  await expect(page.locator('.diagnostics')).toContainText('HTML_ENCODING');
  await expect(combine).toBeDisabled();
  await page.getByRole('button', {name: 'Try an example', exact: true}).click();
  await expect(combine).toBeEnabled();
  await expect(page.locator('.diagnostics .error')).toHaveCount(0);
  await expect(page.locator('.diagnostics .warning')).toContainText('ARCHIVE_COLLISION');
});

for (const language of ['en', 'it']) {
  test(`keeps empty feedback out of the button/card spacing in ${language}`, async({page}) => {
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    const example = page.locator('.example-button');
    const combine = page.locator('.combine-control');
    const panel = page.locator('.message-panel');
    const gap = async(): Promise<number> => {
      const cards = page.locator('.selected-files > *');
      const last = await cards.count() ? await cards.last().boundingBox() : null;
      const above = last ?? (await example.boundingBox())!;
      return (await combine.boundingBox())!.y - above.y - above.height;
    };
    for (const width of [1280, 390, 320]) {
      await page.setViewportSize({width, height: 900});
      await expect.poll(gap).toBeCloseTo(16, 1);
      expect((await panel.boundingBox())!.height).toBeLessThan(1);
    }
    await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/transparent.png', 'e2e/fixture/classic.pdf']);
    await expect(page.getByRole('button', {name: /^(Combine files|Combina file)$/})).toBeEnabled();
    await expect.poll(gap).toBeCloseTo(16, 1);
    await page.getByTestId('file-picker').setInputFiles('e2e/fixture/static.jpg');
    await expect(panel).toHaveAttribute('aria-hidden', 'false');
    await page.getByRole('article', {name: 'static.jpg', exact: true}).getByRole('button', {name: language === 'en' ? 'Remove' : 'Rimuovi', exact: true}).click();
    await expect(panel).toHaveAttribute('aria-hidden', 'true');
    await expect.poll(gap).toBeCloseTo(16, 1);
    await page.getByRole('article', {name: 'classic.pdf', exact: true}).getByRole('button', {name: language === 'en' ? 'Remove' : 'Rimuovi', exact: true}).click();
    await page.getByRole('article', {name: 'transparent.png', exact: true}).getByRole('button', {name: language === 'en' ? 'Remove' : 'Rimuovi', exact: true}).click();
    await expect.poll(gap).toBeCloseTo(16, 1);
  });

  test(`stacks the narrow wordmark/version beside the icon in ${language}`, async({page}) => {
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    for (const width of [320, 334, 354, 355, 359, 360, 390]) {
      await page.setViewportSize({width, height: 900});
      const text = (await page.locator('.wordmark-text').boundingBox())!;
      const version = (await page.locator('.version').boundingBox())!;
      const icon = (await page.locator('.brand-icon').boundingBox())!;
      if (width < 360) {
        await expect(page.locator('.separator')).toBeHidden();
        expect(version.y).toBeGreaterThanOrEqual(text.y + text.height - 1);
        expect(Math.abs(version.x + version.width / 2 - text.x - text.width / 2)).toBeLessThan(1);
        expect(icon.x + icon.width).toBeLessThan(text.x);
        expect(Math.abs(icon.y + icon.height / 2 - (text.y + version.y + version.height) / 2)).toBeLessThan(1);
      } else { await expect(page.locator('.separator')).toBeVisible(); }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (width === 320) { await page.locator('.app-header').screenshot({path: `test-results/header-narrow-${language}.png`}); }
    }
  });
}

test('removes the archive group together while keeping the HTML asset ZIP', async({page}) => {
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles([
    'e2e/fixture/transparent.png', 'e2e/fixture/first.zip', 'e2e/fixture/second.zip'
  ]);
  await expect(page.getByRole('button', {name: /^(Combine files|Combina file)$/})).toBeEnabled();
  await page.getByTestId('file-picker').setInputFiles({name: 'page.html', mimeType: 'text/html', buffer: Buffer.from('<!doctype html><p>Local page</p>')});
  await expect(page.getByRole('button', {name: /^(Combine files|Combina file)$/})).toBeEnabled();
  const html = page.getByRole('article', {name: 'page.html', exact: true});
  const choosing = page.waitForEvent('filechooser');
  await html.getByRole('button', {name: 'Add asset ZIP', exact: true}).click();
  await (await choosing).setFiles('e2e/fixture/first.zip');
  await expect(page.getByRole('button', {name: /^(Combine files|Combina file)$/})).toBeEnabled();
  await page.getByRole('button', {name: 'Remove all archives', exact: true}).click();
  await expect(page.locator('.archive-group')).toHaveCount(0);
  await expect(html.locator('.asset-file')).toContainText('first.zip');
  await expect(page.locator('.selected-files > .selected-file')).toHaveCount(2);
  await expect(page.getByRole('button', {name: /^(Combine files|Combina file)$/})).toBeEnabled();
  await expect(page.locator('.diagnostics')).toBeEmpty();
});

test('converts the example MP3 without WebCodecs and still allows compatible AAC copying', async({page}) => {
  await page.route('**/worker-*.js', async route => {
    const response = await route.fetch();
    await route.fulfill({response, body: `Object.defineProperty(globalThis, 'AudioDecoder', {value: undefined}); Object.defineProperty(globalThis, 'AudioData', {value: undefined});\n${await response.text()}`});
  });
  await page.goto('./');
  await page.getByRole('button', {name: 'Try an example', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.getByRole('button', {name: 'Combine files', exact: true}).click();
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
  await expect(page.locator('.diagnostics .error')).toHaveCount(0);
  await expect(page.locator('.diagnostics .warning')).toContainText('ARCHIVE_COLLISION');
  const audio = page.getByRole('article', {name: 'tone.mp3', exact: true});
  const choosing = page.waitForEvent('filechooser');
  await audio.getByRole('button', {name: 'Replace', exact: true}).click();
  await (await choosing).setFiles('e2e/fixture/audio.m4a');
  await expect(page.getByRole('button', {name: /^(Combine files|Combina file)$/})).toBeEnabled();
  await expect(page.locator('.diagnostics .error')).toHaveCount(0);
  await page.locator('.combine-control button').click();
  await expect(page.getByRole('button', {name: 'Download file', exact: true})).toBeEnabled();
});

for (const language of ['en', 'it']) {
  test(`centers the footer only when its content wraps in ${language}`, async({page}) => {
    await page.addInitScript(language => localStorage.setItem('bhw.language', language), language);
    await page.goto('./');
    for (const width of [1280, 800, 640, 560, 390, 320, 1280]) {
      await page.setViewportSize({width, height: 900});
      await expect.poll(() => page.locator('.app-footer').evaluate(footer => {
        const credit = footer.querySelector<HTMLElement>('.credit')!;
        const links = footer.querySelector<HTMLElement>('nav')!;
        const wrapped = links.getBoundingClientRect().top >= credit.getBoundingClientRect().bottom - 1;
        const center = (node: Element): number => { const box = node.getBoundingClientRect(); return box.x + box.width / 2; };
        return wrapped ? footer.classList.contains('wrapped') && getComputedStyle(credit).textAlign === 'center' && Math.abs(center(credit) - center(footer)) < 1 && Math.abs(center(links) - center(footer)) < 1 : !footer.classList.contains('wrapped') && getComputedStyle(credit).textAlign !== 'center';
      })).toBe(true);
      await expect(page.locator('.app-footer')).toHaveCSS('padding-top', '24px');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}

test('opens and closes a separate message section smoothly, keeping closing content inert', async({page}) => {
  await page.emulateMedia({reducedMotion: 'no-preference'});
  await page.setViewportSize({width: 390, height: 1000});
  await page.goto('./');
  const panel = page.locator('.message-panel');
  await expect(panel).toHaveAttribute('aria-hidden', 'true');
  await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/transparent.png', 'e2e/fixture/static.jpg']);
  await expect(panel).toHaveAttribute('aria-hidden', 'false');
  await expect(panel).toHaveCSS('opacity', '1');
  await expect(page.getByRole('heading', {name: 'Messages', exact: true})).toBeVisible();
  const full = (await panel.boundingBox())!.height;
  const lastCard = (await page.locator('.selected-file').last().boundingBox())!;
  const combine = (await page.getByRole('button', {name: 'Combine files', exact: true}).boundingBox())!;
  const box = (await panel.boundingBox())!;
  expect(box.y).toBeGreaterThanOrEqual(lastCard.y + lastCard.height + 15);
  expect(combine.y).toBeGreaterThanOrEqual(box.y + box.height + 15);
  await page.mouse.move(0, 0);
  await page.keyboard.press('Escape');
  const violations = await new AxeBuilder({page}).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(violations.violations).toEqual([]);
  await panel.screenshot({path: 'test-results/feedback-panel.png'});
  await panel.evaluate(element => {
    const closing = new Promise<number[]>(resolve => {
      const observer = new MutationObserver(() => {
        if (element.getAttribute('aria-hidden') !== 'true') { return; }
        observer.disconnect();
        const heights: number[] = [];
        const start = performance.now();
        const frame = (): void => {
          heights.push(element.getBoundingClientRect().height);
          if (performance.now() - start < 350) { requestAnimationFrame(frame); } else { resolve(heights); }
        };
        frame();
      });
      observer.observe(element, {attributes: true, attributeFilter: ['aria-hidden']});
    });
    Reflect.set(window, 'bhwMessageClosing', closing);
  });
  await page.getByRole('article', {name: 'static.jpg', exact: true}).getByRole('button', {name: 'Remove', exact: true}).click();
  await expect(panel).toHaveAttribute('aria-hidden', 'true');
  await expect(panel).toHaveAttribute('inert');
  const samples = await page.evaluate(() => Reflect.get(window, 'bhwMessageClosing') as Promise<number[]>);
  expect(samples.some(height => height > 1 && height < full - 1)).toBe(true);
  expect(samples.at(-1)).toBeLessThan(1);
  await expect(page.locator('.diagnostics')).toBeEmpty();
  await page.emulateMedia({reducedMotion: 'reduce'});
  await expect(panel).toHaveCSS('transition-duration', '0s');
});

test('defers the long audio scan until Combine, reports progress once and supports cancellation/retry', async({page}) => {
  test.setTimeout(90000);
  await page.addInitScript({content: "window.bhwOperations=[]; const OriginalWorker=window.Worker; window.Worker=class extends OriginalWorker { postMessage(message, ...args) { if(message.type==='run')window.bhwOperations.push(message.request.operation); return super.postMessage(message,...args); } };"});
  await page.route('**/worker-*.js', async route => {
    const response=await route.fetch();
    await route.fulfill({response, body: 'const originalRead=Blob.prototype.arrayBuffer;Blob.prototype.arrayBuffer=async function(){if(this.size>=32768)await new Promise(resolve=>setTimeout(resolve,35));return originalRead.call(this);};\n'+await response.text()});
  });
  await page.goto('./');
  const original=readFileSync('e2e/fixture/audio-long.mp3');
  const tagSize=original.subarray(0,3).toString()==='ID3'?10+original.subarray(6,10).reduce((size,byte)=>size*128+byte,0):0;
  const end=original.subarray(-128,-125).toString()==='TAG'?original.length-128:original.length;
  const long=Buffer.concat([original.subarray(0,tagSize),...Array<Buffer>(16).fill(original.subarray(tagSize,end))]);
  await page.getByTestId('file-picker').setInputFiles([{name:'long.mp3',mimeType:'audio/mpeg',buffer:long},{name:'page.html',mimeType:'text/html',buffer:Buffer.from('<!doctype html><p>Progress fixture</p>')}]);
  const combine=page.getByRole('button',{name:'Combine files',exact:true});
  await expect(combine).toBeEnabled();
  expect(await page.evaluate(()=>Reflect.get(window,'bhwOperations') as readonly string[])).toEqual(['inspect']);
  await combine.click();
  await expect(page.locator('bhw-job-progress')).toBeVisible();
  await expect(page.locator('.current-step')).toContainText('audio');
  const checking=await page.evaluate(()=>new Promise<{percentages:number[];scans:number[];remaining:boolean}>(resolve=>{
    const percentages:number[]=[]; const scans:number[]=[]; let remaining=false; const start=performance.now();
    const frame=():void=>{
      const panel=document.querySelector('bhw-job-progress');const bar=panel?.querySelector('.overall-progress');
      if(bar){percentages.push(Number(bar.getAttribute('aria-valuenow')));}
      if(bar&&panel?.textContent?.includes('Reading audio metadata and duration')){scans.push(Number(bar.getAttribute('aria-valuenow')));}
      remaining ||= !!panel?.textContent?.includes('left in this step');
      if(bar&&performance.now()-start<55000&&(new Set(scans).size<4||!remaining)){requestAnimationFrame(frame);}else {resolve({percentages,scans,remaining});}
    };frame();
  }));
  expect(new Set(checking.scans).size).toBeGreaterThan(3);
  expect(checking.remaining).toBe(true);
  expect(checking.percentages.every((value,index)=>!index||value>=checking.percentages[index-1]!)).toBe(true);
  expect(await page.evaluate(()=>Reflect.get(window,'bhwOperations') as readonly string[])).toEqual(['inspect','generate']);
  await page.getByRole('button',{name:'Cancel',exact:true}).click();
  await expect(page.locator('.diagnostics')).toContainText('CANCELLED');
  await expect(page.locator('bhw-job-progress')).toBeHidden();
  await page.getByRole('button',{name:'Try an example',exact:true}).click();
  await expect(combine).toBeEnabled();
  await combine.click();
  await expect(page.getByRole('button',{name:'Download file',exact:true})).toBeEnabled();
  expect(await page.evaluate(()=>Reflect.get(window,'bhwOperations') as readonly string[])).toEqual(['inspect','generate','inspect','generate']);
});

test('touch handles drag immediately without tooltips or page scrolling', async({page, context, browserName}) => {
  test.skip(browserName !== 'chromium', 'Uses Chromium touch input emulation; actual devices remain a separate check.');
  await page.addInitScript(() => Object.defineProperty(navigator, 'maxTouchPoints', {value: 5}));
  await page.setViewportSize({width: 390, height: 900});
  await page.goto('./');
  await page.getByTestId('file-picker').setInputFiles(['e2e/fixture/first.zip', 'e2e/fixture/second.zip', 'e2e/fixture/classic.pdf']);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await page.locator('.archive-group').evaluate(element => element.scrollIntoView({block: 'center'}));
  const first = page.getByRole('article', {name: 'first.zip', exact: true});
  const second = page.getByRole('article', {name: 'second.zip', exact: true});
  const handle = second.getByRole('button', {name: 'Reorder archive', exact: true});
  await handle.hover();
  await expect(page.locator('.mat-mdc-tooltip-surface')).toBeHidden();
  await expect(handle).toHaveCSS('touch-action', 'none');
  const from = (await handle.boundingBox())!;
  const to = (await first.boundingBox())!;
  const scroll = await page.evaluate(() => scrollY);
  const touch = await context.newCDPSession(page);
  await touch.send('Input.dispatchTouchEvent', {type: 'touchStart', touchPoints: [{x: from.x + from.width / 2, y: from.y + from.height / 2}]});
  for (let step = 1; step <= 10; step++) {
    await touch.send('Input.dispatchTouchEvent', {type: 'touchMove', touchPoints: [{x: from.x + from.width / 2, y: from.y + from.height / 2 + (to.y + 10 - from.y - from.height / 2) * step / 10}]});
  }
  await expect(page.locator('.cdk-drag-preview')).toBeVisible();
  await expect(page.locator('.mat-mdc-tooltip-surface')).toBeHidden();
  expect(await page.evaluate(() => scrollY)).toBeCloseTo(scroll, 0);
  await touch.send('Input.dispatchTouchEvent', {type: 'touchEnd', touchPoints: []});
  await expect(page.locator('.archive-file h3')).toHaveText(['second.zip', 'first.zip']);
  await expect(page.getByRole('button', {name: 'Combine files', exact: true})).toBeEnabled();
  await expect(page.locator('.mat-mdc-tooltip-surface')).toBeHidden();
});
