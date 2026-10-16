import {defineConfig, devices} from '@playwright/test';

import base from './playwright.config';

const shell = ['foundation.spec.ts', 'shell.spec.ts', 'acceptance.spec.ts'];

export default defineConfig({
  ...base,
  outputDir: 'test-results/acceptance-run',
  reporter: [['list'], ['json', {outputFile: 'test-results/acceptance-report.json'}]],
  projects: [
    {name: 'chromium-accessibility', testMatch: 'acceptance.spec.ts', testIgnore: [], use: {...devices['Desktop Chrome']}},
    {name: 'firefox', testIgnore: ['audio.spec.ts', 'audio-platform.spec.ts'], use: {...devices['Desktop Firefox']}},
    // Windows WebKit cannot open OPFS. Test its UI and report that capability separately from generation.
    {name: 'webkit-shell', testMatch: shell, testIgnore: [], use: {...devices['Desktop Safari']}},
    {name: 'android-emulation', testMatch: [...shell, 'generator.spec.ts'], testIgnore: [], use: {...devices['Pixel 7']}},
    {name: 'ios-emulation', testMatch: shell, testIgnore: [], use: {...devices['iPhone 13']}}
  ]
});
