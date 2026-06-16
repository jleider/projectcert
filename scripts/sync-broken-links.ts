/**
 * Turn the external-link checker's JSON report into a D1 reconciliation
 * script for the audit store's `broken_links` table. Run by the weekly
 * external-link sweep:
 *
 *   npm run check:links -- --json > /tmp/links.json
 *   tsx scripts/sync-broken-links.ts --input /tmp/links.json --out /tmp/broken.sql
 *   wrangler d1 execute projectcert-audit --remote --file /tmp/broken.sql
 *
 * The emitted SQL: deletes rows whose URL is no longer broken, then
 * upserts the current broken set with `ON CONFLICT DO NOTHING` so a
 * still-broken link keeps its original `detected_at`. Recovered links
 * fall out automatically, clearing the "needs re-verification" flag.
 *
 * Citations map to datapoint ids via the shared `datapointIdForCitation`
 * so ids never drift from the descriptor.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { datapointIdForCitation } from "../src/lib/verification-datapoints";

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

const BROKEN = new Set(["client-error", "server-error", "network-error"]);

const inputPath = argValue("--input");
const outPath = argValue("--out");
if (!inputPath || !outPath) {
  console.error("Usage: sync-broken-links.ts --input <links.json> --out <broken.sql>");
  process.exit(2);
}

const report = JSON.parse(readFileSync(inputPath, "utf8")) as { results: CheckerResult[] };
const detectedAt = (argValue("--detected-at") ?? new Date().toISOString());

interface BrokenRow {
  usps: string;
  datapointId: string;
  url: string;
  citation: string;
  status: string;
  classification: string;
}

const rows = new Map<string, BrokenRow>();
for (const result of report.results ?? []) {
  if (!BROKEN.has(result.classification)) continue;
  for (const citation of result.citations) {
    const usps = citation.split(" / ")[0]?.trim().toUpperCase() ?? "";
    if (!/^[A-Z]{2}$/.test(usps)) continue;
    const datapointId = datapointIdForCitation(citation);
    if (!datapointId) continue;
    const key = `${usps}:${datapointId}:${result.url}`;
    if (!rows.has(key)) {
      rows.set(key, {
        usps,
        datapointId,
        url: result.url,
        citation,
        status: result.status === null ? "" : String(result.status),
        classification: result.classification,
      });
    }
  }
}

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;

const lines: string[] = ["BEGIN TRANSACTION;"];
const current = [...rows.values()];

if (current.length === 0) {
  lines.push("DELETE FROM broken_links;");
} else {
  const tuples = current.map((r) => `(${q(r.usps)}, ${q(r.datapointId)}, ${q(r.url)})`).join(", ");
  lines.push(
    `DELETE FROM broken_links WHERE (usps, datapoint_id, url) NOT IN (VALUES ${tuples});`,
  );
  for (const r of current) {
    const status = r.status === "" ? "NULL" : q(r.status);
    lines.push(
      `INSERT INTO broken_links (usps, datapoint_id, url, citation, status, classification, detected_at) ` +
        `VALUES (${q(r.usps)}, ${q(r.datapointId)}, ${q(r.url)}, ${q(r.citation)}, ${status}, ${q(r.classification)}, ${q(detectedAt)}) ` +
        `ON CONFLICT(usps, datapoint_id, url) DO NOTHING;`,
    );
  }
}
lines.push("COMMIT;");

writeFileSync(outPath, lines.join("\n") + "\n");
console.log(`Wrote ${outPath}: ${current.length} broken-link datapoint rows.`);
