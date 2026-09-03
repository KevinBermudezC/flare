<!--
  Flare · testimonials-marquee
  Paste into any SvelteKit 5 + Tailwind v4 app. No extra packages.
-->
<script lang="ts">
	type Quote = { name: string; handle: string; text: string };

	const rowA: Quote[] = [
		{
			name: 'Maya Chen',
			handle: '@maya',
			text: 'We dropped the hero in and the landing finally felt like the product.'
		},
		{
			name: 'Jon Voss',
			handle: '@voss',
			text: 'Copy-paste that actually renders. No Bits, no registry, no surprise imports.'
		},
		{
			name: 'Priya Shah',
			handle: '@priya',
			text: 'The marquee paused on hover. Reviewers noticed. That is the bar.'
		},
		{
			name: 'Eli Navarro',
			handle: '@eli',
			text: 'Svelte 5 landings without borrowing a React kit and praying.'
		}
	];

	const rowB: Quote[] = [
		{
			name: 'Rosa Klein',
			handle: '@rosa',
			text: 'Sticky scroll sold the features. We kept our own type and color.'
		},
		{
			name: 'Theo Park',
			handle: '@theo',
			text: 'Motion that does not explode with prefers-reduced-motion. Rare.'
		},
		{
			name: 'Ana Ruiz',
			handle: '@ana',
			text: 'I pasted four sections before lunch. The site looked finished.'
		},
		{
			name: 'Chris Adeyemi',
			handle: '@chris',
			text: 'It is a gallery, not a design system. That was the point.'
		}
	];
</script>

<section class="overflow-hidden bg-[#09090b] py-20 text-[#f5f0ea]">
	<div class="mx-auto mb-10 max-w-3xl px-6 text-center">
		<p class="text-[11px] tracking-[0.28em] text-[#ff5a1f] uppercase">Social proof</p>
		<h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">People who pasted it in</h2>
	</div>

	<div class="marquee group space-y-4">
		<div class="row">
			<div class="track">
				{#each [...rowA, ...rowA] as quote, i}
					<figure class="card" aria-hidden={i >= rowA.length}>
						<blockquote class="text-[15px] leading-relaxed text-[#ddd4c8]">"{quote.text}"</blockquote>
						<figcaption class="mt-4 text-sm">
							<span class="font-medium">{quote.name}</span>
							<span class="text-[#8b8278]"> {quote.handle}</span>
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>
		<div class="row">
			<div class="track track-rev">
				{#each [...rowB, ...rowB] as quote, i}
					<figure class="card" aria-hidden={i >= rowB.length}>
						<blockquote class="text-[15px] leading-relaxed text-[#ddd4c8]">"{quote.text}"</blockquote>
						<figcaption class="mt-4 text-sm">
							<span class="font-medium">{quote.name}</span>
							<span class="text-[#8b8278]"> {quote.handle}</span>
						</figcaption>
					</figure>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.row {
		overflow: hidden;
		mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
	}

	.track {
		display: flex;
		width: max-content;
		gap: 0.85rem;
		padding-inline: 0.4rem;
		animation: slide 40s linear infinite;
	}

	.track-rev {
		animation-direction: reverse;
		animation-duration: 46s;
	}

	.marquee:hover .track {
		animation-play-state: paused;
	}

	.card {
		width: 22rem;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 1.1rem;
		background: #111113;
		padding: 1.2rem 1.25rem;
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
