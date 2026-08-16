/**
 * /api/overview — per-state review state for the audit dashboard.
 *
 *   GET -> { perState: [{ usps, brokenCount, confirmed: { <id>: <hash> } }],
 *            totalDatapoints }
 *
 * `confirmed` carries the stored content hash of every confirmation whose
 * cited source is still reachable. It is deliberately NOT a count: a
 * confirmation also stops counting once the underlying value changes, and
 * only the caller can tell, because deciding that needs the live state
 * JSON — which this Function has no access to. The console page builds the
 * current hashes at build time and does the comparison there, so the
 * dashboard, the per-state checklist (`AuditReviewer.svelte`) and the
 * public ledger (`scripts/build-verification-ledger.ts`) all apply the
 * same rule. Returning a count here instead would silently count drifted
 * rows and overstate progress against both of the others.
 */

import { jsonResponse } from "../../src/lib/audit-shared";
import { DATAPOINT_COUNT } from "../../src/lib/verification-datapoints";

interface VerificationRow {
  usps: string;
  datapoint_id: string;
  content_hash: string;
}

interface BrokenCountRow {
  usps: string;
  n: number;
}

export const onRequestGet: PagesFunction<AuditEnv, string, AuditData> = async ({ env }) => {
  // Datapoints whose cited source is currently unreachable are excluded
  // here; drift exclusion happens client-side (see the note above).
  const verified = await env.DB.prepare(
    `SELECT v.usps AS usps, v.datapoint_id AS datapoint_id, v.content_hash AS content_hash
       FROM verifications v
      WHERE NOT EXISTS (
        SELECT 1 FROM broken_links b
         WHERE b.usps = v.usps AND b.datapoint_id = v.datapoint_id
      )`,
  ).all<VerificationRow>();

  const broken = await env.DB.prepare(
    `SELECT usps, COUNT(DISTINCT datapoint_id) AS n FROM broken_links GROUP BY usps`,
  ).all<BrokenCountRow>();

  const confirmedByUsps = new Map<string, Record<string, string>>();
  for (const r of verified.results ?? []) {
    const entry = confirmedByUsps.get(r.usps) ?? {};
    entry[r.datapoint_id] = r.content_hash;
    confirmedByUsps.set(r.usps, entry);
  }

  const brokenByUsps = new Map<string, number>();
  for (const r of broken.results ?? []) brokenByUsps.set(r.usps, r.n);

  const uspsSet = new Set<string>([...confirmedByUsps.keys(), ...brokenByUsps.keys()]);
  const perState = [...uspsSet].sort().map((usps) => ({
    usps,
    brokenCount: brokenByUsps.get(usps) ?? 0,
    confirmed: confirmedByUsps.get(usps) ?? {},
  }));

  return jsonResponse({ perState, totalDatapoints: DATAPOINT_COUNT });
};
