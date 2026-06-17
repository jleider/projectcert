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
  "sealOfBiliteracy",
  "elpAssessment",
] as const;
export type Layer = (typeof LAYERS)[number];

export interface ChoroplethDatum {
  usps: string;
  name: string;
  elPercent: number;
  /** Snapshot date for `elPercent` (YYYY-MM-DD). Used by the map
   * caption to disclose mixed-vintage values: a fall-2021 figure from
   * NCES Digest Table 204.20 vs. a fall-2023/2024 figure from the
   * state's own education agency, where available. */
  elPercentAsOf: string;
  bilingual: { offered: boolean; standalone: boolean; addOn: boolean };
  eld: { offered: boolean; standalone: boolean; addOn: boolean };
  seiMandated: boolean;
  sealOfBiliteracy: {
    adopted: boolean;
    year: number | null;
    sourceUrl: string;
  };
  elpAssessment: {
    name: string;
    consortium: "WIDA" | "ELPA21" | null;
    sourceUrl: string | null;
  };
}

import type { LinkUrl } from "./routes";

/** Canonical per-state URL for internal navigation (root-relative). */
export function stateUrl(usps: string): LinkUrl {
  return `/states/${usps.toLowerCase()}/` as LinkUrl;
}

/** Absolute per-state URL — used in JSON-LD / sitemap contexts. */
export function absoluteStateUrl(siteUrl: string, usps: string): LinkUrl {
  return `${siteUrl}${stateUrl(usps)}` as LinkUrl;
}

/** Per-state EL-percent history sub-page (root-relative). */
export function elPercentHistoryUrl(usps: string): LinkUrl {
  return `${stateUrl(usps)}el-percent-history/` as LinkUrl;
}

/** Absolute EL-percent history sub-page — for JSON-LD / breadcrumbs. */
export function absoluteElPercentHistoryUrl(
  siteUrl: string,
  usps: string,
): LinkUrl {
  return `${siteUrl}${elPercentHistoryUrl(usps)}` as LinkUrl;
}

/** Per-state gated audit page (root-relative). The one sanctioned place
 *  a `/audit/<usps>/` path is built — never hand-concatenate elsewhere. */
export function auditStateUrl(usps: string): LinkUrl {
  return `/audit/${usps.toLowerCase()}/` as LinkUrl;
}
