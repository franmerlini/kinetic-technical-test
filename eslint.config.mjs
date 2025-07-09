import nx from '@nx/eslint-plugin';
import eslint from '@eslint/js';
import angular from 'angular-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      importPlugin.flatConfigs.recommended,
      eslintPluginPrettierRecommended,
      eslintConfigPrettier,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'no-console': 'error',
      'no-else-return': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      'prefer-template': 'error',
      'import/no-unresolved': 'off',
      'import/group-exports': 'error',
      'import/newline-after-import': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-absolute-path': 'error',
      'import/named': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, eslintPluginPrettierRecommended, eslintConfigPrettier],
    rules: {},
  }
);
