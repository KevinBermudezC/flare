<script lang="ts">
	import { page } from '$app/state';
	import { absoluteUrl, canonicalPath } from './seo';

	let {
		title,
		description,
		image,
		index = true
	}: {
		title: string;
		description: string;
		image: string;
		index?: boolean;
	} = $props();

	const canonical = $derived(absoluteUrl(page.url.origin, canonicalPath(page.url.pathname)));
	const ogImage = $derived(absoluteUrl(page.url.origin, image));
	const robots = $derived(index ? 'index, follow' : 'noindex, nofollow');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={robots} />
	<link rel="canonical" href={canonical} />
	<meta property="og:site_name" content="Flare" />
	<meta property="og:type" content="website" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>
