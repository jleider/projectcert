/**
 * /api/verifications — the checkmark store.
 *
 *   GET    ?usps=CA          list verifications for one state
 *   POST   {usps,datapoint_id,content_hash}   upsert a checkmark
 *   DELETE {usps,datapoint_id}                uncheck
 *
 * "Single check suffices": the (usps, datapoint_id) primary key means a
 * POST overwrites who/when/hash, and one row = verified for everyone.
 */

import { jsonResponse, normalizeUsps, isDatapointId } from "../../src/lib/audit-shared";

interface VerificationRow {
  datapoint_id: string;
  verified_by: string;
  verified_at: string;
  content_hash: string;
}

export const onRequestGet: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env }) => {
  const usps = normalizeUsps(new URL(request.url).searchParams.get("usps"));
  if (!usps) return jsonResponse({ error: "Valid ?usps= is required." }, 400);

  const { results } = await env.DB.prepare(
    `SELECT datapoint_id, verified_by, verified_at, content_hash
       FROM verifications WHERE usps = ?1`,
  )
    .bind(usps)
    .all<VerificationRow>();

  return jsonResponse({ usps, verifications: results ?? [] });
};

export const onRequestPost: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env, data }) => {
  const body = (await request.json().catch(() => null)) as
    | { usps?: string; datapoint_id?: string; content_hash?: string }
    | null;
  const usps = normalizeUsps(body?.usps);
  const datapointId = body?.datapoint_id;
  const contentHash = body?.content_hash;

  if (!usps || !isDatapointId(datapointId) || typeof contentHash !== "string") {
    return jsonResponse({ error: "usps, datapoint_id, and content_hash are required." }, 400);
  }

  const verifiedAt = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO verifications (usps, datapoint_id, verified_by, verified_at, content_hash)
       VALUES (?1, ?2, ?3, ?4, ?5)
       ON CONFLICT(usps, datapoint_id) DO UPDATE SET
         verified_by = excluded.verified_by,
         verified_at = excluded.verified_at,
         content_hash = excluded.content_hash`,
  )
    .bind(usps, datapointId, data.userEmail, verifiedAt, contentHash)
    .run();

  return jsonResponse({
    usps,
    datapoint_id: datapointId,
    verified_by: data.userEmail,
    verified_at: verifiedAt,
    content_hash: contentHash,
  });
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

  await env.DB.prepare(`DELETE FROM verifications WHERE usps = ?1 AND datapoint_id = ?2`)
    .bind(usps, datapointId)
    .run();

  return jsonResponse({ ok: true });
};
