/**
 * Fetch official state seals from Wikimedia Commons into
 * `public/seals/<usps>.svg`. Run once locally, then commit. Re-run
 * to refresh.
 *
 * Wikimedia Commons hosts public-domain SVGs of every state seal +
 * DC; the URLs below are the file pages, which we resolve to the
 * direct upload.wikimedia.org URL via the Commons REST API.
 *
 * License: most state seals are public-domain works of the U.S. or
 * state government and are licensed for free reuse. Each downloaded
 * file is paired with a `.license.txt` recording the Commons file
 * page URL it came from for attribution.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../public/seals");
mkdirSync(OUT_DIR, { recursive: true });

// Map: USPS → Wikimedia Commons File: title (without "File:" prefix).
// Each is the official current-era state seal SVG.
const SEALS: Record<string, string> = {
  AK: "Seal_of_Alaska.svg",
  AL: "Seal_of_Alabama.svg",
  AR: "Seal_of_Arkansas.svg",
  AZ: "Seal_of_Arizona.svg",
  CA: "Seal_of_California.svg",
  CO: "Seal_of_Colorado.svg",
  CT: "Seal_of_Connecticut.svg",
  DC: "Seal_of_the_District_of_Columbia.svg",
  DE: "Seal_of_Delaware.svg",
  FL: "Seal_of_Florida.svg",
  GA: "Seal_of_Georgia.svg",
  HI: "Seal_of_the_State_of_Hawaii.svg",
  IA: "Seal_of_Iowa.svg",
  ID: "Seal_of_Idaho.svg",
  IL: "Seal_of_Illinois.svg",
  IN: "Seal_of_Indiana.svg",
  KS: "Seal_of_Kansas.svg",
  KY: "Seal_of_Kentucky.svg",
  LA: "Seal_of_Louisiana.svg",
  MA: "Seal_of_Massachusetts.svg",
  MD: "Seal_of_Maryland_(reverse).svg",
  ME: "Seal_of_Maine.svg",
  MI: "Seal_of_Michigan.svg",
  MN: "Seal_of_Minnesota.svg",
  MO: "Seal_of_Missouri.svg",
  MS: "Seal_of_Mississippi.svg",
  MT: "Seal_of_Montana.svg",
  NC: "Seal_of_North_Carolina.svg",
  ND: "Seal_of_North_Dakota.svg",
  NE: "Seal_of_Nebraska.svg",
  NH: "Seal_of_New_Hampshire.svg",
  NJ: "Seal_of_New_Jersey.svg",
  NM: "Seal_of_New_Mexico.svg",
  NV: "Seal_of_Nevada.svg",
  NY: "Seal_of_New_York.svg",
  OH: "Seal_of_Ohio.svg",
  OK: "Seal_of_Oklahoma.svg",
  OR: "Seal_of_Oregon.svg",
  PA: "Seal_of_Pennsylvania.svg",
  RI: "Seal_of_Rhode_Island.svg",
  SC: "Seal_of_South_Carolina.svg",
  SD: "Seal_of_South_Dakota.svg",
  TN: "Seal_of_Tennessee.svg",
  TX: "Seal_of_Texas.svg",
  UT: "Seal_of_Utah.svg",
  VA: "Seal_of_Virginia.svg",
  VT: "Seal_of_Vermont.svg",
  WA: "Seal_of_Washington.svg",
  WI: "Seal_of_Wisconsin.svg",
  WV: "Seal_of_West_Virginia.svg",
  WY: "Seal_of_Wyoming.svg",
};

interface CommonsImageInfo {
  query?: {
    pages?: Record<
      string,
      { imageinfo?: Array<{ url?: string; descriptionurl?: string }> }
    >;
  };
}

async function resolveDirectUrl(commonsTitle: string): Promise<{
  directUrl: string;
  pageUrl: string;
}> {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("titles", `File:${commonsTitle}`);
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "url");
  api.searchParams.set("format", "json");
  api.searchParams.set("origin", "*");
  const res = await fetch(api, {
    headers: { "User-Agent": "projectcert-seal-fetcher/1.0 (https://projectcert.org)" },
  });
  if (!res.ok) throw new Error(`Commons API ${res.status} for ${commonsTitle}`);
  const data = (await res.json()) as CommonsImageInfo;
  const page = Object.values(data.query?.pages ?? {})[0];
  const info = page?.imageinfo?.[0];
  if (!info?.url) throw new Error(`No imageinfo for ${commonsTitle}`);
  return { directUrl: info.url, pageUrl: info.descriptionurl ?? "" };
}

async function downloadOne(usps: string, commonsTitle: string): Promise<void> {
  const { directUrl, pageUrl } = await resolveDirectUrl(commonsTitle);
  const res = await fetch(directUrl, {
    headers: { "User-Agent": "projectcert-seal-fetcher/1.0 (https://projectcert.org)" },
  });
  if (!res.ok) throw new Error(`Download ${res.status} for ${directUrl}`);
  const svg = await res.text();
  writeFileSync(resolve(OUT_DIR, `${usps.toLowerCase()}.svg`), svg);
  writeFileSync(
    resolve(OUT_DIR, `${usps.toLowerCase()}.license.txt`),
    `Source: ${pageUrl}\nDirect: ${directUrl}\nFetched: ${new Date().toISOString()}\nUsage: per Wikimedia Commons license metadata at the source page.\n`,
  );
  console.log(`✓ ${usps} (${commonsTitle})`);
}

import { existsSync } from "node:fs";

const entries = Object.entries(SEALS);
let ok = 0;
let skip = 0;
let fail = 0;
for (const [usps, title] of entries) {
  const target = resolve(OUT_DIR, `${usps.toLowerCase()}.svg`);
  if (existsSync(target)) {
    skip++;
    continue;
  }
  // Retry with backoff for upload.wikimedia.org rate limits.
  let attempt = 0;
  let lastErr: Error | undefined;
  while (attempt < 4) {
    try {
      await downloadOne(usps, title);
      ok++;
      lastErr = undefined;
      break;
    } catch (err) {
      lastErr = err as Error;
      attempt++;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
  if (lastErr) {
    fail++;
    console.error(`✗ ${usps}: ${lastErr.message}`);
  }
  await new Promise((r) => setTimeout(r, 800));
}
console.log(`\nDone: ${ok} ok, ${skip} skipped (already downloaded), ${fail} failed.`);
