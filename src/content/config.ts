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
 * policy. `adopted: null` means we couldn't confirm against current
 * sealofbiliteracy.org / Wikipedia evidence — not "no."
 */
const SealOfBiliteracy = z.object({
  adopted: z.boolean().nullable(),
  year: z.number().int().min(2011).max(2030).nullable(),
});

/**
 * WIDA Consortium membership.
 *
 * Member SEAs use the WIDA ACCESS for ELLs assessment as their annual
 * English Language Proficiency (ELP) test. Source: wida.wisc.edu
 * /about/consortium. Boolean is sufficient — the member list is
 * canonical and doesn't have an "unknown" state.
 */
const WidaMember = z.boolean();

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
  widaMember: WidaMember,
  sources: z.array(Source).min(1, "Provenance is required"),
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
