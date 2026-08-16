<script lang="ts">
  import { onMount } from "svelte";
  import { linkStatusLabel } from "@/lib/audit-shared";

  interface StateRef {
    usps: string;
    name: string;
    auditUrl: string;
    /** Current content hash per datapoint id, built from the live JSON. */
    hashes: Record<string, string>;
  }
  interface OverviewRow {
    usps: string;
    brokenCount: number;
    /** Stored hash per confirmed datapoint, source-reachable ones only. */
    confirmed: Record<string, string>;
  }
  interface SuggestionRow {
    id: number;
    usps: string;
    datapoint_id: string;
    body: string;
    submitted_by: string;
    submitted_at: string;
  }
  interface BrokenRow {
    usps: string;
    datapoint_id: string;
    url: string;
    status: string | null;
    classification: string;
  }

  export let states: StateRef[];
  export let totalDatapoints: number;

  let loading = true;
  let offline = false;
  let actionError = "";
  let resolving: Record<number, boolean> = {};
  let counts: Record<string, OverviewRow> = {};
  let suggestions: SuggestionRow[] = [];
  let brokenLinks: BrokenRow[] = [];

  async function resolveSuggestion(id: number) {
    if (resolving[id]) return;
    resolving = { ...resolving, [id]: true };
    try {
      const res = await fetch(`/api/suggestions`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status: "resolved" }),
      });
      if (!res.ok) throw new Error("resolve");
      suggestions = suggestions.filter((s) => s.id !== id);
    } catch {
      actionError = "Could not resolve the suggestion — please retry.";
    } finally {
      resolving = { ...resolving, [id]: false };
    }
  }

  /**
   * A confirmation counts only while the value it was made against is
   * unchanged. `counts` is passed in rather than read from the closure so
   * Svelte tracks it as a dependency of the reactive statements below.
   */
  function tally(s: StateRef, byUsps: Record<string, OverviewRow>): { verified: number; stale: number } {
    const confirmed = byUsps[s.usps]?.confirmed ?? {};
    let verified = 0;
    let stale = 0;
    for (const [id, hash] of Object.entries(confirmed)) {
      // A confirmation for an id the descriptor no longer emits is
      // ignored outright, matching build-verification-ledger.ts.
      if (s.hashes[id] === undefined) continue;
      if (s.hashes[id] === hash) verified++;
      else stale++;
    }
    return { verified, stale };
  }

  $: rows = states
    .map((s) => {
      const { verified, stale } = tally(s, counts);
      return {
        ...s,
        verified,
        stale,
        brokenCount: counts[s.usps]?.brokenCount ?? 0,
        pct: totalDatapoints > 0 ? Math.round((verified / totalDatapoints) * 100) : 0,
      };
    })
    .sort((a, b) => a.pct - b.pct || a.name.localeCompare(b.name));

  $: totalPossible = states.length * totalDatapoints;
  $: totalVerified = rows.reduce((sum, r) => sum + r.verified, 0);
  $: overallPct = totalPossible > 0 ? Math.round((totalVerified / totalPossible) * 100) : 0;
  $: unreviewed = rows.filter((r) => r.verified < totalDatapoints);
  $: nameByUsps = Object.fromEntries(states.map((s) => [s.usps, s.name]));

  onMount(async () => {
    try {
      const [oRes, sRes, bRes] = await Promise.all([
        fetch(`/api/overview`),
        fetch(`/api/suggestions?status=open`),
        fetch(`/api/broken-links`),
      ]);
      if (!oRes.ok || !sRes.ok || !bRes.ok) throw new Error("api");
      const o = (await oRes.json()) as { perState: OverviewRow[] };
      const s = (await sRes.json()) as { suggestions: SuggestionRow[] };
      const b = (await bRes.json()) as { brokenLinks: BrokenRow[] };
      counts = Object.fromEntries(o.perState.map((r) => [r.usps, r]));
      suggestions = s.suggestions;
      brokenLinks = b.brokenLinks;
    } catch {
      offline = true;
    } finally {
      loading = false;
    }
  });
</script>

