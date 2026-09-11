import { blocks, type ChapterSlug } from '$lib/catalog';

export const HOME_TITLE = 'Flare · Preview. Copy. Chapters.';
export const HOME_DESCRIPTION =
	'Svelte 5 scroll chapters. Live preview. Copy the `.svelte`. Six gestures: pin, scrub, masthead, type, mask, deck.';

export const CHAPTERS_TITLE = 'Flare · Chapters';
export const CHAPTERS_DESCRIPTION =
	'Browse six Flare chapters. Preview each gesture live, then copy the `.svelte` into your project.';
export const INTRO_DESCRIPTION =
	'Flare is a gallery of scroll chapters for Svelte 5. Open a chapter, watch the motion, copy the file. Preview. Copy. Chapters.';

export const CHAPTER_TITLES: Record<ChapterSlug, string> = {
	'split-masthead': 'Flare · Split Masthead',
	'type-charge': 'Flare · Type Charge',
	'lane-scrub': 'Flare · Lane Scrub',
	'chapter-pin': 'Flare · Chapter Pin',
	'mask-reveal': 'Flare · Mask Reveal',
	'deck-pin': 'Flare · Deck Pin'
};

export const OG = {
	home: '/og/og-home.png',
	chapters: '/og/og-chapters.png',
	fallback: '/og/og-fallback.png'
} as const;

const CHAPTER_OG: Record<ChapterSlug, string> = {
	'split-masthead': '/og/og-split-masthead.png',
	'type-charge': '/og/og-type-charge.png',
	'lane-scrub': '/og/og-lane-scrub.png',
	'chapter-pin': '/og/og-chapter-pin.png',
	'mask-reveal': '/og/og-mask-reveal.png',
	'deck-pin': '/og/og-deck-pin.png'
};

export function chapterTitle(slug: ChapterSlug): string {
	return CHAPTER_TITLES[slug];
}

export function chapterDescription(slug: ChapterSlug): string {
	const block = blocks.find((item) => item.slug === slug);
	const line = block?.tagline ?? 'Preview. Copy.';
	return `${line} Preview live. Copy the \`.svelte\`.`;
}

export function chapterOg(slug: ChapterSlug): string {
	return CHAPTER_OG[slug];
}

export function canonicalPath(pathname: string): string {
	if (pathname !== '/' && pathname.endsWith('/')) return pathname.slice(0, -1);
	return pathname;
}

export function absoluteUrl(origin: string, path: string): string {
	return new URL(path, origin).href;
}

export const PUBLIC_PATHS = [
	'/',
	'/chapters',
	...blocks.map((block) => `/chapters/${block.slug}`)
] as const;
