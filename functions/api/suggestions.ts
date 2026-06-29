/**
 * /api/suggestions — reviewer-proposed corrections.
 *
 *   GET  ?usps=CA&status=open   suggestions for one state
 *   GET  ?status=open           all open suggestions (overview report)
 *   POST {usps,datapoint_id,body}   file a suggestion
 *
 * Suggestions are append-only and NEVER auto-applied to the catalog —
 * a maintainer reviews them and edits the state JSON through the normal
 * curated workflow.
 */

import { jsonResponse, normalizeUsps, isDatapointId } from "../../src/lib/audit-shared";

interface SuggestionRow {
  id: number;
  usps: string;
  datapoint_id: string;
  body: string;
  submitted_by: string;
  submitted_at: string;
  status: string;
}

const MAX_BODY = 4000;

export const onRequestGet: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env }) => {
  const params = new URL(request.url).searchParams;
  const usps = normalizeUsps(params.get("usps"));
  const statusRaw = params.get("status");
  const status = statusRaw === "open" || statusRaw === "resolved" ? statusRaw : null;

  const clauses: string[] = [];
  const binds: string[] = [];
  if (usps) {
    clauses.push(`usps = ?${binds.length + 1}`);
    binds.push(usps);
  }
  if (status) {
    clauses.push(`status = ?${binds.length + 1}`);
    binds.push(status);
  }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

  const { results } = await env.DB.prepare(
    `SELECT id, usps, datapoint_id, body, submitted_by, submitted_at, status
       FROM suggestions ${where} ORDER BY submitted_at DESC`,
  )
    .bind(...binds)
    .all<SuggestionRow>();

  return jsonResponse({ suggestions: results ?? [] });
};

export const onRequestPost: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env, data }) => {
  const json = (await request.json().catch(() => null)) as {
    usps?: string;
    datapoint_id?: string;
    body?: string;
  } | null;
  const usps = normalizeUsps(json?.usps);
  const datapointId = json?.datapoint_id;
  const text = typeof json?.body === "string" ? json.body.trim() : "";

  if (!usps || !isDatapointId(datapointId) || text.length === 0) {
    return jsonResponse({ error: "usps, datapoint_id, and a non-empty body are required." }, 400);
  }
  if (text.length > MAX_BODY) {
    return jsonResponse({ error: `Suggestion exceeds ${MAX_BODY} characters.` }, 400);
  }

  const submittedAt = new Date().toISOString();
  const { meta } = await env.DB.prepare(
    `INSERT INTO suggestions (usps, datapoint_id, body, submitted_by, submitted_at, status)
       VALUES (?1, ?2, ?3, ?4, ?5, 'open')`,
  )
    .bind(usps, datapointId, text, data.userEmail, submittedAt)
    .run();

  return jsonResponse({
    id: meta.last_row_id,
    usps,
    datapoint_id: datapointId,
    body: text,
    submitted_by: data.userEmail,
    submitted_at: submittedAt,
    status: "open",
  });
};
