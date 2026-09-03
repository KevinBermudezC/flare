---
name: spec-driven-development
description: Use before any non-trivial Flare change — new block, gallery UX, stack shift, or behavior change. OpenSpec propose → apply → archive; no code-only dump.
---

# Spec-driven development

Non-trivial work starts with a written OpenSpec change. Trivial only: typos, README nits, dep bumps, tiny bugfixes.

## Loop

1. **Propose** — `/opsx:propose <kebab-name>` (or `openspec new change`). Fill `proposal.md`, delta `specs/`, `design.md`, `tasks.md` under `openspec/changes/<name>/`.
2. **Apply** — implement against that change in the **same PR**. Check off `tasks.md`. Run `openspec validate <name>`.
3. **Archive** — **after merge**, `openspec archive <name>` and a tiny chore PR. Do not archive on the feature PR.

## Rules

- No non-trivial code without a proposal in the same PR.
- Kevin reviews specs, not just diffs. Non-goals matter.
- Split propose/implement PRs only if the approach is genuinely uncertain.
- Follow `.cursor/skills/openspec-propose`, `openspec-apply-change`, and `openspec-archive-change` for CLI steps.
