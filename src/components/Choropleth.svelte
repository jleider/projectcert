<script lang="ts">
  import { onMount } from "svelte";
  import { geoPath, geoAlbersUsa } from "d3-geo";
  import { feature } from "topojson-client";
  import type {
    Topology,
    GeometryCollection,
    GeometryObject,
  } from "topojson-specification";
  import type { Feature, FeatureCollection } from "geojson";
  import { BINS, binFor } from "@/data/bins";
  import { FIPS_TO_USPS } from "@/data/states-meta";

  interface StateDatum {
    usps: string;
    name: string;
    elPercent: number;
    bilingual: { offered: boolean; standalone: boolean; addOn: boolean };
    eld: { offered: boolean; standalone: boolean; addOn: boolean };
    seiMandated: boolean;
    standardsMentionsEl: boolean;
    sealOfBiliteracy: { adopted: boolean | null; year: number | null; sourceUrl: string | null };
    elpAssessment: { name: string; consortium: "WIDA" | "ELPA21" | null; sourceUrl: string | null };
  }

  type Layer =
    | "elPercent"
    | "bilingual"
    | "eld"
    | "sei"
    | "standardsMentionsEl"
    | "sealOfBiliteracy"
    | "elpAssessment";

  /**
   * Encoded variable.
   * - elPercent: sequential by % EL (default)
   * - bilingual / eld: categorical (none / add-on only / standalone)
   * - sei: binary (mandated / not)
   * - standardsMentionsEl: binary
   */
  export let layer: Layer = "elPercent";

  /** Dataset, one entry per state + DC. */
  export let states: StateDatum[];

  /** Width is responsive; height is derived from viewBox. */
  let containerWidth = 975;
  const VIEWBOX_W = 975;
  const VIEWBOX_H = 610;

  let topology: Topology | null = null;
  let features: Feature[] = [];
  let stateById = new Map<string, StateDatum>();
  let hovered: StateDatum | null = null;
  let focused: StateDatum | null = null;
  let tooltipX = 0;
  let tooltipY = 0;

  const projection = geoAlbersUsa().scale(1280).translate([VIEWBOX_W / 2, VIEWBOX_H / 2]);
  const pathFn = geoPath(projection);

  onMount(async () => {
    const res = await fetch("/data/us-states-10m.json");
    topology = (await res.json()) as Topology;
    const states = topology.objects.states as GeometryCollection;
    features = (
      feature(topology, states) as unknown as FeatureCollection
    ).features as Feature[];
  });

  $: stateById = new Map(states.map((s) => [s.usps, s]));

  function fillFor(datum: StateDatum | undefined, l: Layer): string {
    if (!datum) return "var(--bin-na)";
    if (l === "elPercent") {
      return `var(${binFor(datum.elPercent).cssVar})`;
    }
    if (l === "bilingual") {
      if (!datum.bilingual.offered) return "var(--bilingual-0)";
      if (datum.bilingual.standalone) return "var(--bilingual-3)";
      return "var(--bilingual-2)"; // add-on only
    }
    if (l === "eld") {
      if (datum.eld.standalone) return "var(--eld-3)";
      if (datum.eld.addOn) return "var(--eld-2)";
      return "var(--eld-0)";
    }
    if (l === "sei") {
      return datum.seiMandated ? "var(--sei-3)" : "var(--sei-0)";
    }
    if (l === "standardsMentionsEl") {
      return datum.standardsMentionsEl ? "var(--standards-3)" : "var(--standards-0)";
    }
    if (l === "sealOfBiliteracy") {
      if (datum.sealOfBiliteracy.adopted === true) return "var(--seal-3)";
      if (datum.sealOfBiliteracy.adopted === false) return "var(--seal-0)";
      return "var(--bin-na)";
    }
    if (l === "elpAssessment") {
      const c = datum.elpAssessment.consortium;
      if (c === "WIDA") return "var(--elp-3)";
      if (c === "ELPA21") return "var(--elp-2)";
      return "var(--elp-0)"; // state-specific
    }
    return "var(--bin-na)";
  }

  function describe(datum: StateDatum | undefined, l: Layer): string {
    if (!datum) return "no data";
    if (l === "elPercent")
      return `${datum.elPercent.toFixed(1)}% classified ELs`;
    if (l === "bilingual")
      return datum.bilingual.offered
        ? datum.bilingual.standalone
          ? "Bilingual standalone certification offered"
          : "Bilingual add-on endorsement only"
        : "No bilingual credential offered";
    if (l === "eld")
      return datum.eld.standalone
        ? "ELD standalone certification offered"
        : datum.eld.addOn
          ? "ELD add-on endorsement only"
          : "No ELD credential offered";
    if (l === "sei")
      return datum.seiMandated
        ? "SEI endorsement mandated for all teachers"
        : "SEI not mandated for all teachers";
    if (l === "standardsMentionsEl")
      return datum.standardsMentionsEl
        ? "Professional teaching standards mention ELs"
        : "Professional teaching standards do not mention ELs";
    if (l === "sealOfBiliteracy") {
      const seal = datum.sealOfBiliteracy;
      if (seal.adopted === true)
        return seal.year
          ? `Seal of Biliteracy adopted in ${seal.year}`
          : "Seal of Biliteracy adopted";
      if (seal.adopted === false) return "Seal of Biliteracy not adopted";
      return "Seal of Biliteracy adoption status unverified";
    }
    if (l === "elpAssessment") {
      const e = datum.elpAssessment;
      if (e.consortium === "WIDA") return `WIDA Consortium · ${e.name}`;
      if (e.consortium === "ELPA21") return `ELPA21 consortium · ${e.name}`;
      return `State-specific assessment · ${e.name}`;
    }
    return "";
  }

  function handleMove(e: MouseEvent, datum: StateDatum | undefined) {
    if (!datum) return;
    hovered = datum;
    const rect = (e.currentTarget as Element).closest("svg")?.getBoundingClientRect();
    if (rect) {
      tooltipX = e.clientX - rect.left;
      tooltipY = e.clientY - rect.top;
    }
  }

  function handleLeave() {
    hovered = null;
  }

  function handleFocus(datum: StateDatum | undefined) {
    if (datum) focused = datum;
  }

  function handleBlur() {
    focused = null;
  }

  function handleClick(datum: StateDatum | undefined) {
    if (datum) {
      window.location.href = `/states/${datum.usps.toLowerCase()}/`;
    }
  }

  function handleKey(e: KeyboardEvent, datum: StateDatum | undefined) {
    if (datum && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick(datum);
    }
  }

  $: tooltip = hovered ?? focused;

  // DC is geographically tiny (~68 sq mi) and renders at ~3px wide in
  // the projection — far below a usable click target. Render it as a
  // labelled square callout offset to the east with a leader line to
  // its actual projected location.
  $: dcDatum = stateById.get("DC");
  $: dcPoint = projection([-77.0369, 38.9072]);
  const DC_CALLOUT_X = 935;
  const DC_CALLOUT_Y = 245;
  const DC_CALLOUT_SIZE = 22;
