/**
 * Derive citable, machine-readable prose summaries from a state record.
 *
 * Used for both human-facing lead paragraphs and SEO/GEO meta tags. The
 * goal is dense factual content where every claim is grounded in fields
 * already validated by the Zod schema — no editorialization, no
 * "approximately," no qualitative adjectives. Optimized for being
 * directly cited by an LLM or AI search engine.
 *
 * The input is a local structural type rather than the collection's
 * `State`, for the same reason `verification-datapoints.ts` uses one: it
 * keeps the module importable from a plain Node script
 * (`scripts/generate-llms-full.ts` renders the identical sentence into
 * `llms-full.txt`), with no `astro:content` in the runtime graph. The
 * loud-failure property survives — `/states/<usps>.astro` passes a real
 * `State`, so a renamed schema field fails to type-check at that call site.
 * These sentences must have exactly one implementation: the AI-facing dump
 * previously carried its own copy, and the two had already drifted apart on
 * the word "verified".
 */

import { reviewProgress } from "@/lib/verification-display";

/** The subset of a state record these summaries read. */
export interface StateSummaryData {
  usps: string;
  name: string;
  elPercent: number;
  elPercentAsOf: string;
  lastVerified: string;
  verificationStatus: "baseline-2019" | "in-progress" | "verified-2026";
  credentials: {
    bilingual: { offered: boolean; standalone: boolean; addOn: boolean };
    eld: { offered: boolean; standalone: boolean; addOn: boolean };
    sei: { mandatedForAllTeachers: boolean };
  };
}

function bilingualClause(state: StateSummaryData): string {
  const b = state.credentials.bilingual;
  if (!b.offered) return "does not offer a bilingual education credential";
  if (b.standalone && b.addOn)
    return "offers Bilingual Education both as a standalone certification and as an add-on endorsement";
  if (b.standalone) return "offers a standalone Bilingual Education certification";
  return "offers Bilingual Education as an add-on endorsement";
}

function eldClause(state: StateSummaryData): string {
  const e = state.credentials.eld;
  if (!e.offered) return "does not offer an ELD/ESL credential";
  if (e.standalone && e.addOn) return "ELD/ESL is available both as a standalone license and as an add-on endorsement";
  if (e.standalone) return "ELD/ESL is a standalone teaching license";
  return "ELD/ESL is an add-on endorsement";
}

function seiClause(state: StateSummaryData): string {
  return state.credentials.sei.mandatedForAllTeachers
    ? "SEI training is mandated for all teachers"
    : "SEI training is not mandated for all teachers";
}

function elPopulationClause(state: StateSummaryData): string {
  const year = state.elPercentAsOf.slice(0, 4);
  return `As of ${year}, ${state.elPercent.toFixed(1)}% of public-school students are classified English Learners`;
}

function sourceCheckClause(state: StateSummaryData): string {
  switch (state.verificationStatus) {
    case "verified-2026":
      return `Checked against current SEA sources on ${state.lastVerified}.`;
    case "in-progress":
      return `A check against current SEA sources is in progress.`;
    case "baseline-2019":
      return `Coding from the 2019 Leider et al. baseline; not yet checked against current SEA sources.`;
  }
}

/**
 * Whether a second person has confirmed the record, in the same words the
 * page badges use — "verified by an authorized reviewer".
 *
 * States the *outcome*, never the running count. This sentence is the
 * citable lead and feeds the meta description and JSON-LD, and the confirmed
 * count moves every time the ledger syncs; a sentence a researcher quotes
 * should not churn nightly. As a completed/not-completed statement it
 * changes only when a state actually crosses the threshold, which is a real
 * event worth re-citing. The badges carry the live figure.
 */
function reviewerClause(state: StateSummaryData): string {
  return reviewProgress(state.usps).complete
    ? `Verified by an authorized reviewer.`
    : `Not yet verified by an authorized reviewer.`;
}

function verificationClause(state: StateSummaryData): string {
  return `${sourceCheckClause(state)} ${reviewerClause(state)}`;
}

/** Multi-sentence summary suitable for an on-page lead paragraph. */
export function leadParagraph(state: StateSummaryData): string {
  return [
    `${state.name} ${bilingualClause(state)}; ${eldClause(state)}.`,
    `${seiClause(state)}.`,
    `${elPopulationClause(state)} (NCES).`,
    verificationClause(state),
  ].join(" ");
}

/** Single-sentence summary for `<meta name="description">`, kept under ~165 chars. */
export function metaDescription(state: StateSummaryData): string {
  const b = state.credentials.bilingual;
  const e = state.credentials.eld;

  const credParts: string[] = [];
  if (b.offered) {
    credParts.push(b.standalone ? "bilingual standalone" : "bilingual add-on");
  } else {
    credParts.push("no bilingual credential");
  }
  credParts.push(e.standalone ? "ELD standalone" : e.addOn ? "ELD add-on" : "no ELD");
  credParts.push(state.credentials.sei.mandatedForAllTeachers ? "SEI mandated" : "SEI not mandated");

  const credSummary = credParts.join(", ");
  const year = state.elPercentAsOf.slice(0, 4);

  return `${state.name} EL teacher certification: ${credSummary}. ${state.elPercent.toFixed(1)}% classified ELs (${year}). Last verified ${state.lastVerified}.`;
}

/** Page title, e.g. "Texas EL teacher certification". */
export function pageTitle(state: StateSummaryData): string {
  return `${state.name} EL teacher certification`;
}
