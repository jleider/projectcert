import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://projectcert.org",
  integrations: [svelte(), tailwind({ applyBaseStyles: false }), sitemap()],
  build: {
    format: "directory",
  },
  vite: {
    build: {
      target: "es2022",
    },
  },
});
