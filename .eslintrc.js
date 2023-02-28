module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended', 'standard-with-typescript'
  ],
  overrides: [],
  parserOptions: {
    project: ['./tsconfig.json'], // Speci
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {}
}
