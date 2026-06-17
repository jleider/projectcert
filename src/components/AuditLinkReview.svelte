<script lang="ts">
  import { onMount } from "svelte";

  interface ReviewRow {
    url: string;
    status: string | null;
    classification: string;
    citations: string[];
    first_seen: string;
    last_seen: string;
    decision: "pending" | "accepted";
    reviewed_by: string | null;
    reviewed_at: string | null;
    note: string | null;
  }

  let loading = true;
  let offline = false;
  let reviews: ReviewRow[] = [];
  let busy: Record<string, boolean> = {};

  $: pending = reviews.filter((r) => r.decision === "pending");
  $: accepted = reviews.filter((r) => r.decision === "accepted");

  onMount(async () => {
    try {
      const res = await fetch(`/api/link-reviews`);
      if (!res.ok) throw new Error("api");
      const data = (await res.json()) as { reviews: ReviewRow[] };
      reviews = data.reviews;
    } catch {
      offline = true;
    } finally {
      loading = false;
    }
  });

  async function setDecision(row: ReviewRow, decision: "accepted" | "pending") {
    if (offline || busy[row.url]) return;
    busy = { ...busy, [row.url]: true };
    try {
      const res = await fetch(`/api/link-reviews`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: row.url, decision }),
      });
      if (!res.ok) throw new Error("post");
      const updated = (await res.json()) as {
        reviewed_by: string | null;
        reviewed_at: string | null;
      };
      reviews = reviews.map((r) =>
        r.url === row.url
          ? {
              ...r,
              decision,
              reviewed_by: updated.reviewed_by,
              reviewed_at: updated.reviewed_at,
            }
          : r,
      );
    } catch {
      offline = true;
    } finally {
      busy = { ...busy, [row.url]: false };
    }
  }
</script>

<div class="mt-6 space-y-8">
  {#if loading}
    <p class="text-ink-muted">Loading link review queue…</p>
  {:else}
    {#if offline}
      <p
        class="rounded border border-ink-subtle/30 bg-surface-warn p-3 text-sm text-ink"
      >
        The review service is unavailable, so decisions cannot be saved.
      </p>
    {/if}

    <section>
      <h2 class="text-lg font-semibold text-ink">
        Awaiting review ({pending.length})
      </h2>
      {#if pending.length === 0}
        <p class="mt-2 text-sm text-ink-muted">
          No bot-blocked URLs are awaiting review.
        </p>
      {:else}
        <ul class="mt-3 space-y-3">
          {#each pending as row (row.url)}
            <li class="rounded border border-ink-subtle/20 p-3">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <a
                    class="text-accent hover:underline break-all"
                    href={row.url}
                    target="_blank"
                    rel="noopener noreferrer">{row.url}</a
                  >
                  <div class="mt-1 text-xs text-ink-subtle">
                    Status {row.status ?? row.classification} · first seen {row.first_seen.slice(
                      0,
                      10,
                    )}
                  </div>
                  {#if row.citations.length > 0}
                    <ul class="mt-1 text-xs text-ink-muted">
                      {#each row.citations as c}
                        <li>{c}</li>
                      {/each}
                    </ul>
                  {/if}
                </div>
                <button
                  type="button"
                  class="shrink-0 rounded border border-accent bg-accent px-2.5 py-1 text-xs font-medium text-white hover:bg-accent-hover disabled:opacity-50"
                  disabled={offline || busy[row.url]}
                  on:click={() => setDecision(row, "accepted")}
                >
                  Accept as live
                </button>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </section>

    <section>
      <h2 class="text-lg font-semibold text-ink">
        Accepted ({accepted.length})
      </h2>
      <p class="mt-1 text-sm text-ink-muted">
        Whitelisted on the next nightly sync. The checker treats these as live.
      </p>
      {#if accepted.length === 0}
        <p class="mt-2 text-sm text-ink-muted">No accepted URLs yet.</p>
      {:else}
        <ul class="mt-3 space-y-2">
          {#each accepted as row (row.url)}
            <li class="rounded border border-ink-subtle/20 p-3 text-sm">
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  <a
                    class="text-accent hover:underline break-all"
                    href={row.url}
                    target="_blank"
                    rel="noopener noreferrer">{row.url}</a
                  >
                  {#if row.reviewed_by}
                    <div class="mt-1 text-xs text-ink-subtle">
                      Accepted by {row.reviewed_by}{row.reviewed_at
                        ? ` on ${row.reviewed_at.slice(0, 10)}`
                        : ""}
                    </div>
                  {/if}
                </div>
                <button
                  type="button"
                  class="shrink-0 rounded border border-ink-subtle/40 px-2.5 py-1 text-xs text-ink-muted hover:text-accent disabled:opacity-50"
                  disabled={offline || busy[row.url]}
                  on:click={() => setDecision(row, "pending")}
                >
                  Revert
                </button>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  {/if}
</div>
