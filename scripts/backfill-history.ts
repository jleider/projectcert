/**
 * One-shot backfill: prepend the 2019 baseline-coding history event to
 * every state record, idempotently.
 *
 * Every state's licensure history starts with the same baseline entry
 * dated 2019-12-01 (the close of the Leider et al. data-collection
 * window, Oct–Dec 2019). Subsequent dated events are added by hand as
 * states are re-verified — see `verify: <state>` commits and
 * `sources/<usps>/<date>/changes-from-baseline.md` for the source
 * material.
 *
 * Run once: `tsx scripts/backfill-history.ts`
 * Safe to re-run: skips states whose first history entry is already
 * the 2019-12-01 baseline.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

const BASELINE_EVENT = {
  date: "2019-12-01",
  title: "Baseline coding (Leider, Colombo & Nerlino, 2021)",
  description:
    "Initial coding of the SEA's bilingual, ELD/ESL, and SEI credentials, professional teaching standards, and EL-population data. Captured Oct–Dec 2019 for the EPAA 29(100) document analysis; this row is the as-of-2019 snapshot against which subsequent verifications are diffed.",
  sourceUrls: ["https://doi.org/10.14507/epaa.29.5279"],
};

const files = readdirSync(STATES_DIR).filter((f) => f.endsWith(".json"));

let added = 0;
let skipped = 0;

for (const file of files) {
  const path = join(STATES_DIR, file);
  const json = JSON.parse(readFileSync(path, "utf8")) as {
    history?: Array<{ date: string }>;
    [k: string]: unknown;
  };

  const existing = json.history ?? [];
  if (
    existing.some(
      (e) =>
        e.date === BASELINE_EVENT.date &&
        (e as { title?: string }).title?.startsWith("Baseline coding"),
    )
  ) {
    skipped++;
    continue;
  }

  json.history = [BASELINE_EVENT, ...existing];

  writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
  added++;
}

console.log(
  `Added baseline history entry to ${added} states; skipped ${skipped} already populated.`,
);
