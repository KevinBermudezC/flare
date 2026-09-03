import type { Component } from 'svelte';
import BentoFeatures from '../blocks/bento-features/BentoFeatures.svelte';
import bentoFeaturesSource from '../blocks/bento-features/BentoFeatures.svelte?raw';
import CardSpotlight from '../blocks/card-spotlight/CardSpotlight.svelte';
import cardSpotlightSource from '../blocks/card-spotlight/CardSpotlight.svelte?raw';
import HeroBeams from '../blocks/hero-beams/HeroBeams.svelte';
import heroBeamsSource from '../blocks/hero-beams/HeroBeams.svelte?raw';
import HeroSpotlight from '../blocks/hero-spotlight/HeroSpotlight.svelte';
import heroSpotlightSource from '../blocks/hero-spotlight/HeroSpotlight.svelte?raw';
import InfiniteCards from '../blocks/infinite-cards/InfiniteCards.svelte';
import infiniteCardsSource from '../blocks/infinite-cards/InfiniteCards.svelte?raw';
import Loaders from '../blocks/loaders/Loaders.svelte';
import loadersSource from '../blocks/loaders/Loaders.svelte?raw';
import LogoMarquee from '../blocks/logo-marquee/LogoMarquee.svelte';
import logoMarqueeSource from '../blocks/logo-marquee/LogoMarquee.svelte?raw';
import StickyScroll from '../blocks/sticky-scroll/StickyScroll.svelte';
import stickyScrollSource from '../blocks/sticky-scroll/StickyScroll.svelte?raw';
import TestimonialsMarquee from '../blocks/testimonials-marquee/TestimonialsMarquee.svelte';
import testimonialsMarqueeSource from '../blocks/testimonials-marquee/TestimonialsMarquee.svelte?raw';
import TextFlip from '../blocks/text-flip/TextFlip.svelte';
import textFlipSource from '../blocks/text-flip/TextFlip.svelte?raw';

export type BlockKind = 'hero' | 'marquee' | 'bento' | 'cards' | 'loader' | 'scroll' | 'text';

export type BlockFile = {
	name: string;
	source: string;
};

export type BlockEntry = {
	slug: string;
	name: string;
	tagline: string;
	kind: BlockKind;
	extraDep: string | null;
	component: Component;
	files: BlockFile[];
};

export const blocks: BlockEntry[] = [
	{
		slug: 'hero-spotlight',
		name: 'Hero Spotlight',
		tagline: 'First screen: grid + spotlight + headline + 2 CTAs',
		kind: 'hero',
		extraDep: null,
		component: HeroSpotlight,
		files: [{ name: 'HeroSpotlight.svelte', source: heroSpotlightSource }]
	},
	{
		slug: 'hero-beams',
		name: 'Hero Beams',
		tagline: 'Beams, console chrome, dev-tool look',
		kind: 'hero',
		extraDep: null,
		component: HeroBeams,
		files: [{ name: 'HeroBeams.svelte', source: heroBeamsSource }]
	},
	{
		slug: 'logo-marquee',
		name: 'Logo Marquee',
		tagline: 'Trusted-by, two rows, pause on hover',
		kind: 'marquee',
		extraDep: null,
		component: LogoMarquee,
		files: [{ name: 'LogoMarquee.svelte', source: logoMarqueeSource }]
	},
	{
		slug: 'bento-features',
		name: 'Bento Features',
		tagline: 'Five cells, one with hover motion',
		kind: 'bento',
		extraDep: null,
		component: BentoFeatures,
		files: [{ name: 'BentoFeatures.svelte', source: bentoFeaturesSource }]
	},
	{
		slug: 'testimonials-marquee',
		name: 'Testimonials Marquee',
		tagline: 'Two rows of social proof',
		kind: 'marquee',
		extraDep: null,
		component: TestimonialsMarquee,
		files: [{ name: 'TestimonialsMarquee.svelte', source: testimonialsMarqueeSource }]
	},
	{
		slug: 'infinite-cards',
		name: 'Infinite Cards',
		tagline: 'Feature and use-case cards in a loop',
		kind: 'cards',
		extraDep: null,
		component: InfiniteCards,
		files: [{ name: 'InfiniteCards.svelte', source: infiniteCardsSource }]
	},
	{
		slug: 'card-spotlight',
		name: 'Card Spotlight',
		tagline: 'Card with mouse spotlight, usable inside a bento',
		kind: 'cards',
		extraDep: null,
		component: CardSpotlight,
		files: [{ name: 'CardSpotlight.svelte', source: cardSpotlightSource }]
	},
	{
		slug: 'loaders',
		name: 'Loaders',
		tagline: 'Spinner, dots, bar, multi-step',
		kind: 'loader',
		extraDep: null,
		component: Loaders,
		files: [{ name: 'Loaders.svelte', source: loadersSource }]
	},
	{
		slug: 'sticky-scroll',
		name: 'Sticky Scroll',
		tagline: 'Features that stick and reveal on scroll',
		kind: 'scroll',
		extraDep: null,
		component: StickyScroll,
		files: [{ name: 'StickyScroll.svelte', source: stickyScrollSource }]
	},
	{
		slug: 'text-flip',
		name: 'Text Flip',
		tagline: 'Rotating word in a headline',
		kind: 'text',
		extraDep: null,
		component: TextFlip,
		files: [{ name: 'TextFlip.svelte', source: textFlipSource }]
	}
];

export function getBlock(slug: string): BlockEntry | undefined {
	return blocks.find((block) => block.slug === slug);
}

export function kindLabel(kind: BlockKind): string {
	switch (kind) {
		case 'hero':
			return 'Hero';
		case 'marquee':
			return 'Marquee';
		case 'bento':
			return 'Bento';
		case 'cards':
			return 'Cards';
		case 'loader':
			return 'Loader';
		case 'scroll':
			return 'Scroll';
		case 'text':
			return 'Text';
		default: {
			const _never: never = kind;
			return _never;
		}
	}
}

export function catalogSpan(slug: string): string {
	switch (slug) {
		case 'hero-spotlight':
			return 'md:col-span-7';
		case 'hero-beams':
			return 'md:col-span-5';
		case 'logo-marquee':
			return 'md:col-span-6';
		case 'bento-features':
			return 'md:col-span-6';
		case 'testimonials-marquee':
			return 'md:col-span-7';
		case 'infinite-cards':
			return 'md:col-span-5';
		case 'card-spotlight':
			return 'md:col-span-4';
		case 'loaders':
			return 'md:col-span-4';
		case 'sticky-scroll':
			return 'md:col-span-8';
		case 'text-flip':
			return 'md:col-span-4';
		default:
			return 'md:col-span-6';
	}
}

export function catalogPreviewHeight(kind: BlockKind): string {
	switch (kind) {
		case 'hero':
			return 'h-72 md:h-[22rem]';
		case 'bento':
		case 'scroll':
			return 'h-64 md:h-80';
		case 'marquee':
		case 'cards':
		case 'loader':
		case 'text':
			return 'h-56 md:h-64';
		default: {
			const _never: never = kind;
			return _never;
		}
	}
}
