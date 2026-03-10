# GitHub Issue Form / Template Pack — ~/Desktop/ABC-Environ-ABC

This pack is hard-wired for:

- **Organization:** `ABC-Environ`
- **Repository:** `~/Desktop/ABC-Environ-ABC`
- **GitHub Project:** `https://github.com/orgs/ABC-Environ/projects/1`
- **Project number:** `1`

## Recommended operating mode

Use **built-in Project auto-add** as the source of truth for Project membership.

That means:
1. contributors open issues through structured forms
2. repository automation normalizes labels and milestones
3. GitHub Project built-in auto-add picks up the issue based on label filters
4. Project-native workflows own Project membership and status behavior

## Important note about your current auto-add rule

Your current Project auto-add filter is:

```text
is:issue,pr is:open label:bug
```

That rule is **not aligned** to the MVP governance model because the issue pack uses labels like:
- `release:mvp`
- `release:v1.1`
- `slice:*`
- `type:*`
- `severity:blocker`

Unless your new issues are also labeled `bug`, they will **not** be auto-added by that current rule.

## Recommended Project auto-add setup

Keep your existing bug auto-add rule only if you still want bug triage in the Project.

Then add **two new built-in auto-add workflows** for the MVP board:

### Auto-add workflow 1 — MVP
- **Repository:** `~/Desktop/ABC-Environ-ABC`
- **Filter:** `is:issue is:open label:release:mvp`

### Auto-add workflow 2 — v1.1
- **Repository:** `~/Desktop/ABC-Environ-ABC`
- **Filter:** `is:issue is:open label:release:v1.1`

Optional stricter variants:

### MVP without blocker-only views
- **Filter:** `is:issue is:open label:release:mvp`

### Blocker spotlight
- **Filter:** `is:issue is:open label:release:mvp label:severity:blocker`

## What’s included

- `.github/ISSUE_TEMPLATE/config.yml`
- `.github/ISSUE_TEMPLATE/01-mvp-work-item.yml`
- `.github/ISSUE_TEMPLATE/02-seed-proof.yml`
- `.github/ISSUE_TEMPLATE/03-launch-control.yml`
- `.github/ISSUE_TEMPLATE/04-blocker-defect.yml`
- `.github/project-governance.yml`
- `.github/workflows/issue-governance-normalizer.yml`
- `.github/workflows/project-routing.yml`
- `docs/project-alignment.md`
- `docs/project-field-plan.md`
- `docs/live-setup.md`

## Repo variables to set

Create these repository variables:

- `GH_PROJECT_MODE`
  - recommended value: `builtin-auto-add`
  - optional: `workflow-add`
- `GH_PROJECT_OWNER`
  - set to: `ABC-Environ`
- `GH_PROJECT_NUMBER`
  - set to: `1`

If you choose `workflow-add`, also create the secret:
- `PROJECT_AUTOMATION_TOKEN`

## Install

1. Copy this `.github` folder into `~/Desktop/ABC-Environ-ABC`.
2. Create the required labels:
   - `slice:intake`
   - `slice:workstream`
   - `slice:evidence`
   - `slice:estimate`
   - `slice:qa`
   - `slice:billing`
   - `slice:blockers`
   - `slice:cutover`
   - `type:schema`
   - `type:command-guard`
   - `type:projector`
   - `type:ui`
   - `type:permission`
   - `type:seed-proof`
   - `type:launch-control`
   - `severity:blocker`
   - `release:mvp`
   - `release:v1.1`
3. Create milestones `Milestone 1` through `Milestone 9`.
4. Set the repository variables above.
5. Update your Project built-in auto-add workflows using the filters in `docs/live-setup.md`.
6. Commit to the default branch.

## Recommendation

For your current setup, the cleanest move is:

- leave `GH_PROJECT_MODE=builtin-auto-add`
- keep the current bug rule only if useful
- add a new built-in Project workflow for `label:release:mvp`
- optionally add another for `label:release:v1.1`

That will make the new forms and workflows fit your Project without competing with it.
