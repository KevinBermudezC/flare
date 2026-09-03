<script lang="ts">
	import CopyButton from './CopyButton.svelte';

	let {
		slug,
		title,
		source = null
	}: {
		slug: string;
		title: string;
		source?: string | null;
	} = $props();
</script>

<div class="relative h-full w-full bg-[#09090b]">
	<div
		class="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center gap-2 border-b border-white/8 bg-[#0c0c0e]/90 px-3 py-1.5"
	>
		<span class="size-1.5 rounded-full bg-white/20"></span>
		<span class="size-1.5 rounded-full bg-white/20"></span>
		<span class="size-1.5 rounded-full bg-white/20"></span>
		<span class="ml-1 truncate font-mono text-[10px] tracking-wide text-[#8b8278]">{slug}.svelte</span>
	</div>
	<iframe
		title="{title} live preview"
		src="/blocks/{slug}/embed"
		class="pointer-events-none h-full w-full border-0 bg-[#09090b] pt-7"
		loading="lazy"
	></iframe>
	<a href="/blocks/{slug}" class="absolute inset-0 z-10" aria-label="Open {title}">
		<span class="sr-only">Open {title}</span>
	</a>
	{#if source}
		<div class="absolute top-9 right-3 z-20">
			<CopyButton {source} compact />
		</div>
	{/if}
</div>
