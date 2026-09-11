<script lang="ts">
	import { page } from '$app/state';
	import SeoHead from '$lib/site/SeoHead.svelte';
	import { OG } from '$lib/site/seo';

	const status = $derived(page.status);
	const title = $derived(status === 404 ? 'Flare · Not a chapter' : `Flare · ${status}`);
	const description = $derived(
		status === 404
			? 'This page is not a chapter. Open Chapters or go home.'
			: (page.error?.message ?? 'Nothing here.')
	);
</script>

<SeoHead {title} {description} image={OG.fallback} index={false} />

<div class="miss">
	<p class="kicker">{status}</p>
	<h1>This page is not a chapter.</h1>
	<p class="lead">{description}</p>
	<nav class="actions" aria-label="Find a chapter">
		<a class="chapters" href="/chapters">Chapters</a>
		<a class="home" href="/">Home</a>
	</nav>
</div>

<style>
	.miss {
		min-height: calc(100dvh - var(--nav-h));
		padding: 4rem 1rem 5rem;
		background: var(--color-ink);
	}

	.kicker {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ember);
	}

	h1 {
		margin: 0.85rem 0 0;
		max-width: 16ch;
		font-family: var(--font-display);
		font-size: clamp(2rem, 6vw, 3.5rem);
		font-weight: 600;
		line-height: 0.95;
		letter-spacing: -0.04em;
		color: var(--color-paper);
	}

	.lead {
		margin: 1rem 0 0;
		max-width: 36rem;
		font-family: var(--font-body);
		font-size: 16px;
		line-height: 1.5;
		color: #a59c91;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.85rem 1.15rem;
		margin-top: 2rem;
	}

	.chapters,
	.home {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 0 1.15rem;
		border-radius: 999px;
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 500;
		text-decoration: none;
	}

	.chapters {
		border: 1px solid var(--color-ember);
		color: var(--color-ember);
	}

	.chapters:hover {
		background: color-mix(in oklab, var(--color-ember) 16%, transparent);
	}

	.home {
		border: 1px solid var(--color-hairline);
		color: var(--color-paper);
	}

	.home:hover {
		color: var(--color-ember);
	}

	.chapters:focus-visible,
	.home:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 2px;
	}

	@media (min-width: 900px) {
		.miss {
			padding: 5.5rem 1.5rem 6rem;
		}
	}
</style>
