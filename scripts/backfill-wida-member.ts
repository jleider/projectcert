/**
 * One-shot backfill for the `widaMember` field on every state record.
 *
 * Source: https://wida.wisc.edu/about/consortium (retrieved 2026-05-07).
 * Member set is the 38 U.S. states + DC listed there; the remaining 13
 * states are non-members. Territories (MP, VI) and federal entities
 * (BIE, DODEA) are out of scope for this 50-state-plus-DC dataset.
 *
 * Run once: `tsx scripts/backfill-wida-member.ts`
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

const MEMBERS = new Set([
  "AK", "AL", "CO", "DC", "DE", "FL", "GA", "HI", "ID", "IL",
  "IN", "KS", "KY", "MA", "MD", "ME", "MI", "MN", "MO", "MT",
  "NC", "ND", "NH", "NJ", "NM", "NV", "NY", "OK", "PA", "RI",
  "SC", "SD", "UT", "VA", "VT", "WA", "WI", "WY",
]);

let updated = 0;
for (const file of readdirSync(STATES_DIR).sort()) {
  if (!file.endsWith(".json")) continue;
  const path = join(STATES_DIR, file);
  const data = JSON.parse(readFileSync(path, "utf8"));
  const usps = data.usps as string;

  // Insert widaMember immediately after sealOfBiliteracy to match
  // the schema's field ordering.
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    out[k] = v;
    if (k === "sealOfBiliteracy") {
      out.widaMember = MEMBERS.has(usps);
    }
  }

  writeFileSync(path, JSON.stringify(out, null, 2) + "\n");
  updated++;
}

console.log(`Updated ${updated} state files (${MEMBERS.size} WIDA members coded true).`);
