module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  // Tambahkan plugin security
  plugins: [
    'security',
  ],
  // Tambahkan 'plugin:security/recommended'
  extends: [
    'airbnb-base',
    'plugin:security/recommended-legacy',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    // Aturan yang sudah ada
    'no-console': 'off',

    // Aturan tambahan untuk best practice
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'warn',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
