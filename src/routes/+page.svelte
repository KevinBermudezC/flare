<script lang="ts">
	import { CHAPTER_STILLS, blocks } from '$lib/catalog';
	import TypeCharge from '../blocks/type-charge/TypeCharge.svelte';
</script>

<svelte:head>
	<title>Flare - Preview. Copy.</title>
</svelte:head>

<section id="hero" class="hero" aria-label="Type Charge">
	<TypeCharge word="FLARE" />
</section>

<section id="chapters" class="catalog" aria-label="Chapters">
	<ul>
		{#each blocks as block (block.slug)}
			<li>
				<a href="/chapters/{block.slug}">
					<img
						src={CHAPTER_STILLS[block.slug]}
						alt={block.name}
						width="560"
						height="350"
					/>
					<div class="copy">
						<div class="text">
							<h2>{block.name}</h2>
							<p>{block.tagline}</p>
						</div>
						<span class="chip">SCROLL</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.hero {
		min-height: 0;
	}

	.catalog {
		scroll-margin-top: var(--nav-h);
		border-top: 1px solid var(--color-hairline);
	}

	ul {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		margin: 0;
		padding: 1.25rem 1rem 1.5rem;
		list-style: none;
	}

	a {
		display: grid;
		overflow: hidden;
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		background: var(--color-card);
		color: inherit;
		text-decoration: none;
	}

	img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		background: var(--color-ink);
	}

	.copy {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.75rem;
		padding: 0.9rem 1rem 1rem;
	}

	h2 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 600;
		letter-spacing: -0.03em;
	}

	p {
		margin: 0.3rem 0 0;
		font-family: var(--font-body);
		font-size: 13px;
		color: #8b8278;
	}

	.chip {
		flex-shrink: 0;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		color: #8b8278;
		text-transform: uppercase;
	}

	a:hover,
	a:focus-visible {
		border-color: var(--color-ember);
	}

	a:hover h2,
	a:focus-visible h2,
	a:hover .chip,
	a:focus-visible .chip {
		color: var(--color-ember);
	}

	a:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 3px;
	}

	@media (min-width: 768px) {
		ul {
			grid-template-columns: 1fr 1fr;
			padding: 1.5rem 1.25rem 2rem;
		}
	}

	@media (min-width: 1024px) {
		ul {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
</style>
