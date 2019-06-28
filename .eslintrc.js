module.exports = {
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['airbnb', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/destructuring-assignment': 'off',
    'no-useless-concat': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
  },
};
