/**
 * Single source of truth for the datapoints a reviewer audits per state.
 *
 * `datapointsFor(state)` returns a FIXED 32-entry skeleton — the same
 * ordered set of ids for every state, so the audit-progress denominator
 * is a constant and the overview report enumerates uniformly. Only each
 * datapoint's displayed value and content hash vary per state.
 *
 * This module is deliberately self-contained: no `astro:content` import
 * (so Svelte islands can use it), no Node APIs (so it bundles into a
 * Cloudflare Pages Function), and a local structural `StateData` type
 * rather than a dependency on the content collection. If the content
 * schema drops or renames a field this module reads, passing a `State`
 * to `datapointsFor` fails to type-check at the call site — loud, not
 * silent.
 *
 * Ids are dotted schema-ish paths used purely as stable storage keys —
 * they are NEVER shown to users. User-facing copy lives in `label`, in
 * the academic register (no schema identifiers), per CLAUDE.md.
 */

export type DatapointSection =
  | "el-population"
  | "bilingual-credential"
  | "eld-credential"
  | "sei-mandate"
  | "professional-standards"
  | "seal-of-biliteracy"
  | "elp-assessment"
  | "provenance";

/** A cited source the reviewer can open to verify a datapoint. */
export interface SourceLink {
  label: string;
  url: string;
}

/** One underlying row of a grouped datapoint (history / time series / sources). */
export interface DatapointRow {
  label: string;
  value: string;
  /** Source URL backing this row, if any (rendered as a link). */
  url?: string;
}

export interface Datapoint {
  /** Stable storage key; never user-facing. */
  id: string;
  /** User-facing label, academic register. */
  label: string;
  section: DatapointSection;
  /** Formatted current value; `null` when not applicable. */
  displayValue: string | null;
  /** True for `history` / `elPercentHistory` / `sources` (one checkbox, many rows). */
  grouped: boolean;
  /** Underlying rows for grouped datapoints; empty for scalar ones. */
  rows: DatapointRow[];
  /**
   * Field-specific source(s) the reviewer opens to verify this datapoint.
   * Empty for fields the schema does not source individually (credential
   * flags, standards, SEI, population) — those are verified against the
   * state's full cited-source list shown alongside the checklist.
   */
  sourceUrls: SourceLink[];
  /** Hash of the canonical value at descriptor-build time, for drift detection. */
  contentHash: string;
}

/* ------------------------------------------------------------------ *
 * Local structural type — the subset of the state record this module
 * reads. Kept in lockstep with the Zod schema by the call site, which
 * passes the real `State`.
 * ------------------------------------------------------------------ */

type RequirementFlag = boolean | null;

interface CredentialReqsLike {
  program: RequirementFlag;
  coursework: RequirementFlag;
  practicum: RequirementFlag;
  test: RequirementFlag;
  languageProficiency: RequirementFlag;
}

interface CredentialLike {
  offered: boolean;
  standalone: boolean;
  addOn: boolean;
  requirements?: CredentialReqsLike;
  notes?: string;
}

interface StateData {
  usps: string;
  name: string;
  elPercent: number;
  elPercentAsOf: string;
  credentials: {
    bilingual: CredentialLike;
    eld: CredentialLike;
    sei: { mandatedForAllTeachers: boolean; notes?: string };
  };
  professionalStandardsMentions: {
    diverse: boolean;
    cultural: boolean;
    linguistic: boolean;
    el: boolean;
  };
  sealOfBiliteracy: { adopted: boolean; year: number | null; sourceUrl: string };
  elpAssessment: { name: string; consortium: "WIDA" | "ELPA21" | null; sourceUrl: string | null };
  sources: Array<{ label: string; url: string; retrievedAt: string; retrievedBy: string }>;
  history?: Array<{ date: string; title: string; description: string; sourceUrls: string[] }>;
  elPercentHistory?: Array<{
    date: string;
    percent: number;
    source: { label: string; url: string; publisher: string };
    note?: string;
  }>;
}

/* ------------------------------------------------------------------ *
 * Deterministic content hash (FNV-1a, 32-bit) over a stable JSON
 * serialization. No `crypto` import — runs identically in Node, the
 * browser, and the Workers runtime. This is drift detection, not a
 * security boundary.
 * ------------------------------------------------------------------ */

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value) ?? "null";
  }
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  const obj = value as Record<string, unknown>;
  const keys = Object.keys(obj).sort();
  return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(obj[k])}`).join(",")}}`;
}

