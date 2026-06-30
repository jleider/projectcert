import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

const Source = z.object({
  label: z.string().min(3),
  url: z.url(),
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
  sourceUrl: z.url(),
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
  sourceUrl: z.url().nullable(),
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
// History rows may be future-dated for known phase-ins (e.g. an
// effective date that's already published). Cap at +10y so order-of-
// magnitude typos like 9999-12-31 still fail loud.
const tenYearsOut = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 10);
  return d.toISOString().slice(0, 10);
})();
const HistoryEvent = z.object({
  date: isoDate.refine((d) => d <= tenYearsOut, {
    message: `date is more than 10 years in the future — likely a typo`,
  }),
  title: z.string().min(3),
  description: z.string().min(10),
  sourceUrls: z.array(z.url()).min(1, "Every history event needs at least one sourceUrl"),
});

/**
 * One observation in a state's EL-percentage time series.
 *
 * `date` is typically the snapshot date the publisher reports (fall
 * enrollment, e.g. `YYYY-10-01`). `percent` is the share of
 * public-school students classified as ELs.
 *
 * `source.publisher` records *who* released the figure:
 * - `"nces"` — NCES Digest of Education Statistics Table 204.20 (or
 *   the underlying EDFacts/CCD pipeline as packaged by NCES). All
 *   pre-2022 rows are NCES; this is the canonical reference.
 * - `"sea"` — State Education Agency's own dashboard, annual report
 *   card, or fact sheet. Used for school years NCES has not yet
 *   published (typically fall 2022 onward). Methodology may differ
 *   from NCES — when it does, `note` records the difference.
 *
 * `note` is an optional methodology caveat surfaced in the chart
 * caption and data table. Conventional uses:
 * - Explain a non-trivial methodology difference vs. NCES (different
 *   denominator, different EL definition, different snapshot date).
 * - Record a year-over-year comparison conclusion when the SEA
 *   publishes overlapping years that match NCES's figures, signaling
 *   that the SEA source can be treated as methodologically continuous
 *   with the prior NCES series.
 */
const ElPercentObservation = z.object({
  date: isoDate,
  percent: z.number().min(0).max(100),
  source: z.object({
    label: z.string().min(3),
    url: z.url(),
    publisher: z.enum(["nces", "sea"]),
  }),
  note: z.string().min(10).optional(),
});

export const StateSchema = z
  .object({
    usps: z
      .string()
      .length(2)
      .regex(/^[A-Z]{2}$/),
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
    elPercentHistory: z.array(ElPercentObservation).optional(),
    lastVerified: isoDate,
    verificationStatus: z.enum(["baseline-2019", "in-progress", "verified-2026"]),
  })
  .refine((s) => s.elPercentAsOf <= s.lastVerified, {
    message: "elPercentAsOf must not be later than lastVerified",
    path: ["elPercentAsOf"],
  })
  .refine(
    (s) => {
      const h = s.history;
      if (!h || h.length < 2) return true;
      for (let i = 1; i < h.length; i++) {
        if (h[i]!.date < h[i - 1]!.date) return false;
      }
      return true;
    },
    {
      message: "history[] must be sorted oldest → newest by date",
      path: ["history"],
    },
  )
  .refine(
    (s) => {
      const h = s.elPercentHistory;
      if (!h || h.length < 2) return true;
      for (let i = 1; i < h.length; i++) {
        if (h[i]!.date < h[i - 1]!.date) return false;
      }
      return true;
    },
    {
      message: "elPercentHistory[] must be sorted oldest → newest by date",
      path: ["elPercentHistory"],
    },
  );

export type State = z.output<typeof StateSchema>;

const states = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/states" }),
  schema: StateSchema,
});

export const collections = { states };
