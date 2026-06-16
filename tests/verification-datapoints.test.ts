import { describe, expect, it } from "vitest";
import {
  datapointsFor,
  datapointIdForCitation,
  contentHashFor,
  DATAPOINT_IDS,
  DATAPOINT_COUNT,
  type Datapoint,
} from "../src/lib/verification-datapoints";

// A rich fixture (every optional array populated) and a sparse one
// (optional blocks absent) to exercise both branches.
const rich = {
  usps: "CA",
  name: "California",
  elPercent: 18.6,
  elPercentAsOf: "2023-10-01",
  credentials: {
    bilingual: {
      offered: true,
      standalone: true,
      addOn: true,
      requirements: { program: true, coursework: false, practicum: true, test: true, languageProficiency: true },
    },
    eld: {
      offered: true,
      standalone: false,
      addOn: true,
      requirements: { program: false, coursework: true, practicum: null, test: true, languageProficiency: false },
    },
    sei: { mandatedForAllTeachers: true },
  },
  professionalStandardsMentions: { diverse: true, cultural: true, linguistic: true, el: true },
  sealOfBiliteracy: { adopted: true, year: 2011, sourceUrl: "https://example.org/seal" },
  elpAssessment: { name: "ELPAC", consortium: null, sourceUrl: "https://example.org/elpac" },
  sources: [
    { label: "CTC leaflet", url: "https://example.org/a", retrievedAt: "2026-05-10", retrievedBy: "projectcert-2026" },
    { label: "CDE page", url: "https://example.org/b", retrievedAt: "2026-05-10", retrievedBy: "projectcert-2026" },
  ],
  history: [
    { date: "1976-01-01", title: "AB 1329", description: "Bilingual Education Act.", sourceUrls: ["https://example.org/h1"] },
  ],
  elPercentHistory: [
    { date: "2019-10-01", percent: 19.3, source: { label: "NCES 204.20", url: "https://example.org/n", publisher: "nces" } },
  ],
};

const sparse = {
  usps: "WY",
  name: "Wyoming",
  elPercent: 3.0,
  elPercentAsOf: "2021-10-01",
  credentials: {
    bilingual: { offered: false, standalone: false, addOn: false },
    eld: { offered: false, standalone: false, addOn: false },
    sei: { mandatedForAllTeachers: false },
  },
  professionalStandardsMentions: { diverse: false, cultural: false, linguistic: false, el: false },
  sealOfBiliteracy: { adopted: false, year: null, sourceUrl: "https://example.org/seal" },
  elpAssessment: { name: "WIDA ACCESS", consortium: "WIDA" as const, sourceUrl: null },
  sources: [{ label: "WY DoE", url: "https://example.org/wy", retrievedAt: "2019-11-01", retrievedBy: "leider-2021" }],
  // history and elPercentHistory intentionally absent
};

