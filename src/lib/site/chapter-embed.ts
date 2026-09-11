import type { Accent } from './ChapterPlayground.svelte';

export type Viewport = 1440 | 768 | 390;

export function appliedViewportWidth(requested: Viewport, available: number): number {
	if (!Number.isFinite(available) || available <= 0) return requested;
	return Math.min(requested, Math.floor(available));
}

export function frameWidth(size: Viewport, available = 0): string {
	switch (size) {
		case 1440:
		case 768:
		case 390:
			if (available <= 0) return `min(${size}px, 100%)`;
			return `${appliedViewportWidth(size, available)}px`;
		default: {
			const _never: never = size;
			return _never;
		}
	}
}

export function viewportLabel(size: Viewport, available: number): string {
	return String(appliedViewportWidth(size, available));
}

export function chapterEmbedSrc(
	slug: string,
	opts: {
		title: string;
		accent: Accent;
		reduceMotion: boolean;
		replay?: number;
	}
): string {
	const q = new URLSearchParams();
	q.set('title', opts.title);
	q.set('accent', opts.accent);
	q.set('reduceMotion', opts.reduceMotion ? '1' : '0');
	if (opts.replay) q.set('replay', String(opts.replay));
	return `/chapters/${slug}/embed?${q.toString()}`;
}

export function readEmbedSearch(search: URLSearchParams): {
	title: string;
	accent: Accent;
	reduceMotion: boolean;
	replay: number;
} {
	const accentParam = search.get('accent');
	const reduce = search.get('reduceMotion');
	return {
		title: search.get('title') ?? '',
		accent: accentParam === 'paper' ? 'paper' : 'ember',
		reduceMotion: reduce === '1' || reduce === 'true',
		replay: Number(search.get('replay') ?? '0') || 0
	};
}
