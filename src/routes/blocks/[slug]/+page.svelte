<script lang="ts">
	import { getBlock } from '$lib/catalog';
	import CopyButton from '$lib/site/CopyButton.svelte';
	import CopyPanel from '$lib/site/CopyPanel.svelte';

	let { data } = $props();
	const block = $derived(getBlock(data.slug));
	const primary = $derived(block?.files[0] ?? null);
</script>

<svelte:head>
	<title>{data.name} - Flare</title>
</svelte:head>

{#if block && primary}
	<div
		class="flare-chrome sticky top-12 z-40 border-b border-white/8 bg-[#09090b]/90 backdrop-blur-md"
	>
		<div class="mx-auto flex h-12 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
			<p class="min-w-0 truncate text-sm text-[#8b8278]">
				<a href="/#catalog" class="hover:text-[#f5f0ea]">Blocks</a>
				<span class="mx-2 text-white/20">/</span>
				<span class="text-[#f5f0ea]">{block.name}</span>
			</p>
			<CopyButton source={primary.source} label="Copy {primary.name}" />
		</div>
	</div>

	<main class="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10">
		<p class="max-w-2xl text-[#a59c91]">{block.tagline}</p>
		<p class="mt-3 font-mono text-[12px] text-[#8b8278]">
			{#if block.extraDep}
				Needs <span class="text-[#f5f0ea]">{block.extraDep}</span>
			{:else}
				No extra packages. Paste the file into SvelteKit 5 + Tailwind v4.
			{/if}
		</p>

		<div class="mt-6 overflow-hidden rounded-xl border border-white/8">
			<block.component />
		</div>

		<div class="mt-8 space-y-4">
			{#each block.files as file (file.name)}
				<CopyPanel filename={file.name} source={file.source} />
			{/each}
		</div>
	</main>
{/if}
