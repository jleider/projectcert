/**
 * Backfill `elPercentHistory[]` on every state JSON from NCES Digest
 * 2023, Table 204.20 ("English language learner students in public
 * schools, by state"). The d23 table reports fall 2011 through fall
 * 2021 for each state — 11 annual data points.
 *
 * Source TSV is at sources/_consolidated/2026-05-10/nces-d23-table-204-20.tsv
 * (cached from https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp).
 *
 * Idempotent: replaces (does not duplicate) any existing
 * `elPercentHistory[]` array with the d23-derived values, sorted
 * chronologically. Skips year-cells reported as "—" (e.g., VT 2018).
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = process.env.STATES_DIR ?? resolve(__dirname, "../src/content/states");
const TSV_PATH = resolve(
  __dirname,
  "../sources/_consolidated/2026-05-10/nces-d23-table-204-20.tsv",
);
const NCES_URL = "https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp";
const SOURCE_LABEL = "NCES Digest of Education Statistics 2023, Table 204.20";

interface ElObs {
  date: string;
  percent: number;
  source: { label: string; url: string };
}
interface State {
  usps: string;
  elPercentHistory?: ElObs[];
  [k: string]: unknown;
}

const tsv = readFileSync(TSV_PATH, "utf8").trim().split("\n");
const header = tsv[0]!.split("\t"); // ["State", "2011", ..., "2021"]
const years = header.slice(1).map((y) => Number(y));

const byState = new Map<string, ElObs[]>();
for (const line of tsv.slice(1)) {
  const cols = line.split("\t");
  const usps = cols[0]!;
  const obs: ElObs[] = [];
  for (let i = 0; i < years.length; i++) {
    const cell = (cols[i + 1] ?? "").trim();
    if (!cell || cell === "—" || cell === "-") continue;
    const pct = Number(cell);
    if (!Number.isFinite(pct)) continue;
    obs.push({
      date: `${years[i]}-10-01`,
      percent: pct,
      source: { label: SOURCE_LABEL, url: NCES_URL },
    });
  }
  obs.sort((a, b) => a.date.localeCompare(b.date));
  byState.set(usps, obs);
}

let written = 0;
let total = 0;
for (const file of readdirSync(STATES_DIR).sort()) {
  if (!file.endsWith(".json")) continue;
  const path = join(STATES_DIR, file);
  const obj = JSON.parse(readFileSync(path, "utf8")) as State;
  const obs = byState.get(obj.usps);
  if (!obs || obs.length === 0) {
    console.log(`${obj.usps}: SKIP (no NCES rows)`);
    continue;
  }
  obj.elPercentHistory = obs;
  writeFileSync(path, JSON.stringify(obj, null, 2) + "\n", "utf8");
  written++;
  total += obs.length;
  console.log(`${obj.usps}: ${obs.length} points`);
}

console.log(
  `\nBackfilled elPercentHistory on ${written} states (${total} data points total).`,
);
