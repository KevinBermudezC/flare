<script lang="ts">
	import { blocks } from '$lib/catalog';
	import LaneScrub from '../blocks/lane-scrub/LaneScrub.svelte';
	import MaskReveal from '../blocks/mask-reveal/MaskReveal.svelte';
	import TypeCharge from '../blocks/type-charge/TypeCharge.svelte';
</script>

<svelte:head>
	<title>Flare - Preview. Copy.</title>
</svelte:head>

<section id="hero" aria-label="Type Charge">
	<TypeCharge word="FLARE" />
</section>

<section id="featured" class="featured" aria-label="Featured chapters">
	<article class="feature">
		<header class="feature-bar">
			<div>
				<h2>Lane Scrub</h2>
				<p>Vertical scroll drives the lane.</p>
			</div>
			<a href="/blocks/lane-scrub">Open</a>
		</header>
		<div class="feature-stage">
			<LaneScrub label="INK" />
		</div>
	</article>

	<article class="feature">
		<header class="feature-bar">
			<div>
				<h2>Mask Reveal</h2>
				<p>An ink window opens on the frame.</p>
			</div>
			<a href="/blocks/mask-reveal">Open</a>
		</header>
		<div class="feature-stage">
			<MaskReveal headline="Preview. Copy." />
		</div>
	</article>
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
