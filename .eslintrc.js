module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: [
    'vue'
  ],
  rules: {
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": [
      "error",
      {
        semi: true,
        singleQuote: true,
        trailingComma: "es5"
      }
    ]
  }
}
