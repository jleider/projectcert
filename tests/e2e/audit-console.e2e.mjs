/**
 * End-to-end smoke test for the gated /audit/ review console.
 *
 * This is a STANDALONE script (not a *.spec.ts — the Playwright test
 * runner won't pick it up), because the console needs the full Cloudflare
 * Pages dev stack — Functions + a local D1 — which `astro dev` and the
 * public-page a11y suite don't provide. It is the only way to exercise the
 * gated, Functions-backed UI end-to-end.
 *
 * What it does: reset + migrate a local D1, build, boot `wrangler pages
 * dev` with the DEV_REVIEWER_EMAIL auth bypass, then drive a real browser
 * to assert the two behaviours that have regressed before (both are Svelte
 * dependency-tracking traps where a value read inside a function isn't
 * tracked by the template expression):
 *
 *   1. Checking a datapoint's verification box updates the progress bar.
 *   2. Picking an alternative source radio updates the shown "Confirmed
 *      source" (not just the label).
 *
 * Run:  npm run e2e:audit         (builds + resets the local D1 each run)
 *       SKIP_BUILD=1 npm run e2e:audit   (reuse the current dist/)
 *
 * Requires Playwright's chromium: `npx playwright install chromium`.
 * Not wired into the default gate (needs wrangler + a browser).
 */

import { chromium } from "@playwright/test";
import { execSync, spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = Number(process.env.E2E_PORT ?? 8799);
const BASE = `http://localhost:${PORT}`;
const STATE = "ak";

function step(msg) {
  console.log(`\n▶ ${msg}`);
}
function assert(cond, msg) {
  if (!cond) throw new Error(`ASSERTION FAILED: ${msg}`);
  console.log(`  ✓ ${msg}`);
}

async function waitForServer(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {
      /* not up yet */
    }
    await sleep(1000);
  }
  throw new Error(`server did not come up at ${url}`);
}

/** "12 / 32 (38%)" -> { verified: 12, total: 32 } */
function parseProgress(text) {
  const m = text.match(/(\d+)\s*\/\s*(\d+)/);
  return m ? { verified: Number(m[1]), total: Number(m[2]) } : null;
}

step("Reset local D1, migrate, build");
execSync("rm -rf .wrangler && npm run d1:migrate:local", { stdio: "inherit" });
if (!process.env.SKIP_BUILD) execSync("npm run build", { stdio: "inherit" });

step(`Start wrangler pages dev on :${PORT}`);
const server = spawn(
  "npx",
  ["wrangler", "pages", "dev", "dist", "--binding", `DEV_REVIEWER_EMAIL=dev@local`, "--port", String(PORT)],
  { stdio: "ignore", detached: true },
);

let failed = false;
try {
  await waitForServer(`${BASE}/api/overview`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const apiErrors = [];
  page.on("response", (r) => {
    if (r.url().includes("/api/") && r.status() >= 400) apiErrors.push(`${r.status()} ${r.url()}`);
  });

  step(`Load ${BASE}/audit/${STATE}`);
  await page.goto(`${BASE}/audit/${STATE}`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Set source" }).first().waitFor({ timeout: 20000 });

  step("1. Checking a datapoint updates the progress bar");
  const progress = page.getByText(/\d+\s*\/\s*\d+\s*\(\d+%\)/).first();
  const before = parseProgress(await progress.innerText());
  assert(before !== null, `progress reads "${await progress.innerText()}"`);
  await page.getByRole("checkbox").first().check();
  await sleep(1200);
  const after = parseProgress(await progress.innerText());
  assert(after.verified === before.verified + 1, `verified count ${before.verified} -> ${after.verified}`);

  step("2. Picking an alternative source radio updates the shown source");
  // The first datapoint (also the one verified above). Its shown source is the
  // `ul.list-disc` link; the cited-sources panel is an <ol>. Radio interaction
  // is page-level (only this datapoint's picker is open).
  const li = page.locator("section ul > li").first();
  const shownBefore = (await li.locator("ul.list-disc a").first().innerText()).trim();
  await page.getByRole("button", { name: "Set source" }).first().click();
  const radios = page.getByRole("radio");
  await radios.first().waitFor({ timeout: 10000 });
  const n = await radios.count();
  let targetLabel = "";
  for (let i = 0; i < n; i++) {
    const label = (await radios.nth(i).locator("xpath=following-sibling::a").innerText()).trim();
    if (label !== shownBefore) {
      await radios.nth(i).check();
      targetLabel = label;
      break;
    }
  }
  assert(targetLabel !== "", `found an alternative source to pick (had ${n} candidates)`);
  await sleep(1200);
  const shownAfter = (await li.locator("ul.list-disc a").first().innerText()).trim();
  assert(shownAfter !== shownBefore, `shown source changed from "${shownBefore.slice(0, 40)}…"`);
  assert(shownAfter === targetLabel, `shown source now equals the picked radio "${targetLabel.slice(0, 40)}…"`);
  assert((await radios.first().isVisible()) === true, "source picker stays open after a pick");
  assert((await li.locator("ul.list-disc a").count()) === 1, "exactly one source shown (single source of truth)");

  step("3. Unchecking the datapoint reverts its source label to unconfirmed");
  assert((await li.getByText("Confirmed source:").count()) > 0, "labeled 'Confirmed source' while checked");
  await page.getByRole("checkbox").first().uncheck();
  await sleep(1200);
  assert(
    (await li.getByText("Likely source (unconfirmed):").count()) > 0,
    "reverts to 'Likely source (unconfirmed)' when unchecked",
  );

  step("4. Add-source-URL: validates, normalizes bare domains, fetches title");
  const urlInput = page.locator('input[type="url"]').first();
  const addBtn = page.getByRole("button", { name: /Add URL|Fetching/ }).first();
  // 4a: a bare word (not a real domain) is rejected with an inline error
  await urlInput.fill("dsfsda");
  await addBtn.click();
  await sleep(400);
  assert(
    (await li.getByText(/full web address|valid/i).count()) > 0,
    "a bare word like 'dsfsda' is rejected with an inline error",
  );
  // 4b: a bare domain (no scheme) is normalized to https:// and its title fetched
  await urlInput.fill("www.example.com");
  await addBtn.click();
  await sleep(5000); // server-side fetch + title parse
  const addedHref = await li.locator("ul.list-disc a").first().getAttribute("href");
  assert(addedHref === "https://www.example.com/", `bare domain normalized + selected as source (href=${addedHref})`);
  assert(
    /example/i.test((await li.locator("ul.list-disc a").first().innerText()).trim()),
    "shown label reflects the fetched title/host",
  );

  // The invalid-URL submission in step 4a intentionally returns 400; any
  // other 4xx/5xx is a real problem.
  const unexpected = apiErrors.filter((e) => !(e.startsWith("400") && e.includes("/api/added-sources")));
  assert(unexpected.length === 0, `no unexpected 4xx/5xx API responses (${unexpected.join(", ") || "none"})`);

  await browser.close();
  console.log("\n✅ audit-console e2e PASSED");
} catch (err) {
  failed = true;
  console.error(`\n❌ audit-console e2e FAILED: ${err.message}`);
} finally {
  try {
    if (server.pid !== undefined) process.kill(-server.pid, "SIGTERM");
  } catch {
    /* already gone */
  }
}

process.exit(failed ? 1 : 0);
