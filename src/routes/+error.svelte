<script lang="ts">
	import { page } from '$app/state';
</script>

<main class="mx-auto max-w-3xl px-6 py-24">
	<p class="font-mono text-[11px] text-[#ff5a1f]">{page.status}</p>
	<h1 class="mt-3 text-3xl font-semibold tracking-tight">This page is not a block.</h1>
	<p class="mt-3 text-[#a59c91]">{page.error?.message ?? 'Nothing here.'}</p>
	<p class="mt-8">
		<a href="/" class="text-[#f5f0ea] underline underline-offset-4">Back to the gallery</a>
	</p>
</main>
