import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testIgnore: ['audio.spec.ts', 'audio-platform.spec.ts', 'acceptance.spec.ts'],
  fullyParallel: true,
  reporter: 'list',
  use: {
    serviceWorkers: 'block',
    baseURL: 'http://127.0.0.1:4173/beheader-web/',
    trace: 'retain-on-failure'
  },
  projects: [{name: 'chromium', use: {...devices['Desktop Chrome']}}],
  webServer: {
    command: process.env['BHW_TEST_PREBUILT'] ? 'node scripts/preview.mjs' : 'node node_modules/@angular/cli/bin/ng.js build && node scripts/preview.mjs',
    url: 'http://127.0.0.1:4173/beheader-web/',
    reuseExistingServer: process.env['BHW_TEST_REUSE_SERVER'] === '1',
    timeout: 120000
  }
});
