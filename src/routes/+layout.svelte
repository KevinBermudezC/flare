<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import SiteHeader from '$lib/site/SiteHeader.svelte';
	import './layout.css';

	let { children } = $props();
	const embed = $derived(page.url.pathname.includes('/embed'));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Flare</title>
</svelte:head>

{#if embed}
	{@render children()}
{:else}
	<div class="min-h-svh bg-[#09090b]">
		<SiteHeader />
		{@render children()}
	</div>
{/if}
