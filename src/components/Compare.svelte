<script lang="ts">
  import { stateUrl } from "@/lib/state-types";

  interface CompareState {
    usps: string;
    name: string;
    elPercent: number;
    bilingual: {
      offered: boolean;
      standalone: boolean;
      addOn: boolean;
      requirements: Record<string, boolean | null> | undefined;
    };
    eld: {
      offered: boolean;
      standalone: boolean;
      addOn: boolean;
      requirements: Record<string, boolean | null> | undefined;
    };
    seiMandated: boolean;
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

  $: chosen = selected.map((u) => states.find((s) => s.usps === u)).filter((s): s is CompareState => Boolean(s));

  /** Symbol + accessible description for a tri-state requirement flag. */
  function cellFor(
    value: boolean | null | undefined,
    rowLabel: string,
  ): { symbol: string; tooltip: string; aria: string } {
    if (value === true)
      return {
        symbol: "✓",
        tooltip: `Required — ${rowLabel}`,
        aria: `Required: ${rowLabel}`,
      };
    if (value === false)
      return {
        symbol: "—",
        tooltip: `Not required — ${rowLabel}`,
        aria: `Not required: ${rowLabel}`,
      };
    return {
      symbol: "?",
      tooltip: `Unknown — public sources do not specify whether this is required for ${rowLabel.toLowerCase()}`,
      aria: `Unknown: ${rowLabel}`,
    };
  }

  /** Symbol + accessible description for a plain yes/no boolean. */
  function boolCellFor(value: boolean, rowLabel: string): { symbol: string; tooltip: string; aria: string } {
    if (value)
      return {
        symbol: "✓",
        tooltip: `Yes — ${rowLabel}`,
        aria: `Yes: ${rowLabel}`,
      };
    return {
      symbol: "—",
      tooltip: `No — ${rowLabel}`,
      aria: `No: ${rowLabel}`,
    };
  }

  interface SectionRow {
    label: string;
    explain: string;
    /** Returns the raw value for a state — null/undefined => "?", boolean => ✓/— */
    get: (s: CompareState) => boolean | null | undefined;
    kind: "tri" | "bool";
  }

  interface Section {
    title: string;
    explain: string;
    rows: SectionRow[];
  }

  const SECTIONS: Section[] = [
    {
      title: "Bilingual education credential",
      explain:
        "Authorizes a teacher to deliver content instruction in a language other than English (DBE, DLBE, TBE, dual language, heritage).",
      rows: [
        {
          label: "Credential offered",
          explain: "Does the state offer any pathway to a bilingual education credential?",
          get: (s) => s.bilingual.offered,
          kind: "bool",
        },
        {
          label: "Standalone certification available",
          explain: "Earned as a primary teaching license through its own preparation program.",
          get: (s) => s.bilingual.standalone,
          kind: "bool",
        },
        {
          label: "Add-on endorsement available",
          explain: "Earned as an add-on to an existing primary certification.",
          get: (s) => s.bilingual.addOn,
          kind: "bool",
        },
        {
          label: "Requires completion of an approved program",
          explain: "Completion of a state-approved preparation program is required.",
          get: (s) => s.bilingual.requirements?.program,
          kind: "tri",
        },
        {
          label: "Requires coursework",
          explain: "Specific coursework (independent of an approved program) is required.",
          get: (s) => s.bilingual.requirements?.coursework,
          kind: "tri",
        },
        {
          label: "Requires supervised practicum",
          explain: "Supervised field experience hours are required.",
          get: (s) => s.bilingual.requirements?.practicum,
          kind: "tri",
        },
        {
          label: "Requires content/subject-matter test",
          explain: "Passing a content test (Praxis or state-developed exam) is required.",
          get: (s) => s.bilingual.requirements?.test,
          kind: "tri",
        },
        {
          label: "Requires non-English language proficiency",
          explain: "Demonstrated proficiency in a language other than English is required.",
          get: (s) => s.bilingual.requirements?.languageProficiency,
          kind: "tri",
        },
      ],
    },
    {
      title: "ELD (English Language Development) credential",
      explain:
        "Authorizes a teacher to deliver English-language instruction. Locally also called ESL, ENL, ESOL, TESOL, or CLD depending on the state.",
      rows: [
        {
          label: "Standalone certification available",
          explain: "Earned as a primary teaching license through its own preparation program.",
          get: (s) => s.eld.standalone,
          kind: "bool",
        },
        {
          label: "Add-on endorsement available",
          explain: "Earned as an add-on to an existing primary certification.",
          get: (s) => s.eld.addOn,
          kind: "bool",
        },
        {
          label: "Requires completion of an approved program",
          explain: "Completion of a state-approved preparation program is required.",
          get: (s) => s.eld.requirements?.program,
          kind: "tri",
        },
        {
          label: "Requires coursework",
          explain: "Specific coursework (independent of an approved program) is required.",
          get: (s) => s.eld.requirements?.coursework,
          kind: "tri",
        },
        {
          label: "Requires supervised practicum",
          explain: "Supervised field experience hours are required.",
          get: (s) => s.eld.requirements?.practicum,
          kind: "tri",
        },
        {
          label: "Requires content/subject-matter test",
          explain: "Passing a content test (Praxis or state-developed exam) is required.",
          get: (s) => s.eld.requirements?.test,
          kind: "tri",
        },
      ],
    },
    {
      title: "SEI (Sheltered English Instruction) mandate",
      explain:
        "Whether the state requires all teachers — not just EL specialists — to complete SEI training as a condition of licensure.",
      rows: [
        {
          label: "Mandated for all teachers",
          explain: "State requires SEI training of every classroom teacher, not only those with an EL specialty.",
          get: (s) => s.seiMandated,
          kind: "bool",
        },
      ],
    },
  ];
</script>

<div class="space-y-6">
  <fieldset class="rounded border border-ink-subtle/20 p-3">
    <legend class="text-sm font-semibold text-ink px-2">Pick 2–4 states</legend>
    <div class="flex flex-wrap gap-2 text-sm" role="group">
      {#each states as s (s.usps)}
        {@const isSelected = selected.includes(s.usps)}
        {@const isDisabled = !isSelected && selected.length >= 4}
        <button
          type="button"
          class="px-2.5 py-1 rounded border font-medium transition-colors
                 {isSelected
            ? 'bg-accent text-white border-accent hover:bg-accent-hover hover:border-accent-hover'
            : isDisabled
              ? 'bg-surface text-ink-subtle border-ink-subtle/30 opacity-50 cursor-not-allowed'
              : 'bg-surface text-ink-muted border-ink-subtle/40 hover:border-accent hover:text-accent hover:bg-surface-raised'}"
          aria-pressed={isSelected}
          aria-label={`${s.name}${isSelected ? " (selected)" : ""}`}
          title={s.name}
          on:click={() => toggle(s.usps)}
          disabled={isDisabled}
        >
          {#if isSelected}
            <span aria-hidden="true">✓</span>
          {/if}
          {s.usps}
        </button>
      {/each}
    </div>
    <p class="mt-2 text-xs text-ink-subtle">
      {selected.length} selected (max 4)
    </p>
  </fieldset>

  {#if chosen.length >= 2}
    <p class="text-sm text-ink-subtle">
      Hover any row label or cell for an explanation. ✓ = required / yes, — = not required / no, ? = unknown from public
      sources.
    </p>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm border-collapse">
        <thead class="text-left bg-surface-raised">
          <tr>
            <th scope="col" class="px-3 py-2 font-semibold text-ink min-w-[18rem]">Requirement</th>
            {#each chosen as s (s.usps)}
              <th scope="col" class="px-3 py-2 font-semibold text-ink">
                <a class="text-accent hover:underline" href={stateUrl(s.usps)}>{s.name}</a>
              </th>
            {/each}
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-ink-subtle/20">
            <th
              scope="row"
              class="px-3 py-2 text-left text-ink-muted font-medium cursor-help underline decoration-dotted decoration-ink-subtle/50 underline-offset-4"
              title="Percentage of public-school students in the state classified as English Learners. See the per-state record for the as-of date and source."
            >
              % classified ELs
            </th>
            {#each chosen as s (s.usps)}
              <td class="px-3 py-2" title={`${s.name}: ${s.elPercent.toFixed(1)}% classified ELs`}>
                {s.elPercent.toFixed(1)}%
              </td>
            {/each}
          </tr>

          {#each SECTIONS as section (section.title)}
            <tr class="border-t border-ink-subtle/20">
              <th
                scope="colgroup"
                colspan={chosen.length + 1}
                class="px-3 py-2 text-left text-ink font-semibold bg-surface-raised cursor-help"
                title={section.explain}
              >
                {section.title}
              </th>
            </tr>
            {#each section.rows as row (row.label)}
              <tr class="border-t border-ink-subtle/20 hover:bg-surface-raised/40">
                <th
                  scope="row"
                  class="px-3 py-2 text-left text-ink-muted font-medium cursor-help underline decoration-dotted decoration-ink-subtle/50 underline-offset-4"
                  title={row.explain}
                >
                  {row.label}
                </th>
                {#each chosen as s (s.usps)}
                  {@const v = row.get(s)}
                  {@const cell = row.kind === "tri" ? cellFor(v, row.label) : boolCellFor(Boolean(v), row.label)}
                  <td class="px-3 py-2">
                    <span
                      class="cursor-help"
                      title={`${s.name} — ${cell.tooltip}`}
                      aria-label={`${s.name}, ${cell.aria}`}
                    >
                      {cell.symbol}
                    </span>
                  </td>
                {/each}
              </tr>
            {/each}
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p class="text-ink-muted">Select at least two states to compare.</p>
  {/if}
</div>
