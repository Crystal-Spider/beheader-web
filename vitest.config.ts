import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/lib/**/*.spec.ts', 'src/app/**/redux/**/*.spec.ts', 'src/app/**/logic/**/*.spec.ts'],
    passWithNoTests: true
  }
});
