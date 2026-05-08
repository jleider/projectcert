import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      // Stub the Astro content collection import so the schema can be
      // imported standalone without the Astro build pipeline.
      "astro:content": resolve(__dirname, "./tests/astro-content-stub.ts"),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
