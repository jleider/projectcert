import { describe, expect, it } from "vitest";
import { jsonResponse, normalizeUsps, isDatapointId } from "../src/lib/audit-shared";
import { DATAPOINT_IDS } from "../src/lib/verification-datapoints";

describe("normalizeUsps", () => {
  it("uppercases a valid two-letter code", () => {
    expect(normalizeUsps("ca")).toBe("CA");
    expect(normalizeUsps("Tx")).toBe("TX");
  });
  it("rejects malformed input", () => {
    expect(normalizeUsps("california")).toBeNull();
    expect(normalizeUsps("C1")).toBeNull();
    expect(normalizeUsps("")).toBeNull();
    expect(normalizeUsps(null)).toBeNull();
    expect(normalizeUsps(undefined)).toBeNull();
  });
});

describe("isDatapointId", () => {
  it("accepts every id in the skeleton", () => {
    for (const id of DATAPOINT_IDS) expect(isDatapointId(id)).toBe(true);
  });
  it("rejects unknown or non-string ids", () => {
    expect(isDatapointId("credentials.bilingual.nope")).toBe(false);
    expect(isDatapointId("")).toBe(false);
    expect(isDatapointId(42)).toBe(false);
    expect(isDatapointId(null)).toBe(false);
  });
});

describe("jsonResponse", () => {
  it("serializes the body with a JSON content type and status", async () => {
    const res = jsonResponse({ ok: true }, 201);
    expect(res.status).toBe(201);
    expect(res.headers.get("content-type")).toContain("application/json");
    expect(await res.json()).toEqual({ ok: true });
  });
  it("defaults to status 200", () => {
    expect(jsonResponse({}).status).toBe(200);
  });
});
