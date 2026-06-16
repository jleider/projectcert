/**
 * Turn the external-link checker's JSON report into a D1 reconciliation
 * script for the `link_reviews` queue (bot-blocked URLs awaiting human
 * acceptance). Run by the weekly external-link sweep:
 *
 *   npm run check:links -- --json > /tmp/links.json
 *   tsx scripts/sync-link-reviews.ts --input /tmp/links.json --out /tmp/link-reviews.sql
 *   wrangler d1 execute projectcert-audit --remote --file /tmp/link-reviews.sql
 *
 * Pending rows that are no longer bot-blocked (recovered, or now a hard
 * error, or accepted-and-whitelisted) are removed; the current pending
 * set is upserted with ON CONFLICT that preserves the decision and
 * first_seen. Accepted rows are never touched here.
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

const report = JSON.parse(readFileSync(inputPath, "utf8")) as { results: CheckerResult[] };
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
    lines.push(
      `INSERT INTO link_reviews (url, status, classification, citations, first_seen, last_seen) ` +
        `VALUES (${q(r.url)}, ${status}, ${q(r.classification)}, ${citations}, ${q(seenAt)}, ${q(seenAt)}) ` +
        `ON CONFLICT(url) DO UPDATE SET status = excluded.status, classification = excluded.classification, ` +
        `citations = excluded.citations, last_seen = excluded.last_seen;`,
    );
  }
}
lines.push("COMMIT;");

writeFileSync(outPath, lines.join("\n") + "\n");
console.log(`Wrote ${outPath}: ${pending.length} pending bot-blocked URLs.`);
