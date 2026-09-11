<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';
	import { CHAPTER_STILLS, blocks } from '$lib/catalog';
	import { hideHoverCard, hoverCard } from './hover-preview.svelte';

	const block = $derived(blocks.find((item) => item.slug === hoverCard.slug));
	const open = $derived(Boolean(block) && !prefersReducedMotion.current);

	const enter = $derived({
		x: prefersReducedMotion.current ? 0 : 8,
		y: 0,
		duration: prefersReducedMotion.current ? 0 : 150
	});
	const exit = $derived({
		duration: prefersReducedMotion.current ? 0 : 100
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) hideHoverCard();
	}

	function portal(node: HTMLElement) {
		const home = node.parentNode;
		const marker = document.createComment('flare-hover');
		home?.insertBefore(marker, node);
		node.style.setProperty('position', 'fixed', 'important');
		node.style.setProperty('z-index', '400', 'important');
		document.body.appendChild(node);
		return () => {
			marker.parentNode?.insertBefore(node, marker);
			marker.remove();
		};
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if open && block}
	<div
		{@attach portal}
		class="flare-chrome hover-card"
		data-hover-preview
		style:position="fixed"
		style:z-index="400"
		style:top="{hoverCard.y}px"
		style:left="{hoverCard.x}px"
		in:fly={enter}
		out:fade={exit}
		aria-hidden="true"
	>
		<img src={CHAPTER_STILLS[block.slug]} alt="" width="320" height="180" />
		<div class="meta">
			<span class="name">{block.name}</span>
			<span class="kind">SCROLL</span>
		</div>
	</div>
{/if}

<style>
	.hover-card {
		position: fixed;
		z-index: 400;
		isolation: isolate;
		width: 320px;
		overflow: hidden;
		pointer-events: none;
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		background: var(--color-card);
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
	}

	img {
		display: block;
		width: 320px;
		height: 180px;
		object-fit: cover;
		background: var(--color-ink);
	}

	.meta {
		display: flex;
		height: 56px;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0 0.85rem;
	}

	.name {
		overflow: hidden;
		font-family: var(--font-body);
		font-size: 13px;
		color: var(--color-paper);
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.kind {
		flex-shrink: 0;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		color: var(--color-ember);
		text-transform: uppercase;
	}

	@media (hover: none), (pointer: coarse) {
		.hover-card {
			display: none;
		}
	}
</style>
