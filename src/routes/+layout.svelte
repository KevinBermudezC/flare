<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import SiteShell from '$lib/site/SiteShell.svelte';
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
	<SiteShell>
		{@render children()}
	</SiteShell>
{/if}
