/**
 * Offline internal-link check over the built site.
 *
 * Every `href`/`src` in `dist/**\/*.html` that points inside the site must
 * resolve to a file that exists, and every `#fragment` must resolve to a
 * matching `id="…"` in the page it targets. External URLs (http/https,
 * mailto, tel, data) are out of scope — those drift on the publisher's
 * schedule and are swept weekly by `external-link-check.yml`.
 *
 * This replaces the lychee-based CI job. That job passed both `--root-dir`
 * and `--base` as the absolute `dist` path; lychee 0.24 renamed `--base` to
 * `--base-url` and changed its resolution order, so every root-relative link
 * began resolving as `<dist>/<dist>/states/ut` and the gate went red on an
 * upstream release rather than on any repo change. Owning the check keeps it
 * deterministic and runnable locally as part of `npm run verify`.
 *
 * Runs after `astro build` (wired into npm `build`). Exits non-zero on the
 * first build that breaks an internal link.
 */

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, "../dist");

/** A link that failed to resolve, reported against the page that carries it. */
export interface Finding {
  /** Page containing the link, relative to the dist root. */
  file: string;
  /** The href/src exactly as authored. */
  url: string;
  reason: string;
}

/** Schemes and forms that are not ours to verify. */
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/** Fragments the browser resolves without a matching element. */
const BUILTIN_FRAGMENTS = new Set(["top"]);

/**
 * Pull every `href`/`src` attribute value out of a document. Attribute
 * values inside inline JSON (island props) are HTML-escaped by Astro, so a
 * raw-text scan does not pick them up.
 */
export function extractRefs(html: string): string[] {
  const refs: string[] = [];
  for (const m of html.matchAll(/\s(?:href|src)=(?:"([^"]*)"|'([^']*)')/gi)) {
    const value = m[1] ?? m[2];
    if (value !== undefined) refs.push(value);
  }
  return refs;
}

/** True when a URL points somewhere this check is responsible for. */
export function isInternal(url: string): boolean {
  const trimmed = url.trim();
  if (trimmed === "") return false;
  return !EXTERNAL.test(trimmed);
}

/** Every `id="…"` in a document, for fragment resolution. */
export function extractIds(html: string): Set<string> {
  const ids = new Set<string>();
  for (const m of html.matchAll(/\sid=(?:"([^"]*)"|'([^']*)')/gi)) {
    const value = m[1] ?? m[2];
    if (value !== undefined && value !== "") ids.add(value);
  }
  // Legacy `<a name="…">` targets resolve the same way in every browser.
  for (const m of html.matchAll(/<a\s[^>]*\bname=(?:"([^"]*)"|'([^']*)')/gi)) {
    const value = m[1] ?? m[2];
    if (value !== undefined && value !== "") ids.add(value);
  }
  return ids;
}

export interface Resolution {
  /** Absolute path of the file the URL targets, or null when nothing matched. */
  path: string | null;
  /** Fragment without the leading `#`; empty when the URL carries none. */
  fragment: string;
  /** Set when the URL resolves outside the dist root. */
  escapes: boolean;
}

/**
 * Resolve one authored URL against the built tree, mirroring how a static
 * host serves it: `/foo/` → `foo/index.html`, `/foo` → `foo.html` then
 * `foo/index.html`, and a relative path against the linking file's directory.
 */
export function resolveTarget(url: string, fromFile: string, distRoot: string): Resolution {
  const hashAt = url.indexOf("#");
  const fragment = hashAt === -1 ? "" : decodeURIComponent(url.slice(hashAt + 1));
  const withoutHash = hashAt === -1 ? url : url.slice(0, hashAt);
  const pathPart = decodeURIComponent(withoutHash.split("?")[0] ?? "");

  // A bare `#fragment` (or `?query` alone) targets the current page.
  if (pathPart === "") return { path: fromFile, fragment, escapes: false };

  const base = pathPart.startsWith("/") ? join(distRoot, pathPart) : resolve(dirname(fromFile), pathPart);

  const within = base === distRoot || base.startsWith(distRoot + sep);
  if (!within) return { path: null, fragment, escapes: true };

  const candidates = pathPart.endsWith("/")
    ? [join(base, "index.html")]
    : extname(base) !== ""
      ? [base]
      : [`${base}.html`, join(base, "index.html")];

  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      return { path: candidate, fragment, escapes: false };
    }
  }
  return { path: null, fragment, escapes: false };
}

/** Every `.html` file under a directory, recursively. */
export function htmlFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(full);
      return entry.name.endsWith(".html") ? [full] : [];
    })
    .sort();
}

export interface CheckResult {
  findings: Finding[];
  filesScanned: number;
  linksChecked: number;
}

/** Check every internal link in a built site rooted at `distRoot`. */
export function checkInternalLinks(distRoot: string): CheckResult {
  const files = htmlFiles(distRoot);
  const idCache = new Map<string, Set<string>>();
  const findings: Finding[] = [];
  let linksChecked = 0;

  const idsFor = (file: string): Set<string> => {
    let ids = idCache.get(file);
    if (ids === undefined) {
      ids = extractIds(readFileSync(file, "utf8"));
      idCache.set(file, ids);
    }
    return ids;
  };

  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const rel = relative(distRoot, file);

    for (const url of extractRefs(html)) {
      if (!isInternal(url)) continue;
      linksChecked += 1;

      const { path, fragment, escapes } = resolveTarget(url, file, distRoot);

      if (escapes) {
        findings.push({ file: rel, url, reason: "resolves outside the site root" });
        continue;
      }
      if (path === null) {
        findings.push({ file: rel, url, reason: "no such file in the built site" });
        continue;
      }
      if (fragment !== "" && !BUILTIN_FRAGMENTS.has(fragment) && path.endsWith(".html")) {
        if (!idsFor(path).has(fragment)) {
          findings.push({
            file: rel,
            url,
            reason: `no id="${fragment}" in ${relative(distRoot, path)}`,
          });
        }
      }
    }
  }

  return { findings, filesScanned: files.length, linksChecked };
}

// CLI entry — skipped when the module is imported by a test.
if (process.argv[1] !== undefined && import.meta.url === `file://${process.argv[1]}`) {
  if (!existsSync(DIST)) {
    console.error("Internal-link check FAILED: dist/ not found. Run `npm run build` first.");
    process.exit(1);
  }

  const { findings, filesScanned, linksChecked } = checkInternalLinks(DIST);

  if (findings.length > 0) {
    console.error(`Internal-link check FAILED (${findings.length} broken of ${linksChecked} internal links):`);
    for (const f of findings) console.error(`  ${f.file}  →  ${f.url}\n      ${f.reason}`);
    process.exit(1);
  }

  console.log(`Internal-link check PASSED (${linksChecked} internal links across ${filesScanned} pages).`);
}
