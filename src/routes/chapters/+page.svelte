<script lang="ts">
	import ChapterNav from '$lib/site/ChapterNav.svelte';
</script>

<svelte:head>
	<title>Introduction - Flare</title>
</svelte:head>

<div class="layout">
	<ChapterNav current="introduction" />

	<div class="main">
		<header class="head">
			<p class="crumb">
				<a href="/">FLARE</a>
				<span>/</span>
				<a href="/chapters">Chapters</a>
				<span>/</span>
				<span class="here">introduction</span>
			</p>
			<h1>Introduction</h1>
			<p class="tagline">Preview. Copy.</p>
			<p class="lede">Six scroll chapters.</p>
		</header>
	</div>
</div>

<style>
	.layout {
		display: flex;
		flex-wrap: wrap;
		min-height: calc(100dvh - var(--nav-h));
		background: var(--color-ink);
	}

	.main {
		min-width: 0;
		flex: 1 1 16rem;
	}

	.head {
		padding: 1.5rem 1rem 1.25rem;
		border-bottom: 1px solid var(--color-hairline);
	}

	.crumb {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin: 0 0 1rem;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		color: #8b8278;
	}

	.crumb a {
		color: #c4bbb0;
		text-decoration: none;
	}

	.crumb a:hover,
	.crumb a:focus-visible {
		color: var(--color-ember);
	}

	.crumb a:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 2px;
	}

	.here {
		color: var(--color-ember);
	}

	h1 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2rem, 4vw, 3.25rem);
		font-weight: 600;
		line-height: 0.95;
		letter-spacing: -0.04em;
	}

	.tagline,
	.lede {
		margin: 0.7rem 0 0;
		max-width: 36rem;
		color: #a59c91;
	}

	@media (min-width: 900px) {
		.head {
			padding: 2rem 1.5rem 1.5rem;
		}
	}
</style>
