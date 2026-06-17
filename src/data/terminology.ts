/**
 * Canonical terminology + state-local alias map.
 *
 * Site copy uses the canonical terms; this map exists so we can:
 *   1. Recognize when an SEA's local wording maps to one of our
 *      schema fields during ingestion.
 *   2. Render an "also called X in <state>" disclosure on per-state
 *      detail pages where it adds clarity.
 *
 * Update both this file AND the el-cert-terminology skill when adding
 * a new alias.
 */

export type CredentialType = "bilingual" | "eld" | "sei" | "mainstream";

export interface CanonicalTerm {
  canonical: CredentialType | "credential" | "certification" | "endorsement";
  aliases: string[];
  notes?: string;
}

export const CANONICAL_TERMS: ReadonlyArray<CanonicalTerm> = [
  {
    canonical: "credential",
    aliases: ["license", "licensure", "authorization"],
    notes:
      "Umbrella covering both standalone certifications and add-on endorsements.",
  },
  {
    canonical: "certification",
    aliases: ["license", "licensure", "standalone certificate"],
    notes: "Standalone — earned via its own preparation program.",
  },
  {
    canonical: "endorsement",
    aliases: ["add-on", "add-on endorsement", "extension"],
  },
  {
    canonical: "bilingual",
    aliases: [
      "DBE",
      "DLBE",
      "TBE",
      "Developmental Bilingual Education",
      "Dual Language",
      "Dual Language Bilingual Education",
      "Transitional Bilingual Education",
      "Heritage language",
      "Bilingual/Bicultural",
    ],
  },
  {
    canonical: "eld",
    aliases: [
      "ESL",
      "English as a Second Language",
      "ENL",
      "English as a New Language",
      "ESOL",
      "English to Speakers of Other Languages",
      "TESOL",
      "TESL",
      "CLD",
      "Cultural and Linguistic Diverse",
      "ELL",
    ],
  },
  {
    canonical: "sei",
    aliases: [
      "Sheltered English Instruction",
      "Sheltered English Immersion",
      "SIOP endorsement",
    ],
  },
];

/** Student-term aliases — display in glossary, not normalized in code. */
export const STUDENT_TERM_ALIASES = [
  { code: "EL", expansion: "Classified English Learner", canonical: true },
  { code: "ELL", expansion: "English Language Learner", canonical: false },
  {
    code: "ESOL",
    expansion: "English for Speakers of Other Languages",
    canonical: false,
  },
  { code: "EB", expansion: "Emergent Bilingual", canonical: false },
  { code: "ML", expansion: "Multilingual Learner", canonical: false },
  {
    code: "LEP",
    expansion: "Limited English Proficient (older federal term)",
    canonical: false,
  },
] as const;

/**
 * Per-state local-name disclosures.
 *
 * One entry per USPS code (50 + DC). Names are taken from the Leider et
 * al. (2021) Appendix A document titles where explicitly documented;
 * elsewhere we use the most common SEA wording for that credential
 * type (typically "ESL Endorsement"). Where a credential is not
 * offered, the field is null.
 *
 * Re-verified entries (verificationStatus: verified-2026) should
 * supersede these with the SEA's current local naming.
 */
export const STATE_LOCAL_NAMES: Record<
  string,
  Record<CredentialType, string | null>
