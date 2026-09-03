<!--
  Flare · mask-reveal
  Paste into a SvelteKit 5 + Tailwind v4 app. Needs: pnpm add gsap
-->
<script lang="ts">
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	let root: HTMLElement | undefined = $state();

	$effect(() => {
		const el = root;
		if (!el) return;
		let ctx: gsap.Context | undefined;
		let cancelled = false;

		const run = () => {
			if (cancelled || !root) return;
			if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

			ctx = gsap.context(() => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: el,
						start: 'top top',
						end: '+=200%',
						pin: true,
						scrub: 0.7
					}
				});

				tl.fromTo('.film', { scale: 1.08 }, { scale: 1.45, ease: 'none' }, 0)
					.fromTo(
						'.cut-g',
						{ scale: 1, transformOrigin: '600px 360px' },
						{ scale: 18, transformOrigin: '600px 360px', ease: 'none' },
						0
					)
					.fromTo('.after', { opacity: 0, y: 16 }, { opacity: 1, y: 0, ease: 'none' }, 0.72);
			}, el);
		};

		const fonts = document.fonts;
		if (fonts?.ready) {
			fonts.ready.then(run);
		} else {
			run();
		}

		return () => {
			cancelled = true;
			ctx?.revert();
		};
	});
</script>

<section bind:this={root} class="reveal">
	<div class="stage">
		<div class="film" aria-hidden="true"></div>
		<svg class="cut" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice">
			<defs>
				<mask id="flare-mask-reveal">
					<rect width="1200" height="700" fill="white"></rect>
					<g class="cut-g">
						<text
							x="600"
							y="430"
							text-anchor="middle"
							fill="black"
							font-size="320"
							font-weight="700"
							font-family="Bricolage Grotesque, ui-sans-serif, sans-serif"
							>Hold</text
						>
					</g>
				</mask>
			</defs>
			<rect width="1200" height="700" fill="#09090b" mask="url(#flare-mask-reveal)"></rect>
		</svg>
		<p class="after">The cut opens. The frame stays.</p>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=IBM+Plex+Mono:wght@400&display=swap');

	.reveal {
		position: relative;
		min-height: 100svh;
		overflow: hidden;
		background: #09090b;
		color: #f5f0ea;
		font-family: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
	}

	.stage {
		position: relative;
		min-height: 100svh;
	}

	.film {
		position: absolute;
		inset: -12%;
		background:
			radial-gradient(circle at 30% 40%, rgba(255, 90, 31, 0.95), transparent 34%),
			radial-gradient(circle at 72% 60%, rgba(255, 196, 140, 0.55), transparent 28%),
			repeating-linear-gradient(
				118deg,
				transparent 0 18px,
				rgba(255, 90, 31, 0.18) 18px 20px
			),
			linear-gradient(160deg, #2a1108, #09090b 70%);
		transform-origin: 40% 45%;
	}

	.cut {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.cut-g {
		transform-box: fill-box;
		transform-origin: center;
	}

	.after {
		position: absolute;
		right: 1.5rem;
		bottom: 1.5rem;
		left: 1.5rem;
		margin: 0;
		font-family: 'IBM Plex Mono', ui-monospace, monospace;
		font-size: 13px;
		letter-spacing: 0.04em;
		color: #f5f0ea;
	}

	@media (prefers-reduced-motion: reduce) {
		.film,
		.cut-g,
		.after {
			transform: none;
			opacity: 1;
		}
	}
</style>
