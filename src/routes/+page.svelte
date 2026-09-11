<script lang="ts">
	import { CHAPTER_STILLS, blocks } from '$lib/catalog';
	import HomeHero from '$lib/site/HomeHero.svelte';
	import HomeInside from '$lib/site/HomeInside.svelte';
	import HomeMotion from '$lib/site/HomeMotion.svelte';
	import SeoHead from '$lib/site/SeoHead.svelte';
	import { HOME_DESCRIPTION, HOME_TITLE, OG } from '$lib/site/seo';

	const count = String(blocks.length).padStart(2, '0');

	function chapterNo(index: number): string {
		return String(index + 1).padStart(2, '0');
	}
</script>

<SeoHead title={HOME_TITLE} description={HOME_DESCRIPTION} image={OG.home} />

<HomeHero />
<HomeInside />
<HomeMotion />

<section id="chapters" class="catalog" aria-label="Chapters">
	<header class="kicker">
		<h2>Chapters</h2>
		<p>{count}</p>
	</header>
	<div class="cols-h" aria-hidden="true">
		<span>Index</span>
		<span>Title</span>
		<span>Still</span>
	</div>
	<ol>
		{#each blocks as block, index (block.slug)}
			<li>
				<a href="/chapters/{block.slug}">
					<span class="idx">{chapterNo(index)}</span>
					<span class="copy">
						<h3>{block.name}</h3>
						<p>{block.tagline}</p>
					</span>
					<span class="aside">
						<span class="still">
							<img
								src={CHAPTER_STILLS[block.slug]}
								alt=""
								width="160"
								height="100"
								decoding="async"
							/>
						</span>
						<span class="chip">SCROLL</span>
					</span>
				</a>
			</li>
		{/each}
	</ol>
</section>

<style>
	.catalog {
		position: relative;
		z-index: 1;
		scroll-margin-top: var(--nav-h);
		border-top: 1px solid var(--color-hairline);
		background: var(--color-ink);
	}

	.kicker {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.15rem 1rem 1rem;
	}

	.kicker h2,
	.kicker p {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 11px;
		font-weight: 500;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--color-ember);
	}

	.cols-h {
		display: none;
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	a {
		display: grid;
		grid-template-columns: 2.4rem minmax(0, 1fr);
		grid-template-areas:
			'idx copy'
			'aside aside';
		align-items: start;
		gap: 0.7rem 0.9rem;
		min-height: 44px;
		padding: 1.05rem 1rem 1.15rem;
		border-top: 1px solid var(--color-hairline);
		color: inherit;
		text-decoration: none;
	}

	.idx {
		grid-area: idx;
		padding-top: 0.28rem;
		font-family: var(--font-mono);
		font-size: 12px;
		letter-spacing: 0.08em;
		color: var(--color-ember);
	}

	.copy {
		grid-area: copy;
		min-width: 0;
	}

	h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 4vw, 1.75rem);
		font-weight: 600;
		line-height: 1.05;
		letter-spacing: -0.04em;
		text-wrap: pretty;
		color: var(--color-paper);
		transition: color 160ms ease;
	}

	.copy p {
		display: -webkit-box;
		margin: 0.35rem 0 0;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-family: var(--font-body);
		font-size: 13px;
		line-height: 1.4;
		color: #8b8278;
		white-space: normal;
	}

	.aside {
		grid-area: aside;
		display: flex;
		min-width: 0;
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
	}

	.still {
		display: block;
		overflow: hidden;
		width: 100%;
		border: 1px solid var(--color-hairline);
		background: var(--color-card);
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		background: var(--color-ink);
		transition: transform 180ms ease;
	}

	.chip {
		display: none;
		flex-shrink: 0;
		font-family: var(--font-mono);
		font-size: 10px;
		letter-spacing: 0.16em;
		color: #8b8278;
		text-transform: uppercase;
	}

	a:hover h3,
	a:focus-visible h3 {
		color: var(--color-ember);
	}

	a:hover .chip,
	a:focus-visible .chip {
		color: var(--color-ember);
	}

	a:hover img,
	a:focus-visible img {
		transform: scale(1.02);
	}

	a:focus-visible {
		outline: 2px solid var(--color-ember);
		outline-offset: -2px;
	}

	@media (min-width: 768px) {
		.kicker {
			padding: 1.25rem 1.35rem 0.55rem;
		}

		.cols-h {
			display: grid;
			grid-template-columns: 3rem minmax(0, 1fr) 12.5rem;
			gap: 1rem 1.25rem;
			padding: 0.35rem 1.35rem 0.7rem;
			font-family: var(--font-mono);
			font-size: 10px;
			font-weight: 500;
			letter-spacing: 0.16em;
			text-transform: uppercase;
			color: #8b8278;
		}

		.cols-h span:last-child {
			text-align: right;
		}

		a {
			grid-template-columns: 3rem minmax(0, 1fr) auto;
			grid-template-areas: 'idx copy aside';
			align-items: center;
			gap: 1rem 1.25rem;
			padding: 1.2rem 1.35rem;
		}

		.idx {
			padding-top: 0;
		}

		.aside {
			flex-direction: row;
			align-items: center;
			gap: 0.85rem;
		}

		.still {
			width: auto;
		}

		img {
			width: 128px;
			height: 80px;
			aspect-ratio: auto;
		}

		.chip {
			display: inline;
		}

		.copy p {
			-webkit-line-clamp: 1;
			text-overflow: ellipsis;
			white-space: nowrap;
			display: block;
		}
	}

	@media (min-width: 1280px) {
		.kicker {
			padding: 1.35rem 2rem 0.55rem;
		}

		.cols-h {
			grid-template-columns: 3.25rem minmax(0, 1fr) 14.5rem;
			padding: 0.35rem 2rem 0.75rem;
		}

		a {
			grid-template-columns: 3.25rem minmax(0, 1fr) auto;
			padding: 1.3rem 2rem;
		}

		img {
			width: 160px;
			height: 100px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		h3,
		img {
			transition: none;
		}

		a:hover img,
		a:focus-visible img {
			transform: none;
		}
	}
</style>