</script>

<figure class="relative w-full" bind:clientWidth={containerWidth}>
  <svg
    viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
    role="img"
    aria-label={`U.S. choropleth — ${layer === "elPercent" ? "percent classified English Learners by state" : layer}`}
    class="w-full h-auto"
  >
    <defs>
      <!-- Hatched patterns for non-color affordance -->
      <pattern id="pat-0" patternUnits="userSpaceOnUse" width="6" height="6">
        <rect width="6" height="6" fill="var(--bin-0)" />
      </pattern>
      <pattern id="pat-1" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <rect width="6" height="6" fill="var(--bin-1)" />
        <line x1="0" y1="0" x2="0" y2="6" stroke="var(--map-border-dark)" stroke-width="0.5" />
      </pattern>
      <pattern id="pat-2" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
        <rect width="6" height="6" fill="var(--bin-2)" />
        <line x1="0" y1="0" x2="0" y2="6" stroke="white" stroke-width="0.8" />
      </pattern>
      <pattern id="pat-3" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(135)">
        <rect width="6" height="6" fill="var(--bin-3)" />
        <line x1="0" y1="0" x2="6" y2="0" stroke="white" stroke-width="0.8" />
        <line x1="0" y1="0" x2="0" y2="6" stroke="white" stroke-width="0.8" />
      </pattern>
    </defs>

    {#each features as feat}
      {@const fips = String(feat.id).padStart(2, "0")}
      {@const usps = FIPS_TO_USPS[fips]}
      {@const datum = usps ? stateById.get(usps) : undefined}
      {@const d = pathFn(feat as never) ?? ""}
      {#if datum}
        <a
          href={`/states/${datum.usps.toLowerCase()}/`}
          aria-label={`${datum.name}: ${describe(datum, layer)}`}
          on:click|preventDefault={() => handleClick(datum)}
        >
          <path
            {d}
            fill={fillFor(datum, layer)}
            stroke="var(--map-border)"
            stroke-width="1"
            tabindex="0"
            role="button"
            aria-label={`${datum.name}: ${describe(datum, layer)}`}
            on:mousemove={(e) => handleMove(e, datum)}
            on:mouseleave={handleLeave}
            on:focus={() => handleFocus(datum)}
            on:blur={handleBlur}
            on:keydown={(e) => handleKey(e, datum)}
            style="cursor: pointer; outline-offset: 2px;"
          />
        </a>
      {:else}
        <path
          {d}
          fill="var(--bin-na)"
          stroke="var(--map-border)"
          stroke-width="1"
        />
      {/if}
    {/each}

    {#if dcDatum && dcPoint}
      <line
        x1={dcPoint[0]}
        y1={dcPoint[1]}
        x2={DC_CALLOUT_X}
        y2={DC_CALLOUT_Y}
        stroke="var(--map-border-dark)"
        stroke-width="0.75"
        aria-hidden="true"
      />
      <a
        href="/states/dc/"
        aria-label={`District of Columbia: ${describe(dcDatum, layer)}`}
        on:click|preventDefault={() => handleClick(dcDatum)}
      >
        <rect
          x={DC_CALLOUT_X - DC_CALLOUT_SIZE / 2}
          y={DC_CALLOUT_Y - DC_CALLOUT_SIZE / 2}
          width={DC_CALLOUT_SIZE}
          height={DC_CALLOUT_SIZE}
          rx="2"
          fill={fillFor(dcDatum, layer)}
          stroke="var(--map-border)"
          stroke-width="1"
          tabindex="0"
          role="button"
          aria-label={`District of Columbia: ${describe(dcDatum, layer)}`}
          on:mousemove={(e) => handleMove(e, dcDatum)}
          on:mouseleave={handleLeave}
          on:focus={() => handleFocus(dcDatum)}
          on:blur={handleBlur}
          on:keydown={(e) => handleKey(e, dcDatum)}
          style="cursor: pointer; outline-offset: 2px;"
        />
      </a>
      <text
        x={DC_CALLOUT_X}
        y={DC_CALLOUT_Y + DC_CALLOUT_SIZE / 2 + 12}
        text-anchor="middle"
        font-size="10"
        font-weight="600"
        fill="var(--ink)"
        pointer-events="none"
        aria-hidden="true"
      >DC</text>
    {/if}
  </svg>

  {#if tooltip}
    <div
      class="pointer-events-none absolute bg-ink text-surface text-xs rounded px-2 py-1 shadow-lg"
      role="status"
      aria-live="polite"
      style={`left: ${Math.min(tooltipX + 12, containerWidth - 200)}px; top: ${tooltipY + 12}px;`}
    >
      <strong>{tooltip.name}</strong>
      <br />
      {describe(tooltip, layer)}
    </div>
  {/if}
</figure>
