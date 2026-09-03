<!--
  Flare · infinite-cards
  Paste into any SvelteKit 5 + Tailwind v4 app. No extra packages.
-->
<script lang="ts">
	const cards = [
		{
			tag: 'Use case',
			title: 'Launch week pages',
			body: 'Hero, proof, features. Ship the story before the feature flag flips.'
		},
		{
			tag: 'Use case',
			title: 'Devtool marketing',
			body: 'Beams and a console beat another generated gradient every time.'
		},
		{
			tag: 'Feature',
			title: 'Copy the file',
			body: 'The section is the unit. No install, no registry, no shared primitives.'
		},
		{
			tag: 'Feature',
			title: 'Motion stays local',
			body: 'Keyframes live in the file. Reduced motion does not collapse the layout.'
		},
		{
			tag: 'Use case',
			title: 'Waitlist swaps',
			body: 'Replace Harbor copy. Keep the grid, the loop, and the pace.'
		},
		{
			tag: 'Feature',
			title: 'Svelte 5 native',
			body: 'Runes, snippets you already know, and plain button and anchor tags.'
		}
	];
</script>

<section class="overflow-hidden bg-[#09090b] py-20 text-[#f5f0ea]">
	<div class="mx-auto mb-10 max-w-3xl px-6">
		<p class="text-[11px] tracking-[0.28em] text-[#ff5a1f] uppercase">Loop</p>
		<h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
			Features and use cases, still moving
		</h2>
	</div>

	<div class="group row">
		<div class="track">
			{#each [...cards, ...cards] as card, i}
				<article class="card" aria-hidden={i >= cards.length}>
					<p class="text-[10px] tracking-[0.22em] text-[#ff5a1f] uppercase">{card.tag}</p>
					<h3 class="mt-3 text-xl font-semibold tracking-tight">{card.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-[#a59c91]">{card.body}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.row {
		overflow: hidden;
		mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
	}

	.track {
		display: flex;
		width: max-content;
		gap: 1rem;
		padding-inline: 0.75rem;
		animation: slide 36s linear infinite;
	}

	.group:hover .track {
		animation-play-state: paused;
	}

	.card {
		width: 18.5rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1.2rem;
		background:
			linear-gradient(180deg, rgba(255, 90, 31, 0.08), transparent 42%), #111113;
		padding: 1.3rem 1.35rem 1.5rem;
	}

	@keyframes slide {
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
			flex-wrap: wrap;
			width: 100%;
			justify-content: center;
		}

		.card[aria-hidden='true'] {
			display: none;
		}
	}
</style>
