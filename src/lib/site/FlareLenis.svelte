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
		const scroller = document.documentElement;
		let lenis: Lenis | undefined;
		let tick: ((time: number) => void) | undefined;
		let onRefresh: (() => void) | undefined;
		let onResize: (() => void) | undefined;
		let refreshFrame = 0;

		const nativeScrollTop = (value?: number) => {
			if (value !== undefined) window.scrollTo(window.scrollX, value);
			return window.scrollY;
		};

		const bindProxy = () => {
			ScrollTrigger.scrollerProxy(scroller, {
				scrollTop(value?: number) {
					if (lenis) {
						if (value !== undefined) lenis.scrollTo(value, { immediate: true });
						return lenis.scroll;
					}
					return nativeScrollTop(value);
				},
				getBoundingClientRect() {
					return {
						top: 0,
						left: 0,
						width: window.innerWidth,
						height: window.innerHeight
					};
				},
				pinType: 'fixed'
			});
		};

		const stop = (refresh = true) => {
			if (refreshFrame) cancelAnimationFrame(refreshFrame);
			refreshFrame = 0;
			if (onRefresh) ScrollTrigger.removeEventListener('refresh', onRefresh);
			onRefresh = undefined;
			if (onResize) window.removeEventListener('resize', onResize);
			onResize = undefined;
			if (tick) gsap.ticker.remove(tick);
			tick = undefined;
			lenis?.destroy();
			lenis = undefined;
			gsap.ticker.lagSmoothing(500, 33);
			bindProxy();
			if (refresh) ScrollTrigger.refresh();
		};

		const off = forcedOff;

		const start = () => {
			stop(false);
			if (off || reduce.matches) {
				ScrollTrigger.refresh();
				return;
			}

			lenis = new Lenis({
				autoRaf: false,
				lerp: 0.1
			});
			bindProxy();
			lenis.on('scroll', ScrollTrigger.update);
			tick = (time) => {
				lenis?.raf(time * 1000);
			};
			gsap.ticker.add(tick);
			gsap.ticker.lagSmoothing(0);
			onRefresh = () => {
				lenis?.resize();
			};
			ScrollTrigger.addEventListener('refresh', onRefresh);
			onResize = () => {
				lenis?.resize();
				ScrollTrigger.refresh();
			};
			window.addEventListener('resize', onResize);
			refreshFrame = requestAnimationFrame(() => {
				refreshFrame = requestAnimationFrame(() => {
					refreshFrame = 0;
					ScrollTrigger.refresh();
				});
			});
		};

		start();
		reduce.addEventListener('change', start);

		return () => {
			reduce.removeEventListener('change', start);
			stop();
		};
	});
</script>
