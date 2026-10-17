import {spawnSync} from 'node:child_process';
import process from 'node:process';
import {URL, fileURLToPath} from 'node:url';

// Invoke local tools with the selected Node, without re-entering a global pnpm.
const checks = [
  ['Lint', 'eslint/bin/eslint.js', ['.', '--max-warnings=0']],
  ['Angular types', '@angular/compiler-cli/bundles/src/bin/ngc.js', ['--project', 'tsconfig.app.json', '--noEmit']],
  ['Tooling types', 'typescript/bin/tsc', ['--project', 'tsconfig.tools.json', '--noEmit']],
  ['Worker types', 'typescript/bin/tsc', ['--project', 'tsconfig.worker.json', '--noEmit']],
  ['Unit tests', 'vitest/vitest.mjs', ['run', '--passWithNoTests']],
  ['Production build', '@angular/cli/bin/ng.js', ['build']],
  ['Chromium flows', '@playwright/test/cli.js', ['test', '--workers=3']],
  ['Acceptance browser matrix', '@playwright/test/cli.js', ['test', '--config', 'playwright.acceptance.config.ts', '--workers=3']],
  ['Audio browser matrix', '@playwright/test/cli.js', ['test', '--config', 'playwright.audio.config.ts', '--workers=3']]
];

for (const [name, entry, args] of checks) {
  console.log(`\n${name}`);
  const executable = fileURLToPath(new URL(`../node_modules/${entry}`, import.meta.url));
  const result = spawnSync(process.execPath, [executable, ...args], {
    cwd: fileURLToPath(new URL('../', import.meta.url)),
    env: {...process.env, BHW_TEST_PREBUILT: '1'},
    stdio: 'inherit'
  });
  if (result.error) {
    console.error(result.error.message);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

await import('./verify-static-assets.mjs');
