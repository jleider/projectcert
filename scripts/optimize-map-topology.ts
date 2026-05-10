/**
 * Re-emit `public/data/us-states-10m.json` at a lower precision /
 * smaller byte size for the national choropleth.
 *
 * Three reductions:
 * 1. Drop territories (PR, VI, GU, AS, MP) — Choropleth.svelte
 *    renders nothing for FIPS codes outside FIPS_TO_USPS, so they
 *    are unused payload.
 * 2. Drop the `objects.nation` collection — only `objects.states` is
 *    consumed by the runtime.
 * 3. Visvalingam simplify at a mild threshold tuned for the
 *    975×610 viewBox (outlines look identical at full size), then
 *    re-quantize to integer deltas so the output stays compact.
 *    `presimplify` dequantizes the topology and tags each point with
 *    an effective-area weight; without the final `quantize` step the
 *    output is full-precision floats and balloons to ~4× the input.
 *
 * Idempotent. The committed input is the upstream us-atlas 10m file;
 * running this script reproduces the same output.
 *
 * Usage: `npx tsx scripts/optimize-map-topology.ts`
 */

import { readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
// @types/topojson-simplify and @types/topojson-client both re-derive
// `Topology` from `topojson-specification` but with subtly different
// generic defaults (`Objects<{}>` vs `Objects<GeoJsonProperties>`),
// so the pipeline below threads through a structural alias to avoid
// false-positive cross-package generic mismatches.
import { presimplify as _presimplify, simplify as _simplify } from "topojson-simplify";
import { quantize as _quantize } from "topojson-client";
const presimplify = _presimplify as (t: Topology) => Topology;
const simplify = _simplify as (t: Topology, minWeight: number) => Topology;
const quantize = _quantize as (t: Topology, n: number) => Topology;
import { STATES } from "../src/data/states-meta";

import type {
  Topology,
  GeometryCollection,
  GeometryObject,
} from "topojson-specification";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PATH = resolve(__dirname, "../public/data/us-states-10m.json");

// Visvalingam threshold (steradians of effective area, presimplify's
// default spherical metric). Tuned for the 975×610 viewBox: state
// outlines remain recognizable at full size and softest where the
// upstream had sub-pixel detail (Outer Banks, Cape Cod, Chesapeake
// shoreline). Pair with QUANT below — coarser quantize alone gives
// jagged edges, simplify alone leaves micro-detail that re-inflates
// after delta encoding.
const MIN_AREA = 1.5e-3;

// Output quantization grid. Upstream us-atlas 10m is 1e5; 5e3 maps
// the bbox onto a 5000×5000 integer grid, plenty of precision at the
// rendered width, and yields the smallest delta-encoded bytes.
const QUANT = 5e3;

const before = statSync(PATH).size;
const raw = JSON.parse(readFileSync(PATH, "utf8")) as Topology;

const validFips = new Set(STATES.map((s) => s.fips));

function trimTerritories(t: Topology): Topology {
  const states = t.objects.states as GeometryCollection;
  const filtered: GeometryObject[] = (states.geometries as GeometryObject[]).filter((g) => {
    const fips = String((g as { id?: number | string }).id ?? "").padStart(2, "0");
    return validFips.has(fips);
  });
  return {
    ...t,
    objects: {
      states: { ...states, geometries: filtered } as GeometryCollection,
    },
  };
}

const trimmed = trimTerritories(raw);
const presimp = presimplify(trimmed);
const simplified = simplify(presimp, MIN_AREA);
const requantized = quantize(simplified, QUANT);

writeFileSync(PATH, JSON.stringify(requantized));

const after = statSync(PATH).size;
const pct = ((1 - after / before) * 100).toFixed(1);
const stateCount = (requantized.objects.states as GeometryCollection).geometries.length;
console.log(
  `us-states-10m.json: ${(before / 1024).toFixed(1)} KB → ${(after / 1024).toFixed(1)} KB (-${pct}%) | ${stateCount} features`,
);
