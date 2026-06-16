/**
 * Advisory check for external links cited in state JSON records.
 *
 * Walks every `src/content/states/*.json` and collects URLs from:
 *   - `sources[].url`
 *   - `history[].sourceUrls[]`
 *   - `sealOfBiliteracy.sourceUrl`
 *   - `elpAssessment.sourceUrl`
 *   - `elPercentHistory[].source.url`
 *
 * Each URL is fetched (HEAD, with a GET fallback for hosts that reject
 * HEAD), redirects are followed, and the result is classified. The
 * script prints a markdown report and exits 0 in advisory mode (the
 * default), or non-zero with `--strict`. Per CLAUDE.md, SEA pages drift
 * on their own schedule, so this is intentionally NOT wired into the
 * default `npm run validate` / build gate.
 *
 * Bot-blocked URLs (a host that rejects automated requests with
 * 401/403/405/429) are not genuine breakage, but they are also not
 * confirmed live — so they surface as `needs-review` for a human to
 * check. Acceptance is reviewer-managed through the /audit/links console
 * (see the `audit-console` skill): an accepted URL lands in
 * `src/data/link-whitelist.json`, and a whitelisted URL is reclassified
 * as `accepted` (any non-2xx result is trusted as a false positive). A
 * whitelisted URL that returns 2xx simply shows as `ok`. Non-whitelisted
 * hard errors (4xx other than the bot-block set, 5xx, network) remain
 * `broken`.
 *
 * Redirecting URLs are reported separately: the page works, but the
 * record should be updated to the final canonical URL the checker
 * resolves (see the `source-link-audit` skill).
 *
 * Usage:
 *   npm run check:links              # advisory, exits 0 on broken links
 *   npm run check:links -- --strict  # exit non-zero if any link is broken
 *   npm run check:links -- --json    # machine-readable JSON output
 */

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { classify, applyWhitelist, type LinkClassification } from "../src/lib/link-classify";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");
const WHITELIST_PATH = resolve(__dirname, "../src/data/link-whitelist.json");

/** URLs a human has reviewed and accepted as live despite a bot block. */
function loadWhitelist(): Set<string> {
  try {
    const parsed = JSON.parse(readFileSync(WHITELIST_PATH, "utf8")) as Record<string, unknown>;
    return new Set(Object.keys(parsed));
  } catch {
    return new Set();
  }
}
const whitelist = loadWhitelist();

const TIMEOUT_MS = 20_000;
const CONCURRENCY = 8;
const RETRY_COUNT = 1;
// Hosts that reject HEAD; skip straight to GET.
const GET_ONLY_HOSTS = new Set<string>([
  "nces.ed.gov",
  "supreme.justia.com",
  "law.justia.com",
]);

interface CitedUrl {
  url: string;
  citation: string; // "AK / sources[2]" / "CA / history[5].sourceUrls[0]"
}

interface LinkResult {
  url: string;
  citations: string[];
  status: number | null;
  classification: LinkClassification;
  /** Final URL after following redirects (when it differs from `url`). */
  finalUrl?: string;
  redirected?: boolean;
  message?: string;
}

const cited: CitedUrl[] = [];

function pushUrl(url: unknown, citation: string): void {
  if (typeof url !== "string" || url.length === 0) return;
  cited.push({ url, citation });
}

interface StateFile {
  usps: string;
  sources?: Array<{ url?: string }>;
  history?: Array<{ sourceUrls?: string[] }>;
  sealOfBiliteracy?: { sourceUrl?: string };
  elpAssessment?: { sourceUrl?: string | null };
  elPercentHistory?: Array<{ source?: { url?: string } }>;
}

const files = readdirSync(STATES_DIR).filter((f) => f.endsWith(".json"));
for (const file of files) {
  const raw = readFileSync(join(STATES_DIR, file), "utf8");
  const s = JSON.parse(raw) as StateFile;
  const code = s.usps;
  for (const [i, src] of (s.sources ?? []).entries()) {
    pushUrl(src.url, `${code} / sources[${i}]`);
  }
  for (const [i, ev] of (s.history ?? []).entries()) {
    for (const [j, u] of (ev.sourceUrls ?? []).entries()) {
      pushUrl(u, `${code} / history[${i}].sourceUrls[${j}]`);
    }
  }
  pushUrl(s.sealOfBiliteracy?.sourceUrl, `${code} / sealOfBiliteracy.sourceUrl`);
  pushUrl(s.elpAssessment?.sourceUrl, `${code} / elpAssessment.sourceUrl`);
  for (const [i, obs] of (s.elPercentHistory ?? []).entries()) {
    pushUrl(obs.source?.url, `${code} / elPercentHistory[${i}].source.url`);
  }
}

// Deduplicate URLs while keeping every citation.
const byUrl = new Map<string, string[]>();
for (const c of cited) {
  const list = byUrl.get(c.url) ?? [];
  list.push(c.citation);
  byUrl.set(c.url, list);
}

async function fetchOne(
  url: string,
  method: "HEAD" | "GET",
): Promise<{ status: number | null; finalUrl?: string; redirected?: boolean; message?: string }> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: ctrl.signal,
      headers: {
        // Pose as the latest Chrome (May 2026 stable). SEA hosts
        // routinely 403 obvious bot user-agents — this gets through
        // Cloudflare-protected pages that reject the previous string.
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,application/pdf;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    // `res.url` is the final URL after following redirects; `res.redirected`
    // is true when at least one 3xx hop was followed.
    return { status: res.status, finalUrl: res.url, redirected: res.redirected };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { status: null, message };
  } finally {
    clearTimeout(timer);
  }
}

