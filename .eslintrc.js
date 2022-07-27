module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:react/recommended'
  ],
  env: {
    browser: true,
    node: true,
  },
  globals: {
    __webpack_hash__: true,
    gtag: true,
    fbq: true,
  },
  parser: '@babel/eslint-parser',
  plugins: [
    'formatjs'
  ],
  rules: {
    'formatjs/no-offset': 'error',
    'react/prop-types': 'off'
  }
};
