module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
      "plugin:@next/next/recommended"
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
      "react",
  ],
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "@typescript-eslint/explicit-function-return-type": "off"
  },
};
