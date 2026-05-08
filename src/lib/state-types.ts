/**
 * Pure types/constants for state data — no `astro:content` dependency,
 * safe to import from Svelte islands and embed contexts that don't have
 * the Astro runtime.
 */

/** Credential families catalogued by the atlas. */
export const CREDENTIAL_TYPES = ["bilingual", "eld", "sei"] as const;
export type CredentialType = (typeof CREDENTIAL_TYPES)[number];

/** Map layer keys — every encoded variable on the choropleth. */
export const LAYERS = [
  "elPercent",
  "bilingual",
  "eld",
  "sei",
  "standardsMentionsEl",
  "sealOfBiliteracy",
  "elpAssessment",
] as const;
export type Layer = (typeof LAYERS)[number];

export interface ChoroplethDatum {
  usps: string;
  name: string;
  elPercent: number;
  bilingual: { offered: boolean; standalone: boolean; addOn: boolean };
  eld: { offered: boolean; standalone: boolean; addOn: boolean };
  seiMandated: boolean;
  standardsMentionsEl: boolean;
  sealOfBiliteracy: { adopted: boolean; year: number | null; sourceUrl: string };
  elpAssessment: { name: string; consortium: "WIDA" | "ELPA21" | null; sourceUrl: string | null };
}

/** Canonical per-state URL for internal navigation. */
export function stateUrl(usps: string): string {
  return `/states/${usps.toLowerCase()}/`;
}
