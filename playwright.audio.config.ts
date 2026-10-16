import {defineConfig, devices} from '@playwright/test';

import base from './playwright.config';

export default defineConfig({
  ...base,
  testMatch: ['audio.spec.ts', 'audio-platform.spec.ts'],
  testIgnore: [],
  outputDir: 'test-results/audio-run',
  projects: [
    {name: 'chromium', use: {...devices['Desktop Chrome']}},
    {name: 'firefox', use: {...devices['Desktop Firefox']}},
    {name: 'webkit', use: {...devices['Desktop Safari']}}
  ]
});
