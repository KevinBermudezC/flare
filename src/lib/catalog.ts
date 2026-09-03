import type { Component } from 'svelte';
import ChapterPin from '../blocks/chapter-pin/ChapterPin.svelte';
import chapterPinSource from '../blocks/chapter-pin/ChapterPin.svelte?raw';
import DeckPin from '../blocks/deck-pin/DeckPin.svelte';
import deckPinSource from '../blocks/deck-pin/DeckPin.svelte?raw';
import LaneScrub from '../blocks/lane-scrub/LaneScrub.svelte';
import laneScrubSource from '../blocks/lane-scrub/LaneScrub.svelte?raw';
import MaskReveal from '../blocks/mask-reveal/MaskReveal.svelte';
import maskRevealSource from '../blocks/mask-reveal/MaskReveal.svelte?raw';
import SplitMasthead from '../blocks/split-masthead/SplitMasthead.svelte';
import splitMastheadSource from '../blocks/split-masthead/SplitMasthead.svelte?raw';
import TypeCharge from '../blocks/type-charge/TypeCharge.svelte';
import typeChargeSource from '../blocks/type-charge/TypeCharge.svelte?raw';

export type ChapterKind = 'masthead' | 'type' | 'lane' | 'pin' | 'mask' | 'deck';

export type BlockFile = {
	name: string;
	source: string;
};

export type BlockEntry = {
	slug: string;
	name: string;
	tagline: string;
	kind: ChapterKind;
	extraDep: string;
	component: Component;
	files: BlockFile[];
};

export const blocks: BlockEntry[] = [
	{
		slug: 'split-masthead',
		name: 'Split Masthead',
		tagline: 'Oversized split type. The frame holds, then it parts.',
		kind: 'masthead',
		extraDep: 'pnpm add gsap',
		component: SplitMasthead,
		files: [{ name: 'SplitMasthead.svelte', source: splitMastheadSource }]
	},
	{
		slug: 'type-charge',
		name: 'Type Charge',
		tagline: 'Kinetic type that charges the line as you scroll.',
		kind: 'type',
		extraDep: 'pnpm add gsap',
		component: TypeCharge,
		files: [{ name: 'TypeCharge.svelte', source: typeChargeSource }]
	},
	{
		slug: 'lane-scrub',
		name: 'Lane Scrub',
		tagline: 'Vertical scroll drives a horizontal lane.',
		kind: 'lane',
		extraDep: 'pnpm add gsap',
		component: LaneScrub,
		files: [{ name: 'LaneScrub.svelte', source: laneScrubSource }]
	},
	{
		slug: 'chapter-pin',
		name: 'Chapter Pin',
		tagline: 'Pinned rooms that zoom as the next one arrives.',
		kind: 'pin',
		extraDep: 'pnpm add gsap',
		component: ChapterPin,
		files: [{ name: 'ChapterPin.svelte', source: chapterPinSource }]
	},
	{
		slug: 'mask-reveal',
		name: 'Mask Reveal',
		tagline: 'Type as a mask. The cut opens on scroll.',
		kind: 'mask',
		extraDep: 'pnpm add gsap',
		component: MaskReveal,
		files: [{ name: 'MaskReveal.svelte', source: maskRevealSource }]
	},
	{
		slug: 'deck-pin',
		name: 'Deck Pin',
		tagline: 'Cards that stick and stack.',
		kind: 'deck',
		extraDep: 'pnpm add gsap',
		component: DeckPin,
		files: [{ name: 'DeckPin.svelte', source: deckPinSource }]
	}
];

export function getBlock(slug: string): BlockEntry | undefined {
	return blocks.find((block) => block.slug === slug);
}

export function kindLabel(kind: ChapterKind): string {
	switch (kind) {
		case 'masthead':
			return 'Masthead';
		case 'type':
			return 'Type';
		case 'lane':
			return 'Lane';
		case 'pin':
			return 'Pin';
		case 'mask':
			return 'Mask';
		case 'deck':
			return 'Deck';
		default: {
			const _never: never = kind;
			return _never;
		}
	}
}
