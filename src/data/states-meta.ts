/**
 * USPS code <-> name <-> FIPS code lookup.
 * FIPS is needed for joining state JSON to the us-atlas TopoJSON.
 */

export interface StateMeta {
  usps: string;
  name: string;
  fips: string;
}

export const STATES: ReadonlyArray<StateMeta> = [
  { usps: "AL", name: "Alabama", fips: "01" },
  { usps: "AK", name: "Alaska", fips: "02" },
  { usps: "AZ", name: "Arizona", fips: "04" },
  { usps: "AR", name: "Arkansas", fips: "05" },
  { usps: "CA", name: "California", fips: "06" },
  { usps: "CO", name: "Colorado", fips: "08" },
  { usps: "CT", name: "Connecticut", fips: "09" },
  { usps: "DE", name: "Delaware", fips: "10" },
  { usps: "DC", name: "District of Columbia", fips: "11" },
  { usps: "FL", name: "Florida", fips: "12" },
  { usps: "GA", name: "Georgia", fips: "13" },
  { usps: "HI", name: "Hawaii", fips: "15" },
  { usps: "ID", name: "Idaho", fips: "16" },
  { usps: "IL", name: "Illinois", fips: "17" },
  { usps: "IN", name: "Indiana", fips: "18" },
  { usps: "IA", name: "Iowa", fips: "19" },
  { usps: "KS", name: "Kansas", fips: "20" },
  { usps: "KY", name: "Kentucky", fips: "21" },
  { usps: "LA", name: "Louisiana", fips: "22" },
  { usps: "ME", name: "Maine", fips: "23" },
  { usps: "MD", name: "Maryland", fips: "24" },
  { usps: "MA", name: "Massachusetts", fips: "25" },
  { usps: "MI", name: "Michigan", fips: "26" },
  { usps: "MN", name: "Minnesota", fips: "27" },
  { usps: "MS", name: "Mississippi", fips: "28" },
  { usps: "MO", name: "Missouri", fips: "29" },
  { usps: "MT", name: "Montana", fips: "30" },
  { usps: "NE", name: "Nebraska", fips: "31" },
  { usps: "NV", name: "Nevada", fips: "32" },
  { usps: "NH", name: "New Hampshire", fips: "33" },
  { usps: "NJ", name: "New Jersey", fips: "34" },
  { usps: "NM", name: "New Mexico", fips: "35" },
  { usps: "NY", name: "New York", fips: "36" },
  { usps: "NC", name: "North Carolina", fips: "37" },
  { usps: "ND", name: "North Dakota", fips: "38" },
  { usps: "OH", name: "Ohio", fips: "39" },
  { usps: "OK", name: "Oklahoma", fips: "40" },
  { usps: "OR", name: "Oregon", fips: "41" },
  { usps: "PA", name: "Pennsylvania", fips: "42" },
  { usps: "RI", name: "Rhode Island", fips: "44" },
  { usps: "SC", name: "South Carolina", fips: "45" },
  { usps: "SD", name: "South Dakota", fips: "46" },
  { usps: "TN", name: "Tennessee", fips: "47" },
  { usps: "TX", name: "Texas", fips: "48" },
  { usps: "UT", name: "Utah", fips: "49" },
  { usps: "VT", name: "Vermont", fips: "50" },
  { usps: "VA", name: "Virginia", fips: "51" },
  { usps: "WA", name: "Washington", fips: "53" },
  { usps: "WV", name: "West Virginia", fips: "54" },
  { usps: "WI", name: "Wisconsin", fips: "55" },
  { usps: "WY", name: "Wyoming", fips: "56" },
];

export const FIPS_TO_USPS: Record<string, string> = Object.fromEntries(STATES.map((s) => [s.fips, s.usps]));

export const USPS_TO_NAME: Record<string, string> = Object.fromEntries(STATES.map((s) => [s.usps, s.name]));
