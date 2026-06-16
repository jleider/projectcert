/**
 * /api/link-reviews — the bot-blocked-URL review queue.
 *
 *   GET                          list all review rows (pending + accepted)
 *   POST {url, decision, note?}  set a URL's decision
 *
 * The weekly link sweep populates pending rows. A reviewer accepts a URL
 * here; the nightly sync exports accepted rows into the checker's
 * whitelist. Accepting trusts the reviewer that the URL is live despite
 * the bot block.
 */

import { jsonResponse } from "../../src/lib/audit-shared";

interface LinkReviewRow {
  url: string;
  status: string | null;
  classification: string;
  citations: string;
  first_seen: string;
  last_seen: string;
  decision: string;
  reviewed_by: string | null;
  reviewed_at: string | null;
  accepted_status: string | null;
  note: string | null;
}

export const onRequestGet: PagesFunction<AuditEnv, string, AuditData> = async ({ env }) => {
  const { results } = await env.DB.prepare(
    `SELECT url, status, classification, citations, first_seen, last_seen,
            decision, reviewed_by, reviewed_at, accepted_status, note
       FROM link_reviews ORDER BY decision, url`,
  ).all<LinkReviewRow>();

  const reviews = (results ?? []).map((r) => ({
    ...r,
    citations: safeParseCitations(r.citations),
  }));
  return jsonResponse({ reviews });
};

function safeParseCitations(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as string[]) : [];
  } catch {
    return [];
  }
}

export const onRequestPost: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env, data }) => {
  const body = (await request.json().catch(() => null)) as
    | { url?: string; decision?: string; note?: string }
    | null;
  const url = typeof body?.url === "string" ? body.url : null;
  const decision = body?.decision;
  const note = typeof body?.note === "string" ? body.note : null;

  if (!url || (decision !== "accepted" && decision !== "pending")) {
    return jsonResponse({ error: "url and decision ('accepted'|'pending') are required." }, 400);
  }

  const now = new Date().toISOString();
  const result =
    decision === "accepted"
      ? await env.DB.prepare(
          // Snapshot the current observed status as the accepted status, so
          // a later sweep can re-flag the URL if its response code changes.
          `UPDATE link_reviews SET decision = 'accepted', reviewed_by = ?2, reviewed_at = ?3, note = ?4, accepted_status = status WHERE url = ?1`,
        )
          .bind(url, data.userEmail, now, note)
          .run()
      : await env.DB.prepare(
          `UPDATE link_reviews SET decision = 'pending', reviewed_by = NULL, reviewed_at = NULL, note = NULL, accepted_status = NULL WHERE url = ?1`,
        )
          .bind(url)
          .run();

  if (result.meta.changes === 0) {
    return jsonResponse({ error: "No review row for that URL." }, 404);
  }
  return jsonResponse({ url, decision, reviewed_by: decision === "accepted" ? data.userEmail : null, reviewed_at: decision === "accepted" ? now : null });
};
