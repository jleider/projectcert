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
  }

  type Layer =
    | "elPercent"
    | "bilingual"
    | "eld"
    | "sei"
    | "standardsMentionsEl";

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

  function fillFor(datum: StateDatum | undefined): string {
    if (!datum) return "var(--bin-na)";
    if (layer === "elPercent") {
      return `var(${binFor(datum.elPercent).cssVar})`;
    }
    if (layer === "bilingual") {
      if (!datum.bilingual.offered) return "var(--bin-0)";
      if (datum.bilingual.standalone) return "var(--bin-3)";
      return "var(--bin-2)"; // add-on only
    }
    if (layer === "eld") {
      if (datum.eld.standalone) return "var(--bin-3)";
      if (datum.eld.addOn) return "var(--bin-2)";
      return "var(--bin-0)";
    }
    if (layer === "sei") {
      return datum.seiMandated ? "var(--bin-3)" : "var(--bin-0)";
    }
    if (layer === "standardsMentionsEl") {
      return datum.standardsMentionsEl ? "var(--bin-3)" : "var(--bin-0)";
    }
    return "var(--bin-na)";
  }

  function patternFor(datum: StateDatum | undefined): string | null {
    if (!datum) return null;
    if (layer === "elPercent") return binFor(datum.elPercent).patternId;
    return null;
  }

  function describe(datum: StateDatum | undefined): string {
    if (!datum) return "no data";
    if (layer === "elPercent")
      return `${datum.elPercent.toFixed(1)}% classified ELs`;
    if (layer === "bilingual")
      return datum.bilingual.offered
        ? datum.bilingual.standalone
          ? "Bilingual standalone certification offered"
          : "Bilingual add-on endorsement only"
        : "No bilingual credential offered";
    if (layer === "eld")
      return datum.eld.standalone
        ? "ELD standalone certification offered"
        : datum.eld.addOn
          ? "ELD add-on endorsement only"
          : "No ELD credential offered";
    if (layer === "sei")
      return datum.seiMandated
        ? "SEI endorsement mandated for all teachers"
        : "SEI not mandated for all teachers";
    if (layer === "standardsMentionsEl")
      return datum.standardsMentionsEl
        ? "Professional teaching standards mention ELs"
        : "Professional teaching standards do not mention ELs";
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
          aria-label={`${datum.name}: ${describe(datum)}`}
          on:click|preventDefault={() => handleClick(datum)}
        >
          <path
            {d}
            fill={fillFor(datum)}
            stroke="var(--map-border)"
            stroke-width="1"
            tabindex="0"
            role="button"
            aria-label={`${datum.name}: ${describe(datum)}`}
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
      {describe(tooltip)}
    </div>
  {/if}
</figure>
