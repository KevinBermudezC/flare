# Contributing

Thanks for thinking about helping. This is a small project, so the workflow is what keeps reviews honest. If something feels weird, open an issue.

## The short version

- **Trivial change?** Open a PR. Typos, README tweaks, dependency bumps, simple bug fixes — just send the diff.
- **Non-trivial change?** Write a proposal first (it can be in the same PR as the code). A new block, a gallery UX change, a stack shift — these all need a proposal.
- **If in doubt:** lean toward writing a proposal. It's 15 minutes and saves a re-review later.

Cursor agents: read [`AGENTS.md`](./AGENTS.md) before non-trivial work.

## OpenSpec workflow (for non-trivial changes)

We use [OpenSpec](https://openspec.dev) so every non-trivial change has a written *why* before the diff. The loop is:

**propose → apply → archive**

### 1. Install the CLI

```bash
npm install -g @fission-ai/openspec@latest
```

Reading proposals doesn't need the CLI. Creating new ones does.

### 2. Propose

In Cursor:

```
/opsx:propose add-block-whatever
```

That scaffolds `openspec/changes/add-block-whatever/`. Fill in `proposal.md`, `design.md`, the spec(s), and `tasks.md`. Copy an existing change if you want a template.

From a terminal: `openspec new change "add-block-whatever"` and write the files by hand.

### 3. Apply (same PR by default)

Proposal + implementation in the same PR is the default. The reviewer sees intent and code together.

Split into two PRs only when the approach is genuinely uncertain, the change is too big for one PR, or two people will work on different parts.

### 4. Archive after merge

After the PR merges:

```
openspec archive <change-name>
```

That folds delta specs into `openspec/specs/` (ground truth) and moves the change folder under `openspec/changes/archive/`. Open a tiny chore PR with the archive. Takes two minutes.

## What this repo is

Flare is a **Svelte 5 gallery of marketing and motion blocks**. Live preview. Copy the `.svelte`. It's yours.

It is **not** a design system, **not** Tangram, **not** an npm kit, **not** shadcn. No CLI, no registry, no shared `$lib/ui/button`. Each block is an independent folder under `src/blocks/<name>/`.

## Code conventions

- Svelte 5 + SvelteKit + Tailwind v4. Package manager: **pnpm**.
- Motion default: CSS + `svelte/transition` + `svelte/animate`. No extra deps unless a block page documents `pnpm add …`.
- Copyable blocks MUST NOT import `$lib`, each other, shadcn-svelte, or bits-ui. Buttons and links are plain `<button>` / `<a>` + Tailwind.
- Site chrome (gallery, copy panel, catalog) lives in `src/routes` and `src/lib/site`. That code is not the copyable product.
- `pnpm check` and `pnpm build` should pass.

**Commits:** imperative present tense (`add gallery`, not `added gallery`). Conventional-commit prefixes (`feat`, `fix`, `chore`, `docs`, `refactor`) are welcome.

**PRs:** link the proposal (`openspec/changes/<name>/`). Use the PR template.

## What reviews look for

- **The proposal is honest about scope.** Non-goals is the most useful section.
- **The code matches the spec**, not a parallel invention.
- **A stranger can `pnpm i && pnpm dev` and understand Flare in under a minute.**
- **Copied `.svelte` files render** in a minimal SvelteKit 5 + Tailwind v4 app with zero broken imports.

## License

By contributing, you agree your contributions are licensed under MIT, the same as the project.
