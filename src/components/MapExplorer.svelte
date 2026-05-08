<script lang="ts">
  import Choropleth from "./Choropleth.svelte";

  type Layer = "elPercent" | "bilingual" | "eld" | "sei" | "standardsMentionsEl";

  export let states: Array<{
    usps: string;
    name: string;
    elPercent: number;
    bilingual: { offered: boolean; standalone: boolean; addOn: boolean };
    eld: { offered: boolean; standalone: boolean; addOn: boolean };
    seiMandated: boolean;
    standardsMentionsEl: boolean;
  }>;

  let layer: Layer = "elPercent";

  const LAYERS: { value: Layer; label: string }[] = [
    { value: "elPercent", label: "% classified ELs" },
    { value: "bilingual", label: "Bilingual credential" },
    { value: "eld", label: "ELD credential" },
    { value: "sei", label: "SEI mandate" },
    { value: "standardsMentionsEl", label: "Standards mention ELs" },
  ];
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

<div class="mt-4">
  <Choropleth {states} {layer} />
</div>
