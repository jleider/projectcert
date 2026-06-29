/**
 * Turn the external-link checker's JSON report into a D1 reconciliation
 * script for the `link_reviews` queue (bot-blocked URLs awaiting human
 * acceptance). Run by the weekly external-link sweep:
 *
 *   npm run check:links -- --json > /tmp/links.json
 *   tsx scripts/sync-link-reviews.ts --input /tmp/links.json --out /tmp/link-reviews.sql
 *   wrangler d1 execute projectcert-audit --remote --file /tmp/link-reviews.sql
 *
 * The checker resolves the whitelist status-awarely: a URL accepted at an
 * unchanged status classifies as `accepted` (NOT needs-review), so it
 * never appears here and its accepted row is left untouched. A URL whose
 * status CHANGED since acceptance classifies as `needs-review` and DOES
 * appear here — the upsert resets it to `pending` (re-flag), clearing the
 * stale acceptance. Pending rows no longer in the needs-review set
 * (recovered to 2xx, or now a definitive 4xx-gone) are removed.
 */

import { readFileSync, writeFileSync } from "node:fs";

function argValue(flag: string): string | null {
  const i = process.argv.indexOf(flag);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1]! : null;
}

interface CheckerResult {
  url: string;
  citations: string[];
  status: number | null;
  classification: string;
}

const inputPath = argValue("--input");
const outPath = argValue("--out");
if (!inputPath || !outPath) {
  console.error("Usage: sync-link-reviews.ts --input <links.json> --out <link-reviews.sql>");
  process.exit(2);
}

const report = JSON.parse(readFileSync(inputPath, "utf8")) as {
  results: CheckerResult[];
};
const seenAt = argValue("--seen-at") ?? new Date().toISOString();

const pending = (report.results ?? []).filter((r) => r.classification === "needs-review");

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;

const lines: string[] = ["BEGIN TRANSACTION;"];

if (pending.length === 0) {
  lines.push("DELETE FROM link_reviews WHERE decision = 'pending';");
} else {
  const urls = pending.map((r) => q(r.url)).join(", ");
  lines.push(`DELETE FROM link_reviews WHERE decision = 'pending' AND url NOT IN (${urls});`);
  for (const r of pending) {
    const status = r.status === null ? "NULL" : q(String(r.status));
    const citations = q(JSON.stringify(r.citations));
    // A URL appearing here as needs-review is either new/still-pending or a
    // previously-accepted URL whose status changed — in both cases the row
    // must end up 'pending' with the acceptance cleared (re-flag). first_seen
    // is preserved; status/classification/last_seen are refreshed.
    lines.push(
      `INSERT INTO link_reviews (url, status, classification, citations, first_seen, last_seen, decision) ` +
        `VALUES (${q(r.url)}, ${status}, ${q(r.classification)}, ${citations}, ${q(seenAt)}, ${q(seenAt)}, 'pending') ` +
        `ON CONFLICT(url) DO UPDATE SET status = excluded.status, classification = excluded.classification, ` +
        `citations = excluded.citations, last_seen = excluded.last_seen, ` +
        `decision = 'pending', reviewed_by = NULL, reviewed_at = NULL, accepted_status = NULL;`,
    );
  }
}
lines.push("COMMIT;");

writeFileSync(outPath, lines.join("\n") + "\n");
console.log(`Wrote ${outPath}: ${pending.length} pending bot-blocked URLs.`);
