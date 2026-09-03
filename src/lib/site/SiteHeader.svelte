<script lang="ts">
	let { compact = false }: { compact?: boolean } = $props();
</script>

<header class="border-b border-white/8 bg-[#09090b]/80 backdrop-blur-md">
	<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
		<a href="/" class="flex items-center gap-2.5 text-[#f5f0ea]">
			<span class="grid size-7 place-items-center rounded-md bg-[#ff5a1f] text-[#1a0703]">
				<svg viewBox="0 0 16 16" class="size-3.5" aria-hidden="true">
					<path d="M8 1.5 9.2 6.2 14 8l-4.8 1.8L8 14.5 6.8 9.8 2 8l4.8-1.8L8 1.5Z" fill="currentColor" />
				</svg>
			</span>
			<span class="text-sm font-semibold tracking-tight">Flare</span>
		</a>
		{#if !compact}
			<p class="hidden text-sm text-[#8b8278] sm:block">Preview. Copy the .svelte. It’s yours.</p>
		{/if}
		<a
			class="font-mono text-[11px] text-[#c4bbb0] underline-offset-4 hover:text-[#f5f0ea] hover:underline"
			href="https://github.com/KevinBermudezC/flare"
		>
			GitHub
		</a>
	</div>
</header>
