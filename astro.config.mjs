import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://projectcert.org",
  integrations: [svelte(), tailwind({ applyBaseStyles: false })],
  build: {
    format: "directory",
  },
  vite: {
    build: {
      target: "es2022",
    },
  },
});
