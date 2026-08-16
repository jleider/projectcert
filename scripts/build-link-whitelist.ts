/**
 * Build `src/data/link-whitelist.json` from a D1 export of the accepted
 * `link_reviews` rows. Run by the nightly sync workflow:
 *
 *   wrangler d1 execute projectcert-audit --remote --json \
 *     --command "SELECT url, accepted_status, reviewed_at, note FROM link_reviews WHERE decision = 'accepted'" \
 *     > /tmp/accepted-links.json
 *   tsx scripts/build-link-whitelist.ts --accepted /tmp/accepted-links.json
 *
 * The whitelist is what the link checker reads to treat a reviewer-
 * confirmed URL as accepted — but only while its status is unchanged. Each
 * entry records the `status` the URL was accepted at. D1 is the source of
 * truth; this file is the committed cache the checker consumes.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

function argValue(flag: string): string | null {
  const i = process.argv.indexOf(flag);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1]! : null;
}

const OUT_PATH = argValue("--out") ?? resolve(__dirname, "../src/data/link-whitelist.json");

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

interface AcceptedRow {
  url: string;
  accepted_status: string | null;
  reviewed_at: string | null;
  note: string | null;
}

const rows = readRows<AcceptedRow>(argValue("--accepted"));

/**
 * Deliberately carries no reviewer identity. This file is committed to a
 * public repository, so an address written here would be world-readable and
 * preserved in git history permanently. Who accepted a link stays in the D1
 * `link_reviews` table, which is behind Access. The checker only ever reads
 * `status` (see `loadWhitelist` in check-external-links.ts); the rest is
 * context for a human reading the file.
 */
interface WhitelistEntry {
  /** HTTP status the URL was accepted at; null = a network-error acceptance. */
  status: number | null;
  acceptedAt: string | null;
  note?: string;
}

const entries = rows
  .slice()
  .sort((a, b) => a.url.localeCompare(b.url))
  .reduce<Record<string, WhitelistEntry>>((acc, r) => {
    const status = r.accepted_status === null || r.accepted_status === "" ? null : Number(r.accepted_status);
    const entry: WhitelistEntry = {
      status: Number.isNaN(status) ? null : status,
      acceptedAt: r.reviewed_at ? r.reviewed_at.slice(0, 10) : null,
    };
    if (r.note) entry.note = r.note;
    acc[r.url] = entry;
    return acc;
  }, {});

writeFileSync(OUT_PATH, JSON.stringify(entries, null, 2) + "\n");
console.log(`Wrote ${OUT_PATH}: ${Object.keys(entries).length} accepted URLs.`);
