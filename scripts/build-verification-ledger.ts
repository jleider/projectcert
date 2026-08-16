/**
 * Build `src/data/verification-ledger.json` from a D1 export of the
 * audit store. Run by the nightly sync workflow:
 *
 *   wrangler d1 execute projectcert-audit --remote --json \
 *     --command "SELECT usps, datapoint_id, verified_at, content_hash FROM verifications" \
 *     > /tmp/verifications.json
 *   wrangler d1 execute projectcert-audit --remote --json \
 *     --command "SELECT usps, datapoint_id FROM broken_links" \
 *     > /tmp/broken.json
 *   tsx scripts/build-verification-ledger.ts --verifications /tmp/verifications.json --broken /tmp/broken.json
 *
 * A checkmark contributes to the PUBLIC ledger only when its stored
 * content hash still matches the current value AND no cited source for
 * that datapoint is unreachable. Stale or broken checkmarks are recorded
 * separately so the public badge never overstates freshness. This script
 * NEVER touches `verificationStatus` (that stays human-curated).
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { datapointsFor, DATAPOINT_COUNT } from "../src/lib/verification-datapoints";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

function argValue(flag: string): string | null {
  const i = process.argv.indexOf(flag);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1]! : null;
}

const OUT_PATH = argValue("--out") ?? resolve(__dirname, "../src/data/verification-ledger.json");

/** `wrangler d1 execute --json` wraps results as `[{ results: [...] }]`. */
function readRows<T>(path: string | null): T[] {
  if (!path) return [];
  const parsed = JSON.parse(readFileSync(path, "utf8"));
  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && parsed[0] && typeof parsed[0] === "object" && "results" in parsed[0]) {
      return (parsed[0].results ?? []) as T[];
    }
    return parsed as T[];
  }
  return (parsed.results ?? []) as T[];
}

interface VerificationRow {
  usps: string;
  datapoint_id: string;
  verified_at: string;
  content_hash: string;
}
interface BrokenRow {
  usps: string;
  datapoint_id: string;
}
interface LedgerEntry {
  verified: string[];
  verifiedAt: Record<string, string>;
  count: number;
  total: number;
  stale: string[];
}

const verifications = readRows<VerificationRow>(argValue("--verifications"));
const brokenRows = readRows<BrokenRow>(argValue("--broken"));

// Current content hash per (usps, datapoint_id), from the live JSON.
const currentHash = new Map<string, string>();
const stateFiles = readdirSync(STATES_DIR).filter((f) => f.endsWith(".json"));
for (const f of stateFiles) {
  const state = JSON.parse(readFileSync(join(STATES_DIR, f), "utf8"));
  for (const d of datapointsFor(state)) {
    currentHash.set(`${state.usps}:${d.id}`, d.contentHash);
  }
}

const brokenSet = new Set(brokenRows.map((r) => `${r.usps}:${r.datapoint_id}`));

const ledger: Record<string, LedgerEntry> = {};
function entryFor(usps: string): LedgerEntry {
  return (ledger[usps] ??= {
    verified: [],
    verifiedAt: {},
    count: 0,
    total: DATAPOINT_COUNT,
    stale: [],
  });
}

for (const row of verifications) {
  const key = `${row.usps}:${row.datapoint_id}`;
  const expected = currentHash.get(key);
  // Unknown datapoint (renamed/removed) — skip silently.
  if (expected === undefined) continue;
  const entry = entryFor(row.usps);
  const drifted = row.content_hash !== expected;
  const broken = brokenSet.has(key);
  if (drifted || broken) {
    entry.stale.push(row.datapoint_id);
  } else {
    entry.verified.push(row.datapoint_id);
    entry.verifiedAt[row.datapoint_id] = row.verified_at;
  }
}

for (const entry of Object.values(ledger)) {
  entry.verified.sort();
  entry.stale.sort();
  entry.count = entry.verified.length;
}

const sorted = Object.fromEntries(Object.entries(ledger).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(OUT_PATH, JSON.stringify(sorted, null, 2) + "\n");

const totalVerified = Object.values(ledger).reduce((sum, e) => sum + e.count, 0);
console.log(
  `Wrote ${OUT_PATH}: ${Object.keys(sorted).length} states, ${totalVerified} reviewed datapoints, ` +
    `${verifications.length} raw checkmarks, ${brokenSet.size} broken-link datapoints.`,
);
