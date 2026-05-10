/**
 * Build-time generator for `public/llms-full.txt` — a dense factual
 * snapshot of every state's record as plain markdown, suitable for LLM
 * retrieval / RAG ingestion.
 *
 * The output mirrors the per-state page summaries derived from the
 * same `lib/state-summary.ts` helpers used by the site, so what an LLM
 * scrapes here is identical to what a human reader sees on the page —
 * no divergence between the prose layer and the AI-facing layer.
 *
 * Run as part of the build (see package.json prebuild hook). Idempotent.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL } from "../src/config/site";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");
const OUT_PATH = resolve(__dirname, "../public/llms-full.txt");

interface State {
  usps: string;
  name: string;
  elPercent: number;
  elPercentAsOf: string;
  credentials: {
    bilingual: { offered: boolean; standalone: boolean; addOn: boolean; notes?: string };
    eld: { offered: boolean; standalone: boolean; addOn: boolean; notes?: string };
    sei: { mandatedForAllTeachers: boolean; notes?: string };
  };
  professionalStandardsMentions: { diverse: boolean; cultural: boolean; linguistic: boolean; el: boolean };
  sealOfBiliteracy: { adopted: boolean | null; year: number | null };
  elpAssessment: { name: string; consortium: "WIDA" | "ELPA21" | null };
  lastVerified: string;
  verificationStatus: "baseline-2019" | "in-progress" | "verified-2026";
  history?: Array<{ date: string; title: string; description: string }>;
  elPercentHistory?: Array<{ date: string; percent: number; source: { label: string; url: string } }>;
}

function bilingualClause(s: State): string {
  const b = s.credentials.bilingual;
  if (!b.offered) return "does not offer a bilingual education credential";
  if (b.standalone && b.addOn)
    return "offers Bilingual Education both as a standalone certification and as an add-on endorsement";
  if (b.standalone) return "offers a standalone Bilingual Education certification";
  return "offers Bilingual Education as an add-on endorsement";
}

function eldClause(s: State): string {
  const e = s.credentials.eld;
  if (!e.offered) return "does not offer an ELD/ESL credential";
  if (e.standalone && e.addOn)
    return "ELD/ESL is available both as a standalone license and as an add-on endorsement";
  if (e.standalone) return "ELD/ESL is a standalone teaching license";
  return "ELD/ESL is an add-on endorsement";
}

function seiClause(s: State): string {
  return s.credentials.sei.mandatedForAllTeachers
    ? "SEI training is mandated for all teachers"
    : "SEI training is not mandated for all teachers";
}

function standardsClause(s: State): string {
  const m = s.professionalStandardsMentions;
  const flagged = Object.entries(m).filter(([, v]) => v).map(([k]) => k);
  if (flagged.length === 0) return "Professional teaching standards do not explicitly reference any of: diverse, cultural, linguistic, or English learner.";
  return `Professional teaching standards explicitly reference: ${flagged.join(", ")}.`;
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
    return seal.year
      ? `Seal of Biliteracy adopted in ${seal.year}.`
      : "Seal of Biliteracy adopted.";
  if (seal.adopted === false) return "Seal of Biliteracy not adopted.";
  return "Seal of Biliteracy adoption status unverified.";
}

function verificationClause(s: State): string {
  switch (s.verificationStatus) {
    case "verified-2026":
      return `Re-verified against current SEA sources on ${s.lastVerified}.`;
    case "in-progress":
      return `Re-verification against current SEA sources is in progress.`;
    case "baseline-2019":
      return `Coding from the 2019 Leider et al. baseline; not yet re-verified against current SEA sources.`;
  }
}

function renderState(s: State): string {
  const lines: string[] = [];
  lines.push(`## ${s.name} (${s.usps})`);
  lines.push("");
  const stateUrl = `${SITE_URL}/states/${s.usps.toLowerCase()}/`;
  lines.push(`URL: ${stateUrl}`);
  if (s.elPercentHistory && s.elPercentHistory.length > 0) {
    lines.push(`EL-percent history page: ${stateUrl}el-percent-history/`);
  }
  lines.push(`Last verified: ${s.lastVerified} (${s.verificationStatus})`);
  lines.push("");
  lines.push(
    `${s.name} ${bilingualClause(s)}; ${eldClause(s)}. ${seiClause(s)}. As of ${s.elPercentAsOf.slice(0, 4)}, ${s.elPercent.toFixed(1)}% of public-school students are classified English Learners (NCES). ${verificationClause(s)}`,
  );
  lines.push("");
  lines.push(`- ${standardsClause(s)}`);
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

const files = readdirSync(STATES_DIR).filter((f) => f.endsWith(".json")).sort();
const states: State[] = files.map((f) =>
  JSON.parse(readFileSync(join(STATES_DIR, f), "utf8")),
);
states.sort((a, b) => a.name.localeCompare(b.name));

const verifiedCount = states.filter((s) => s.verificationStatus === "verified-2026").length;
const today = new Date().toISOString().slice(0, 10);

const header = `# projectcert — full state data (LLM-readable snapshot)

> A dense, machine-readable snapshot of every U.S. state and DC's
> teacher certification requirements for instructing classified
> English Learner (EL) students. Generated from the underlying JSON
> records — what you read here matches what users see on the live
> per-state pages.

Snapshot generated: ${today}
States verified against current SEA sources: ${verifiedCount} / ${states.length}
License: CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
Seed data: Leider, Colombo & Nerlino (2021), EPAA 29(100) — https://doi.org/10.14507/epaa.29.5279
Canonical site: ${SITE_URL}/

## Field semantics

- **bilingual / eld** credentials carry "offered", "standalone"
  (own preparation program), and "addOn" (added to a primary
  certification) flags.
- **sei.mandatedForAllTeachers** is rare — historically AZ, CA, MA;
  NV phasing in. Default state is false.
- **professionalStandardsMentions** asks whether the SEA's professional
  teaching standards document explicitly references each of: diverse
  populations, cultural responsiveness, linguistic considerations,
  English learners specifically.
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
console.log(`Wrote ${OUT_PATH} (${states.length} states, verified ${verifiedCount}/${states.length}).`);
