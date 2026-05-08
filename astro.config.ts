import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/config/site";

export default defineConfig({
  site: SITE_URL,
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