export function contentHashFor(value: unknown): string {
  const str = stableStringify(value);
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

/* ------------------------------------------------------------------ *
 * Value formatting (academic register).
 * ------------------------------------------------------------------ */

function formatBool(v: boolean): string {
  return v ? "Yes" : "No";
}

function formatRequirement(v: RequirementFlag | undefined): string {
  if (v === true) return "Required";
  if (v === false) return "Not required";
  return "Not specified in public sources";
}

function scalar(
  id: string,
  label: string,
  section: DatapointSection,
  displayValue: string | null,
  canonical: unknown,
  sourceUrls: SourceLink[] = [],
): Datapoint {
  return { id, label, section, displayValue, grouped: false, rows: [], sourceUrls, contentHash: contentHashFor(canonical) };
}

function group(
  id: string,
  label: string,
  section: DatapointSection,
  displayValue: string | null,
  rows: DatapointRow[],
  canonical: unknown,
  sourceUrls: SourceLink[] = [],
): Datapoint {
  // Normalize absent (undefined) optional arrays to [] so "absent" and
  // "empty" hash identically — both mean "no rows to verify".
  return { id, label, section, displayValue, grouped: true, rows, sourceUrls, contentHash: contentHashFor(canonical ?? []) };
}

/**
 * Best-effort keyword map: which cited sources topically back a section.
 * This is an APPROXIMATE seed so every checkbox has a candidate source to
 * open immediately. It is not authoritative — the audit console lets a
 * reviewer confirm the actual source per datapoint, which overrides this.
 */
const SECTION_SOURCE_KEYWORDS: Record<DatapointSection, string[]> = {
  "el-population": ["nces", "204.20", "ellfacts", "enrollment", "englishlearner", "el-facts", "cefelf", "fingertip", "demograph"],
  "bilingual-credential": ["bilingual", "dual language", "dual-language", "dlbe", "heritage language", "two-way"],
  "eld-credential": ["esl", "esol", "tesol", "enl", "english as a second", "english as a new", "english language development", "/eld", "-eld", "english-learner-authorization"],
  "sei-mandate": ["sei", "sheltered", "structured english", "retell"],
  "professional-standards": ["standard", "professional teaching", "code of ethics", "educator standards", "intasc", "teaching profession", "teaching-profession"],
  "seal-of-biliteracy": ["biliteracy", "seal-of", "sealofbiliteracy"],
  "elp-assessment": ["elpac", "access for ells", "access-for-ells", "wida", "elpa21", "azella", "telpas", "elpt", "las links", "las-links", "english language proficiency", "elp-assessment", "oelas", "proficiency assessment"],
  provenance: [],
};

/**
 * Cited sources that topically match a section, by keyword on url+label.
 * Falls back to the full source list when nothing matches, so a reviewer
 * always has documents to open (and to attribute the correct one from).
 */
function matchSources(sources: SourceLink[], section: DatapointSection): SourceLink[] {
  const kws = SECTION_SOURCE_KEYWORDS[section];
  if (kws.length === 0) return sources;
  const hits = sources.filter((s) => {
    const hay = `${s.url} ${s.label}`.toLowerCase();
    return kws.some((kw) => hay.includes(kw));
  });
  return hits.length > 0 ? hits : sources;
}

/** Deduplicate source links by URL, preserving first-seen label/order. */
function uniqueSources(links: SourceLink[]): SourceLink[] {
  const seen = new Set<string>();
  const out: SourceLink[] = [];
  for (const l of links) {
    if (l.url && !seen.has(l.url)) {
      seen.add(l.url);
      out.push(l);
    }
  }
  return out;
}

/** Fixed ordered id set — the constant audit denominator. */
export const DATAPOINT_IDS: readonly string[] = [
  "elPercent",
  "elPercentAsOf",
  "credentials.bilingual.offered",
  "credentials.bilingual.standalone",
  "credentials.bilingual.addOn",
  "credentials.bilingual.requirements.program",
  "credentials.bilingual.requirements.coursework",
  "credentials.bilingual.requirements.practicum",
  "credentials.bilingual.requirements.test",
  "credentials.bilingual.requirements.languageProficiency",
  "credentials.eld.offered",
  "credentials.eld.standalone",
  "credentials.eld.addOn",
  "credentials.eld.requirements.program",
  "credentials.eld.requirements.coursework",
  "credentials.eld.requirements.practicum",
  "credentials.eld.requirements.test",
  "credentials.eld.requirements.languageProficiency",
  "credentials.sei.mandatedForAllTeachers",
  "professionalStandardsMentions.diverse",
  "professionalStandardsMentions.cultural",
  "professionalStandardsMentions.linguistic",
  "professionalStandardsMentions.el",
  "sealOfBiliteracy.adopted",
  "sealOfBiliteracy.year",
  "sealOfBiliteracy.sourceUrl",
  "elpAssessment.name",
  "elpAssessment.consortium",
  "elpAssessment.sourceUrl",
  "history",
  "elPercentHistory",
  "sources",
] as const;

export const DATAPOINT_COUNT = DATAPOINT_IDS.length;

function credentialReqDatapoints(
  prefix: "credentials.bilingual" | "credentials.eld",
  noun: string,
  section: DatapointSection,
  cred: CredentialLike,
  src: SourceLink[],
): Datapoint[] {
  const r = cred.requirements;
  return [
    scalar(`${prefix}.requirements.program`, `${noun} credential requires completion of an approved preparation program`, section, formatRequirement(r?.program), r?.program, src),
    scalar(`${prefix}.requirements.coursework`, `${noun} credential requires specific coursework`, section, formatRequirement(r?.coursework), r?.coursework, src),
    scalar(`${prefix}.requirements.practicum`, `${noun} credential requires a supervised practicum`, section, formatRequirement(r?.practicum), r?.practicum, src),
    scalar(`${prefix}.requirements.test`, `${noun} credential requires a content or subject-matter examination`, section, formatRequirement(r?.test), r?.test, src),
    scalar(`${prefix}.requirements.languageProficiency`, `${noun} credential requires demonstrated proficiency in a language other than English`, section, formatRequirement(r?.languageProficiency), r?.languageProficiency, src),
  ];
}

/**
 * The fixed 32-datapoint skeleton for one state, in display order.
 */
export function datapointsFor(state: StateData): Datapoint[] {
  const b = state.credentials.bilingual;
  const e = state.credentials.eld;
  const psm = state.professionalStandardsMentions;
  const seal = state.sealOfBiliteracy;
  const elp = state.elpAssessment;

  const history = state.history ?? [];
  const elPercentHistory = state.elPercentHistory ?? [];
  const sources = state.sources;

  const allSources: SourceLink[] = sources.map((s) => ({ label: s.label, url: s.url }));

  // Field-specific sources the schema carries directly.
  const sealSource: SourceLink[] = seal.sourceUrl
    ? [{ label: "State Seal of Biliteracy source", url: seal.sourceUrl }]
    : matchSources(allSources, "seal-of-biliteracy");
  const elpSource: SourceLink[] = elp.sourceUrl
    ? [{ label: "ELP assessment source", url: elp.sourceUrl }]
    : matchSources(allSources, "elp-assessment");

  // Heuristic seed for fields the schema does not source per-field. The
  // audit console lets a reviewer confirm the actual source, overriding this.
  const popSrc = matchSources(allSources, "el-population");
  const bilSrc = matchSources(allSources, "bilingual-credential");
  const eldSrc = matchSources(allSources, "eld-credential");
  const seiSrc = matchSources(allSources, "sei-mandate");
  const stdSrc = matchSources(allSources, "professional-standards");

  return [
    scalar("elPercent", "Share of public-school students classified as English Learners", "el-population", `${state.elPercent.toFixed(1)}%`, state.elPercent, popSrc),
    scalar("elPercentAsOf", "As-of date for the classified English-Learner share", "el-population", state.elPercentAsOf, state.elPercentAsOf, popSrc),

    scalar("credentials.bilingual.offered", "Bilingual education credential is offered", "bilingual-credential", formatBool(b.offered), b.offered, bilSrc),
    scalar("credentials.bilingual.standalone", "Bilingual education available as a standalone certification", "bilingual-credential", formatBool(b.standalone), b.standalone, bilSrc),
    scalar("credentials.bilingual.addOn", "Bilingual education available as an add-on endorsement", "bilingual-credential", formatBool(b.addOn), b.addOn, bilSrc),
    ...credentialReqDatapoints("credentials.bilingual", "Bilingual education", "bilingual-credential", b, bilSrc),

    scalar("credentials.eld.offered", "English language development credential is offered", "eld-credential", formatBool(e.offered), e.offered, eldSrc),
    scalar("credentials.eld.standalone", "English language development available as a standalone certification", "eld-credential", formatBool(e.standalone), e.standalone, eldSrc),
    scalar("credentials.eld.addOn", "English language development available as an add-on endorsement", "eld-credential", formatBool(e.addOn), e.addOn, eldSrc),
    ...credentialReqDatapoints("credentials.eld", "English language development", "eld-credential", e, eldSrc),

    scalar("credentials.sei.mandatedForAllTeachers", "Sheltered English instruction training is mandated for all teachers", "sei-mandate", formatBool(state.credentials.sei.mandatedForAllTeachers), state.credentials.sei.mandatedForAllTeachers, seiSrc),

    scalar("professionalStandardsMentions.diverse", "Professional teaching standards reference diverse learners", "professional-standards", formatBool(psm.diverse), psm.diverse, stdSrc),
    scalar("professionalStandardsMentions.cultural", "Professional teaching standards reference cultural competency", "professional-standards", formatBool(psm.cultural), psm.cultural, stdSrc),
    scalar("professionalStandardsMentions.linguistic", "Professional teaching standards reference linguistic diversity", "professional-standards", formatBool(psm.linguistic), psm.linguistic, stdSrc),
    scalar("professionalStandardsMentions.el", "Professional teaching standards explicitly reference English Learners", "professional-standards", formatBool(psm.el), psm.el, stdSrc),

    scalar("sealOfBiliteracy.adopted", "State Seal of Biliteracy has been adopted", "seal-of-biliteracy", formatBool(seal.adopted), seal.adopted, sealSource),
    scalar("sealOfBiliteracy.year", "Year the State Seal of Biliteracy was adopted", "seal-of-biliteracy", seal.year !== null ? String(seal.year) : "Not applicable", seal.year, sealSource),
    scalar("sealOfBiliteracy.sourceUrl", "Citation for the State Seal of Biliteracy status", "seal-of-biliteracy", seal.sourceUrl, seal.sourceUrl, sealSource),

    scalar("elpAssessment.name", "Name of the annual English language proficiency assessment", "elp-assessment", elp.name, elp.name, elpSource),
    scalar("elpAssessment.consortium", "Assessment consortium for the English language proficiency test", "elp-assessment", elp.consortium ?? "State-specific assessment", elp.consortium, elpSource),
    scalar("elpAssessment.sourceUrl", "Citation for the English language proficiency assessment", "elp-assessment", elp.sourceUrl ?? "No citation recorded", elp.sourceUrl, elpSource),

    group(
      "history",
      "Licensure history timeline",
      "provenance",
      history.length > 0 ? `${history.length} event${history.length === 1 ? "" : "s"}` : "No events recorded",
      history.map((ev) => ({ label: ev.date, value: ev.title, url: ev.sourceUrls[0] })),
      state.history,
      uniqueSources(history.flatMap((ev) => ev.sourceUrls.map((url) => ({ label: ev.title, url })))),
    ),
    group(
      "elPercentHistory",
      "English-Learner share time series",
      "provenance",
      elPercentHistory.length > 0 ? `${elPercentHistory.length} observation${elPercentHistory.length === 1 ? "" : "s"}` : "No observations recorded",
      elPercentHistory.map((obs) => ({ label: obs.date.slice(0, 4), value: `${obs.percent.toFixed(1)}% — ${obs.source.label}`, url: obs.source.url })),
      state.elPercentHistory,
      uniqueSources(elPercentHistory.map((obs) => ({ label: obs.source.label, url: obs.source.url }))),
    ),
    group(
      "sources",
      "Source citations",
      "provenance",
      `${sources.length} citation${sources.length === 1 ? "" : "s"}`,
      sources.map((src) => ({ label: src.label, value: src.url, url: src.url })),
      sources,
      sources.map((src) => ({ label: src.label, url: src.url })),
    ),
  ];
}

/** Human-facing section headings for grouping the audit checklist. */
export const SECTION_LABELS: Record<DatapointSection, string> = {
  "el-population": "English-Learner population",
  "bilingual-credential": "Bilingual education credential",
  "eld-credential": "English language development credential",
  "sei-mandate": "Sheltered English instruction mandate",
  "professional-standards": "Professional teaching standards",
  "seal-of-biliteracy": "State Seal of Biliteracy",
  "elp-assessment": "English language proficiency assessment",
  provenance: "History and sources",
};

/**
 * Map an external-link-checker citation string (e.g. `"CA / sources[2]"`,
 * `"CA / history[5].sourceUrls[0]"`, `"CA / sealOfBiliteracy.sourceUrl"`)
 * to the datapoint id whose verification a broken link should invalidate.
 * Returns null for citation shapes that do not back a tracked datapoint.
 *
 * Shared with `scripts/sync-broken-links.ts` so ids never drift from the
 * descriptor above.
 */
export function datapointIdForCitation(citation: string): string | null {
  const sep = citation.indexOf(" / ");
  const path = sep >= 0 ? citation.slice(sep + 3) : citation;
  if (path.startsWith("sources[")) return "sources";
  if (path.startsWith("history[")) return "history";
  if (path.startsWith("elPercentHistory[")) return "elPercentHistory";
  if (path === "sealOfBiliteracy.sourceUrl") return "sealOfBiliteracy.sourceUrl";
  if (path === "elpAssessment.sourceUrl") return "elpAssessment.sourceUrl";
  return null;
}
