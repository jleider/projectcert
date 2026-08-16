/**
 * Single source of truth for choropleth colors.
 *
 * Each layer maps a set of stable semantic keys to a `{ color, label }`.
 * Both color paths read from here:
 *   - the legend swatches (`MapExplorer.svelte`, `ChoroplethLegend.astro`)
 *     iterate `LEGENDS[layer]` in display order;
 *   - the map fill (`Choropleth.svelte`'s `fillFor()`) resolves a tile's
 *     color via `legendColor(layer, key)`.
 * Because both sides look colors up by key, a swatch can never diverge
 * from the fill it describes, and reordering the legend never changes
 * the map.
 *
 * Pure module (no `astro:content`) — safe to import from Svelte islands.
 */

import { BINS } from "@/data/bins";
import type { Layer } from "./state-types";

export interface LegendEntry {
  /** Stable semantic key — fills resolve colors by key, independent of
   *  the display order the legend happens to render entries in. */
  key: string;
  color: string;
  label: string;
}

export const LEGENDS: Record<Layer, LegendEntry[]> = {
  elPercent: BINS.map((b) => ({
    key: String(b.index),
    color: `var(${b.cssVar})`,
    label: b.label,
  })),
  bilingual: [
    { key: "none", color: "var(--bilingual-0)", label: "Not offered" },
    { key: "addOn", color: "var(--bilingual-2)", label: "Add-on only" },
    {
      key: "standalone",
      color: "var(--bilingual-3)",
      label: "Standalone offered",
    },
  ],
  eld: [
    { key: "none", color: "var(--eld-0)", label: "Not offered" },
    { key: "addOn", color: "var(--eld-2)", label: "Add-on only" },
    { key: "standalone", color: "var(--eld-3)", label: "Standalone offered" },
  ],
  sei: [
    { key: "off", color: "var(--sei-0)", label: "Not mandated" },
    { key: "on", color: "var(--sei-3)", label: "Mandated for all teachers" },
  ],
  sealOfBiliteracy: [
    { key: "on", color: "var(--seal-3)", label: "Adopted" },
    { key: "off", color: "var(--seal-0)", label: "Not adopted" },
  ],
  elpAssessment: [
    { key: "wida", color: "var(--elp-3)", label: "WIDA · ACCESS for ELLs" },
    { key: "elpa21", color: "var(--elp-2)", label: "ELPA21 consortium" },
    {
      key: "state",
      color: "var(--elp-0)",
      label: "State-specific (AZELLA, ELPAC, TELPAS, etc.)",
    },
  ],
};

/**
 * Reader-facing name of each encoded variable, in display order.
 *
 * The single source for the layer picker, the embed-integration table, and
 * the map's accessible name. Layer *keys* are schema identifiers and must
 * never reach a reader (CLAUDE.md) — interpolating one into an ARIA label
 * announced "U.S. choropleth — sealOfBiliteracy" until this existed.
 */
export const LAYER_LABELS: Record<Layer, string> = {
  elPercent: "% classified ELs",
  bilingual: "Bilingual credential",
  eld: "ELD credential",
  sei: "SEI mandate",
  sealOfBiliteracy: "Seal of Biliteracy",
  elpAssessment: "ELP assessment",
};

/** Neutral fill for states with no datum for the active layer. */
export const NO_DATA_COLOR = "var(--bin-na)";

/**
 * Color token for a layer's semantic category — the single source the
 * map fill and the legend swatch both read. Falls back to the no-data
 * color if a key has no entry (which would be a programming error).
 */
export function legendColor(layer: Layer, key: string): string {
  return LEGENDS[layer].find((e) => e.key === key)?.color ?? NO_DATA_COLOR;
}
