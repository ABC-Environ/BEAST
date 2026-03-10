# Live setup for ~/Desktop/ABC-Environ-ABC

## Confirmed live values

- **Org:** `ABC-Environ`
- **Repository:** `ABC`
- **Project number:** `1`
- **Project URL:** `https://github.com/orgs/ABC-Environ/projects/1`
- **Current auto-add filter:** `is:issue,pr is:open label:bug`

## What to change in the Project

Open:
- `https://github.com/orgs/ABC-Environ/projects/1`

Then:
1. go to **Workflows**
2. review the existing **Auto-add to project** rule
3. keep it only if you still want bug-focused auto-add
4. add these new Project auto-add workflows

## Recommended new auto-add workflows

### Workflow A — MVP issues
- Repository: `~/Desktop/ABC-Environ-ABC`
- Filter: `is:issue is:open label:release:mvp`

### Workflow B — v1.1 issues
- Repository: `~/Desktop/ABC-Environ-ABC`
- Filter: `is:issue is:open label:release:v1.1`

## Why change it

Your current rule:

```text
is:issue,pr is:open label:bug
```

matches open issues and pull requests labeled `bug`.

Your new issue forms and normalization workflow produce labels like:

- `release:mvp`
- `release:v1.1`
- `slice:intake`
- `slice:workstream`
- `type:schema`
- `type:command-guard`
- `severity:blocker`

So the current filter will not reliably add the new governed work items to the Project.

## Recommended repository variables

Set these under **Settings -> Secrets and variables -> Actions -> Variables**:

- `GH_PROJECT_MODE=builtin-auto-add`
- `GH_PROJECT_OWNER=ABC-Environ`
- `GH_PROJECT_NUMBER=1`

Only if you want workflow-owned Project adds instead of built-in auto-add:
- set `GH_PROJECT_MODE=workflow-add`
- add secret `PROJECT_AUTOMATION_TOKEN`

## Recommended first validation

1. open a new issue using **MVP work item**
2. choose:
   - Vertical slice: Intake
   - Issue family: Schema
   - Milestone: Milestone 1
   - Release target: MVP
3. submit the issue
4. confirm the repository workflow adds:
   - `slice:intake`
   - `type:schema`
   - `release:mvp`
5. confirm the issue appears in Project `1` through the built-in auto-add rule
6. confirm the milestone is set to `Milestone 1`