> = {
  AL: { bilingual: null, eld: "ESL Endorsement", sei: null, mainstream: null },
  AK: {
    bilingual: "Bilingual Education Endorsement",
    eld: "ESL Endorsement",
    sei: null,
    mainstream: null,
  },
  AZ: {
    bilingual: "Bilingual Education PreK-12 Endorsement",
    eld: "English as a Second Language PreK-12 Endorsement",
    sei: "Structured English Immersion (SEI) Endorsement",
    mainstream: null,
  },
  AR: { bilingual: null, eld: "ESL Endorsement", sei: null, mainstream: null },
  CA: {
    bilingual: "Bilingual Authorization",
    eld: "CLAD / EL Authorization",
    sei: null,
    mainstream: null,
  },
  CO: {
    bilingual: "CLD Bilingual Education Specialist",
    eld: "Culturally and Linguistically Diverse (CLD) Education",
    sei: null,
    mainstream: null,
  },
  CT: {
    bilingual: null,
    eld: "TESOL Cross Endorsement",
    sei: null,
    mainstream: null,
  },
  DE: {
    bilingual: "Bilingual Teacher (Code 1561)",
    eld: "Teacher of ELs (Code 1562)",
    sei: null,
    mainstream: null,
  },
  DC: {
    bilingual: "Bilingual Education Credential",
    eld: "ESL Credential",
    sei: null,
    mainstream: null,
  },
  FL: { bilingual: null, eld: "ESOL Endorsement", sei: null, mainstream: null },
  GA: {
    bilingual: null,
    eld: "English to Speakers of Other Languages (ESOL)",
    sei: null,
    mainstream: null,
  },
  HI: {
    bilingual: null,
    eld: "ESL License Field",
    sei: null,
    mainstream: null,
  },
  ID: {
    bilingual: "Bilingual Education Endorsement",
    eld: "ESL Endorsement",
    sei: null,
    mainstream: null,
  },
  IL: {
    bilingual: "Bilingual Education Endorsement",
    eld: "English as a New Language (ENL) / ESL Endorsement",
    sei: null,
    mainstream: null,
  },
  IN: {
    bilingual: null,
    eld: "English as a New Language",
    sei: null,
    mainstream: null,
  },
  IA: {
    bilingual: null,
    eld: "ESL K-12 Endorsement",
    sei: null,
    mainstream: null,
  },
  KS: { bilingual: null, eld: "ESOL Endorsement", sei: null, mainstream: null },
  KY: { bilingual: null, eld: "ESL Endorsement", sei: null, mainstream: null },
  LA: { bilingual: null, eld: "ESL Endorsement", sei: null, mainstream: null },
  ME: {
    bilingual: null,
    eld: "English as a Second Language Endorsement K-12 (660)",
    sei: null,
    mainstream: null,
  },
  MD: { bilingual: null, eld: "ESOL Endorsement", sei: null, mainstream: null },
  MA: {
    bilingual: "Bilingual Education Endorsement",
    eld: "ESL Licensure",
    sei: "SEI Endorsement",
    mainstream: null,
  },
  MI: {
    bilingual: "Bilingual Endorsement",
    eld: "Teachers of English as a Second Language",
    sei: null,
    mainstream: null,
  },
  MN: {
    bilingual: "Bilingual Education License",
    eld: "K-12 ESL",
    sei: null,
    mainstream: null,
  },
  MS: { bilingual: null, eld: "ESL Endorsement", sei: null, mainstream: null },
  MO: {
    bilingual: null,
    eld: "ELL Educator Certificate",
    sei: null,
    mainstream: null,
  },
  MT: { bilingual: null, eld: "ESL", sei: null, mainstream: null },
  NE: {
    bilingual: "Bilingual Education Endorsement",
    eld: "ESL Endorsement",
    sei: null,
    mainstream: null,
  },
  NV: {
    bilingual: "Bilingual Education Endorsement",
    eld: "English Language Acquisition and Development (ELAD) Endorsement",
    sei: "ELAD (phased in 2020–2021 as SEI-equivalent for all teachers)",
    mainstream: null,
  },
  NH: {
    bilingual: null,
    eld: "English for Speakers of Other Languages (ESOL) (Ed. 612.06)",
    sei: null,
    mainstream: null,
  },
  NJ: {
    bilingual: "Bilingual/Bicultural Education Standard Certificate (1480)",
    eld: "English as a Second Language Standard (1475)",
    sei: null,
    mainstream: null,
  },
  NM: {
    bilingual:
      "Bilingual Education Endorsement (incl. Native American/Indigenous languages)",
    eld: "TESOL Endorsement",
    sei: null,
    mainstream: null,
  },
  NY: {
    bilingual: "Bilingual Extension",
    eld: "ESOL Certification",
    sei: null,
    mainstream: null,
  },
  NC: {
    bilingual: "Bilingual Education License (K-6)",
    eld: "ESL Add-On Licensure",
    sei: null,
    mainstream: null,
  },
  ND: {
    bilingual: "Bilingual Education Endorsement",
    eld: "English Language Learner (ELL) Endorsement",
    sei: null,
    mainstream: null,
  },
  OH: {
    bilingual: "Bilingual Education Endorsement",
    eld: "TESOL Endorsement",
    sei: null,
    mainstream: null,
  },
  OK: { bilingual: null, eld: "ESL Endorsement", sei: null, mainstream: null },
  OR: {
    bilingual:
      "Bilingual Specialization + Dual Language (separate endorsements)",
    eld: "English for Speakers of Other Languages (ESOL) Endorsement",
    sei: null,
    mainstream: null,
  },
  PA: {
    bilingual: null,
    eld: "ESL Program Specialist",
    sei: null,
    mainstream: null,
  },
  RI: {
    bilingual: "Elementary Bilingual and Dual Language Education Certificate",
    eld: "ESL Specialist/Consultant",
    sei: null,
    mainstream: null,
  },
  SC: { bilingual: null, eld: "ESOL Endorsement", sei: null, mainstream: null },
  SD: {
    bilingual: null,
    eld: "English as a New Language Endorsement (Elementary + Secondary)",
    sei: null,
    mainstream: null,
  },
  TN: { bilingual: null, eld: "ESL Endorsement", sei: null, mainstream: null },
  TX: {
    bilingual: "Bilingual Education Supplemental",
    eld: "ESL Supplemental",
    sei: null,
    mainstream: null,
  },
  UT: {
    bilingual: "Dual Language Immersion Endorsement",
    eld: "ESL Endorsement",
    sei: null,
    mainstream: null,
  },
  VT: {
    bilingual: "Bilingual Education Endorsement (#39)",
    eld: "English Learner Endorsement (#40)",
    sei: null,
    mainstream: null,
  },
  VA: {
    bilingual: null,
    eld: "ESL Add-On Endorsement",
    sei: null,
    mainstream: null,
  },
  WA: {
    bilingual: "Bilingual Education Endorsement",
    eld: "ELL Endorsement",
    sei: null,
    mainstream: null,
  },
  WV: { bilingual: null, eld: "ESL Endorsement", sei: null, mainstream: null },
  WI: {
    bilingual: "Bilingual/Bicultural Education (23) Licensure",
    eld: "ESL Licensure",
    sei: null,
    mainstream: null,
  },
  WY: { bilingual: null, eld: "ESL Endorsement", sei: null, mainstream: null },
};
