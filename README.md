# Flare

Preview. Copy the `.svelte`. It's yours.

A Svelte 5 gallery of **marketing + motion blocks**. Live previews, not screenshots. Paste a file into your app and it renders.

This is **not** a design system. **Not** shadcn. **Not** Tangram. **Not** an npm kit. No CLI, no registry, no shared `Button`.

## Run

```sh
pnpm i && pnpm dev
```

That’s the gallery. Click a block, watch it move, copy the source.

## Use a block

1. Open a block page (or `src/blocks/<name>/`).
2. Copy the `.svelte` file.
3. Paste it into a SvelteKit 5 + Tailwind v4 app and render it.

Each folder is independent. No cross-imports. No `$lib/ui`. No extra packages unless a block page says `pnpm add …`.

## Blocks

| Folder | What you get |
| --- | --- |
| `hero-spotlight` | First screen: grid + spotlight + headline + 2 CTAs |
| `hero-beams` | Beams, console chrome, dev-tool look |
| `logo-marquee` | Trusted-by, two rows, pause on hover |
| `bento-features` | Five cells, one with hover motion |
| `testimonials-marquee` | Two rows of social proof |
| `infinite-cards` | Feature / use-case cards in a loop |
| `card-spotlight` | Card with mouse spotlight (drop it in a bento) |
| `loaders` | Spinner, dots, bar, multi-step |
| `sticky-scroll` | Features that stick and reveal on scroll |
| `text-flip` | Rotating word in a headline |

Motion is CSS + `svelte/transition`. `prefers-reduced-motion` keeps layout intact.

## Contribute

Non-trivial work starts with an OpenSpec proposal. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

MIT
