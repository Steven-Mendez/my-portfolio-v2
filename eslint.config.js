import { defineConfig, globalIgnores } from "eslint/config"
import js from "@eslint/js"
import eslintPluginAstro from "eslint-plugin-astro"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores([
    "dist/**",
    ".astro/**",
    "node_modules/**",
    ".lighthouseci/**",
  ]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
])
