<script lang="ts">
	let { compact = false }: { compact?: boolean } = $props();
</script>

<header
	class="flare-chrome sticky top-0 z-50 border-b border-white/8 bg-[#09090b]/90 backdrop-blur-md"
>
	<div class="mx-auto flex h-12 max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6">
		<a href="/" class="flex items-center gap-2.5 text-[#f5f0ea]">
			<span class="grid size-6 place-items-center rounded-sm bg-[#ff5a1f] text-[#1a0703]">
				<svg viewBox="0 0 16 16" class="size-3" aria-hidden="true">
					<path
						d="M8 1.5 9.2 6.2 14 8l-4.8 1.8L8 14.5 6.8 9.8 2 8l4.8-1.8L8 1.5Z"
						fill="currentColor"
					/>
				</svg>
			</span>
			<span class="text-[13px] font-semibold tracking-tight">Flare</span>
		</a>
		<nav class="flex items-center gap-5">
			{#if !compact}
				<a
					class="hidden text-[13px] text-[#c4bbb0] hover:text-[#f5f0ea] sm:inline"
					href="/#catalog"
				>
					Chapters
				</a>
			{/if}
			<a
				class="font-mono text-[11px] text-[#c4bbb0] underline-offset-4 hover:text-[#f5f0ea] hover:underline"
				href="https://github.com/KevinBermudezC/flare"
			>
				GitHub
			</a>
		</nav>
	</div>
</header>
