/**
 * /api/broken-links — datapoints whose cited source URL is unreachable,
 * per the weekly external-link sweep. Drives the "needs re-verification"
 * badge on the reviewer page and the overview report.
 *
 *   GET ?usps=CA   broken links for one state
 *   GET            all broken links (overview report)
 */

import { jsonResponse, normalizeUsps } from "../../src/lib/audit-shared";

interface BrokenLinkRow {
  usps: string;
  datapoint_id: string;
  url: string;
  citation: string;
  status: string | null;
  classification: string;
  detected_at: string;
}

export const onRequestGet: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env }) => {
  const usps = normalizeUsps(new URL(request.url).searchParams.get("usps"));

  const query = usps
    ? env.DB.prepare(
        `SELECT usps, datapoint_id, url, citation, status, classification, detected_at
           FROM broken_links WHERE usps = ?1 ORDER BY datapoint_id, url`,
      ).bind(usps)
    : env.DB.prepare(
        `SELECT usps, datapoint_id, url, citation, status, classification, detected_at
           FROM broken_links ORDER BY usps, datapoint_id, url`,
      );

  const { results } = await query.all<BrokenLinkRow>();
  return jsonResponse({ brokenLinks: results ?? [] });
};
