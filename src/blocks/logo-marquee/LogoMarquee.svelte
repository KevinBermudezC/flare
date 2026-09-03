<!--
  Flare · logo-marquee
  Paste into any SvelteKit 5 + Tailwind v4 app. No extra packages.
-->
<script lang="ts">
	const rowA = ['Helix', 'Ampere', 'North', 'Lattice', 'Kernel', 'Drift', 'Copper', 'Orbit'];
	const rowB = ['Field', 'Nimbus', 'Atlas', 'Quarry', 'Sable', 'Monad', 'Harbor', 'Volt'];
</script>

<section class="overflow-hidden bg-[#09090b] py-20 text-[#f5f0ea]">
	<div class="mx-auto mb-10 max-w-3xl px-6 text-center">
		<p class="text-[11px] tracking-[0.28em] text-[#ff5a1f] uppercase">Trusted by</p>
		<h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
			Teams that ship every week
		</h2>
	</div>

	<div class="marquee group space-y-5">
		<div class="row">
			<div class="track">
				{#each [...rowA, ...rowA] as name, i}
					<span class="logo" aria-hidden={i >= rowA.length}>{name}</span>
				{/each}
			</div>
		</div>
		<div class="row">
			<div class="track track-rev">
				{#each [...rowB, ...rowB] as name, i}
					<span class="logo" aria-hidden={i >= rowB.length}>{name}</span>
				{/each}
			</div>
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
		padding-inline: 0.5rem;
		animation: slide 32s linear infinite;
	}

	.track-rev {
		animation-direction: reverse;
		animation-duration: 38s;
	}

	.marquee:hover .track {
		animation-play-state: paused;
	}

	.logo {
		display: grid;
		min-width: 9.5rem;
		place-items: center;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.03);
		padding: 0.7rem 1.4rem;
		font-size: 0.92rem;
		font-weight: 600;
		letter-spacing: -0.02em;
		color: #d7cfc4;
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

		.logo[aria-hidden='true'] {
			display: none;
		}
	}
</style>
