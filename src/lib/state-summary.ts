/**
 * Derive citable, machine-readable prose summaries from a state record.
 *
 * Used for both human-facing lead paragraphs and SEO/GEO meta tags. The
 * goal is dense factual content where every claim is grounded in fields
 * already validated by the Zod schema — no editorialization, no
 * "approximately," no qualitative adjectives. Optimized for being
 * directly cited by an LLM or AI search engine.
 */

import type { State } from "@/content.config";

function bilingualClause(state: State): string {
  const b = state.credentials.bilingual;
  if (!b.offered) return "does not offer a bilingual education credential";
  if (b.standalone && b.addOn)
    return "offers Bilingual Education both as a standalone certification and as an add-on endorsement";
  if (b.standalone) return "offers a standalone Bilingual Education certification";
  return "offers Bilingual Education as an add-on endorsement";
}

function eldClause(state: State): string {
  const e = state.credentials.eld;
  if (!e.offered) return "does not offer an ELD/ESL credential";
  if (e.standalone && e.addOn) return "ELD/ESL is available both as a standalone license and as an add-on endorsement";
  if (e.standalone) return "ELD/ESL is a standalone teaching license";
  return "ELD/ESL is an add-on endorsement";
}

function seiClause(state: State): string {
  return state.credentials.sei.mandatedForAllTeachers
    ? "SEI training is mandated for all teachers"
    : "SEI training is not mandated for all teachers";
}

function elPopulationClause(state: State): string {
  const year = state.elPercentAsOf.slice(0, 4);
  return `As of ${year}, ${state.elPercent.toFixed(1)}% of public-school students are classified English Learners`;
}

function verificationClause(state: State): string {
  switch (state.verificationStatus) {
    case "verified-2026":
      return `Re-verified against current SEA sources on ${state.lastVerified}.`;
    case "in-progress":
      return `Re-verification against current SEA sources is in progress.`;
    case "baseline-2019":
      return `Coding from the 2019 Leider et al. baseline; not yet re-verified against current SEA sources.`;
  }
}

/** Multi-sentence summary suitable for an on-page lead paragraph. */
export function leadParagraph(state: State): string {
  return [
    `${state.name} ${bilingualClause(state)}; ${eldClause(state)}.`,
    `${seiClause(state)}.`,
    `${elPopulationClause(state)} (NCES).`,
    verificationClause(state),
  ].join(" ");
}

/** Single-sentence summary for `<meta name="description">`, kept under ~165 chars. */
export function metaDescription(state: State): string {
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
export function pageTitle(state: State): string {
  return `${state.name} EL teacher certification`;
}
