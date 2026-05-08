<script lang="ts">
  import Choropleth from "./Choropleth.svelte";
  import { BINS } from "@/data/bins";
  import { SITE_URL } from "@/config/site";
  import { LAYERS as LAYER_KEYS, type Layer, type ChoroplethDatum } from "@/lib/state-types";

  export let states: ChoroplethDatum[];
  /** Optional initial layer override. Used by /embed/map/?layer=...
   * which is server-rendered with the query already resolved. The
   * canonical /map/ page is statically built, so it can't read the
   * query at server-render time and instead relies on the
   * client-side URL read below. */
  export let initialLayer: Layer = "elPercent";
  /** Render an embed-mode attribution footer whose "Open full atlas"
   * link updates reactively as the user switches layers. */
  export let embedFooter: boolean = false;

  // On client hydration, prefer the actual URL's `?layer=` over the
  // SSR/prop default. The static build bakes initialLayer="elPercent"
  // into the HTML regardless of which query the visitor landed with;
  // reading window.location.search here corrects that.
  function resolveInitialLayer(): Layer {
    if (typeof window === "undefined") return initialLayer;
    const fromUrl = new URLSearchParams(window.location.search).get("layer");
    if (fromUrl && (LAYER_KEYS as readonly string[]).includes(fromUrl)) {
      return fromUrl as Layer;
    }
    return initialLayer;
  }

  let layer: Layer = resolveInitialLayer();
  $: backUrl = `${SITE_URL}/map/?layer=${layer}`;

  // Broadcast layer changes so non-Svelte parts of the page (e.g. the
  // /map/ data table) can react. Skips during SSR.
  $: if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("projectcert:layer-change", { detail: { layer } }));
  }

  // Sync the encoded layer to the page URL so refreshes, deep-links,
  // and back-button navigation preserve the chosen variable. Embed
  // mode skips this — its URL is the iframe src and shouldn't be
  // mutated by user interaction inside the iframe.
  $: if (typeof window !== "undefined" && !embedFooter) {
    const url = new URL(window.location.href);
    if (url.searchParams.get("layer") !== layer) {
      url.searchParams.set("layer", layer);
      window.history.replaceState({}, "", url);
    }
  }

  const LAYERS: { value: Layer; label: string }[] = [
    { value: "elPercent", label: "% classified ELs" },
    { value: "bilingual", label: "Bilingual credential" },
    { value: "eld", label: "ELD credential" },
    { value: "sei", label: "SEI mandate" },
    { value: "standardsMentionsEl", label: "Standards mention ELs" },
    { value: "sealOfBiliteracy", label: "Seal of Biliteracy" },
    { value: "elpAssessment", label: "ELP assessment" },
  ];

  type LegendEntry = { color: string; label: string };

  const LEGENDS: Record<Layer, LegendEntry[]> = {
    elPercent: BINS.map((b) => ({ color: `var(${b.cssVar})`, label: b.label })),
    bilingual: [
      { color: "var(--bilingual-0)", label: "Not offered" },
      { color: "var(--bilingual-2)", label: "Add-on only" },
      { color: "var(--bilingual-3)", label: "Standalone offered" },
    ],
    eld: [
      { color: "var(--eld-0)", label: "Not offered" },
      { color: "var(--eld-2)", label: "Add-on only" },
      { color: "var(--eld-3)", label: "Standalone offered" },
    ],
    sei: [
      { color: "var(--sei-0)", label: "Not mandated" },
      { color: "var(--sei-3)", label: "Mandated for all teachers" },
    ],
    standardsMentionsEl: [
      { color: "var(--standards-0)", label: "ELs not mentioned" },
      { color: "var(--standards-3)", label: "ELs mentioned" },
    ],
    sealOfBiliteracy: [
      { color: "var(--seal-3)", label: "Adopted" },
      { color: "var(--seal-0)", label: "Not adopted" },
    ],
    elpAssessment: [
      { color: "var(--elp-3)", label: "WIDA · ACCESS for ELLs" },
      { color: "var(--elp-2)", label: "ELPA21 consortium" },
      { color: "var(--elp-0)", label: "State-specific (AZELLA, ELPAC, TELPAS, etc.)" },
    ],
  };

  $: legendEntries = LEGENDS[layer];
</script>

<fieldset class="border border-ink-subtle/20 rounded p-3">
  <legend class="text-sm font-semibold text-ink px-2">Layer</legend>
  <div class="flex flex-wrap gap-x-5 gap-y-2 text-sm">
    {#each LAYERS as opt}
      <label class="flex items-center gap-2">
        <input type="radio" name="layer" value={opt.value} bind:group={layer} />
        {opt.label}
      </label>
    {/each}
  </div>
</fieldset>

<div
  class="mt-3 flex flex-wrap gap-x-4 gap-y-2 items-center text-sm"
  role="group"
  aria-label="Map legend"
>
  {#each legendEntries as entry}
    <div class="flex items-center gap-2">
      <span
        class="inline-block w-5 h-5 border border-ink-subtle/40"
        style={`background: ${entry.color};`}
        aria-hidden="true"
      ></span>
      <span>{entry.label}</span>
    </div>
  {/each}
</div>

<div class="mt-4">
  <Choropleth {states} {layer} embedLinks={embedFooter} />
</div>

{#if embedFooter}
  <p class="mt-3 text-xs text-ink-subtle flex flex-wrap items-center justify-between gap-2">
    <span>
      Source:
      <a href={backUrl} target="_blank" rel="noopener" class="text-accent hover:underline">
        projectcert.org
      </a>
      · Data:
      <a
        href="https://doi.org/10.14507/epaa.29.5279"
        target="_blank"
        rel="noopener"
        class="text-accent hover:underline"
      >Leider, Colombo &amp; Nerlino (2021)</a>
    </span>
    <a href={backUrl} target="_blank" rel="noopener" class="text-accent hover:underline">
      Open full atlas →
    </a>
  </p>
{/if}
