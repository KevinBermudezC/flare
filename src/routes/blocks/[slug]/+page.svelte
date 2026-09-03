<script lang="ts">
	import { getBlock } from '$lib/catalog';
	import CopyPanel from '$lib/site/CopyPanel.svelte';

	let { data } = $props();
	const block = $derived(getBlock(data.slug));
</script>

<svelte:head>
	<title>{data.name} · Flare</title>
</svelte:head>

{#if block}
	<main class="mx-auto max-w-6xl px-6 py-10">
		<p class="text-sm text-[#8b8278]">
			<a href="/" class="hover:text-[#f5f0ea]">All blocks</a>
			<span class="mx-2">/</span>
			<span>{block.name}</span>
		</p>
		<h1 class="mt-4 text-4xl font-semibold tracking-tight">{block.name}</h1>
		<p class="mt-2 max-w-2xl text-[#a59c91]">{block.tagline}</p>
		<p class="mt-3 font-mono text-[12px] text-[#8b8278]">
			{#if block.extraDep}
				Needs <span class="text-[#f5f0ea]">{block.extraDep}</span>
			{:else}
				No extra packages. Paste the file into SvelteKit 5 + Tailwind v4.
			{/if}
		</p>

		<div class="mt-8 overflow-hidden rounded-2xl border border-white/8">
			<block.component />
		</div>

		<div class="mt-8 space-y-4">
			{#each block.files as file (file.name)}
				<CopyPanel filename={file.name} source={file.source} />
			{/each}
		</div>
	</main>
{/if}
