# Contributing to Flare

Read [AGENTS.md](./AGENTS.md) first. Product shape is in [README.md](./README.md). Voice is in [`.cursor/skills/flare-voice/SKILL.md`](./.cursor/skills/flare-voice/SKILL.md).

## Product

Flare is a Svelte 5 gallery of scroll chapters. Live preview. Copy the `.svelte`. Own look: ink, ember, spotlight, beams, console chrome.

It is not a design system. It is not an npm kit. There is no CLI, no registry, no shared `Button`.

Do not name other products or sibling projects. Do not define Flare by comparison.

## Process

1. Every new behavior starts as an OpenSpec change. Do not write code first.
2. `openspec list --json` — see what is already in flight.
3. `openspec change new <kebab-id>` — create a new change. Do not silently rewrite an existing one.
4. `openspec validate <change-id>` — must pass.
5. Implement only what the spec names.
6. `openspec archive <change-id>` only after merge, in a follow-up chore.

The first change is [`openspec/changes/establish-flare-gallery`](./openspec/changes/establish-flare-gallery/). Do not create a second change for the same gallery. Amend that folder, then `openspec validate establish-flare-gallery`.

## Chapters

- One folder under `src/blocks/<slug>/`.
- One public `*.svelte` file that is the copy target.
- No `$lib` / `@/` imports. No shared `Button` / `Dialog` / `Input`.
- Official `gsap` + `gsap.context()` cleanup for pin, scrub, type, and horizontal hijack.
- CSS + `svelte/transition` for cheap hover.
- `prefers-reduced-motion: reduce` must not empty the chapter.

Recorte 1 slugs: `split-masthead`, `type-charge`, `lane-scrub`, `chapter-pin`, `mask-reveal`, `deck-pin`.

## Docs and UI copy

- Name Flare. Describe the gallery. Stop.
- No other product names. No sibling project names.
- Allowed product-shape facts: not a design system, not an npm kit, no CLI, no registry, no shared `Button`.
- Read [`.cursor/skills/design-taste-frontend/SKILL.md`](./.cursor/skills/design-taste-frontend/SKILL.md) before writing chrome or a new chapter.

## Verification

```bash
pnpm check
pnpm build
```
