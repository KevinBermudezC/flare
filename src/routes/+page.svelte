<script lang="ts">
	import { blocks, featuredSlugs, getBlock } from '$lib/catalog';

	const featured = featuredSlugs.map((slug) => getBlock(slug)).filter((block) => block != null);
</script>

<svelte:head>
	<title>Flare - Preview. Copy.</title>
</svelte:head>

<section class="hero" aria-label="Flare">
	<div class="hero-wash" aria-hidden="true"></div>
	<div class="hero-copy">
		<p class="hero-meta">Svelte 5 scroll chapters</p>
		<h1>
			Fl<span>a</span>re
		</h1>
		<p class="hero-line">Preview. Copy.</p>
		<p class="hero-body">A gallery of pin, scrub, and type. Live on the page. The file is yours.</p>
		<div class="hero-cta">
			<a class="cta" href="#featured">See a chapter</a>
			<a class="ghost" href="#catalog">All six</a>
		</div>
	</div>
</section>

<section id="featured" class="featured" aria-label="Featured chapters">
	{#each featured as block (block.slug)}
		<article class="feature">
			<header class="feature-bar">
				<div>
					<h2>{block.name}</h2>
					<p>{block.tagline}</p>
				</div>
				<a href="/blocks/{block.slug}">Open</a>
			</header>
			<div class="feature-stage">
				<block.component />
			</div>
		</article>
	{/each}
</section>

<section id="catalog" class="index" aria-label="All chapters">
	<p class="index-kicker">Chapters</p>
	<ol>
		{#each blocks as block (block.slug)}
			<li>
				<a href="/blocks/{block.slug}">
					<span class="index-name">{block.name}</span>
					<span class="index-line">{block.tagline}</span>
				</a>
			</li>
		{/each}
	</ol>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		min-height: calc(100dvh - 52px);
		flex-direction: column;
		justify-content: flex-end;
		overflow: hidden;
		padding: 4rem 1.5rem 3.5rem;
		background: #09090b;
	}

	.hero-wash {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 12% 78%, color-mix(in oklab, #ff5a1f 38%, transparent), transparent 34%),
			radial-gradient(circle at 88% 18%, rgba(245, 240, 234, 0.08), transparent 26%),
			linear-gradient(180deg, #09090b 0%, #0c0c0e 100%);
	}

	.hero-copy {
		position: relative;
		z-index: 1;
		max-width: 1400px;
		width: 100%;
		margin: 0 auto;
	}

	.hero-meta {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #8b8278;
	}

	h1 {
		margin: 0.4rem 0 0;
		max-width: 8ch;
		font-size: clamp(5.5rem, 20vw, 14rem);
		font-weight: 800;
		line-height: 0.78;
		letter-spacing: -0.07em;
		text-wrap: pretty;
	}

	h1 span {
		color: #ff5a1f;
	}

	.hero-line {
		margin: 1.75rem 0 0;
		font-size: clamp(1.6rem, 3vw, 2.25rem);
		font-weight: 560;
		letter-spacing: -0.03em;
	}

	.hero-body {
		margin: 0.75rem 0 0;
		max-width: 36ch;
		font-size: 1.05rem;
		line-height: 1.5;
		color: #a59c91;
	}

	.hero-cta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem;
		margin-top: 2.25rem;
	}

	.cta {
		border-radius: 12px;
		background: #ff5a1f;
		padding: 0.7rem 1rem;
		font-family: var(--font-mono);
		font-size: 12px;
		color: #1a0703;
		text-decoration: none;
	}

	.ghost {
		font-family: var(--font-mono);
		font-size: 12px;
		color: #c4bbb0;
		text-decoration: none;
	}

	.ghost:hover {
		color: #f5f0ea;
	}

	.featured {
		background: #09090b;
	}

	.feature-bar {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1.5rem;
		max-width: 1400px;
		margin: 0 auto;
		padding: 3rem 1.5rem 1.25rem;
		border-top: 1px solid rgba(245, 240, 234, 0.08);
	}

	.feature-bar h2 {
		margin: 0;
		font-size: clamp(1.6rem, 3vw, 2.4rem);
		font-weight: 680;
		letter-spacing: -0.04em;
	}

	.feature-bar p {
		margin: 0.35rem 0 0;
		font-family: var(--font-mono);
		font-size: 13px;
		color: #8b8278;
	}

	.feature-bar a {
		flex-shrink: 0;
		font-family: var(--font-mono);
		font-size: 12px;
		color: #ff5a1f;
		text-decoration: none;
	}

	.feature-stage {
		min-height: 100dvh;
	}

	.index {
		max-width: 1400px;
		margin: 0 auto;
		padding: 5rem 1.5rem 6rem;
		border-top: 1px solid rgba(245, 240, 234, 0.08);
	}

	.index-kicker {
		margin: 0 0 1.5rem;
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #8b8278;
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li + li {
		border-top: 1px solid rgba(245, 240, 234, 0.08);
	}

	.index a {
		display: grid;
		grid-template-columns: minmax(10rem, 1fr) minmax(12rem, 1.4fr);
		gap: 1rem 2rem;
		align-items: baseline;
		padding: 1.15rem 0;
		color: inherit;
		text-decoration: none;
	}

	.index-name {
		font-size: clamp(1.35rem, 2.4vw, 1.85rem);
		font-weight: 640;
		letter-spacing: -0.03em;
	}

	.index-line {
		font-family: var(--font-mono);
		font-size: 13px;
		color: #8b8278;
	}

	.index a:hover .index-name {
		color: #ff5a1f;
	}

	@media (max-width: 700px) {
		.hero {
			padding: 3rem 1.25rem 2.5rem;
		}

		.index a {
			grid-template-columns: 1fr;
			gap: 0.35rem;
		}

		.feature-bar {
			flex-direction: column;
			align-items: flex-start;
			padding: 2.25rem 1.25rem 1rem;
		}
	}
</style>
