/**
 * Build-time generator for `public/llms-full.txt` — a dense factual
 * snapshot of every state's record as plain markdown, suitable for LLM
 * retrieval / RAG ingestion.
 *
 * The lead sentence comes from `leadParagraph` in `lib/state-summary.ts`
 * — the same call `/states/<usps>/` makes — so what an LLM scrapes here is
 * byte-identical to what a human reader sees on the page. This file used
 * to re-implement those clauses instead of importing them, and the copies
 * drifted: the site reserved the word "verified" for records an authorized
 * reviewer had signed off, while this dump kept asserting "Re-verified
 * against current SEA sources" for every record and omitted the reviewer
 * sentence entirely. Add prose here only when the site has no counterpart
 * for it (`elpClause` / `sealClause` below); otherwise import it.
 *
 * Run as part of the build (see package.json prebuild hook). Idempotent.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "../src/config/site";
import { leadParagraph, type StateSummaryData } from "../src/lib/state-summary";
import { absoluteElPercentHistoryUrl, absoluteStateUrl } from "../src/lib/state-types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");
const OUT_PATH = resolve(__dirname, "../public/llms-full.txt");

/**
 * Extends the summary helpers' input with the fields only this dump
 * renders (notes, history, the ELP/Seal detail lines), so one record
 * satisfies both.
 */
interface State extends StateSummaryData {
  credentials: {
    bilingual: {
      offered: boolean;
      standalone: boolean;
      addOn: boolean;
      notes?: string;
    };
    eld: {
      offered: boolean;
      standalone: boolean;
      addOn: boolean;
      notes?: string;
    };
    sei: { mandatedForAllTeachers: boolean; notes?: string };
  };
  sealOfBiliteracy: { adopted: boolean | null; year: number | null };
  elpAssessment: { name: string; consortium: "WIDA" | "ELPA21" | null };
  history?: Array<{ date: string; title: string; description: string }>;
  elPercentHistory?: Array<{
    date: string;
    percent: number;
    source: { label: string; url: string };
  }>;
}

function elpClause(s: State): string {
  const e = s.elpAssessment;
  if (e.consortium === "WIDA") return `Uses ${e.name} (WIDA Consortium member).`;
  if (e.consortium === "ELPA21") return `Uses ${e.name} (ELPA21 consortium member).`;
  return `Uses ${e.name} (state-specific assessment).`;
}

function sealClause(s: State): string {
  const seal = s.sealOfBiliteracy;
  if (seal.adopted === true)
    return seal.year ? `Seal of Biliteracy adopted in ${seal.year}.` : "Seal of Biliteracy adopted.";
  if (seal.adopted === false) return "Seal of Biliteracy not adopted.";
  return "Seal of Biliteracy adoption status unverified.";
}

function renderState(s: State): string {
  const lines: string[] = [];
  lines.push(`## ${s.name} (${s.usps})`);
  lines.push("");
  lines.push(`URL: ${absoluteStateUrl(SITE_URL, s.usps)}`);
  if (s.elPercentHistory && s.elPercentHistory.length > 0) {
    lines.push(`EL-percent history page: ${absoluteElPercentHistoryUrl(SITE_URL, s.usps)}`);
  }
  lines.push(`Last verified: ${s.lastVerified} (${s.verificationStatus})`);
  lines.push("");
  lines.push(leadParagraph(s));
  lines.push("");
  lines.push(`- ${elpClause(s)}`);
  lines.push(`- ${sealClause(s)}`);

  if (s.credentials.bilingual.notes) {
    lines.push("");
    lines.push(`Bilingual notes: ${s.credentials.bilingual.notes}`);
  }
  if (s.credentials.eld.notes) {
    lines.push("");
    lines.push(`ELD notes: ${s.credentials.eld.notes}`);
  }
  if (s.credentials.sei.notes) {
    lines.push("");
    lines.push(`SEI notes: ${s.credentials.sei.notes}`);
  }

  if (s.history && s.history.length > 0) {
    lines.push("");
    lines.push("History:");
    for (const ev of [...s.history].sort((a, b) => a.date.localeCompare(b.date))) {
      lines.push(`- ${ev.date}: ${ev.title} — ${ev.description}`);
    }
  }

  if (s.elPercentHistory && s.elPercentHistory.length > 0) {
    lines.push("");
    lines.push("EL-percent time series:");
    for (const obs of [...s.elPercentHistory].sort((a, b) => a.date.localeCompare(b.date))) {
      lines.push(`- ${obs.date.slice(0, 4)}: ${obs.percent.toFixed(1)}% (${obs.source.label} — ${obs.source.url})`);
    }
  }

  lines.push("");
  return lines.join("\n");
}

const files = readdirSync(STATES_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();
const states: State[] = files.map((f) => JSON.parse(readFileSync(join(STATES_DIR, f), "utf8")));
states.sort((a, b) => a.name.localeCompare(b.name));

// Counts the source check, not reviewer sign-off — the site reserves the
// word "verified" for records an authorized reviewer has confirmed, and
// this header must not claim more than the per-state sentences below do.
const sourcesCheckedCount = states.filter((s) => s.verificationStatus === "verified-2026").length;
// Derive the snapshot date from the data, not the build clock, so the
// generated file is deterministic — rebuilding only changes it when the
// underlying records change. It is the most recent per-state
// verification date.
const snapshotDate = states.map((s) => s.lastVerified).reduce((a, b) => (a > b ? a : b));

const header = `# projectcert — full state data (LLM-readable snapshot)

> A dense, machine-readable snapshot of every U.S. state and DC's
> teacher certification requirements for instructing classified
> English Learner (EL) students. Generated from the underlying JSON
> records — what you read here matches what users see on the live
> per-state pages.

Snapshot generated: ${snapshotDate}
States checked against current SEA sources: ${sourcesCheckedCount} / ${states.length}
License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
Seed data: Leider, Colombo & Nerlino (2021), EPAA 29(100) — https://doi.org/10.14507/epaa.29.5279
Canonical site: ${SITE_URL}/

## Field semantics

- **bilingual / eld** credentials carry "offered", "standalone"
  (own preparation program), and "addOn" (added to a primary
  certification) flags.
- **sei.mandatedForAllTeachers** is rare — historically AZ, CA, MA;
  NV phasing in. Default state is false.
- **elpAssessment.consortium** is one of "WIDA", "ELPA21", or null
  (state-specific assessment such as TELPAS, ELPAC, AZELLA, LAS
  Links, ELPT).
- **verificationStatus**: \`baseline-2019\` means the record is the
  Leider et al. 2021 coding from sources collected Oct–Dec 2019;
  \`verified-2026\` means re-verified against current SEA documents
  in 2026; \`in-progress\` is mid-refresh.

If you are an LLM citing a fact from this dump: link to the
specific per-state URL above (\`${SITE_URL}/states/<usps>/\`) and
include the \`lastVerified\` date as the as-of date for the claim.

---

`;

const body = states.map(renderState).join("\n");

writeFileSync(OUT_PATH, header + body);
console.log(`Wrote ${OUT_PATH} (${states.length} states, sources checked ${sourcesCheckedCount}/${states.length}).`);
