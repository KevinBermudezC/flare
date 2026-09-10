<script lang="ts">
	import { goto } from '$app/navigation';
	import { blocks, CHAPTER_STILLS, type ChapterSlug } from '$lib/catalog';
	import HoverPreview from './HoverPreview.svelte';

	let { current = null }: { current?: ChapterSlug | null } = $props();

	const previewW = 280;
	const previewH = 216;
	const previewGap = 8;
	const selected = $derived(current ?? 'introduction');

	let allowHover = $state(false);
	let hoverSlug = $state<ChapterSlug | null>(null);
	let cardX = $state(0);
	let cardY = $state(0);
	let openTimer = 0;

	const hovered = $derived(blocks.find((block) => block.slug === hoverSlug));

	$effect(() => {
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
		const coarse = window.matchMedia('(pointer: coarse)');
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

		const sync = () => {
			allowHover = fine.matches && !coarse.matches && !reduce.matches;
			if (!allowHover) hoverSlug = null;
		};

		sync();
		fine.addEventListener('change', sync);
		coarse.addEventListener('change', sync);
		reduce.addEventListener('change', sync);

		return () => {
			fine.removeEventListener('change', sync);
			coarse.removeEventListener('change', sync);
			reduce.removeEventListener('change', sync);
			window.clearTimeout(openTimer);
		};
	});

	function place(el: HTMLElement, slug: ChapterSlug) {
		const row = el.getBoundingClientRect();
		const pad = 8;
		let x = row.right + previewGap;
		let y = row.top + row.height / 2 - previewH / 2;
		y = Math.min(Math.max(pad, y), window.innerHeight - previewH - pad);
		if (x + previewW > window.innerWidth - pad) {
			x = Math.max(pad, row.left - previewW - previewGap);
		}
		cardX = x;
		cardY = y;
		hoverSlug = slug;
	}

	function closePreview() {
		window.clearTimeout(openTimer);
		hoverSlug = null;
	}

	function onEnter(slug: ChapterSlug, el: HTMLElement) {
		if (slug === current || !allowHover) return;
		window.clearTimeout(openTimer);
		if (hoverSlug) {
			place(el, slug);
			return;
		}
		openTimer = window.setTimeout(() => place(el, slug), 280);
	}

	function onSwitch(event: Event) {
		const next = (event.currentTarget as HTMLSelectElement).value;
		if (next === 'introduction') {
			if (current !== null) void goto('/chapters');
			return;
		}
		if (next && next !== current) {
			void goto(`/chapters/${next}`);
		}
	}
</script>

<div class="nav-stack">
	<label class="switcher">
		<span>Chapter</span>
		<select value={selected} onchange={onSwitch}>
			<option value="introduction">Introduction</option>
			{#each blocks as item (item.slug)}
				<option value={item.slug}>{item.name}</option>
			{/each}
		</select>
	</label>

	<aside class="rail">
		<p class="kicker">Chapters</p>
		<nav aria-label="Chapters">
			<a
				href="/chapters"
				class="row"
				class:current={current === null}
				aria-current={current === null ? 'page' : undefined}
			>
				Introduction
			</a>
			{#each blocks as item (item.slug)}
				<a
					href="/chapters/{item.slug}"
					class="row"
					class:current={item.slug === current}
					aria-current={item.slug === current ? 'page' : undefined}
					onmouseenter={(event) => onEnter(item.slug, event.currentTarget)}
					onmouseleave={closePreview}
				>
					{item.slug}
				</a>
			{/each}
		</nav>
		{#if allowHover}
			<HoverPreview
				open={Boolean(hovered)}
				name={hovered?.name ?? ''}
				still={hovered ? CHAPTER_STILLS[hovered.slug] : ''}
				x={cardX}
				y={cardY}
				onclose={closePreview}
			/>
		{/if}
	</aside>
</div>

<style>
	.nav-stack {
		flex: 1 1 100%;
		min-width: 0;
	}

	.switcher {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-height: 52px;
		padding: 0.55rem 1rem;
		border-bottom: 1px solid var(--color-hairline);
		background: var(--color-ink);
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #8b8278;
	}

	select {
		flex: 1;
		min-width: 0;
		min-height: 44px;
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		background: var(--color-card);
		padding: 0 0.75rem;
		font-family: var(--font-display);
		font-size: 14px;
		font-weight: 600;
		letter-spacing: -0.02em;
		text-transform: none;
		color: var(--color-paper);
	}

	select:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 2px;
	}

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
		.nav-stack {
			flex: 0 0 auto;
			display: contents;
		}

		.switcher {
			display: none;
		}

		.rail {
			display: flex;
		}
	}
</style>
