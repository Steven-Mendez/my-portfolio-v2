import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
  },
  resolve: {
    // Mirror the tsconfig `@/* -> ./*` path alias. Regex form so it does not
    // accidentally rewrite scoped packages like `@ai-sdk/...`.
    alias: [{ find: /^@\//, replacement: `${import.meta.dirname}/` }],
  },
});
