<script lang="ts">
	import { page } from '$app/state';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Lenis from 'lenis';
	import 'lenis/dist/lenis.css';

	if (typeof window !== 'undefined') {
		gsap.registerPlugin(ScrollTrigger);
	}

	const forcedOff = $derived(
		page.url.searchParams.get('reduceMotion') === '1' ||
			page.url.searchParams.get('reduceMotion') === 'true'
	);

	$effect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
		let lenis: Lenis | undefined;
		let tick: ((time: number) => void) | undefined;

		const stop = () => {
			if (tick) gsap.ticker.remove(tick);
			tick = undefined;
			lenis?.destroy();
			lenis = undefined;
		};

		const off = forcedOff;

		const start = () => {
			stop();
			if (off || reduce.matches) {
				ScrollTrigger.refresh();
				return;
			}

			lenis = new Lenis({
				autoRaf: false,
				lerp: 0.1
			});
			lenis.on('scroll', ScrollTrigger.update);
			tick = (time) => {
				lenis?.raf(time * 1000);
			};
			gsap.ticker.add(tick);
			gsap.ticker.lagSmoothing(0);
			ScrollTrigger.refresh();
		};

		start();
		reduce.addEventListener('change', start);

		return () => {
			reduce.removeEventListener('change', start);
			stop();
		};
	});
</script>
