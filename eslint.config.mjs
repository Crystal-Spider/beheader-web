import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import angular from 'angular-eslint';
import jsdoc from 'eslint-plugin-jsdoc';
import tseslint from 'typescript-eslint';

const formatting = {
  '@stylistic/indent': ['error', 2, {SwitchCase: 1}],
  '@stylistic/quotes': ['error', 'single', {avoidEscape: true}],
  '@stylistic/semi': ['error', 'always'],
  '@stylistic/comma-dangle': ['error', 'never'],
  '@stylistic/object-curly-spacing': ['error', 'never'],
  '@stylistic/array-bracket-spacing': ['error', 'never'],
  '@stylistic/arrow-parens': ['error', 'as-needed'],
  '@stylistic/space-before-function-paren': ['error', 'never'],
  '@stylistic/eol-last': ['error', 'always'],
  '@stylistic/no-trailing-spaces': 'error',
  '@stylistic/no-multiple-empty-lines': ['error', {max: 1, maxBOF: 0, maxEOF: 0}],
  curly: ['error', 'all'],
  eqeqeq: 'error',
  'no-var': 'error',
  'prefer-const': 'error'
};

export default tseslint.config(
  {ignores: ['node_modules/**', '.angular/**', 'docs/**', 'dist/**', 'coverage/**', 'test-results/**', 'playwright-report/**']},
  {
    files: ['**/*.mjs'],
    extends: [js.configs.recommended],
    plugins: {'@stylistic': stylistic},
    languageOptions: {globals: {console: 'readonly'}},
    rules: formatting
  },
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, ...tseslint.configs.recommendedTypeChecked, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.tools.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {'@stylistic': stylistic, jsdoc},
    settings: {jsdoc: {mode: 'typescript'}},
    rules: {
      ...formatting,
      '@typescript-eslint/explicit-member-accessibility': ['error', {accessibility: 'explicit'}],
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}],
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/component-selector': ['error', {type: 'element', prefix: 'bhw', style: 'kebab-case'}],
      '@angular-eslint/component-class-suffix': 'off',
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/component-max-inline-declarations': ['error', {template: 0, styles: 0}],
      'jsdoc/check-types': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/require-jsdoc': ['error', {
        require: {ClassDeclaration: true, FunctionDeclaration: true, MethodDefinition: true},
        contexts: ['TSInterfaceDeclaration', 'TSTypeAliasDeclaration', 'ClassProperty']
      }],
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-type': 'error'
    }
  },
  {
    files: ['src/**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/attributes-order': ['error', {
        alphabetical: true,
        order: ['STRUCTURAL_DIRECTIVE', 'TEMPLATE_REFERENCE', 'ATTRIBUTE_BINDING', 'INPUT_BINDING', 'TWO_WAY_BINDING', 'OUTPUT_BINDING']
      }]
    }
  }
);
