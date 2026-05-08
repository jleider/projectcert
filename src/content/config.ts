import { defineCollection, z } from "astro:content";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

const Source = z.object({
  label: z.string().min(3),
  url: z.string().url(),
  retrievedAt: isoDate,
  retrievedBy: z.enum(["leider-2021", "projectcert-2026"]),
});

const RequirementFlag = z.boolean().nullable();

const CredentialReqs = z.object({
  program: RequirementFlag,
  coursework: RequirementFlag,
  practicum: RequirementFlag,
  test: RequirementFlag,
  languageProficiency: RequirementFlag,
});

const Credential = z.object({
  offered: z.boolean(),
  standalone: z.boolean(),
  addOn: z.boolean(),
  requirements: CredentialReqs.optional(),
  notes: z.string().optional(),
});

const SeiCredential = z.object({
  mandatedForAllTeachers: z.boolean(),
  notes: z.string().optional(),
});

const StandardsMentions = z.object({
  diverse: z.boolean(),
  cultural: z.boolean(),
  linguistic: z.boolean(),
  el: z.boolean(),
});

/**
 * State Seal of Biliteracy adoption.
 *
 * Recognition awarded to graduating high-school students who demonstrate
 * proficiency in English plus one or more other languages. Tangential
 * to teacher credentialing but a useful signal of state-level bilingual
 * policy. `year` is null only when `adopted` is false (no adoption,
 * no year).
 */
const SealOfBiliteracy = z.object({
  adopted: z.boolean(),
  year: z.number().int().min(2011).max(2030).nullable(),
  sourceUrl: z.string().url(),
});

/**
 * Annual English Language Proficiency (ELP) assessment used by the SEA.
 *
 * Three categories of `consortium`:
 * - "WIDA"   — uses ACCESS for ELLs via the WIDA Consortium.
 * - "ELPA21" — uses the ELPA21 assessment via the ELPA21 consortium.
 * - null     — state-developed/state-specific assessment (e.g., AZELLA,
 *              TELPAS, ELPAC).
 *
 * `name` is the SEA's own term for the test (e.g., "ACCESS for ELLs",
 * "AZELLA"). Sources: wida.wisc.edu/about/consortium plus per-state SEA
 * pages — see sources/elp-assessments/ for provenance per row.
 */
const ElpAssessment = z.object({
  name: z.string().min(2),
  consortium: z.enum(["WIDA", "ELPA21"]).nullable(),
  sourceUrl: z.string().url().nullable(),
});

/**
 * Dated event in a state's licensure history.
 *
 * Used to surface the substantive policy moments behind the static
 * snapshot (e.g., AZ's Prop 203 (2000) → HB 2064 (2006) → 2019 ELD-block
 * reduction; NM's Yazzie/Martinez ruling and remediation milestones).
 * `description` is short prose; `sourceUrls` is required (≥1) so every
 * dated event in the catalog points the reader at an authority for the
 * claim. URLs that are load-bearing should also appear in the state's
 * `sources[]` array; one-off references (e.g., a justia link for a
 * federal case) may live only here.
 */
const HistoryEvent = z.object({
  date: isoDate,
  title: z.string().min(3),
  description: z.string().min(10),
  sourceUrls: z.array(z.string().url()).min(1, "Every history event needs at least one sourceUrl"),
});

export const StateSchema = z.object({
  usps: z.string().length(2).regex(/^[A-Z]{2}$/),
  name: z.string().min(2),
  elPercent: z.number().min(0).max(100),
  elPercentAsOf: isoDate,
  credentials: z.object({
    bilingual: Credential,
    eld: Credential,
    sei: SeiCredential,
  }),
  professionalStandardsMentions: StandardsMentions,
  sealOfBiliteracy: SealOfBiliteracy,
  elpAssessment: ElpAssessment,
  sources: z.array(Source).min(1, "Provenance is required"),
  history: z.array(HistoryEvent).optional(),
  lastVerified: isoDate,
  verificationStatus: z.enum([
    "baseline-2019",
    "in-progress",
    "verified-2026",
  ]),
});

export type State = z.infer<typeof StateSchema>;

const states = defineCollection({
  type: "data",
  schema: StateSchema,
});

export const collections = { states };
