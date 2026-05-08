# NCES Digest of Education Statistics 2023, Table 204.20

Source URL: `https://nces.ed.gov/programs/digest/d23/tables/dt23_204.20.asp`
Snapshot: `nces-table-204.20.html`

Federal source for cross-state-comparable EL counts and percents. The
table reports English learners enrolled in U.S. public elementary and
secondary schools by state, for fall years through fall 2021 (the
most recent year in the d23 publication).

For Alabama (fall 2021):

- **Number of EL students**: 34,965
- **Percent of total enrollment**: **4.7%**

This is the value we use in `elPercent`. Baseline-2019 had `3.5`
(the Leider-2021 paper's Appendix A figure, derived from fall-2017
Civil Rights Data Collection / NCES counts). Updating the schema to
match the cross-state methodology used for Colorado, Massachusetts,
Nevada, and Arizona.

## Schema mapping

- `elPercent`: 3.5 → 4.7
- `elPercentAsOf`: 2019-10-01 → 2021-10-01

(This date convention matches what we used for CO/MA/NV: `October 1`
of the fall enrollment year, which is the standard CRDC / EDFacts
snapshot date.)
