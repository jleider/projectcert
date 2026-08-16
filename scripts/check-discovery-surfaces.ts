/**
 * Post-build discovery-surface guard. The site publishes three
 * machine-readable surfaces (sitemap, llms.txt, llms-full.txt) and
 * CLAUDE.md requires keeping them in sync when a URL or page type
 * changes. This automates the parts of that rule that are unambiguous:
 *
 *  1. The sitemap is the exhaustive, generated surface. Every non-gated
 *     route in `src/lib/routes.ts` and every per-state page (index +
 *     el-percent-history) MUST appear in it. Catches a `getStaticPaths`
 *     or `@astrojs/sitemap` filter mistake that silently drops a page.
 *  2. The gated /audit/* console is noindex,nofollow and MUST be absent
 *     from the sitemap AND from llms-full.txt (the documented exception).
 *     Regression guard on the `sitemap()` filter in astro.config.ts.
 *     robots.txt must disallow it in EVERY User-agent group — a crawler
 *     matching a named group ignores `User-agent: *` entirely, so a
 *     disallow only under the wildcard would not bind the named AI
 *     crawlers the file lists.
 *  3. public/llms.txt is hand-curated, not 1:1 with routes, so missing
 *     non-gated routes there are a WARNING (drift nudge), not a failure.
 *
 * Runs after `astro build` (wired into npm `build`, after the sitemap is
 * copied). Reads dist/, so it cannot run before a build.
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_ROUTES } from "../src/lib/routes";
import { SITE_URL } from "../src/config/site";
import { agentsAllowedToCrawl } from "../src/lib/robots";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SITEMAP = resolve(ROOT, "dist/sitemap-0.xml");
const LLMS = resolve(ROOT, "public/llms.txt");
const LLMS_FULL = resolve(ROOT, "public/llms-full.txt");
const ROBOTS = resolve(ROOT, "public/robots.txt");
const STATES_DIR = resolve(ROOT, "src/content/states");

const isGated = (route: string): boolean => route.startsWith("/audit");

function fail(messages: string[]): never {
  console.error("Discovery-surface check FAILED:");
  for (const m of messages) console.error("  " + m);
  process.exit(1);
}

if (!existsSync(SITEMAP)) {
  fail([`${SITEMAP} not found — run \`npm run build\` first.`]);
}

const sitemap = readFileSync(SITEMAP, "utf8");
const llms = readFileSync(LLMS, "utf8");
const llmsFull = readFileSync(LLMS_FULL, "utf8");

// Absolute URLs present in the sitemap.
const sitemapUrls = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]!));
const inSitemap = (route: string): boolean => sitemapUrls.has(`${SITE_URL}${route}`);

const stateUspsList = readdirSync(STATES_DIR)
  .filter((f) => f.endsWith(".json"))
  .map((f) => f.replace(/\.json$/, ""));

const errors: string[] = [];

// (1) Every non-gated route + per-state page must be in the sitemap.
for (const route of ALL_ROUTES) {
  if (isGated(route)) continue;
  if (!inSitemap(route)) errors.push(`route missing from sitemap: ${route}`);
}
for (const usps of stateUspsList) {
  for (const path of [`/states/${usps}/`, `/states/${usps}/el-percent-history/`]) {
    if (!inSitemap(path)) errors.push(`state page missing from sitemap: ${path}`);
  }
}

// (2) The gated console must never leak into a discovery surface.
for (const url of sitemapUrls) {
  if (url.includes("/audit")) errors.push(`gated /audit URL present in sitemap: ${url}`);
}
if (/\/audit\b/.test(llmsFull)) {
  errors.push("gated /audit reference present in llms-full.txt (must be excluded)");
}

// Every robots.txt group must disallow the console, not just the wildcard —
// a named crawler obeys its own group alone.
const robots = readFileSync(ROBOTS, "utf8");
for (const agent of agentsAllowedToCrawl(robots, "/audit/")) {
  errors.push(`robots.txt group "User-agent: ${agent}" does not disallow /audit/`);
}

if (errors.length > 0) fail(errors);

// (3) Advisory: non-gated routes absent from the curated llms.txt.
const llmsGaps = ALL_ROUTES.filter((r) => !isGated(r) && r !== "/" && !llms.includes(r));
if (llmsGaps.length > 0) {
  console.warn(
    "Discovery-surface WARNING — routes not referenced in public/llms.txt " +
      "(curated entry point; add them if they are significant):",
  );
  for (const r of llmsGaps) console.warn("  " + r);
}

const stateCount = stateUspsList.length;
console.log(
  `Discovery-surface check PASSED (${ALL_ROUTES.filter((r) => !isGated(r)).length} routes + ${stateCount * 2} state pages in sitemap; /audit excluded).`,
);
