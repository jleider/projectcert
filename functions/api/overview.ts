/**
 * /api/overview — per-state aggregate counts for the audit dashboard.
 *
 *   GET -> { perState: [{ usps, verifiedCount, brokenCount }], totalDatapoints }
 *
 * One pair of GROUP BY queries; the client divides by `totalDatapoints`.
 */

import { jsonResponse } from "../../src/lib/audit-shared";
import { DATAPOINT_COUNT } from "../../src/lib/verification-datapoints";

interface CountRow {
  usps: string;
  n: number;
}

export const onRequestGet: PagesFunction<AuditEnv, string, AuditData> = async ({ env }) => {
  // Exclude datapoints whose cited source is currently unreachable, so
  // the dashboard count agrees with the per-state page and public ledger.
  // (Content-drift staleness needs the live JSON hashes and is reflected
  // on the per-state page and public badges, not these live counts.)
  const verified = await env.DB.prepare(
    `SELECT v.usps AS usps, COUNT(*) AS n
       FROM verifications v
      WHERE NOT EXISTS (
        SELECT 1 FROM broken_links b
         WHERE b.usps = v.usps AND b.datapoint_id = v.datapoint_id
      )
      GROUP BY v.usps`,
  ).all<CountRow>();

  const broken = await env.DB.prepare(
    `SELECT usps, COUNT(DISTINCT datapoint_id) AS n FROM broken_links GROUP BY usps`,
  ).all<CountRow>();

  const verifiedByUsps = new Map<string, number>();
  for (const r of verified.results ?? []) verifiedByUsps.set(r.usps, r.n);

  const brokenByUsps = new Map<string, number>();
  for (const r of broken.results ?? []) brokenByUsps.set(r.usps, r.n);

  const uspsSet = new Set<string>([...verifiedByUsps.keys(), ...brokenByUsps.keys()]);
  const perState = [...uspsSet].sort().map((usps) => ({
    usps,
    verifiedCount: verifiedByUsps.get(usps) ?? 0,
    brokenCount: brokenByUsps.get(usps) ?? 0,
  }));

  return jsonResponse({ perState, totalDatapoints: DATAPOINT_COUNT });
};
