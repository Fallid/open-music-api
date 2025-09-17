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
    'no-underscore-dangle': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'linebreak-style': ['off'],
  },
};
