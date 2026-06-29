/**
 * /api/added-sources — source URLs a reviewer typed in (not among the
 * state's cited sources), with the page title fetched server-side.
 *
 *   GET  ?usps=CA              list reviewer-added sources for one state
 *   POST {usps,datapoint_id,url}   fetch the URL's title, store it as a
 *                                  candidate, and select it as the current
 *                                  (unconfirmed) source for the datapoint
 *
 * "Run a script to fetch the title" happens here: the Function fetches the
 * URL server-side and parses the title (og:title or <title>).
 */

import {
  jsonResponse,
  normalizeUsps,
  isDatapointId,
  normalizeSourceUrl,
  extractTitle,
} from "../../src/lib/audit-shared";

interface AddedRow {
  datapoint_id: string;
  url: string;
  title: string;
  added_by: string;
  added_at: string;
}

const FETCH_TIMEOUT_MS = 15_000;
const MAX_HTML_BYTES = 300_000;

/** Fetch a URL and return its title, falling back to the hostname when the
 *  page can't be fetched (bot-blocked, timeout) or has no title. */
async function fetchTitle(url: string): Promise<string> {
  const host = new URL(url).hostname;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: "follow",
      signal: ctrl.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
    });
    if (!res.ok) return host;
    const html = (await res.text()).slice(0, MAX_HTML_BYTES);
    return extractTitle(html) ?? host;
  } catch {
    return host;
  } finally {
    clearTimeout(timer);
  }
}

export const onRequestGet: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env }) => {
  const usps = normalizeUsps(new URL(request.url).searchParams.get("usps"));
  if (!usps) return jsonResponse({ error: "Valid ?usps= is required." }, 400);
  const { results } = await env.DB.prepare(
    `SELECT datapoint_id, url, title, added_by, added_at FROM added_sources WHERE usps = ?1 ORDER BY added_at`,
  )
    .bind(usps)
    .all<AddedRow>();
  return jsonResponse({ usps, sources: results ?? [] });
};

export const onRequestPost: PagesFunction<AuditEnv, string, AuditData> = async ({ request, env, data }) => {
  const body = (await request.json().catch(() => null)) as {
    usps?: string;
    datapoint_id?: string;
    url?: string;
  } | null;
  const usps = normalizeUsps(body?.usps);
  const datapointId = body?.datapoint_id;
  const url = normalizeSourceUrl(body?.url);

  if (!usps || !isDatapointId(datapointId)) {
    return jsonResponse({ error: "A valid state and datapoint are required." }, 400);
  }
  if (!url) {
    return jsonResponse(
      { error: "That doesn't look like a valid URL — use a full web address (e.g. https://example.gov/page)." },
      400,
    );
  }

  const title = await fetchTitle(url);
  const now = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO added_sources (usps, datapoint_id, url, title, added_by, added_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)
       ON CONFLICT(usps, datapoint_id, url) DO UPDATE SET title = excluded.title, added_by = excluded.added_by, added_at = excluded.added_at`,
  )
    .bind(usps, datapointId, url, title, data.userEmail, now)
    .run();

  // Select it as the current source for the datapoint (unconfirmed until the
  // reviewer checks the datapoint's verification box).
  await env.DB.prepare(
    `INSERT INTO datapoint_sources (usps, datapoint_id, url, set_by, set_at)
       VALUES (?1, ?2, ?3, ?4, ?5)
       ON CONFLICT(usps, datapoint_id) DO UPDATE SET url = excluded.url, set_by = excluded.set_by, set_at = excluded.set_at`,
  )
    .bind(usps, datapointId, url, data.userEmail, now)
    .run();

  return jsonResponse({ usps, datapoint_id: datapointId, url, title });
};
