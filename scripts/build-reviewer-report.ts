/**
 * Turn the link checker's JSON into the weekly report that is emailed to
 * reviewers.
 *
 *   tsx scripts/build-reviewer-report.ts --input /tmp/links.json \
 *     --out reviewer-report.md --date 2026-08-16
 *
 * This is a different document from the checker's own markdown output, and
 * deliberately so. That one is addressed to whoever maintains the checker:
 * it is organised by HTTP status, names every URL, and prints citation
 * paths like `CA / sources[2]`. The reviewers are doctoral students
 * verifying state education agency sources, not maintainers of this
 * repository, and for them a wall of URLs and status codes is not a task
 * list — it is something to forward to someone else.
 *
 * So this report answers only: how much is waiting, which states it sits
 * in, and where to click. Every link points into the review console rather
 * than at the source itself, because opening the source is a step *inside*
 * the review — the console is where the source can actually be accepted,
 * and a reviewer who opens the raw URL from an email has no way to record
 * what they found.
 *
 * Vocabulary rule (CLAUDE.md): no schema identifiers, no classification
 * enums, no status codes. "Could not be reached automatically", not
 * `needs-review`; "no longer available", not `client-error` / 404.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "../src/config/site";
import { parseCheckerReport } from "../src/lib/audit-shared";
import { absoluteAuditStateUrl } from "../src/lib/state-types";
import { ROUTES, absoluteRoute } from "../src/lib/routes";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

function argValue(flag: string): string | null {
  const i = process.argv.indexOf(flag);
  return i >= 0 && i + 1 < process.argv.length ? process.argv[i + 1]! : null;
}

const inputPath = argValue("--input");
const outPath = argValue("--out");
if (!inputPath || !outPath) {
  console.error("Usage: build-reviewer-report.ts --input <links.json> --out <report.md> [--date YYYY-MM-DD]");
  process.exit(2);
}
const reportDate = argValue("--date") ?? new Date().toISOString().slice(0, 10);

interface CheckerResult {
  url: string;
  citations: string[];
  classification: string;
}

const report = parseCheckerReport(readFileSync(inputPath, "utf8")) as { results: CheckerResult[] };
const results = report.results ?? [];

/** USPS -> full state name, so the report never makes a reader decode a
 *  two-letter code to find their own assignment. */
const stateNames = new Map<string, string>();
for (const f of readdirSync(STATES_DIR).filter((n) => n.endsWith(".json"))) {
  const s = JSON.parse(readFileSync(join(STATES_DIR, f), "utf8")) as { usps: string; name: string };
  stateNames.set(s.usps, s.name);
}

/** `"CA / sources[2]"` -> `"CA"`. Cross-state shared sources cite several
 *  states, so one URL can land in more than one reviewer's list. */
function statesIn(citations: string[]): string[] {
  const out = new Set<string>();
  for (const c of citations) {
    const code = c.split(" / ")[0]?.trim();
    if (code && stateNames.has(code)) out.add(code);
  }
  return [...out];
}

const unreachable = results.filter((r) => r.classification === "needs-review");
const gone = results.filter((r) => r.classification === "client-error");
const fine = results.length - unreachable.length - gone.length;

/** Per-state counts, largest first — a reviewer with one state wants to
 *  find it, and whoever is triaging wants the biggest pile. */
function byState(rows: CheckerResult[]): Array<{ usps: string; name: string; count: number }> {
  const counts = new Map<string, number>();
  for (const r of rows) {
    for (const usps of statesIn(r.citations)) counts.set(usps, (counts.get(usps) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([usps, count]) => ({ usps, name: stateNames.get(usps) ?? usps, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

const lines: string[] = [];
const push = (s = "") => lines.push(s);

push(`# Source review — ${reportDate}`);
push();
push(
  `Every source cited in the catalog was checked automatically this week. ` +
    `${fine.toLocaleString()} of ${results.length.toLocaleString()} responded normally and need nothing from anyone.`,
);
push();

if (unreachable.length === 0 && gone.length === 0) {
  push("Nothing needs review this week.");
  push();
} else {
  if (unreachable.length > 0) {
    push(`## ${unreachable.length} sources could not be checked automatically`);
    push();
    push(
      `These are usually pages that refuse automated visits but open normally in a browser, ` +
        `so they are far more likely to be fine than broken. Each one needs a person to open it, ` +
        `confirm it still shows what the catalog cites it for, and accept it. Once accepted, ` +
        `it stops appearing here unless the page changes.`,
    );
    push();
    push(`**[Open the review list](${absoluteRoute(SITE_URL, ROUTES.auditLinks)})**`);
    push();

    const states = byState(unreachable);
    if (states.length > 0) {
      push(`Where they sit, if you are working state by state:`);
      push();
      for (const s of states) {
        push(`- [${s.name}](${absoluteAuditStateUrl(SITE_URL, s.usps)}) — ${s.count}`);
      }
      push();
    }
  }

  if (gone.length > 0) {
    push(`## ${gone.length} sources are no longer available`);
    push();
    push(
      `These pages returned "not found". The agency has moved or withdrawn them, ` +
        `so the citation needs replacing rather than confirming — find the current ` +
        `page on the agency's site and record it against the affected entries.`,
    );
    push();
    for (const s of byState(gone)) {
      push(`- [${s.name}](${absoluteAuditStateUrl(SITE_URL, s.usps)}) — ${s.count}`);
    }
    push();
  }
}

push(`---`);
push();
push(
  `Sent automatically each Monday by the projectcert source check. ` +
    `Sign in with the address this was sent to; access is per person, so your ` +
    `name is recorded against what you confirm.`,
);
push();

writeFileSync(outPath, lines.join("\n"));
console.log(
  `Wrote ${outPath}: ${unreachable.length} unreachable, ${gone.length} gone, ${fine} fine, ` +
    `across ${byState([...unreachable, ...gone]).length} states.`,
);
