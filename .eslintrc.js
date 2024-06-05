/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['simple-import-sort'],
  rules: {
    semi: ['error', 'never'],
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/valid-attribute-name': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true, argsIgnorePattern: '^_' }]
  }
}
