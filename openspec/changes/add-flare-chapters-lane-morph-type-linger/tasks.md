## 1. Stills and roster data

- [x] 1.1 Copy schematic stills to `static/stills/lane-morph.webp` and `static/stills/type-linger.webp`
- [x] 1.2 Register both chapters in `src/lib/catalog.ts` with `?raw`, order 7 and 8, taglines, and still paths
- [x] 1.3 Add chapter titles and OG paths in `src/lib/site/seo.ts`, and add OG pngs for both slugs

## 2. Lane Morph

- [x] 2.1 Add `src/blocks/lane-morph/LaneMorph.svelte`: pinned stage, 5-plate horizontal track, ember active plate, Mono `FIG 0n` / `0n/0N`
- [x] 2.2 Drive type remap from the same scrub (weight, tracking, letter tension), not an opacity fade alone
- [x] 2.3 Reduced motion: no pin, discrete plates or static first plate, settled type

## 3. Type Linger

- [x] 3.1 Add `src/blocks/type-linger/TypeLinger.svelte`: three stacked rooms, titles CHARGE / HOLD / RELEASE
- [x] 3.2 Letter-by-letter morph with leftover glyphs, Mono `01` / `02` / `03` and ember tick
- [x] 3.3 Reduced motion: instant finished titles, no leftover animation

## 4. Gallery wiring

- [x] 4.1 Mount both slugs in `ChapterPlayground.svelte` with an exhaustive slug switch
- [x] 4.2 Update introduction, home inside card, README, and `static/llm.txt` from six chapters to eight

## 5. Verify

- [x] 5.1 `openspec validate add-flare-chapters-lane-morph-type-linger`
- [x] 5.2 `pnpm check` and `pnpm build`
- [x] 5.3 Preview `/chapters/lane-morph` and `/chapters/type-linger` (and embeds) at gallery viewport widths
