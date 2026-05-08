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
