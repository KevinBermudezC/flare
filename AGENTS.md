# Flare - agent rules

Read this before writing code. Then read the skill that matches the task.

## Product

Flare is a Svelte 5 gallery of scroll chapters. Live preview. Copy the `.svelte`. Own look: ink, ember, spotlight, beams, console chrome.

It is not a design system. It is not an npm kit. There is no CLI, no registry, no shared `Button`.

Do not name other products or sibling projects. Do not define Flare by comparison. Full rule: [`.cursor/skills/flare-voice/SKILL.md`](./.cursor/skills/flare-voice/SKILL.md).

## OpenSpec is required

Do not implement behavior that is not in an OpenSpec change.

1. `openspec list --json`
2. New work → `openspec change new <kebab-id>`. Do not silently rewrite an existing change.
3. `openspec validate <change-id>`
4. Implement only what the spec names.
5. Archive only after merge, in a follow-up chore.

Active change: [`openspec/changes/establish-flare-gallery`](./openspec/changes/establish-flare-gallery/). Amend that folder for Recorte 1 work. Then validate.

CLI skills:

- [`.cursor/skills/openspec-apply-change/SKILL.md`](./.cursor/skills/openspec-apply-change/SKILL.md)
- [`.cursor/skills/openspec-explore/SKILL.md`](./.cursor/skills/openspec-explore/SKILL.md)
- [`.cursor/skills/openspec-archive-change/SKILL.md`](./.cursor/skills/openspec-archive-change/SKILL.md)

## Skills

| Task | Skill |
| --- | --- |
| Voice, README, UI copy, commits, PR text | [`.cursor/skills/flare-voice/SKILL.md`](./.cursor/skills/flare-voice/SKILL.md) |
| New chapter or catalog entry | [`.cursor/skills/flare-blocks/SKILL.md`](./.cursor/skills/flare-blocks/SKILL.md) |
| Visual quality of chrome or a new chapter | [`.cursor/skills/design-taste-frontend/SKILL.md`](./.cursor/skills/design-taste-frontend/SKILL.md) |
| Lift existing chrome (not chapter internals) | [`.cursor/skills/redesign-existing/SKILL.md`](./.cursor/skills/redesign-existing/SKILL.md) |
| Official GSAP in Svelte 5 | [`.cursor/skills/gsap-svelte/SKILL.md`](./.cursor/skills/gsap-svelte/SKILL.md) |
| Runes, `$effect`, `$props` | [`.cursor/skills/svelte-5/SKILL.md`](./.cursor/skills/svelte-5/SKILL.md) |

## Stack

- Svelte 5 + SvelteKit. TypeScript.
- Tailwind v4 via `@tailwindcss/vite`.
- Official `gsap` + `gsap.context()` cleanup for pin, scrub, kinetic type, and horizontal hijack. CSS + `svelte/transition` for cheap hover and fade.
- No `framer-motion`. No `motion/react`. No `motion-sv`. No shared primitive kit. No registry add.

## Do not

- Do not invent slugs. Recorte 1 is the six named chapters.
- Do not add a CLI, registry, or shared `Button`.
- Do not name other products or sibling projects in any file you write.
- Do not define Flare by comparison.
