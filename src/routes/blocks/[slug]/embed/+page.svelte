<script lang="ts">
	import { getBlock } from '$lib/catalog';

	let { data } = $props();
	const block = $derived(getBlock(data.slug));
</script>

<svelte:head>
	<title>{data.name} preview · Flare</title>
</svelte:head>

{#if block}
	<div class="embed">
		<block.component />
	</div>
{/if}

<style>
	.embed {
		min-height: 100svh;
		background: #09090b;
	}

	.embed :global(section) {
		min-height: 100svh;
	}
</style>
