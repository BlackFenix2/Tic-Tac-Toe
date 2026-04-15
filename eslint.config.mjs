import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from '@eslint-react/eslint-plugin';
import globals from 'globals';

const tsReactFiles = ['**/*.{ts,tsx}'];

const languageOptions = {
  parser: tsParser,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  globals: {
    ...globals.browser,
    ...globals.es2020
  }
};

const reactRecommended = reactPlugin.configs.recommended;

const plugins = {
  '@typescript-eslint': tsPlugin,
  ...reactRecommended.plugins
};

const recommendedRules = {
  ...tsPlugin.configs.recommended.rules,
  ...reactRecommended.rules
};

export default [
  {
    ignores: ['dist/**', 'node_modules/**']
  },
  js.configs.recommended,
  {
    files: tsReactFiles,
    languageOptions,
    plugins,
    settings: reactRecommended.settings,
    rules: {
      ...recommendedRules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off'
    }
  }
];
