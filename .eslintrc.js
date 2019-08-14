module.exports = {
  parser: 'babel-eslint',
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: [
    //eslint: https://cn.eslint.org/docs/rules/
    //rules: https://github.com/benmosher/eslint-plugin-import/
    'import',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  root: false,
  rules: {
    // 0=off,1=warn,2=error;
    camelcase: 0,
    'no-empty-function': 0,
    'func-names': 0,
    'no-underscore-dangle': 0,
    'arrow-body-style': 0,
    'no-console': 1,

    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
  },
};
