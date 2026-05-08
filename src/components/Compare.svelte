<script lang="ts">
  interface CompareState {
    usps: string;
    name: string;
    elPercent: number;
    bilingual: { offered: boolean; standalone: boolean; addOn: boolean; requirements: Record<string, boolean | null> | undefined };
    eld: { offered: boolean; standalone: boolean; addOn: boolean; requirements: Record<string, boolean | null> | undefined };
    seiMandated: boolean;
    standards: { diverse: boolean; cultural: boolean; linguistic: boolean; el: boolean };
  }

  export let states: CompareState[];

  let selected: string[] = [];

  function toggle(usps: string) {
    if (selected.includes(usps)) {
      selected = selected.filter((s) => s !== usps);
    } else if (selected.length < 4) {
      selected = [...selected, usps];
    }
  }

  $: chosen = selected
    .map((u) => states.find((s) => s.usps === u))
    .filter((s): s is CompareState => Boolean(s));

  function flag(v: boolean | null | undefined): string {
    if (v === true) return "✓";
    if (v === false) return "—";
    return "?";
  }
</script>

<div class="space-y-6">
  <fieldset class="rounded border border-ink-subtle/20 p-3">
    <legend class="text-sm font-semibold text-ink px-2">Pick 2–4 states</legend>
    <div class="flex flex-wrap gap-2 text-sm" role="group">
      {#each states as s}
        <button
          type="button"
          class="px-2 py-1 rounded border text-ink-muted"
          class:border-accent={selected.includes(s.usps)}
          class:text-accent={selected.includes(s.usps)}
          class:bg-accent={false}
          class:border-ink-subtle={!selected.includes(s.usps)}
          aria-pressed={selected.includes(s.usps)}
          on:click={() => toggle(s.usps)}
          disabled={!selected.includes(s.usps) && selected.length >= 4}
        >
          {s.usps}
        </button>
      {/each}
    </div>
    <p class="mt-2 text-xs text-ink-subtle">{selected.length} selected (max 4)</p>
  </fieldset>

  {#if chosen.length >= 2}
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm">
        <thead class="text-left bg-surface-raised">
          <tr>
            <th class="px-3 py-2 font-semibold text-ink"></th>
            {#each chosen as s}
              <th class="px-3 py-2 font-semibold text-ink">
                <a class="text-accent hover:underline" href={`/states/${s.usps.toLowerCase()}/`}>{s.name}</a>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-ink-subtle/20">
            <th class="px-3 py-2 text-left text-ink-muted font-medium">% classified ELs</th>
            {#each chosen as s}<td class="px-3 py-2">{s.elPercent.toFixed(1)}%</td>{/each}
          </tr>

          <tr class="border-t border-ink-subtle/20"><th colspan={chosen.length + 1} class="px-3 py-2 text-left text-ink font-semibold bg-surface-raised">Bilingual</th></tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Offered</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.bilingual.offered)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Standalone</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.bilingual.standalone)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Add-on</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.bilingual.addOn)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Approved program</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.bilingual.requirements?.program)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Practicum</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.bilingual.requirements?.practicum)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Test</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.bilingual.requirements?.test)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Language proficiency</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.bilingual.requirements?.languageProficiency)}</td>{/each}</tr>

          <tr class="border-t border-ink-subtle/20"><th colspan={chosen.length + 1} class="px-3 py-2 text-left text-ink font-semibold bg-surface-raised">ELD</th></tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Standalone</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.eld.standalone)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Add-on</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.eld.addOn)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Approved program</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.eld.requirements?.program)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Test</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.eld.requirements?.test)}</td>{/each}</tr>

          <tr class="border-t border-ink-subtle/20"><th colspan={chosen.length + 1} class="px-3 py-2 text-left text-ink font-semibold bg-surface-raised">SEI mandate</th></tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">All teachers</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.seiMandated)}</td>{/each}</tr>

          <tr class="border-t border-ink-subtle/20"><th colspan={chosen.length + 1} class="px-3 py-2 text-left text-ink font-semibold bg-surface-raised">Standards mention</th></tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Diverse / all</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.standards.diverse)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Cultural</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.standards.cultural)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">Linguistic</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.standards.linguistic)}</td>{/each}</tr>
          <tr class="border-t border-ink-subtle/20"><th class="px-3 py-2 text-left text-ink-muted font-medium">EL explicit</th>{#each chosen as s}<td class="px-3 py-2">{flag(s.standards.el)}</td>{/each}</tr>
        </tbody>
      </table>
    </div>
  {:else}
    <p class="text-ink-muted">Select at least two states to compare.</p>
  {/if}
</div>
