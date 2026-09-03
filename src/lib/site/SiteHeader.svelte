<script lang="ts">
	import { page } from '$app/state';

	const onCatalog = $derived(page.url.pathname === '/');
</script>

<header
	class="flare-chrome sticky top-0 z-50 border-b border-white/8 bg-[#09090b]"
>
	<div class="mx-auto flex h-[52px] max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6">
		<a href="/" class="text-[15px] font-semibold tracking-tight text-[#f5f0ea]">Flare</a>
		<nav class="flex items-center gap-5">
			<a
				class="text-[13px] {onCatalog ? 'text-[#ff5a1f]' : 'text-[#c4bbb0] hover:text-[#f5f0ea]'}"
				href="/#catalog"
			>
				Chapters
			</a>
			<a
				class="rounded-[12px] bg-[#ff5a1f] px-3 py-1.5 font-mono text-[11px] text-[#1a0703]"
				href="https://github.com/KevinBermudezC/flare"
			>
				GitHub
			</a>
		</nav>
	</div>
</header>
