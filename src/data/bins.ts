/**
 * Choropleth bin thresholds for % classified ELs.
 *
 * Mirrors Leider/Colombo/Nerlino (2021) Figure 1 grouping so the visual
 * narrative matches the seed paper.
 */

export type Bin = 0 | 1 | 2 | 3;

export interface BinDef {
  index: Bin;
  label: string;
  cssVar: string;
  /** Hatched pattern id for non-color affordance. */
  patternId: string;
  /** Inclusive lower bound (% EL). */
  min: number;
  /** Exclusive upper bound (% EL); Infinity for the top bin. */
  max: number;
}

export const BINS: ReadonlyArray<BinDef> = [
  {
    index: 0,
    label: "Less than 3.0%",
    cssVar: "--bin-0",
    patternId: "pat-0",
    min: 0,
    max: 3,
  },
  {
    index: 1,
    label: "3.0% to less than 6.0%",
    cssVar: "--bin-1",
    patternId: "pat-1",
    min: 3,
    max: 6,
  },
  {
    index: 2,
    label: "6.0% to less than 10.0%",
    cssVar: "--bin-2",
    patternId: "pat-2",
    min: 6,
    max: 10,
  },
  {
    index: 3,
    label: "10.0% or higher",
    cssVar: "--bin-3",
    patternId: "pat-3",
    min: 10,
    max: Infinity,
  },
];

export function binFor(percent: number): BinDef {
  for (const bin of BINS) {
    if (percent >= bin.min && percent < bin.max) return bin;
  }
  return BINS[BINS.length - 1]!;
}
