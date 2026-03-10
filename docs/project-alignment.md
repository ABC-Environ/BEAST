# Project alignment guide for ~/Desktop/ABC-Environ-ABC

## Live Project

- Project URL: `https://github.com/orgs/ABC-Environ/projects/1`
- Current filter: `is:issue,pr is:open label:bug`

## Recommended alignment model

### Repository automation owns
- issue structure
- label normalization
- milestone assignment

### GitHub Project owns
- Project membership through built-in auto-add
- Project-specific views
- Project-specific status workflow

## Required Project auto-add filters

Add these built-in workflows to Project `1`:

### MVP
- Repository: `~/Desktop/ABC-Environ-ABC`
- Filter: `is:issue is:open label:release:mvp`

### v1.1
- Repository: `~/Desktop/ABC-Environ-ABC`
- Filter: `is:issue is:open label:release:v1.1`

## Optional bug rule

You can keep your current bug rule separately:

- Filter: `is:issue,pr is:open label:bug`

That can coexist with the new release-driven routing if you still want bug issues auto-added.

## Do not do this

- Do not set `projects:` metadata in the issue forms while using built-in auto-add.
- Do not let repository workflows and Project workflows both compete to add the same issue unless you intentionally switch to `workflow-add`.
- Do not route governed MVP work only by `label:bug`.
