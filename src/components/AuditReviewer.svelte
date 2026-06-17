<script lang="ts">
  import { onMount } from "svelte";
  import {
    SECTION_LABELS,
    type Datapoint,
    type DatapointSection,
  } from "@/lib/verification-datapoints";

  export let usps: string;
  export let stateName: string;
  export let datapoints: Datapoint[];

  interface VerificationRow {
    datapoint_id: string;
    verified_by: string;
    verified_at: string;
    content_hash: string;
  }
  interface BrokenRow {
    datapoint_id: string;
    url: string;
    status: string | null;
    classification: string;
  }
  interface SuggestionRow {
    id: number;
    datapoint_id: string;
    body: string;
    submitted_by: string;
    submitted_at: string;
  }

  let loading = true;
  let offline = false;
  let verifications: Record<string, VerificationRow> = {};
  let broken: Record<string, BrokenRow[]> = {};
  let suggestions: Record<string, SuggestionRow[]> = {};
  let busy: Record<string, boolean> = {};
  let draft: Record<string, string> = {};
  let showSuggest: Record<string, boolean> = {};

  function isStale(d: Datapoint): boolean {
    const v = verifications[d.id];
    return Boolean(v) && v!.content_hash !== d.contentHash;
  }
  function isBroken(d: Datapoint): boolean {
    return (broken[d.id]?.length ?? 0) > 0;
  }
  function isCurrent(d: Datapoint): boolean {
    return Boolean(verifications[d.id]) && !isStale(d) && !isBroken(d);
  }

  $: verifiedCount = datapoints.filter(isCurrent).length;
  $: pct =
    datapoints.length > 0
      ? Math.round((verifiedCount / datapoints.length) * 100)
      : 0;

  // Group datapoints by section, preserving descriptor order.
  $: sections = (() => {
    const order: DatapointSection[] = [];
    const bySection: Record<string, Datapoint[]> = {};
    for (const d of datapoints) {
      if (!bySection[d.section]) {
        bySection[d.section] = [];
        order.push(d.section);
      }
      bySection[d.section]!.push(d);
    }
    return order.map((section) => ({
      section,
      label: SECTION_LABELS[section],
      items: bySection[section]!,
    }));
  })();

  onMount(async () => {
    try {
      const [vRes, bRes, sRes] = await Promise.all([
        fetch(`/api/verifications?usps=${usps}`),
        fetch(`/api/broken-links?usps=${usps}`),
        fetch(`/api/suggestions?usps=${usps}&status=open`),
      ]);
      if (!vRes.ok || !bRes.ok || !sRes.ok) throw new Error("api");

      const v = (await vRes.json()) as { verifications: VerificationRow[] };
      const b = (await bRes.json()) as { brokenLinks: BrokenRow[] };
      const s = (await sRes.json()) as { suggestions: SuggestionRow[] };

      verifications = Object.fromEntries(
        v.verifications.map((r) => [r.datapoint_id, r]),
      );
      broken = groupBy(b.brokenLinks, (r) => r.datapoint_id);
      suggestions = groupBy(s.suggestions, (r) => r.datapoint_id);
    } catch {
      offline = true;
    } finally {
      loading = false;
    }
  });

  function groupBy<T>(rows: T[], key: (r: T) => string): Record<string, T[]> {
    const out: Record<string, T[]> = {};
    for (const r of rows) {
      (out[key(r)] ??= []).push(r);
    }
    return out;
  }

  async function toggle(d: Datapoint) {
    if (offline || busy[d.id]) return;
    busy = { ...busy, [d.id]: true };
    const wasChecked = Boolean(verifications[d.id]);
    try {
      if (wasChecked) {
        const res = await fetch(`/api/verifications`, {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ usps, datapoint_id: d.id }),
        });
        if (!res.ok) throw new Error("delete");
        const next = { ...verifications };
        delete next[d.id];
        verifications = next;
      } else {
        const res = await fetch(`/api/verifications`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            usps,
            datapoint_id: d.id,
            content_hash: d.contentHash,
          }),
        });
        if (!res.ok) throw new Error("post");
        const row = (await res.json()) as VerificationRow;
        verifications = { ...verifications, [d.id]: row };
      }
    } catch {
      offline = true;
    } finally {
      busy = { ...busy, [d.id]: false };
    }
  }

  async function submitSuggestion(d: Datapoint) {
    const text = (draft[d.id] ?? "").trim();
    if (offline || busy[d.id] || text.length === 0) return;
    busy = { ...busy, [d.id]: true };
    try {
      const res = await fetch(`/api/suggestions`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ usps, datapoint_id: d.id, body: text }),
      });
      if (!res.ok) throw new Error("suggest");
      const row = (await res.json()) as SuggestionRow;
      suggestions = {
        ...suggestions,
        [d.id]: [row, ...(suggestions[d.id] ?? [])],
      };
      draft = { ...draft, [d.id]: "" };
      showSuggest = { ...showSuggest, [d.id]: false };
    } catch {
      offline = true;
    } finally {
      busy = { ...busy, [d.id]: false };
    }
  }
</script>

