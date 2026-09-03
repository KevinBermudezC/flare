<!--
  Flare · hero-spotlight
  Paste into any SvelteKit 5 + Tailwind v4 app. No extra packages.
-->
<script lang="ts">
	let root: HTMLElement | undefined = $state();
	let mx = $state(52);
	let my = $state(32);

	function onMove(event: MouseEvent) {
		if (!root) return;
		const box = root.getBoundingClientRect();
		mx = ((event.clientX - box.left) / box.width) * 100;
		my = ((event.clientY - box.top) / box.height) * 100;
	}
</script>

<section
	bind:this={root}
	onmousemove={onMove}
	class="relative isolate min-h-[100svh] overflow-hidden bg-[#09090b] text-[#f5f0ea]"
	style="--mx: {mx}%; --my: {my}%"
>
	<div class="hero-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>
	<div class="hero-spot pointer-events-none absolute inset-0" aria-hidden="true"></div>
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#09090b] to-transparent"
		aria-hidden="true"
	></div>

	<div
		class="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center"
	>
		<p class="mb-5 text-[11px] font-medium tracking-[0.28em] text-[#ff5a1f] uppercase">
			Harbor · launch week
		</p>
		<h1 class="text-5xl leading-[1.02] font-semibold tracking-tight sm:text-7xl">
			Ship the first screen
			<span class="block text-[#c4bbb0]">like you mean it.</span>
		</h1>
		<p class="mt-6 max-w-xl text-lg text-[#a59c91]">
			A live grid, a cursor spotlight, a headline, and two next steps. Paste the section. Keep
			moving.
		</p>
		<div class="mt-10 flex flex-wrap items-center justify-center gap-3">
			<a
				href="#get-started"
				class="rounded-full bg-[#ff5a1f] px-5 py-2.5 text-sm font-medium text-[#1a0703] transition-transform duration-200 hover:-translate-y-0.5"
			>
				Get started
			</a>
			<a
				href="#preview"
				class="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-[#f5f0ea] transition-colors duration-200 hover:border-white/30"
			>
				See a preview
			</a>
		</div>
	</div>
</section>

<style>
	.hero-grid {
		background-image:
			linear-gradient(to right, rgba(255, 255, 255, 0.055) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(255, 255, 255, 0.055) 1px, transparent 1px);
		background-size: 56px 56px;
		mask-image: radial-gradient(ellipse 75% 55% at 50% 38%, #000 20%, transparent 75%);
	}

	.hero-spot {
		background: radial-gradient(
			520px circle at var(--mx, 52%) var(--my, 32%),
			rgba(255, 90, 31, 0.28),
			transparent 58%
		);
		animation: spot-in 1.15s ease both;
	}

	@keyframes spot-in {
		from {
			opacity: 0;
			transform: scale(0.82);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-spot {
			animation: none;
		}

		a {
			transition: none;
		}
	}
</style>
