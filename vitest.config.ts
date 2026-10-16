import {defineConfig} from 'vitest/config';
import {fileURLToPath} from 'node:url';

export default defineConfig({
  resolve: {alias: {
    '~bhw/polyglot': fileURLToPath(new URL('./src/lib/polyglot', import.meta.url)),
    '~bhw/core': fileURLToPath(new URL('./src/app/core', import.meta.url)),
    '~bhw/feature': fileURLToPath(new URL('./src/app/feature', import.meta.url)),
    '~bhw/shared': fileURLToPath(new URL('./src/app/shared', import.meta.url))
  }},
  test: {
    environment: 'node',
    include: ['src/lib/**/*.spec.ts', 'src/app/**/redux/**/*.spec.ts', 'src/app/**/logic/**/*.spec.ts'],
    passWithNoTests: true
  }
});