describe("datapointsFor", () => {
  it("returns the fixed 32-entry skeleton for every state", () => {
    expect(datapointsFor(rich)).toHaveLength(DATAPOINT_COUNT);
    expect(datapointsFor(sparse)).toHaveLength(DATAPOINT_COUNT);
    expect(DATAPOINT_COUNT).toBe(32);
  });

  it("emits the exact frozen id set, in order, for any state", () => {
    expect(datapointsFor(rich).map((d) => d.id)).toEqual([...DATAPOINT_IDS]);
    expect(datapointsFor(sparse).map((d) => d.id)).toEqual([...DATAPOINT_IDS]);
  });

  it("formats tri-state requirement flags, including absent blocks", () => {
    const by = Object.fromEntries(datapointsFor(rich).map((d) => [d.id, d] as const)) as Record<string, Datapoint>;
    expect(by["credentials.bilingual.requirements.program"]!.displayValue).toBe("Required");
    expect(by["credentials.bilingual.requirements.coursework"]!.displayValue).toBe("Not required");
    expect(by["credentials.eld.requirements.practicum"]!.displayValue).toBe("Not specified in public sources");

    // Sparse state has no requirements block at all → "not specified".
    const bySparse = Object.fromEntries(datapointsFor(sparse).map((d) => [d.id, d] as const)) as Record<string, Datapoint>;
    expect(bySparse["credentials.bilingual.requirements.program"]!.displayValue).toBe("Not specified in public sources");
  });

  it("marks grouped datapoints and renders their rows", () => {
    const by = Object.fromEntries(datapointsFor(rich).map((d) => [d.id, d] as const)) as Record<string, Datapoint>;
    for (const id of ["history", "elPercentHistory", "sources"]) {
      expect(by[id]!.grouped).toBe(true);
    }
    expect(by["sources"]!.rows).toHaveLength(2);
    expect(by["history"]!.rows[0]).toEqual({ label: "1976-01-01", value: "AB 1329" });
    expect(by["elPercentHistory"]!.rows[0]).toEqual({ label: "2019", value: "19.3% — NCES 204.20" });
  });

  it("treats absent and empty optional arrays identically (hash + display)", () => {
    const bySparse = Object.fromEntries(datapointsFor(sparse).map((d) => [d.id, d] as const)) as Record<string, Datapoint>;
    expect(bySparse["history"]!.displayValue).toBe("No events recorded");
    expect(bySparse["history"]!.rows).toHaveLength(0);
    // undefined history hashes the same as an explicit empty array.
    const sparseWithEmpty = { ...sparse, history: [] };
    const byEmpty = Object.fromEntries(datapointsFor(sparseWithEmpty).map((d) => [d.id, d] as const)) as Record<string, Datapoint>;
    expect(byEmpty["history"]!.contentHash).toBe(bySparse["history"]!.contentHash);
  });

  it("scalar datapoints are not flagged grouped", () => {
    const elPercent = datapointsFor(rich).find((d) => d.id === "elPercent")!;
    expect(elPercent.grouped).toBe(false);
    expect(elPercent.displayValue).toBe("18.6%");
  });
});

describe("contentHashFor", () => {
  it("is deterministic and stable across key order", () => {
    expect(contentHashFor({ a: 1, b: 2 })).toBe(contentHashFor({ b: 2, a: 1 }));
  });

  it("changes when the value changes", () => {
    expect(contentHashFor(true)).not.toBe(contentHashFor(false));
    expect(contentHashFor(18.6)).not.toBe(contentHashFor(18.7));
  });

  it("a content edit invalidates the prior datapoint hash", () => {
    const before = datapointsFor(rich).find((d) => d.id === "elPercent")!.contentHash;
    const after = datapointsFor({ ...rich, elPercent: 19.0 }).find((d) => d.id === "elPercent")!.contentHash;
    expect(after).not.toBe(before);
  });
});

describe("datapointIdForCitation", () => {
  it("maps the link-checker citation shapes to datapoint ids", () => {
    expect(datapointIdForCitation("CA / sources[2]")).toBe("sources");
    expect(datapointIdForCitation("CA / history[5].sourceUrls[0]")).toBe("history");
    expect(datapointIdForCitation("CA / elPercentHistory[3].source.url")).toBe("elPercentHistory");
    expect(datapointIdForCitation("CA / sealOfBiliteracy.sourceUrl")).toBe("sealOfBiliteracy.sourceUrl");
    expect(datapointIdForCitation("CA / elpAssessment.sourceUrl")).toBe("elpAssessment.sourceUrl");
  });

  it("returns null for unrecognized citation shapes", () => {
    expect(datapointIdForCitation("CA / something.else")).toBeNull();
  });

  it("only ever maps to ids that exist in the skeleton", () => {
    const ids = new Set(DATAPOINT_IDS);
    for (const c of [
      "CA / sources[0]",
      "CA / history[0].sourceUrls[0]",
      "CA / elPercentHistory[0].source.url",
      "CA / sealOfBiliteracy.sourceUrl",
      "CA / elpAssessment.sourceUrl",
    ]) {
      const id = datapointIdForCitation(c);
      expect(id).not.toBeNull();
      expect(ids.has(id!)).toBe(true);
    }
  });
});
