# Flare

Preview. Copy the `.svelte`. It's yours.

A Svelte 5 gallery of **scroll chapters**. Live preview. Copy the `.svelte`.

This is **not** a design system. **Not** an npm kit. No CLI, no registry, no shared `Button`.

## Run

```sh
pnpm i && pnpm dev
```

That's the gallery. Scroll a chapter. Copy the source.

## Use a chapter

1. Open a chapter page (or `src/blocks/<slug>/`).
2. Copy the `.svelte` file.
3. Paste it into a SvelteKit 5 + Tailwind v4 app, run `pnpm add gsap`, and render it.

Each folder is independent. No cross-imports. No `$lib/ui`. Recorte 1 chapters need official `gsap` (ScrollTrigger is in that package). `prefers-reduced-motion` keeps the chapter readable.

## Chapters

| Folder | What you get |
| --- | --- |
| `split-masthead` | Oversized split type. The frame holds, then it parts. |
| `type-charge` | Kinetic type that charges the line as you scroll. |
| `lane-scrub` | Vertical scroll drives a horizontal lane. |
| `chapter-pin` | Pinned rooms that zoom as the next one arrives. |
| `mask-reveal` | Type as a mask. The cut opens on scroll. |
| `deck-pin` | Cards that stick and stack. |

## Deploy

Connect this GitHub repo to Vercel. Root = repo. Framework = SvelteKit. Install command = `pnpm i`. Preview deploys come from that GitHub integration.

## Contribute

Non-trivial work starts with an OpenSpec proposal. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
