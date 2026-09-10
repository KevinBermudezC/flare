<script lang="ts">
	import { fly } from 'svelte/transition';

	let {
		open,
		name,
		still,
		x,
		y
	}: {
		open: boolean;
		name: string;
		still: string;
		x: number;
		y: number;
	} = $props();
</script>

{#if open && still}
	<div
		class="flare-chrome hover-card"
		style:top="{y}px"
		style:left="{x}px"
		in:fly={{ y: 4, duration: 150 }}
		aria-hidden="true"
	>
		<img src={still} alt="" width="280" height="160" />
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
		width: 280px;
		overflow: hidden;
		pointer-events: none;
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		background: var(--color-card);
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
	}

	img {
		display: block;
		width: 280px;
		height: 160px;
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
</style>
