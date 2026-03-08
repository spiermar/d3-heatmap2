import js from "@eslint/js"

export default [
  js.configs.recommended,
  {
    ignores: ["dist/"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
      },
    },
    rules: {
      indent: ["error", 4],
      quotes: ["error", "double", { avoidEscape: true }],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-useless-assignment": "off",
    },
  },
]