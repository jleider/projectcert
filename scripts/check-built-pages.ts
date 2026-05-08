/**
 * Post-build presence check. Asserts that every route declared in
 * `src/lib/routes.ts` and every state in `src/content/states/` produced
 * an `index.html` under `dist/`. Catches the silent footgun where a
 * `getStaticPaths()` filter mistake or a renamed page leaves nothing
 * pointing at the omission.
 *
 * Runs after `astro build` (wired into npm `build`). Fails the build
 * with a non-zero exit if any expected page is missing.
 */

import { existsSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_ROUTES } from "../src/lib/routes";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");
const STATES_DIR = resolve(__dirname, "../src/content/states");

function expectedFileForRoute(route: string): string {
  // Astro `format: "directory"` maps "/foo/" → "dist/foo/index.html"
  // and "/" → "dist/index.html".
  const trimmed = route.replace(/^\/+|\/+$/g, "");
  return trimmed ? join(DIST, trimmed, "index.html") : join(DIST, "index.html");
}

const missing: string[] = [];

for (const route of ALL_ROUTES) {
  const file = expectedFileForRoute(route);
  if (!existsSync(file)) missing.push(`${route}  →  ${file}`);
}

const stateFiles = readdirSync(STATES_DIR).filter((f) => f.endsWith(".json"));
for (const f of stateFiles) {
  const usps = f.replace(/\.json$/, "");
  const file = join(DIST, "states", usps, "index.html");
  if (!existsSync(file)) missing.push(`/states/${usps}/  →  ${file}`);
}

if (missing.length > 0) {
  console.error("Built-pages check FAILED — missing expected output:");
  for (const m of missing) console.error("  " + m);
  console.error(`\n${missing.length} route(s) missing.`);
  process.exit(1);
}

const total = ALL_ROUTES.length + stateFiles.length;
console.log(
  `Built-pages check PASSED (${ALL_ROUTES.length} routes + ${stateFiles.length} state pages = ${total} files present).`,
);