<div class="mt-6 space-y-6">
  {#if loading}
    <p class="text-ink-muted">Loading review state…</p>
  {:else}
    {#if offline}
      <p
        class="rounded border border-ink-subtle/30 bg-surface-warn p-3 text-sm text-ink"
      >
        The review service is unavailable, so confirmations cannot be saved. The
        datapoints below are shown read-only.
      </p>
    {/if}

    <div class="rounded border border-ink-subtle/20 bg-surface-raised p-4">
      <div class="flex items-center justify-between text-sm">
        <span class="font-semibold text-ink">{stateName} review progress</span>
        <span class="text-ink-muted tabular-nums"
          >{verifiedCount} / {datapoints.length} ({pct}%)</span
        >
      </div>
      <div
        class="mt-2 h-2 rounded bg-surface overflow-hidden"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div class="h-full bg-accent" style={`width: ${pct}%`}></div>
      </div>
    </div>

    {#each sections as group}
      <section>
        <h2
          class="text-lg font-semibold text-ink border-b border-ink-subtle/20 pb-1"
        >
          {group.label}
        </h2>
        <ul class="mt-3 space-y-3">
          {#each group.items as d (d.id)}
            {@const checkedNow = Boolean(verifications[d.id])}
            {@const stale = isStale(d)}
            {@const brk = isBroken(d)}
            <li class="rounded border border-ink-subtle/20 p-3">
              <div class="flex items-start gap-3">
                <input
                  type="checkbox"
                  class="mt-1 h-4 w-4 shrink-0"
                  checked={checkedNow}
                  disabled={offline || busy[d.id]}
                  aria-label={`Confirm: ${d.label}`}
                  on:change={() => toggle(d)}
                />
                <div class="min-w-0 flex-1">
                  <div class="text-ink">{d.label}</div>
                  {#if d.displayValue !== null}
                    <div class="mt-0.5 text-sm text-ink-muted">
                      Current value: <span class="font-medium text-ink"
                        >{d.displayValue}</span
                      >
                    </div>
                  {/if}

                  {#if d.grouped && d.rows.length > 0}
                    <table class="mt-2 w-full text-xs border-collapse">
                      <tbody>
                        {#each d.rows as row}
                          <tr class="border-t border-ink-subtle/10">
                            <td
                              class="py-1 pr-3 text-ink-subtle align-top whitespace-nowrap"
                              >{row.label}</td
                            >
                            <td class="py-1 text-ink-muted break-words"
                              >{row.value}</td
                            >
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  {/if}

                  {#if checkedNow && !stale && !brk}
                    <div class="mt-1 text-xs text-accent">
                      Reviewed by {verifications[d.id]!.verified_by} on {verifications[
                        d.id
                      ]!.verified_at.slice(0, 10)}
                    </div>
                  {/if}
                  {#if stale}
                    <div class="mt-1 text-xs text-ink">
                      ⚠ The value changed since this was last confirmed — please
                      re-review.
                    </div>
                  {/if}
                  {#if brk}
                    <div class="mt-1 text-xs text-ink">
                      ⚠ A cited source is unreachable — re-verify against
                      current sources:
                      <ul class="mt-1 list-disc pl-5 text-ink-muted">
                        {#each broken[d.id] ?? [] as link}
                          <li class="break-all">
                            {link.url} ({link.status ?? link.classification})
                          </li>
                        {/each}
                      </ul>
                    </div>
                  {/if}

                  {#if (suggestions[d.id]?.length ?? 0) > 0}
                    <div class="mt-2 rounded bg-surface-raised p-2 text-xs">
                      <div class="font-semibold text-ink">Open suggestions</div>
                      <ul class="mt-1 space-y-1">
                        {#each suggestions[d.id] ?? [] as sug}
                          <li class="text-ink-muted">
                            <span class="text-ink-subtle"
                              >{sug.submitted_by}:</span
                            >
                            {sug.body}
                          </li>
                        {/each}
                      </ul>
                    </div>
                  {/if}

                  {#if !offline}
                    {#if showSuggest[d.id]}
                      <div class="mt-2">
                        <textarea
                          class="w-full rounded border border-ink-subtle/30 bg-surface p-2 text-sm text-ink"
                          rows="2"
                          placeholder="Describe the correction and cite a source…"
                          bind:value={draft[d.id]}></textarea>
                        <div class="mt-1 flex gap-2">
                          <button
                            type="button"
                            class="rounded border border-accent bg-accent px-2.5 py-1 text-xs font-medium text-white hover:bg-accent-hover disabled:opacity-50"
                            disabled={busy[d.id] ||
                              (draft[d.id] ?? "").trim().length === 0}
                            on:click={() => submitSuggestion(d)}
                          >
                            Submit suggestion
                          </button>
                          <button
                            type="button"
                            class="rounded border border-ink-subtle/40 px-2.5 py-1 text-xs text-ink-muted hover:text-accent"
                            on:click={() =>
                              (showSuggest = { ...showSuggest, [d.id]: false })}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    {:else}
                      <button
                        type="button"
                        class="mt-2 text-xs text-accent hover:underline"
                        on:click={() =>
                          (showSuggest = { ...showSuggest, [d.id]: true })}
                      >
                        Suggest a change
                      </button>
                    {/if}
                  {/if}
                </div>
              </div>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  {/if}
</div>
