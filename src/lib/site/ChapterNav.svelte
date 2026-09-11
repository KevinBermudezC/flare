<script lang="ts">
	import { goto } from '$app/navigation';
	import { prefersReducedMotion } from 'svelte/motion';
	import { blocks, type ChapterSlug } from '$lib/catalog';
	import { hideHoverCard, hoverCard, showHoverCard } from './hover-preview.svelte';

	let { current = null }: { current?: ChapterSlug | null } = $props();

	const previewGap = 8;
	const selected = $derived(current ?? 'introduction');

	let allowHover = $state(false);
	const allowCard = $derived(allowHover && !prefersReducedMotion.current);
	let openTimer = 0;
	let closeTimer = 0;

	$effect(() => {
		if (!allowCard) hideHoverCard();
	});

	$effect(() => {
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
		const coarse = window.matchMedia('(pointer: coarse)');

		const sync = () => {
			allowHover = fine.matches && !coarse.matches;
			if (!allowHover || prefersReducedMotion.current) hideHoverCard();
		};

		sync();
		fine.addEventListener('change', sync);
		coarse.addEventListener('change', sync);

		return () => {
			fine.removeEventListener('change', sync);
			coarse.removeEventListener('change', sync);
			window.clearTimeout(openTimer);
			window.clearTimeout(closeTimer);
			hideHoverCard();
		};
	});

	function place(el: HTMLElement, slug: ChapterSlug) {
		const row = el.getBoundingClientRect();
		showHoverCard(slug, row.right + previewGap, row.top);
	}

	function closePreview() {
		window.clearTimeout(openTimer);
		window.clearTimeout(closeTimer);
		closeTimer = window.setTimeout(() => {
			hideHoverCard();
		}, 120);
	}

	function onEnter(slug: ChapterSlug, el: HTMLElement) {
		if (slug === current || !allowCard) return;
		window.clearTimeout(openTimer);
		window.clearTimeout(closeTimer);
		if (hoverCard.slug) {
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
			<optgroup label="Start">
				<option value="introduction">Introduction</option>
			</optgroup>
			<optgroup label="Chapters">
				{#each blocks as item (item.slug)}
					<option value={item.slug}>{item.name}</option>
				{/each}
			</optgroup>
		</select>
	</label>

	<aside class="rail">
		<nav aria-label="Chapters">
			<div class="group">
				<p class="section">Start</p>
				<a
					href="/chapters"
					class="row"
					class:current={current === null}
					aria-current={current === null ? 'page' : undefined}
				>
					Introduction
				</a>
			</div>
			<div class="group">
				<p class="section">Chapters</p>
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
			</div>
		</nav>
	</aside>
</div>

<style>
	.nav-stack {
		flex: 1 1 100%;
		align-self: flex-start;
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
		z-index: 1;
		display: none;
		width: var(--sidebar-w);
		height: calc(100dvh - var(--nav-h));
		max-height: calc(100dvh - var(--nav-h));
		min-height: 0;
		flex-shrink: 0;
		align-self: flex-start;
		flex-direction: column;
		overflow: visible;
		padding: 1.25rem 0.85rem;
		border-right: 1px solid var(--color-hairline);
		background: var(--color-ink);
		box-sizing: border-box;
	}

	nav {
		display: flex;
		flex-direction: column;
		gap: 1.45rem;
	}

	.group {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.section {
		margin: 0 0 0.2rem;
		padding: 0 0.7rem;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #8b8278;
		pointer-events: none;
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
