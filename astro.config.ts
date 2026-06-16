import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/config/site";

// Tailwind 3 wired via PostCSS (postcss.config.cjs). The
// @astrojs/tailwind integration was dropped in Astro 6; on Tailwind 3
// the recommended path is PostCSS, on Tailwind 4 it's @tailwindcss/vite.
export default defineConfig({
  site: SITE_URL,
  integrations: [
    svelte(),
    // The gated /audit/* review console is noindex,nofollow — keep it
    // out of the sitemap so crawlers never see it.
    sitemap({ filter: (page) => !page.includes("/audit/") }),
  ],
  build: {
    format: "directory",
  },
  vite: {
    build: {
      target: "es2022",
    },
  },
});
