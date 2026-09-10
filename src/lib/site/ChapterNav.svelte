<script lang="ts">
	import { blocks, CHAPTER_STILLS, type ChapterSlug } from '$lib/catalog';
	import HoverPreview from './HoverPreview.svelte';

	let { current }: { current: ChapterSlug } = $props();

	let allowHover = $state(false);
	let hoverSlug = $state<ChapterSlug | null>(null);
	let cardX = $state(0);
	let cardY = $state(0);
	let openTimer = 0;
	let closeTimer = 0;

	const hovered = $derived(blocks.find((block) => block.slug === hoverSlug));

	$effect(() => {
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

		const sync = () => {
			allowHover = fine.matches && !reduce.matches;
			if (!allowHover) hoverSlug = null;
		};

		sync();
		fine.addEventListener('change', sync);
		reduce.addEventListener('change', sync);

		return () => {
			fine.removeEventListener('change', sync);
			reduce.removeEventListener('change', sync);
			window.clearTimeout(openTimer);
			window.clearTimeout(closeTimer);
		};
	});

	function place(el: HTMLElement, slug: ChapterSlug) {
		const row = el.getBoundingClientRect();
		const cardH = 216;
		const cardW = 280;
		const pad = 8;
		let x = row.right + 12;
		let y = row.top;
		y = Math.min(Math.max(pad, y), window.innerHeight - cardH - pad);
		if (x + cardW > window.innerWidth - pad) {
			x = Math.max(pad, row.left - cardW - 12);
		}
		cardX = x;
		cardY = y;
		hoverSlug = slug;
	}

	function onEnter(slug: ChapterSlug, el: HTMLElement) {
		if (slug === current || !allowHover) return;
		window.clearTimeout(closeTimer);
		window.clearTimeout(openTimer);
		if (hoverSlug) {
			place(el, slug);
			return;
		}
		openTimer = window.setTimeout(() => place(el, slug), 280);
	}

	function onLeave() {
		window.clearTimeout(openTimer);
		closeTimer = window.setTimeout(() => {
			hoverSlug = null;
		}, 120);
	}
</script>

<aside class="rail">
	<p class="kicker">Chapters</p>
	<nav aria-label="Chapters">
		{#each blocks as item (item.slug)}
			<a
				href="/chapters/{item.slug}"
				class="row"
				class:current={item.slug === current}
				aria-current={item.slug === current ? 'page' : undefined}
				onmouseenter={(event) => onEnter(item.slug, event.currentTarget)}
				onmouseleave={onLeave}
			>
				{item.slug}
			</a>
		{/each}
	</nav>
	<HoverPreview
		open={Boolean(hovered)}
		name={hovered?.name ?? ''}
		still={hovered ? CHAPTER_STILLS[hovered.slug] : ''}
		x={cardX}
		y={cardY}
	/>
</aside>

<style>
	.rail {
		position: sticky;
		top: var(--nav-h);
		display: none;
		width: var(--sidebar-w);
		height: calc(100dvh - var(--nav-h));
		flex-shrink: 0;
		flex-direction: column;
		overflow: visible;
		padding: 1.25rem 0.85rem;
		border-right: 1px solid var(--color-hairline);
		background: var(--color-ink);
	}

	.kicker {
		margin: 0 0 0.85rem;
		padding: 0 0.7rem;
		font-family: var(--font-display);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.12em;
		color: var(--color-ember);
		text-transform: uppercase;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.row {
		border-radius: 8px;
		padding: 0.55rem 0.7rem;
		font-family: var(--font-body);
		font-size: 14px;
		color: #c4bbb0;
		text-decoration: none;
	}

	.row:hover {
		color: var(--color-paper);
	}

	.row.current {
		color: var(--color-ember);
	}

	.row:focus-visible {
		color: var(--color-ember);
		outline: 2px solid var(--color-ember);
		outline-offset: 2px;
	}

	@media (min-width: 1024px) {
		.rail {
			display: flex;
		}
	}
</style>
