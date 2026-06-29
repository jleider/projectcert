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
      rollupOptions: {
        // Warnings are errors: a Rollup/Vite bundling warning about OUR code
        // fails the build instead of scrolling past. (Astro/Svelte
        // diagnostics are already gated by `astro check
        // --minimumFailingSeverity hint`.) Warnings that originate entirely
        // inside node_modules — e.g. a circular dependency within Astro
        // itself, which Astro normally silences and we cannot fix — are
        // ignored rather than escalated.
        onwarn(warning) {
          const refs = [
            warning.id,
            warning.loc?.file,
            ...(Array.isArray(warning.ids) ? warning.ids : []),
          ].filter((r): r is string => typeof r === "string");
          const onlyThirdParty =
            refs.length > 0
              ? refs.every((r) => r.includes("node_modules"))
              : warning.message.includes("node_modules");
          if (onlyThirdParty) return;
          throw new Error(
            `Build warning treated as error${warning.code ? ` [${warning.code}]` : ""}: ${warning.message}`,
          );
        },
      },
    },
  },
});
