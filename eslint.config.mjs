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
    },
    rules: {
      indent: ["error", 2],
      quotes: ["error", "single"],
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
]