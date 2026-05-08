import { getCollection } from "astro:content";
import type { State } from "@/content/config";

export {
  CREDENTIAL_TYPES,
  type CredentialType,
  LAYERS,
  type Layer,
  type ChoroplethDatum,
  stateUrl,
  absoluteStateUrl,
} from "./state-types";
import type { ChoroplethDatum } from "./state-types";

export async function getAllStates(): Promise<State[]> {
  const entries = await getCollection("states");
  return entries
    .map((e) => e.data)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Cross-state credential breakdown for /credentials/{type}/ pages. */
export interface CredentialBreakdown {
  states: State[];
  offered: State[];
  standalone: State[];
  addOnOnly: State[];
  both: State[];
  notOffered: State[];
}

export function breakdownFor(states: State[], type: "bilingual" | "eld"): CredentialBreakdown {
  const offered = states.filter((s) => s.credentials[type].offered);
  const standalone = offered.filter((s) => s.credentials[type].standalone);
  const addOnOnly = offered.filter(
    (s) => s.credentials[type].addOn && !s.credentials[type].standalone,
  );
  const both = offered.filter(
    (s) => s.credentials[type].standalone && s.credentials[type].addOn,
  );
  const notOffered = states.filter((s) => !s.credentials[type].offered);
  return { states, offered, standalone, addOnOnly, both, notOffered };
}

export async function getChoroplethData(): Promise<ChoroplethDatum[]> {
  const states = await getAllStates();
  return states.map((s) => ({
    usps: s.usps,
    name: s.name,
    elPercent: s.elPercent,
    bilingual: {
      offered: s.credentials.bilingual.offered,
      standalone: s.credentials.bilingual.standalone,
      addOn: s.credentials.bilingual.addOn,
    },
    eld: {
      offered: s.credentials.eld.offered,
      standalone: s.credentials.eld.standalone,
      addOn: s.credentials.eld.addOn,
    },
    seiMandated: s.credentials.sei.mandatedForAllTeachers,
    standardsMentionsEl: s.professionalStandardsMentions.el,
    sealOfBiliteracy: s.sealOfBiliteracy,
    elpAssessment: s.elpAssessment,
  }));
}