<div class="mt-6 space-y-8">
  {#if loading}
    <p class="text-ink-muted">Loading review progress…</p>
  {:else}
    {#if offline}
      <p class="rounded border border-ink-subtle/30 bg-surface-warn p-3 text-sm text-ink">
        The review service is unavailable. Progress counts cannot be shown.
      </p>
    {/if}

    {#if actionError}
      <div
        class="flex items-start justify-between gap-3 rounded border border-ink-subtle/30 bg-surface-warn p-3 text-sm text-ink"
      >
        <span>{actionError}</span>
        <button
          type="button"
          class="shrink-0 text-ink-subtle hover:text-accent"
          aria-label="Dismiss"
          on:click={() => (actionError = "")}>×</button
        >
      </div>
    {/if}

    <div class="rounded border border-ink-subtle/20 bg-surface-raised p-4">
      <div class="flex items-center justify-between text-sm">
        <span class="font-semibold text-ink">Overall progress</span>
        <span class="text-ink-muted tabular-nums">{totalVerified} / {totalPossible} ({overallPct}%)</span>
      </div>
      <div
        class="mt-2 h-2 rounded bg-surface overflow-hidden"
        role="progressbar"
        aria-valuenow={overallPct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div class="h-full bg-accent" style={`width: ${overallPct}%`}></div>
      </div>
    </div>

    <section>
      <h2 class="text-lg font-semibold text-ink">States by completion</h2>
      <div class="mt-3 overflow-x-auto">
        <table class="min-w-full text-sm border-collapse">
          <thead class="text-left bg-surface-raised">
            <tr>
              <th scope="col" class="px-3 py-2 font-semibold text-ink">State</th>
              <th scope="col" class="px-3 py-2 font-semibold text-ink text-right">Reviewed</th>
              <th scope="col" class="px-3 py-2 font-semibold text-ink text-right">Needs attention</th>
            </tr>
          </thead>
          <tbody>
            {#each rows as r (r.usps)}
              <tr class="border-t border-ink-subtle/20">
                <th scope="row" class="px-3 py-2 text-left font-medium">
                  <a class="text-accent hover:underline" href={r.auditUrl}>{r.name}</a>
                </th>
                <td class="px-3 py-2 text-right tabular-nums text-ink-muted">
                  {r.verified} / {totalDatapoints} ({r.pct}%)
                </td>
                <td class="px-3 py-2 text-right tabular-nums">
                  {#if r.brokenCount > 0 || r.stale > 0}
                    <span class="text-ink">
                      {[
                        r.stale > 0 ? `${r.stale} changed` : null,
                        r.brokenCount > 0 ? `${r.brokenCount} unreachable` : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  {:else}
                    <span class="text-ink-subtle">—</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      {#if unreviewed.length === 0 && !offline}
        <p class="mt-3 text-sm text-accent">Every state is fully reviewed.</p>
      {/if}
    </section>

    <section>
      <h2 class="text-lg font-semibold text-ink">
        Open suggestions ({suggestions.length})
      </h2>
      {#if suggestions.length === 0}
        <p class="mt-2 text-sm text-ink-muted">No open suggestions.</p>
      {:else}
        <ul class="mt-3 space-y-2">
          {#each suggestions as sug (sug.id)}
            <li class="rounded border border-ink-subtle/20 p-3 text-sm">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <div class="text-ink">
                    <span class="font-medium">{nameByUsps[sug.usps] ?? sug.usps}</span>
                    <span class="text-ink-subtle"> · {sug.datapoint_id}</span>
                  </div>
                  <div class="mt-1 text-ink-muted">{sug.body}</div>
                  <div class="mt-1 text-xs text-ink-subtle">
                    {sug.submitted_by} · {sug.submitted_at.replace("T", " ").slice(0, 16)} UTC
                  </div>
                </div>
                <button
                  type="button"
                  class="shrink-0 rounded border border-ink-subtle/40 px-2.5 py-1 text-xs text-ink-muted hover:text-accent disabled:opacity-50"
                  disabled={resolving[sug.id]}
                  on:click={() => resolveSuggestion(sug.id)}
                >
                  Resolve
                </button>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </section>

    <section>
      <h2 class="text-lg font-semibold text-ink">
        Datapoints needing re-verification ({brokenLinks.length})
      </h2>
      <p class="mt-1 text-sm text-ink-muted">
        Cited sources the weekly link sweep found unreachable. The dependent confirmation no longer counts until the
        source recovers or a reviewer re-verifies.
      </p>
      {#if brokenLinks.length === 0}
        <p class="mt-2 text-sm text-ink-muted">No unreachable cited sources.</p>
      {:else}
        <ul class="mt-3 space-y-2">
          {#each brokenLinks as link (link.usps + link.datapoint_id + link.url)}
            <li class="rounded border border-ink-subtle/20 p-3 text-sm">
              <div class="text-ink">
                <span class="font-medium">{nameByUsps[link.usps] ?? link.usps}</span>
                <span class="text-ink-subtle"> · {link.datapoint_id}</span>
              </div>
              <div class="mt-1 break-all text-ink-muted">{link.url}</div>
              <div class="mt-1 text-xs text-ink-subtle">{linkStatusLabel(link.status)}</div>
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  {/if}
</div>
