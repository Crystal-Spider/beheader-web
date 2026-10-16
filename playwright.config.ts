import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testIgnore: ['audio.spec.ts', 'audio-platform.spec.ts'],
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173/beheader-web/',
    trace: 'retain-on-failure'
  },
  projects: [{name: 'chromium', use: {...devices['Desktop Chrome']}}],
  webServer: {
    command: 'node node_modules/@angular/cli/bin/ng.js build && node scripts/preview.mjs',
    url: 'http://127.0.0.1:4173/beheader-web/',
    reuseExistingServer: false,
    timeout: 120000
  }
});
