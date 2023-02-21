module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    // semi: ['always'],
    quotes: [2, 'single', { avoidEscape: true }],
    'vue/multi-word-component-names': 'off',
  },
};
