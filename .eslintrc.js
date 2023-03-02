module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended', 'airbnb',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-trailing-spaces': 1,
    'react/forbid-prop-types': 1,
    'react/prop-types': 0,
    'react/function-component-definition': 0,
  },
};
