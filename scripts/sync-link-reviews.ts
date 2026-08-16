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
 *
 * That re-flag is correct per URL and catastrophic in bulk. A degraded
 * sweep — the runner loses DNS, a proxy intercepts everything, a whole
 * network path fails — makes every request return a status that differs
 * from the one it was accepted at, so every accepted URL classifies as
 * `needs-review` at once and the upsert clears every reviewer decision in
 * the table. The next nightly sync then publishes an empty whitelist, and
 * the acceptances (which is to say, the human review work) are gone.
 * `--max-regression` guards that: when an implausible share of the
 * accepted set regresses in a single sweep, this exits non-zero without
 * writing SQL, so the reconcile is skipped rather than applied. The weekly
 * workflow runs the step under `continue-on-error`, so a skip is a no-op
 * and the following sweep reconciles normally once the network recovers.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseCheckerReport } from "../src/lib/audit-shared";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WHITELIST_PATH = resolve(__dirname, "../src/data/link-whitelist.json");

/**
 * Share of the accepted set that may regress to needs-review in one sweep
 * before the reconcile is treated as degraded rather than real. Genuine
 * regressions arrive a URL or two at a time; a host-wide change large
 * enough to trip this is worth a human looking before every acceptance is
 * discarded.
 */
const DEFAULT_MAX_REGRESSION = 0.5;

/** Below this many accepted URLs, a ratio is noise — check nothing. */
const MIN_ACCEPTED_FOR_CHECK = 4;

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

const report = parseCheckerReport(readFileSync(inputPath, "utf8")) as {
  results: CheckerResult[];
};
const seenAt = argValue("--seen-at") ?? new Date().toISOString();

const pending = (report.results ?? []).filter((r) => r.classification === "needs-review");

/** URLs a reviewer has accepted, as published by the nightly sync. */
function loadAcceptedUrls(): Set<string> {
  const path = argValue("--whitelist") ?? WHITELIST_PATH;
  try {
    return new Set(Object.keys(JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>));
  } catch {
    return new Set();
  }
}

const acceptedUrls = loadAcceptedUrls();
if (acceptedUrls.size >= MIN_ACCEPTED_FOR_CHECK) {
  const maxRegression = Number(argValue("--max-regression") ?? DEFAULT_MAX_REGRESSION);
  const regressed = pending.filter((r) => acceptedUrls.has(r.url)).length;
  const ratio = regressed / acceptedUrls.size;
  if (ratio > maxRegression) {
    console.error(
      `Refusing to reconcile: ${regressed} of ${acceptedUrls.size} accepted URLs ` +
        `(${Math.round(ratio * 100)}%) regressed to needs-review in one sweep, above the ` +
        `${Math.round(maxRegression * 100)}% ceiling. This is the shape of a degraded run ` +
        `(no DNS, an intercepting proxy, a dead network path), not of real link rot. ` +
        `No SQL was written, so every reviewer acceptance is preserved. Re-run the sweep; ` +
        `pass --max-regression 1 to apply it anyway once the regressions are confirmed real.`,
    );
    process.exit(1);
  }
}

const q = (s: string) => `'${s.replace(/'/g, "''")}'`;

// No BEGIN TRANSACTION / COMMIT — D1 rejects explicit SQL transactions and
// fails the entire file. See the note in sync-broken-links.ts.
const lines: string[] = [];

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
    //
    // A URL a reviewer marked 'dead' is the exception, and the WHERE clause
    // below is what protects it. A dead URL goes on failing every sweep by
    // definition, so without the guard each sweep would reset the verdict
    // to pending and the same person would be asked the same question every
    // week until someone fixed the citation. Its status and citations are
    // still refreshed — only the decision and its attribution are held.
    lines.push(
      `INSERT INTO link_reviews (url, status, classification, citations, first_seen, last_seen, decision) ` +
        `VALUES (${q(r.url)}, ${status}, ${q(r.classification)}, ${citations}, ${q(seenAt)}, ${q(seenAt)}, 'pending') ` +
        `ON CONFLICT(url) DO UPDATE SET status = excluded.status, classification = excluded.classification, ` +
        `citations = excluded.citations, last_seen = excluded.last_seen, ` +
        `decision = 'pending', reviewed_by = NULL, reviewed_at = NULL, accepted_status = NULL ` +
        `WHERE link_reviews.decision <> 'dead';`,
    );
    // The guard above skips the whole update for a dead row, so refresh the
    // observation separately — a maintainer fixing the citation wants to see
    // where it is cited now, not where it was when it was first marked.
    lines.push(
      `UPDATE link_reviews SET status = ${status}, classification = ${q(r.classification)}, ` +
        `citations = ${citations}, last_seen = ${q(seenAt)} ` +
        `WHERE url = ${q(r.url)} AND decision = 'dead';`,
    );
  }
}
writeFileSync(outPath, lines.join("\n") + "\n");
console.log(`Wrote ${outPath}: ${pending.length} pending bot-blocked URLs.`);
