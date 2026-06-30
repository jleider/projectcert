import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright drives the *built* static site (Astro `preview` serves
 * `dist/`), so a11y is checked against the real production output, not
 * the dev server. `npm run build` must have produced `dist/` first; CI
 * builds before invoking `test:e2e`.
 *
 * The webServer block starts `astro preview` on :4321 and reuses an
 * already-running instance locally (so a dev can keep a preview open).
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
  },
});
