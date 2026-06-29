/**
 * /api/datapoint-sources — reviewer-confirmed source(s) per datapoint.
 *
 *   GET    ?usps=CA              list confirmed sources for one state
 *   POST   {usps,datapoint_id,url}   set THE confirmed source (replaces any prior)
 *   DELETE {usps,datapoint_id}       clear it
 *
 * The descriptor seeds a heuristic candidate source per datapoint; this is
 * where a human records which one cited source the fact actually came from,
 * overriding the seed. Exactly one source per datapoint — the source of truth.
 */

import { jsonResponse, normalizeUsps, isDatapointId } from "../../src/lib/audit-shared";

interface DatapointSourceRow {
  datapoint_id: string;
  url: string;
  set_by: string;
  set_at: string;
}

export const onRequestGet: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env }) => {
  const usps = normalizeUsps(new URL(request.url).searchParams.get("usps"));
  if (!usps) return jsonResponse({ error: "Valid ?usps= is required." }, 400);

  const { results } = await env.DB.prepare(
    `SELECT datapoint_id, url, set_by, set_at FROM datapoint_sources WHERE usps = ?1 ORDER BY datapoint_id, url`,
  )
    .bind(usps)
    .all<DatapointSourceRow>();

  return jsonResponse({ usps, sources: results ?? [] });
};

export const onRequestPost: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env, data }) => {
  const body = (await request.json().catch(() => null)) as
    | { usps?: string; datapoint_id?: string; url?: string }
    | null;
  const usps = normalizeUsps(body?.usps);
  const datapointId = body?.datapoint_id;
  const url = typeof body?.url === "string" ? body.url.trim() : "";

  if (!usps || !isDatapointId(datapointId) || url.length === 0) {
    return jsonResponse({ error: "usps, datapoint_id, and url are required." }, 400);
  }

  const setAt = new Date().toISOString();
  // One source per datapoint: replace any prior selection.
  await env.DB.prepare(
    `INSERT INTO datapoint_sources (usps, datapoint_id, url, set_by, set_at)
       VALUES (?1, ?2, ?3, ?4, ?5)
       ON CONFLICT(usps, datapoint_id) DO UPDATE SET url = excluded.url, set_by = excluded.set_by, set_at = excluded.set_at`,
  )
    .bind(usps, datapointId, url, data.userEmail, setAt)
    .run();

  return jsonResponse({ usps, datapoint_id: datapointId, url, set_by: data.userEmail, set_at: setAt });
};

export const onRequestDelete: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env }) => {
  const body = (await request.json().catch(() => null)) as
    | { usps?: string; datapoint_id?: string }
    | null;
  const usps = normalizeUsps(body?.usps);
  const datapointId = body?.datapoint_id;

  if (!usps || !isDatapointId(datapointId)) {
    return jsonResponse({ error: "usps and datapoint_id are required." }, 400);
  }

  await env.DB.prepare(`DELETE FROM datapoint_sources WHERE usps = ?1 AND datapoint_id = ?2`)
    .bind(usps, datapointId)
    .run();

  return jsonResponse({ ok: true });
};
