## Context

Recorte 1 is six copyable chapters under `src/blocks/`. Each file owns its GSAP setup, imports nothing from `$lib`, and pastes into SvelteKit 5 + Tailwind v4 with `pnpm add gsap`. The gallery registers them in `src/lib/catalog.ts`, mounts them from `ChapterPlayground.svelte`, and prerenders `/chapters/<slug>` plus `/chapters/<slug>/embed` from that list. Stills live at `static/stills/<slug>.webp`. Chapter meta titles and OG paths are `Record<ChapterSlug, string>` in `src/lib/site/seo.ts`. Sitemap paths come from `PUBLIC_PATHS`.

This change adds `lane-morph` and `type-linger` in that same shape. Motion stays official `gsap` + ScrollTrigger inside `gsap.context()`, reverted from `$effect`.

## Goals / Non-Goals

**Goals:**

- Ship two new scroll chapters with live preview, copy, stills, and catalog order 7 and 8.
- Lane Morph pins a full-viewport stage, walks a 4-5 plate track on vertical scrub (about 300-460vh), and remaps type on that same progress.
- Type Linger stacks three full-viewport rooms and morphs titles letter by letter so leftovers linger while the next word forms.
- Reduced motion keeps a readable chapter: hard cuts, no pin, no leftover tween.
- Paste contract: one `.svelte` per chapter, zero `$lib` imports, zero cross-chapter imports.

**Non-Goals:**

- Rewriting `establish-flare-gallery` or the six Recorte 1 chapters.
- A third chapter, a shared Button, a CLI, a registry, or an npm kit.
- Route morph / shared-element transitions.
- A custom cursor or pointer trail.
- A Replay control on the chapter playground.
- Archiving this change before merge.

## Decisions

1. **One file per chapter.** `LaneMorph.svelte` and `TypeLinger.svelte` hold markup, motion, and styles. Helpers stay out unless a paste would otherwise need a second file. Rationale: the copy contract is one paste. Alternative: split motion into a `.ts` sibling. Rejected because the visitor copies one file.

2. **GSAP ScrollTrigger pin + scrub.** Lane Morph pins the stage with `end` around `+=380%` (inside 300-460vh) and tweens the plate track `x` with `ease: 'none'` and `scrub`. Type weight, tracking, and per-letter swap are driven by the same progress. Type Linger pins the title layer across three stacked rooms (or pins the stack) and maps progress to a letter model: incoming glyphs form while outgoing glyphs stay until late in the segment. Rationale: pin, scrub, and kinetic type are the existing runtime. Alternative: CSS `animation-timeline`. Rejected for letter-level remap that must stay in the copied file and match the other chapters' cleanup.

3. **Letter state from ScrollTrigger `onUpdate`, track `x` from a tween.** The active plate index and the visible glyphs update from scroll progress, matching `lane-scrub`'s playhead. The horizontal track itself is a transform tween so layout properties stay still. Rationale: a handful of glyphs can follow progress without a scroll listener. Alternative: opacity crossfade between two titles. Rejected because the brief forbids fade-only swaps.

4. **Reduced motion skips the context.** `reduceMotion` prop or `prefers-reduced-motion: reduce` returns before `gsap.context()`. Lane Morph shows discrete full-viewport plates (native scroll, no pin) with each plate's word already set. Type Linger shows three stacked rooms, each with its finished title. Rationale: the chapter stays readable and tall enough to scan.

5. **Catalog kinds stay on the existing union.** `lane-morph` uses kind `lane` and edit field `word` (default `LANE`). `type-linger` uses kind `type` and edit field `word` (default `CHARGE`). The edit knob replaces the first word. Later words stay WALK / BEND / HOLD / COPY for the lane, and HOLD / RELEASE for the rooms. Rationale: `EditField` and `ChapterKind` already cover this. No new knob type.

6. **Playground exhausts `ChapterSlug`.** `ChapterPlayground.svelte` switches on slug and ends in a `never` default so a new slug fails `pnpm check` until it is mounted.

7. **Stills and OG.** Copy the schematic stills to `static/stills/lane-morph.webp` and `static/stills/type-linger.webp`. Add `CHAPTER_TITLES` and `CHAPTER_OG` entries. New OG pngs follow the existing ink card (mark, name, one-liner) so chapter meta does not point at a missing file. Home row count already derives from `blocks.length`.

8. **Roster copy.** Strings that count the catalog ("Six chapters") become eight in the introduction, home inside card, README table, `static/llm.txt`, and SEO descriptions. The sidebar already loops `blocks`, so new slugs appear under Chapters without a second list.

## Risks / Trade-offs

- [Risk] Per-frame glyph updates from `onUpdate` re-render the title. → Keep the model to a short letter list and leave plate travel on a transform tween.
- [Risk] Pin distance inside an iframe depends on the chapter's own height, as with the current pins. → Measure travel from the chapter root, use `invalidateOnRefresh`, refresh after `document.fonts.ready`.
- [Risk] An edited word with a different length makes the letter remap uneven. → Slot count is the max length of the two words in the active segment. Empty slots collapse.
- [Risk] OG cards for the new slugs are new assets, not a regeneration of the home card. → Chapter pages get their own png. The shared chapters card can stay the existing file.
- [Trade-off] GSAP setup is duplicated again. That is the independence rule.

## Migration Plan

1. Land the OpenSpec change and the two chapters in one PR.
2. `openspec validate add-flare-chapters-lane-morph-type-linger` and `pnpm check` / `pnpm build`.
3. Rollback is reverting the PR. No data migration.
4. Archive this change only after merge.

## Open Questions

None. Plate count is five. Room titles are CHARGE, HOLD, RELEASE. Scrub length for Lane Morph is about 380vh.
