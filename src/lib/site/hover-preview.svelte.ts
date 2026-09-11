import type { ChapterSlug } from '$lib/catalog';

export const hoverCard: {
	slug: ChapterSlug | null;
	x: number;
	y: number;
} = $state({
	slug: null,
	x: 0,
	y: 0
});

export function showHoverCard(slug: ChapterSlug, x: number, y: number) {
	hoverCard.slug = slug;
	hoverCard.x = x;
	hoverCard.y = y;
}

export function hideHoverCard() {
	hoverCard.slug = null;
}
