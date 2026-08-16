<script lang="ts">
  import { onMount } from "svelte";
  import {
    confirmedSourceLapsed,
    SECTION_LABELS,
    type Datapoint,
    type DatapointSection,
  } from "@/lib/verification-datapoints";
  import { linkStatusLabel, normalizeSourceUrl } from "@/lib/audit-shared";

  export let usps: string;
  export let stateName: string;
  export let datapoints: Datapoint[];
  export let citedSources: { label: string; url: string }[] = [];

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
  let offline = false; // set only when the initial load fails (read-only mode)
  let actionError = ""; // a single failed write — surfaced inline, stays interactive
  let verifications: Record<string, VerificationRow> = {};
  let broken: Record<string, BrokenRow[]> = {};
  let suggestions: Record<string, SuggestionRow[]> = {};
  let busy: Record<string, boolean> = {};
  let draft: Record<string, string> = {};
  let showSuggest: Record<string, boolean> = {};
  // datapoint_id -> the one confirmed source URL (reviewer attribution).
  let attributions: Record<string, string> = {};
  let showSources: Record<string, boolean> = {};
  // datapoint_id -> reviewer-added source URLs (with fetched titles).
  let added: Record<string, { url: string; title: string }[]> = {};
  let newUrl: Record<string, string> = {};
  // datapoint_id -> inline error shown next to the add-source-URL input.
  let sourceError: Record<string, string> = {};

  // url -> human label, from the state's cited sources, field-specific
  // descriptor sources, and reviewer-added sources, so a selected URL renders
  // with a readable label.
  $: urlLabel = (() => {
    // Local, non-reactive lookup built and returned in one pass — not
    // reactive state, so a plain Map is correct here.
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const m = new Map<string, string>();
    for (const s of citedSources) m.set(s.url, s.label);
    for (const d of datapoints) for (const s of d.sourceUrls) if (!m.has(s.url)) m.set(s.url, s.label);
    for (const list of Object.values(added)) for (const s of list) m.set(s.url, s.title);
    return m;
  })();

  /** Candidate sources to offer for a datapoint: its heuristic matches and any
   *  reviewer-added URLs first, then the rest of the state's cited sources.
   *  `add` is passed in so Svelte tracks `added` as a template dependency. */
  function candidateSources(
    d: Datapoint,
    add: Record<string, { url: string; title: string }[]>,
  ): { label: string; url: string }[] {
    const out: { label: string; url: string }[] = [];
    // Local dedup set, not reactive state — a plain Set is correct.
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const seen = new Set<string>();
    const all = [...d.sourceUrls, ...(add[d.id] ?? []).map((a) => ({ label: a.title, url: a.url })), ...citedSources];
    for (const s of all) {
      if (!seen.has(s.url)) {
        seen.add(s.url);
        out.push(s);
      }
    }
    return out;
  }

  /** The one source shown as "the source to verify": the confirmed
   *  attribution if set, else the heuristic seed. `attr` is passed in (not
   *  read from the closure) so Svelte tracks `attributions` as a dependency
   *  of the template expression and re-renders the shown source when a radio
   *  changes it — a bare `shownSources(d)` would hide that read in a function
   *  and never update. */
  function shownSources(d: Datapoint, attr: Record<string, string>): { label: string; url: string }[] {
    const url = attr[d.id];
    if (url) return [{ url, label: urlLabel.get(url) ?? url }];
    // Single source of truth: show only the top heuristic candidate as the
    // likely source. The full candidate list is in the "Set source" picker.
    return d.sourceUrls.slice(0, 1);
  }

  function isStale(d: Datapoint): boolean {
    const v = verifications[d.id];
    return Boolean(v) && v!.content_hash !== d.contentHash;
  }
  function isBroken(d: Datapoint): boolean {
    return (broken[d.id]?.length ?? 0) > 0;
  }

  /** The reviewer's confirmed source is no longer offered as a candidate —
   *  the URL they picked has been rewritten or dropped from the record, so
   *  their answer to "which source backs this?" names a citation the
   *  catalog no longer makes. Invisible to the content hash, which only
   *  covers the value, not its provenance. `attr` and `add` are passed in
   *  (never read from the closure) so Svelte tracks them as dependencies
   *  of the template expression and the count. */
  function isLapsed(
    d: Datapoint,
    attr: Record<string, string>,
    add: Record<string, { url: string; title: string }[]>,
  ): boolean {
    const candidates = new Set(candidateSources(d, add).map((s) => s.url));
    return confirmedSourceLapsed(attr[d.id], candidates);
  }

  // Inline the predicate (rather than calling isCurrent) so Svelte sees
  // `verifications`, `broken`, `attributions` and `added` as dependencies
  // of this reactive statement — a bare isCurrent() call hides those reads
  // inside a function, so the count would never recompute when a checkbox
  // toggles. `isLapsed` is called with its state passed in for the same
  // reason: the identifiers appear here, so the read is visible.
  $: verifiedCount = datapoints.filter(
    (d) =>
      Boolean(verifications[d.id]) &&
      verifications[d.id]!.content_hash === d.contentHash &&
      (broken[d.id]?.length ?? 0) === 0 &&
      !isLapsed(d, attributions, added),
  ).length;
  $: pct = datapoints.length > 0 ? Math.round((verifiedCount / datapoints.length) * 100) : 0;

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
    return order.map((section) => ({ section, label: SECTION_LABELS[section], items: bySection[section]! }));
  })();

  onMount(async () => {
    try {
      const [vRes, bRes, sRes, dsRes, asRes] = await Promise.all([
        fetch(`/api/verifications?usps=${usps}`),
        fetch(`/api/broken-links?usps=${usps}`),
        fetch(`/api/suggestions?usps=${usps}&status=open`),
        fetch(`/api/datapoint-sources?usps=${usps}`),
        fetch(`/api/added-sources?usps=${usps}`),
      ]);
      if (!vRes.ok || !bRes.ok || !sRes.ok || !dsRes.ok || !asRes.ok) throw new Error("api");

      const v = (await vRes.json()) as { verifications: VerificationRow[] };
      const b = (await bRes.json()) as { brokenLinks: BrokenRow[] };
      const s = (await sRes.json()) as { suggestions: SuggestionRow[] };
      const ds = (await dsRes.json()) as { sources: { datapoint_id: string; url: string }[] };
      const as = (await asRes.json()) as { sources: { datapoint_id: string; url: string; title: string }[] };

      verifications = Object.fromEntries(v.verifications.map((r) => [r.datapoint_id, r]));
      broken = groupBy(b.brokenLinks, (r) => r.datapoint_id);
      suggestions = groupBy(s.suggestions, (r) => r.datapoint_id);
      attributions = Object.fromEntries(ds.sources.map((r) => [r.datapoint_id, r.url]));
      added = groupBy(as.sources, (r) => r.datapoint_id);
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
          body: JSON.stringify({ usps, datapoint_id: d.id, content_hash: d.contentHash }),
        });
        if (!res.ok) throw new Error("post");
        const row = (await res.json()) as VerificationRow;
        verifications = { ...verifications, [d.id]: row };
      }
    } catch {
      actionError = "Could not save your change — check your connection and retry.";
    } finally {
      busy = { ...busy, [d.id]: false };
    }
  }

  /** Select THE source for a datapoint (single source of truth) — replaces
   *  any prior selection and updates the confirmed source shown above. */
  async function setSource(d: Datapoint, url: string) {
    if (offline) return;
    const key = `src:${d.id}`;
    if (busy[key] || attributions[d.id] === url) return;
    busy = { ...busy, [key]: true };
    try {
      const res = await fetch(`/api/datapoint-sources`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ usps, datapoint_id: d.id, url }),
      });
      if (!res.ok) throw new Error("source");
      attributions = { ...attributions, [d.id]: url };
    } catch {
      actionError = "Could not save your change — check your connection and retry.";
    } finally {
      busy = { ...busy, [key]: false };
    }
  }

  async function clearSource(d: Datapoint) {
    if (offline || busy[`src:${d.id}`] || !attributions[d.id]) return;
    const key = `src:${d.id}`;
    busy = { ...busy, [key]: true };
    try {
      const res = await fetch(`/api/datapoint-sources`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ usps, datapoint_id: d.id }),
      });
      if (!res.ok) throw new Error("source");
      const next = { ...attributions };
      delete next[d.id];
      attributions = next;
    } catch {
      actionError = "Could not save your change — check your connection and retry.";
    } finally {
      busy = { ...busy, [key]: false };
    }
  }

  /** Add a reviewer-typed source URL: the server fetches its title, stores it
   *  as a candidate, and it becomes the current (unconfirmed) source. Errors
   *  surface inline next to the input, not in the page-top banner. */
  async function addSourceUrl(d: Datapoint) {
    const key = `src:${d.id}`;
    if (offline || busy[key]) return;
    const url = normalizeSourceUrl(newUrl[d.id] ?? "");
    if (!url) {
      sourceError = { ...sourceError, [d.id]: "Enter a full web address, e.g. https://example.gov/page" };
      return;
    }
    sourceError = { ...sourceError, [d.id]: "" };
    busy = { ...busy, [key]: true };
    try {
      const res = await fetch(`/api/added-sources`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ usps, datapoint_id: d.id, url }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => null)) as { error?: string } | null;
        sourceError = {
          ...sourceError,
          [d.id]: err?.error ?? "Could not add this source URL — please check it and retry.",
        };
        return;
      }
      const row = (await res.json()) as { url: string; title: string };
      added = {
        ...added,
        [d.id]: [...(added[d.id] ?? []).filter((a) => a.url !== row.url), { url: row.url, title: row.title }],
      };
      attributions = { ...attributions, [d.id]: row.url }; // current (unconfirmed) source
      newUrl = { ...newUrl, [d.id]: "" };
    } catch {
      sourceError = { ...sourceError, [d.id]: "Could not reach the review service — please retry." };
    } finally {
      busy = { ...busy, [key]: false };
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
      suggestions = { ...suggestions, [d.id]: [...(suggestions[d.id] ?? []), row] };
      draft = { ...draft, [d.id]: "" };
      showSuggest = { ...showSuggest, [d.id]: false };
    } catch {
      actionError = "Could not save your change — check your connection and retry.";
    } finally {
      busy = { ...busy, [d.id]: false };
    }
  }

  async function resolveSuggestion(d: Datapoint, id: number) {
    if (offline) return;
    try {
      const res = await fetch(`/api/suggestions`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status: "resolved" }),
      });
      if (!res.ok) throw new Error("resolve");
      suggestions = { ...suggestions, [d.id]: (suggestions[d.id] ?? []).filter((s) => s.id !== id) };
    } catch {
      actionError = "Could not resolve the suggestion — please retry.";
    }
  }
