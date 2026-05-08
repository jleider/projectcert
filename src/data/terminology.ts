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
    notes: "Umbrella covering both standalone certifications and add-on endorsements.",
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
  { code: "ESOL", expansion: "English for Speakers of Other Languages", canonical: false },
  { code: "EB", expansion: "Emergent Bilingual", canonical: false },
  { code: "ML", expansion: "Multilingual Learner", canonical: false },
  { code: "LEP", expansion: "Limited English Proficient (older federal term)", canonical: false },
] as const;

/** Per-state local-name disclosures, surfaced on per-state pages. */
export const STATE_LOCAL_NAMES: Record<string, Record<CredentialType, string | null>> = {
  AZ: { sei: "SEI Endorsement", eld: "ESL Endorsement", bilingual: "Bilingual Endorsement", mainstream: null },
  CA: { sei: null, eld: "CLAD / EL Authorization", bilingual: "Bilingual Authorization", mainstream: null },
  CO: { sei: null, eld: "Culturally and Linguistically Diverse (CLD) Education", bilingual: "CLD Bilingual Education Specialist", mainstream: null },
  FL: { sei: null, eld: "ESOL Endorsement", bilingual: null, mainstream: null },
  IL: { sei: null, eld: "English as a New Language (ENL) / ESL", bilingual: "Bilingual Education", mainstream: null },
  MA: { sei: "SEI Endorsement", eld: "ESL Licensure", bilingual: "Bilingual Education Endorsement", mainstream: null },
  NM: { sei: null, eld: "TESOL Endorsement", bilingual: "Bilingual Education Endorsement (incl. Native American/Indigenous languages)", mainstream: null },
  NY: { sei: null, eld: "ESOL Certification", bilingual: "Bilingual Extension", mainstream: null },
  OR: { sei: null, eld: "ESOL Endorsement", bilingual: "Bilingual + Dual Language (separate endorsements)", mainstream: null },
  TX: { sei: null, eld: "ESL Supplemental", bilingual: "Bilingual Education Supplemental", mainstream: null },
};
