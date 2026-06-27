import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Vendored AI SDK Elements: the app uses only a subset, so we drop `export`
  // from the unused components (slimming the public surface) while keeping the
  // declarations in place to stay close to upstream. Silence the resulting
  // "assigned but never used" noise here — this is third-party library code.
  {
    files: ["components/ai-elements/**"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
