<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import { fade, fly } from 'svelte/transition';

	let {
		open,
		name,
		still,
		x,
		y,
		onclose
	}: {
		open: boolean;
		name: string;
		still: string;
		x: number;
		y: number;
		onclose?: () => void;
	} = $props();

	const enter = $derived({
		y: prefersReducedMotion.current ? 0 : 4,
		duration: prefersReducedMotion.current ? 0 : 150
	});
	const exit = $derived({
		duration: prefersReducedMotion.current ? 0 : 100
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			onclose?.();
		}
	}

	function portal(node: HTMLElement) {
		document.body.appendChild(node);
		return () => {
			node.remove();
		};
	}
</script>

<svelte:window onkeydown={onKeydown} />

{#if open && still}
	<div
		{@attach portal}
		class="flare-chrome hover-card"
		style:top="{y}px"
		style:left="{x}px"
		in:fly={enter}
		out:fade={exit}
		aria-hidden="true"
	>
		<img src={still} alt="" width="320" height="180" />
		<div class="meta">
			<span class="name">{name}</span>
			<span class="kind">SCROLL</span>
		</div>
	</div>
{/if}

<style>
	.hover-card {
		position: fixed;
		z-index: var(--z-hover);
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
