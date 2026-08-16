<script lang="ts">
  import { onMount } from "svelte";
  import { linkStatusLabel } from "@/lib/audit-shared";

  interface ReviewRow {
    url: string;
    status: string | null;
    classification: string;
    citations: string[];
    first_seen: string;
    last_seen: string;
    decision: Decision;
    reviewed_by: string | null;
    reviewed_at: string | null;
    note: string | null;
  }

  /** Three answers, not two. A reviewer who opens a bot-blocked URL and
   *  finds the page withdrawn needs somewhere to say so — accepting would
   *  assert the opposite and suppress a real breakage in the checker. */
  type Decision = "pending" | "accepted" | "dead";

  let loading = true;
  let offline = false; // set only when the initial load fails (read-only mode)
  let actionError = ""; // a single failed write — surfaced inline, stays interactive
  let reviews: ReviewRow[] = [];
  let busy: Record<string, boolean> = {};

  $: pending = reviews.filter((r) => r.decision === "pending");
  $: accepted = reviews.filter((r) => r.decision === "accepted");
  $: dead = reviews.filter((r) => r.decision === "dead");

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

  async function setDecision(row: ReviewRow, decision: Decision) {
    if (offline || busy[row.url]) return;
    busy = { ...busy, [row.url]: true };
    actionError = "";
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
      // One dropped write is not the service going away: the queue loaded
      // fine and every other row is still actionable. Flipping `offline`
      // here would disable every Accept and Revert button until a reload.
      actionError =
        decision === "accepted"
          ? "Could not accept this URL — check your connection and retry."
          : "Could not revert this URL — check your connection and retry.";
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
      <p class="rounded border border-ink-subtle/30 bg-surface-warn p-3 text-sm text-ink">
        The review service is unavailable, so decisions cannot be saved.
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

    <section>
      <h2 class="text-lg font-semibold text-ink">
        Awaiting review ({pending.length})
      </h2>
      {#if pending.length === 0}
        <p class="mt-2 text-sm text-ink-muted">No bot-blocked URLs are awaiting review.</p>
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
                    {linkStatusLabel(row.status)} · first seen {row.first_seen.slice(0, 10)}
                  </div>
                  {#if row.citations.length > 0}
                    <ul class="mt-1 text-xs text-ink-muted">
                      {#each row.citations as c (c)}
                        <li>{c}</li>
                      {/each}
                    </ul>
                  {/if}
                </div>
                <div class="flex shrink-0 flex-col gap-1.5 sm:flex-row">
                  <button
                    type="button"
                    class="rounded border border-accent bg-accent px-2.5 py-1 text-xs font-medium text-white hover:bg-accent-hover disabled:opacity-50"
                    disabled={offline || busy[row.url]}
                    on:click={() => setDecision(row, "accepted")}
                  >
                    Page opens — accept
                  </button>
                  <button
                    type="button"
                    class="rounded border border-ink-subtle/40 px-2.5 py-1 text-xs font-medium text-ink hover:border-ink-subtle disabled:opacity-50"
                    disabled={offline || busy[row.url]}
                    on:click={() => setDecision(row, "dead")}
                  >
                    Page is gone
                  </button>
                </div>
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
      <p class="mt-1 text-sm text-ink-muted">Whitelisted on the next nightly sync. The checker treats these as live.</p>
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
                      Accepted by {row.reviewed_by}{row.reviewed_at ? ` on ${row.reviewed_at.slice(0, 10)}` : ""}
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

    <section>
      <h2 class="text-lg font-semibold text-ink">
        Reported gone ({dead.length})
      </h2>
      <p class="mt-1 text-sm text-ink-muted">
        These pages were opened and found withdrawn, so the citation needs replacing rather than confirming. They stay
        here, and stay out of the checker's accepted list, until the record cites a current page.
      </p>
      {#if dead.length === 0}
        <p class="mt-2 text-sm text-ink-muted">No pages have been reported gone.</p>
      {:else}
        <ul class="mt-3 space-y-2">
          {#each dead as row (row.url)}
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
                      Reported by {row.reviewed_by}{row.reviewed_at ? ` on ${row.reviewed_at.slice(0, 10)}` : ""}
                    </div>
                  {/if}
                  <!-- Where it is cited, so whoever replaces the citation
                       knows which records to correct. Kept current by the
                       weekly sweep even while the decision is held. -->
                  {#if row.citations.length > 0}
                    <ul class="mt-1 text-xs text-ink-muted">
                      {#each row.citations as c (c)}
                        <li>{c}</li>
                      {/each}
                    </ul>
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