</script>

<div class="mt-6 space-y-6">
  {#if loading}
    <p class="text-ink-muted">Loading review state…</p>
  {:else}
    {#if offline}
      <p class="rounded border border-ink-subtle/30 bg-surface-warn p-3 text-sm text-ink">
        The review service is unavailable, so confirmations cannot be saved. The datapoints below are shown read-only.
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
        <span class="font-semibold text-ink">{stateName} review progress</span>
        <span class="text-ink-muted tabular-nums">{verifiedCount} / {datapoints.length} ({pct}%)</span>
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

    {#if citedSources.length > 0}
      <details class="rounded border border-ink-subtle/20 bg-surface-raised p-4" open>
        <summary class="cursor-pointer text-sm font-semibold text-ink">
          Cited sources for {stateName} ({citedSources.length})
        </summary>
        <p class="mt-1 text-xs text-ink-subtle">
          Open these to verify the credential, standards, sheltered-instruction, and population claims below — the
          catalog does not record a separate source for each of those fields.
        </p>
        <ol class="mt-2 list-decimal space-y-1 pl-5 text-sm">
          {#each citedSources as src (src.url)}
            <li>
              <a
                class="text-accent hover:underline break-words"
                href={src.url}
                target="_blank"
                rel="noopener noreferrer">{src.label} ↗</a
              >
            </li>
          {/each}
        </ol>
      </details>
    {/if}

    {#each sections as group (group.label)}
      <section>
        <h2 class="text-lg font-semibold text-ink border-b border-ink-subtle/20 pb-1">{group.label}</h2>
        <ul class="mt-3 space-y-3">
          {#each group.items as d (d.id)}
            {@const checkedNow = Boolean(verifications[d.id])}
            {@const stale = isStale(d)}
            {@const brk = isBroken(d)}
            {@const lapsed = checkedNow && isLapsed(d, attributions, added)}
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
                      Current value: <span class="font-medium text-ink">{d.displayValue}</span>
                    </div>
                  {/if}

                  {#if !d.grouped}
                    <!-- The source is "confirmed" exactly while the datapoint's
                         own checkbox is checked (verifying endorses the shown
                         source); unchecking reverts it to unconfirmed. The radio
                         only controls WHICH source is shown, not this label.
                         A lapsed source is the exception: the checkbox is still
                         checked, but the URL it endorsed has left the record, so
                         calling it "Confirmed" would contradict the warning
                         below and point the reviewer at a citation that is gone. -->
                    {@const isConfirmed = checkedNow && !lapsed}
                    <div class="mt-1 text-xs">
                      {#if shownSources(d, attributions).length > 0}
                        <span class="text-ink-subtle"
                          >{lapsed
                            ? "Source no longer cited:"
                            : isConfirmed
                              ? "Confirmed source:"
                              : "Likely source (unconfirmed):"}</span
                        >
                        <ul class="mt-0.5 list-disc pl-5">
                          {#each shownSources(d, attributions) as src (src.url)}
                            <li>
                              <a
                                class="text-accent hover:underline break-words"
                                href={src.url}
                                target="_blank"
                                rel="noopener noreferrer">{src.label} ↗</a
                              >
                            </li>
                          {/each}
                        </ul>
                      {:else}
                        <span class="text-ink-subtle">No candidate source — choose one below.</span>
                      {/if}
                      {#if !offline}
                        <button
                          type="button"
                          class="mt-1 text-accent hover:underline"
                          on:click={() => (showSources = { ...showSources, [d.id]: !showSources[d.id] })}
                        >
                          {showSources[d.id] ? "Hide sources" : "Set source"}
                        </button>
                        {#if showSources[d.id]}
                          <p class="mt-1 text-ink-subtle">Select the one cited source this fact came from:</p>
                          <ul class="mt-1 space-y-1">
                            {#each candidateSources(d, added) as src (src.url)}
                              <li class="flex items-start gap-2">
                                <input
                                  type="radio"
                                  name={`src-${d.id}`}
                                  class="mt-0.5 shrink-0"
                                  value={src.url}
                                  checked={attributions[d.id] === src.url}
                                  disabled={busy[`src:${d.id}`]}
                                  aria-label={`Confirm source for ${d.label}: ${src.label}`}
                                  on:change={() => setSource(d, src.url)}
                                />
                                <a
                                  class="text-accent hover:underline break-words"
                                  href={src.url}
                                  target="_blank"
                                  rel="noopener noreferrer">{src.label} ↗</a
                                >
                              </li>
                            {/each}
                          </ul>
                          {#if attributions[d.id]}
                            <button
                              type="button"
                              class="mt-1 text-ink-subtle hover:text-accent"
                              disabled={busy[`src:${d.id}`]}
                              on:click={() => clearSource(d)}
                            >
                              Clear selection
                            </button>
                          {/if}
                          <div class="mt-2 flex flex-wrap items-center gap-2">
                            <input
                              type="url"
                              class="min-w-0 flex-1 rounded border border-ink-subtle/30 bg-surface px-2 py-1 text-xs text-ink"
                              placeholder="Add a source URL not listed above…"
                              bind:value={newUrl[d.id]}
                              disabled={busy[`src:${d.id}`]}
                              on:input={() => sourceError[d.id] && (sourceError = { ...sourceError, [d.id]: "" })}
                              on:keydown={(e) => e.key === "Enter" && addSourceUrl(d)}
                            />
                            <button
                              type="button"
                              class="rounded border border-accent bg-accent px-2.5 py-1 text-xs font-medium text-white hover:bg-accent-hover disabled:opacity-50"
                              disabled={busy[`src:${d.id}`] || (newUrl[d.id] ?? "").trim().length === 0}
                              on:click={() => addSourceUrl(d)}
                            >
                              {busy[`src:${d.id}`] ? "Fetching…" : "Add URL"}
                            </button>
                          </div>
                          {#if sourceError[d.id]}
                            <p class="mt-1 text-xs text-ink">⚠ {sourceError[d.id]}</p>
                          {/if}
                        {/if}
                      {/if}
                    </div>
                  {/if}

                  {#if d.grouped && d.rows.length > 0}
                    <table class="mt-2 w-full text-xs border-collapse">
                      <tbody>
                        {#each d.rows as row (row.label)}
                          <tr class="border-t border-ink-subtle/10">
                            <td class="py-1 pr-3 text-ink-subtle align-top whitespace-nowrap">{row.label}</td>
                            <td class="py-1 text-ink-muted break-words">
                              {#if row.url}
                                <a
                                  class="text-accent hover:underline break-words"
                                  href={row.url}
                                  target="_blank"
                                  rel="noopener noreferrer">{row.value || row.url} ↗</a
                                >
                              {:else}
                                {row.value}
                              {/if}
                            </td>
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  {/if}

                  {#if checkedNow && !stale && !brk && !lapsed}
                    <div class="mt-1 text-xs text-accent">
                      Reviewed by {verifications[d.id]!.verified_by} on {verifications[d.id]!.verified_at.slice(0, 10)}
                    </div>
                  {/if}
                  <!-- An item that stops counting must say who confirmed it and
                       why it no longer holds. Without this the earlier review
                       vanishes from the page and the item reads as though it
                       had never been looked at, which invites a reviewer to
                       redo work rather than check the one thing that moved. -->
                  {#if checkedNow && (stale || brk || lapsed)}
                    <div class="mt-1 text-xs text-ink-muted">
                      Confirmed by {verifications[d.id]!.verified_by} on {verifications[d.id]!.verified_at.slice(
                        0,
                        10,
                      )}, and no longer counted for the reason below.
                    </div>
                  {/if}
                  {#if stale}
                    <div class="mt-1 text-xs text-ink">
                      ⚠ The recorded value changed after that confirmation, so the reviewer above confirmed something
                      other than what is shown now. Please check the current value and re-confirm.
                    </div>
                  {/if}
                  {#if lapsed}
                    <div class="mt-1 text-xs text-ink">
                      ⚠ The source confirmed for this item is no longer cited by this record — it was relocated or
                      removed when the citation was corrected. The value itself has not changed and does not need
                      re-checking. Please confirm which of the current sources backs it.
                      <!-- Grouped datapoints do not render the source list above,
                           so name the departed URL here or it appears nowhere. -->
                      {#if d.grouped}
                        <span class="mt-1 block break-all text-ink-muted">{attributions[d.id]}</span>
                      {/if}
                    </div>
                  {/if}
                  {#if brk}
                    <div class="mt-1 text-xs text-ink">
                      ⚠ A cited source is unreachable — re-verify against current sources:
                      <ul class="mt-1 list-disc pl-5 text-ink-muted">
                        {#each broken[d.id] ?? [] as link (link.url)}
                          <li class="break-all">{link.url} ({linkStatusLabel(link.status)})</li>
                        {/each}
                      </ul>
                    </div>
                  {/if}

                  {#if (suggestions[d.id]?.length ?? 0) > 0}
                    <div class="mt-2 rounded bg-surface-raised p-2 text-xs">
                      <div class="font-semibold text-ink">Open suggestions</div>
                      <ul class="mt-1 space-y-1.5">
                        {#each suggestions[d.id] ?? [] as sug (sug.id)}
                          <li class="flex items-start justify-between gap-2">
                            <div class="min-w-0">
                              <div class="text-ink-muted">{sug.body}</div>
                              <div class="text-ink-subtle">
                                {sug.submitted_by} · {sug.submitted_at.replace("T", " ").slice(0, 16)} UTC
                              </div>
                            </div>
                            {#if !offline}
                              <button
                                type="button"
                                class="shrink-0 text-ink-subtle hover:text-accent"
                                on:click={() => resolveSuggestion(d, sug.id)}>Resolve</button
                              >
                            {/if}
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
                            disabled={busy[d.id] || (draft[d.id] ?? "").trim().length === 0}
                            on:click={() => submitSuggestion(d)}
                          >
                            Submit suggestion
                          </button>
                          <button
                            type="button"
                            class="rounded border border-ink-subtle/40 px-2.5 py-1 text-xs text-ink-muted hover:text-accent"
                            on:click={() => (showSuggest = { ...showSuggest, [d.id]: false })}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    {:else}
                      <button
                        type="button"
                        class="mt-2 text-xs text-accent hover:underline"
                        on:click={() => (showSuggest = { ...showSuggest, [d.id]: true })}
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
