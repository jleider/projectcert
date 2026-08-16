import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright drives the *built* static site (Astro `preview` serves
 * `dist/`), so a11y is checked against the real production output, not
 * the dev server. `npm run build` must have produced `dist/` first; CI
 * builds before invoking `test:e2e`.
 *
 * The webServer block starts `astro preview` on :4321 and reuses an
 * already-running instance locally (so a dev can keep a preview open).
 *
 * Astro 7 auto-daemonizes `astro preview` when it detects an AI coding
 * agent driving the terminal (it calls `am-i-vibing`, which keys off
 * CLAUDECODE and friends). The forked parent exits immediately, so
 * Playwright reports "Process from config.webServer exited early" and no
 * tests run. Setting ASTRO_PREVIEW_BACKGROUND opts out of that detection
 * and keeps the server in the foreground, which is what Playwright needs
 * in order to own the process lifecycle. The name reads backwards: it
 * means "the background decision is explicit, do not auto-detect", not
 * "run in the background". CI is unaffected either way, but without this
 * the suite cannot be run locally from inside an agent session.
 */
const PORT = 4321;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run preview -- --port ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { ASTRO_PREVIEW_BACKGROUND: "1" },
  },
});
