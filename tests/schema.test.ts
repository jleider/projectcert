import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { StateSchema } from "../src/content/config";
import { STATES } from "../src/data/states-meta";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

describe("state content collection", () => {
  const files = readdirSync(STATES_DIR).filter((f) => f.endsWith(".json"));

  it("has exactly 51 records (50 states + DC)", () => {
    expect(files).toHaveLength(51);
  });

  for (const file of files) {
    const usps = file.replace(/\.json$/, "").toUpperCase();

    it(`${usps} parses against the Zod schema`, () => {
      const raw = JSON.parse(readFileSync(resolve(STATES_DIR, file), "utf8"));
      const result = StateSchema.safeParse(raw);
      if (!result.success) {
        // eslint-disable-next-line no-console
        console.error(result.error.format());
      }
      expect(result.success).toBe(true);
    });

    it(`${usps} filename matches its USPS field`, () => {
      const raw = JSON.parse(readFileSync(resolve(STATES_DIR, file), "utf8"));
      expect(raw.usps).toBe(usps);
    });
  }

  it("covers every USPS code in states-meta", () => {
    const filenames = new Set(files.map((f) => f.replace(/\.json$/, "").toUpperCase()));
    for (const meta of STATES) {
      expect(filenames.has(meta.usps), `${meta.usps} missing`).toBe(true);
    }
  });
});
