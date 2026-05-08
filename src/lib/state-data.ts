import { getCollection } from "astro:content";
import type { State } from "@/content/config";

export {
  CREDENTIAL_TYPES,
  type CredentialType,
  LAYERS,
  type Layer,
  type ChoroplethDatum,
  stateUrl,
} from "./state-types";
import type { ChoroplethDatum } from "./state-types";

export async function getAllStates(): Promise<State[]> {
  const entries = await getCollection("states");
  return entries
    .map((e) => e.data)
    .sort((a, b) => a.name.localeCompare(b.name));
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
