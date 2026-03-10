# Project field plan

This pack does not write Project fields by default.

## Recommended field usage

Use the Project UI to manage these fields:

- `Status`
  - Contract Locked
  - Ready for Build
  - In Build
  - In Seed Proof
  - Ready for Rehearsal
  - Ready for Cutover
  - In Hypercare
  - Stabilized
  - Deferred v1.1

Optional:
- `Milestone Gate`
- `Slice`
- `Release`
- `Severity`

## Source of truth

- Repository labels are the source of truth for slice, type, release, and severity.
- Repository milestones are the source of truth for milestone gate.
- Project fields are for views and workflow support unless you later automate them intentionally.
