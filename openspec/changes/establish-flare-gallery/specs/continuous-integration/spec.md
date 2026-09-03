## Purpose

Every PR and every push to main is typechecked and built. Preview deploys come from Vercel connected to GitHub.

## ADDED Requirements

### Requirement: GitHub Actions CI

The repo MUST run a workflow on pull requests and on pushes to `main` that installs with `pnpm i --frozen-lockfile`, then `pnpm check`, then `pnpm build`. pnpm version MUST come from the `packageManager` field. Node MUST match the repo engines / `.nvmrc` (22). The lockfile MUST keep the `postcss@8.5.26` override.

#### Scenario: PR is checked

- **WHEN** a pull request is opened
- **THEN** CI installs from the lockfile without floating `postcss` to a newer 8.5.x
- **AND** `pnpm check` and `pnpm build` run

### Requirement: Vercel adapter, no invented secrets

The app MUST use `@sveltejs/adapter-vercel`. README MUST tell a maintainer to connect the GitHub repo to Vercel, root = repo, framework SvelteKit, install `pnpm i`. Preview deploys MUST rely on Vercel GitHub integration. The repo MUST NOT commit Vercel tokens.

#### Scenario: README explains deploy

- **WHEN** a maintainer reads the README deploy section
- **THEN** they know to connect GitHub to Vercel with repo root and `pnpm i`
- **AND** they are not asked to paste a Vercel secret into the repo
