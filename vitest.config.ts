import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      // `import.meta.dirname` rather than `__dirname`: Vite 8 warns that
      // `__dirname` is unsupported by `configLoader: 'native'`, which is
      // slated to become the default in a future major.
      "@": resolve(import.meta.dirname, "./src"),
      // Stub the Astro content collection import so the schema can be
      // imported standalone without the Astro build pipeline.
      "astro:content": resolve(import.meta.dirname, "./tests/astro-content-stub.ts"),
    },
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
