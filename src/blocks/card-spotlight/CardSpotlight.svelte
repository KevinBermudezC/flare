<!--
  Flare · card-spotlight
  Paste into any SvelteKit 5 + Tailwind v4 app. No extra packages.
  The card is the unit — drop the article into a bento cell if you want.
-->
<script lang="ts">
	let card: HTMLElement | undefined = $state();
	let mx = $state(50);
	let my = $state(30);

	function onMove(event: MouseEvent) {
		if (!card) return;
		const box = card.getBoundingClientRect();
		mx = ((event.clientX - box.left) / box.width) * 100;
		my = ((event.clientY - box.top) / box.height) * 100;
	}
</script>

<section class="bg-[#09090b] px-6 py-24 text-[#f5f0ea]">
	<div class="mx-auto mb-10 max-w-xl text-center">
		<p class="text-[11px] tracking-[0.28em] text-[#ff5a1f] uppercase">Card</p>
		<h2 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A spotlight that follows you</h2>
		<p class="mt-3 text-[#a59c91]">Move the pointer across the card. Use it alone or inside a bento.</p>
	</div>

	<article
		bind:this={card}
		onmousemove={onMove}
		class="spot-card relative mx-auto max-w-md overflow-hidden rounded-2xl border border-white/10 p-8"
		style="--mx: {mx}%; --my: {my}%"
	>
		<div class="spot pointer-events-none absolute inset-0" aria-hidden="true"></div>
		<p class="relative text-[11px] tracking-[0.22em] text-[#ff5a1f] uppercase">Harbor edge</p>
		<h3 class="relative mt-4 text-2xl font-semibold tracking-tight">The region nearest the user</h3>
		<p class="relative mt-3 text-[15px] leading-relaxed text-[#b7aea3]">
			A self-contained card. No shared primitives. The glow is a radial gradient on CSS variables.
		</p>
		<div class="relative mt-8 flex items-center justify-between text-sm">
			<span class="font-mono text-[#8b8278]">us-east-1 · 18ms</span>
			<a href="#edge" class="text-[#ff5a1f]">Open the map</a>
		</div>
	</article>
</section>

<style>
	.spot-card {
		background: #111113;
	}

	.spot {
		background: radial-gradient(
			220px circle at var(--mx, 50%) var(--my, 30%),
			rgba(255, 90, 31, 0.28),
			transparent 55%
		);
		transition: background-position 80ms linear;
	}

	@media (prefers-reduced-motion: reduce) {
		.spot {
			background: radial-gradient(
				220px circle at 50% 20%,
				rgba(255, 90, 31, 0.2),
				transparent 55%
			);
			transition: none;
		}
	}
</style>
