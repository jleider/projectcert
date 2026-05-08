/**
 * One-shot backfill for the `sealOfBiliteracy` field on every state record.
 *
 * Source: sealofbiliteracy.org adoption record (year-of-statewide-approval)
 * cross-checked against the Wikipedia "Seal of Biliteracy" article. Nine
 * states (AL, AK, KY, MT, NH, OK, VT, WV, WY) are not listed with a year
 * in available 2026 sources, so they are recorded with adopted=null —
 * "unknown / unverified," not "no."
 *
 * Run once: `tsx scripts/backfill-seal-of-biliteracy.ts`
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

const ADOPTED: Record<string, number> = {
  CA: 2011,
  IL: 2013, TX: 2013, NY: 2013,
  NM: 2014, WA: 2014, LA: 2014, MN: 2014, DC: 2014,
  NC: 2015, IN: 2015, VA: 2015, NV: 2015, HI: 2015, WI: 2015, UT: 2015,
  NJ: 2016, OR: 2016, MD: 2016, FL: 2016, GA: 2016, KS: 2016, AZ: 2016, RI: 2016,
  CO: 2017, OH: 2017, MO: 2017, DE: 2017, CT: 2017, MA: 2017,
  AR: 2018, IA: 2018, MI: 2018, TN: 2018, SC: 2018, ME: 2018,
  ND: 2019, MS: 2019,
  NE: 2020, ID: 2020,
  PA: 2022,
  SD: 2024,
};

const UNVERIFIED = new Set(["AL", "AK", "KY", "MT", "NH", "OK", "VT", "WV", "WY"]);

let updated = 0;
for (const file of readdirSync(STATES_DIR).sort()) {
  if (!file.endsWith(".json")) continue;
  const path = join(STATES_DIR, file);
  const raw = readFileSync(path, "utf8");
  const data = JSON.parse(raw);

  const usps = data.usps as string;
  let seal: { adopted: boolean | null; year: number | null };
  if (usps in ADOPTED) {
    seal = { adopted: true, year: ADOPTED[usps]! };
  } else if (UNVERIFIED.has(usps)) {
    seal = { adopted: null, year: null };
  } else {
    throw new Error(`No adoption record for ${usps}`);
  }

  // Insert sealOfBiliteracy immediately after professionalStandardsMentions
  // to match schema ordering.
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    out[k] = v;
    if (k === "professionalStandardsMentions") {
      out.sealOfBiliteracy = seal;
    }
  }

  writeFileSync(path, JSON.stringify(out, null, 2) + "\n");
  updated++;
}

console.log(`Updated ${updated} state files.`);
