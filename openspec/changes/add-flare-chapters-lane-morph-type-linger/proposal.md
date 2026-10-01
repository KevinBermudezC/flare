## Why

Flare ships six scroll chapters. Two gestures are still missing: a pinned stage whose horizontal lane and type remap on the same scrub, and stacked rooms whose letters linger while the next title forms. The catalog grows from six to eight. The product shape stays the same: live preview, copy the `.svelte`.

## What Changes

- Two chapters under `src/blocks/<slug>/`, each a single copyable `.svelte` (tiny colocated helpers only if one paste still needs them)
- Catalog metadata and raw sources in `src/lib/catalog.ts` (`?raw`), order 7 and 8 after the existing six
- Home catalog rows, Chapters sidebar (Start / Introduction and the Chapters list), sitemap, and chapter meta/OG entries updated for eight chapters
- Schematic stills at `static/stills/lane-morph.webp` and `static/stills/type-linger.webp`
- Official `gsap` + ScrollTrigger for pin, scrub, lane travel, and letter morph
- Copy that still says "six chapters" updated to eight where it counts the roster

### `lane-morph` · Lane Morph

One-liner: Stage pins. The lane walks. Type remaps with the scrub.

Chip: Pin. Track walks. Type morphs.

- Full-viewport stage pins. Scrub range about 300-460vh.
- Horizontal plate track (4-5 plates) driven by vertical progress.
- Type remaps on that same scrub (weight, tracking, letter tension). Opacity fade alone is not the morph.
- Active plate: ember outline and Mono `FIG 0n` / `0n/0N`.
- Distinct from `lane-scrub` (no type remap) and `chapter-pin` (no horizontal lane).
- `prefers-reduced-motion`: hard cuts, no pin, discrete plates or a static first plate, instant type.

### `type-linger` · Type Linger

One-liner: Rooms stack. Letters linger as the next title forms.

Chip: Letters stay. The next word forms.

- Three full-viewport stacked rooms. Titles CHARGE, HOLD, RELEASE (first title may follow the edit knob).
- Between rooms, letter-by-letter morph. Leftover glyphs linger while the next title forms.
- Mono progress `01` / `02` / `03` and an ember tick on the active room.
- Distinct from `type-charge` (one glyph charge) and from wipe or fade title swaps.
- `prefers-reduced-motion`: instant title swap, no leftover animation.

## Capabilities

### New Capabilities

- `lane-morph`: Pinned stage, horizontal plate track, and type remap on one scrub, plus reduced motion.
- `type-linger`: Stacked rooms, letter leftovers between titles, Mono progress, plus reduced motion.
- `chapter-roster`: Catalog, stills, sidebar, sitemap, and meta list eight chapters in the locked order.

### Modified Capabilities

- None. Main specs under `openspec/specs/` are not present yet. Recorte 1 stays in `establish-flare-gallery` and is not rewritten.

## Impact

- `src/blocks/lane-morph/LaneMorph.svelte` and `src/blocks/type-linger/TypeLinger.svelte`
- `src/lib/catalog.ts`, `src/lib/site/ChapterPlayground.svelte`, `src/lib/site/seo.ts`
- Home catalog, `/chapters` introduction copy, `README.md`, `static/llm.txt`
- `static/stills/lane-morph.webp`, `static/stills/type-linger.webp`
- OG image paths for the two new slugs so chapter meta does not 404
- No new npm dependency. `gsap` is already the motion runtime.
- No CLI, registry, or shared `Button`. No third chapter.

## Non-goals

- Not a design system
- Not an npm kit
- No CLI
- No registry
- No shared `Button`
- No route morph or shared-element work
- No third chapter in this change
- Archive only after merge, in a follow-up chore
