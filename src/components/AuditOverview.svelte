<script lang="ts">
  import { onMount } from "svelte";

  interface StateRef {
    usps: string;
    name: string;
    auditUrl: string;
  }
  interface OverviewRow {
    usps: string;
    verifiedCount: number;
    brokenCount: number;
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
  let counts: Record<string, OverviewRow> = {};
  let suggestions: SuggestionRow[] = [];
  let brokenLinks: BrokenRow[] = [];

  $: rows = states
    .map((s) => {
      const c = counts[s.usps];
      const verified = c?.verifiedCount ?? 0;
      const brokenCount = c?.brokenCount ?? 0;
      return {
        ...s,
        verified,
        brokenCount,
        pct: totalDatapoints > 0 ? Math.round((verified / totalDatapoints) * 100) : 0,
      };
    })
    .sort((a, b) => a.pct - b.pct || a.name.localeCompare(b.name));

  $: totalPossible = states.length * totalDatapoints;
  $: totalVerified = states.reduce((sum, s) => sum + (counts[s.usps]?.verifiedCount ?? 0), 0);
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
                  {#if r.brokenCount > 0}
                    <span class="text-ink">{r.brokenCount} broken</span>
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
              <div class="text-ink">
                <span class="font-medium">{nameByUsps[sug.usps] ?? sug.usps}</span>
                <span class="text-ink-subtle"> · {sug.datapoint_id}</span>
              </div>
              <div class="mt-1 text-ink-muted">{sug.body}</div>
              <div class="mt-1 text-xs text-ink-subtle">
                {sug.submitted_by} · {sug.submitted_at.slice(0, 10)}
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
              <div class="mt-1 text-xs text-ink-subtle">
                {link.status ?? link.classification}
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  {/if}
</div>
