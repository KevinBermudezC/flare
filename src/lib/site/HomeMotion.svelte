<script lang="ts">
	import { CHAPTER_STILLS, blocks, type ChapterSlug } from '$lib/catalog';

	const featuredSlugs = ['lane-scrub', 'type-charge', 'mask-reveal'] as const satisfies readonly ChapterSlug[];
	const featured = featuredSlugs
		.map((slug) => blocks.find((block) => block.slug === slug))
		.filter((block) => block !== undefined);
</script>

<section id="motion" class="motion" aria-labelledby="motion-h">
	<header class="head">
		<div>
			<p class="kicker">Motion</p>
			<h2 id="motion-h">In motion</h2>
		</div>
		<a class="all" href="/chapters">All chapters</a>
	</header>
	<ul>
		{#each featured as block (block.slug)}
			<li>
				<a href="/chapters/{block.slug}">
					<span class="still">
						<img
							src={CHAPTER_STILLS[block.slug]}
							alt=""
							width="480"
							height="300"
							decoding="async"
						/>
					</span>
					<span class="meta">
						<span class="name">{block.name}</span>
						<span class="slug">{block.slug}</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.motion {
		scroll-margin-top: var(--nav-h);
		padding: 2rem 1rem 2.4rem;
		border-top: 1px solid var(--color-hairline);
		background: var(--color-ink);
	}

	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 0.85rem 1.25rem;
		margin-bottom: 1.2rem;
	}

	.kicker {
		margin: 0 0 0.4rem;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ember);
	}

	h2 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.7rem, 4vw, 2.4rem);
		font-weight: 600;
		letter-spacing: -0.04em;
		text-wrap: pretty;
		color: var(--color-paper);
	}

	.all {
		font-family: var(--font-body);
		font-size: 14px;
		color: var(--color-ember);
		text-decoration: none;
	}

	.all:hover,
	.all:focus-visible {
		color: var(--color-paper);
	}

	.all:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 3px;
	}

	ul {
		display: grid;
		gap: 0.85rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		display: grid;
		gap: 0.65rem;
		min-height: 44px;
		color: inherit;
		text-decoration: none;
	}

	.still {
		display: block;
		overflow: hidden;
		border: 1px solid var(--color-hairline);
		border-radius: 12px;
		background: var(--color-card);
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		transition: transform 180ms ease;
	}

	.meta {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		min-width: 0;
	}

	.name {
		font-family: var(--font-display);
		font-size: 1.05rem;
		font-weight: 600;
		letter-spacing: -0.03em;
		color: var(--color-paper);
	}

	.slug {
		font-family: var(--font-mono);
		font-size: 11px;
		letter-spacing: 0.04em;
		color: #8b8278;
	}

	a:hover .name,
	a:focus-visible .name {
		color: var(--color-ember);
	}

	a:hover img,
	a:focus-visible img {
		transform: scale(1.02);
	}

	a:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: 3px;
	}

	@media (min-width: 768px) {
		.motion {
			padding: 2.5rem 1.35rem 2.8rem;
		}

		ul {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1rem;
		}
	}

	@media (min-width: 1280px) {
		.motion {
			padding: 2.75rem 2rem 3.1rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		img {
			transition: none;
		}

		a:hover img,
		a:focus-visible img {
			transform: none;
		}
	}
</style>