async function checkWithRetry(
  url: string,
): Promise<{ status: number | null; finalUrl?: string; redirected?: boolean; message?: string }> {
  let host: string;
  try {
    host = new URL(url).host;
  } catch {
    return { status: null, message: "invalid URL" };
  }
  const initialMethod: "HEAD" | "GET" = GET_ONLY_HOSTS.has(host) ? "GET" : "HEAD";

  let last = await fetchOne(url, initialMethod);
  // Some hosts reject HEAD; fall back to GET on 405/501.
  if (initialMethod === "HEAD" && (last.status === 405 || last.status === 501)) {
    last = await fetchOne(url, "GET");
  }
  for (let i = 0; i < RETRY_COUNT && last.status === null; i++) {
    await new Promise((r) => setTimeout(r, 1500));
    last = await fetchOne(url, initialMethod);
  }
  return last;
}

async function runWithConcurrency<T, R>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const i = next++;
      if (i >= items.length) return;
      out[i] = await worker(items[i]!);
    }
  });
  await Promise.all(runners);
  return out;
}

const urls = [...byUrl.keys()].sort();

const argv = process.argv.slice(2);
const strict = argv.includes("--strict");
const asJson = argv.includes("--json");

if (!asJson) {
  process.stderr.write(`Checking ${urls.length} unique URLs across ${files.length} state files…\n`);
}

const results = await runWithConcurrency(urls, CONCURRENCY, async (url): Promise<LinkResult> => {
  const r = await checkWithRetry(url);
  return {
    url,
    citations: byUrl.get(url) ?? [],
    status: r.status,
    classification: applyWhitelist(url, classify(r.status), whitelist),
    finalUrl: r.finalUrl,
    redirected: r.redirected,
    message: r.message,
  };
});

const buckets = {
  ok: 0,
  redirect: 0,
  "soft-ok": 0,
  accepted: 0,
  "needs-review": 0,
  "client-error": 0,
  "server-error": 0,
  "network-error": 0,
} satisfies Record<LinkClassification, number>;

for (const r of results) {
  buckets[r.classification]++;
}

const broken = results.filter(
  (r) => r.classification === "client-error" || r.classification === "server-error" || r.classification === "network-error",
);

const needsReview = results.filter((r) => r.classification === "needs-review");

// Cited URLs that resolve only after following a redirect. The page works,
// but the record should be updated to the final canonical URL.
const redirectedResults = results.filter(
  (r) => r.redirected === true && typeof r.finalUrl === "string" && r.finalUrl !== r.url,
);

if (asJson) {
  process.stdout.write(JSON.stringify({ buckets, results }, null, 2) + "\n");
} else {
  process.stdout.write(`# External link check — ${new Date().toISOString().slice(0, 10)}\n\n`);
  process.stdout.write(`Total unique URLs: ${urls.length}\n`);
  process.stdout.write(`- OK (2xx): ${buckets.ok}\n`);
  process.stdout.write(`- Redirect (3xx, followed): ${buckets.redirect}\n`);
  process.stdout.write(`- Accepted (whitelisted bot-blocks): ${buckets.accepted}\n`);
  process.stdout.write(`- Needs review (bot-blocked, not yet accepted): ${buckets["needs-review"]}\n`);
  process.stdout.write(`- Client error (4xx): ${buckets["client-error"]}\n`);
  process.stdout.write(`- Server error (5xx): ${buckets["server-error"]}\n`);
  process.stdout.write(`- Network error: ${buckets["network-error"]}\n`);
  process.stdout.write(`- Redirected (cited URL is non-canonical): ${redirectedResults.length}\n\n`);

  if (needsReview.length > 0) {
    process.stdout.write(`## Needs human review — blocked for bots (${needsReview.length})\n\n`);
    process.stdout.write(
      `A human should open each URL; if it is live, accept it in the /audit/links ` +
        `console (which adds it to \`src/data/link-whitelist.json\`).\n\n`,
    );
    for (const r of needsReview) {
      process.stdout.write(`- **${r.status}** — ${r.url}\n`);
      for (const c of r.citations) {
        process.stdout.write(`    - ${c}\n`);
      }
    }
    process.stdout.write(`\n`);
  }

  if (broken.length > 0) {
    process.stdout.write(`## Broken (${broken.length})\n\n`);
    for (const r of broken) {
      const status = r.status === null ? r.message ?? "no response" : String(r.status);
      process.stdout.write(`- **${status}** — ${r.url}\n`);
      for (const c of r.citations) {
        process.stdout.write(`    - ${c}\n`);
      }
    }
  } else {
    process.stdout.write(`No broken links detected.\n`);
  }

  if (redirectedResults.length > 0) {
    process.stdout.write(`\n## Redirected — update source URL to canonical (${redirectedResults.length})\n\n`);
    for (const r of redirectedResults) {
      process.stdout.write(`- ${r.url}\n    -> ${r.finalUrl}\n`);
      for (const c of r.citations) {
        process.stdout.write(`    - ${c}\n`);
      }
    }
  }
}

if (strict && broken.length > 0) {
  process.exit(1);
}
