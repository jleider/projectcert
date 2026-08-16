/**
 * Post-build presence check. Asserts that every route declared in
 * `src/lib/routes.ts` and every state in `src/content/states/` produced
 * an `index.html` under `dist/`. Catches the silent footgun where a
 * `getStaticPaths()` filter mistake or a renamed page leaves nothing
 * pointing at the omission.
 *
 * Also validates anchor targets: every value in `ANCHORS` must resolve
 * to a matching `id="<value>"` in at least one built page. This catches a
 * declared anchor that no page defines even when nothing links to it yet;
 * `check-internal-links.ts` covers the complementary case, an authored
 * `#fragment` whose target id has been renamed away.
 *
 * Runs after `astro build` (wired into npm `build`). Fails the build
 * with a non-zero exit if any expected page or anchor is missing.
 */

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { ALL_ROUTES, ANCHORS } from "../src/lib/routes";

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

// Anchor-target validation: collect every id="..." across built pages,
// then confirm each ANCHORS value resolves somewhere.
function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

const presentIds = new Set<string>();
for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) presentIds.add(m[1]!);
}

const missingAnchors = Object.values(ANCHORS).filter((a) => !presentIds.has(a));

if (missing.length > 0 || missingAnchors.length > 0) {
  console.error("Built-pages check FAILED:");
  for (const m of missing) console.error(`  missing page: ${m}`);
  for (const a of missingAnchors) console.error(`  ANCHORS.${a} has no matching id="${a}" in any built page`);
  process.exit(1);
}

const total = ALL_ROUTES.length + stateFiles.length;
console.log(
  `Built-pages check PASSED (${ALL_ROUTES.length} routes + ${stateFiles.length} state pages = ${total} files present; ${Object.keys(ANCHORS).length} anchors resolved).`,
);
