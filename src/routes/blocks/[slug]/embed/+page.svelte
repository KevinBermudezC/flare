<script lang="ts">
	import { getBlock } from '$lib/catalog';

	let { data } = $props();
	const block = $derived(getBlock(data.slug));
</script>

<svelte:head>
	<title>{data.name} preview - Flare</title>
</svelte:head>

{#if block}
	<div class="embed">
		<block.component />
	</div>
{/if}

<style>
	.embed {
		background: #09090b;
	}
</style>
