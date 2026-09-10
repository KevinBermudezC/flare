import { redirect } from '@sveltejs/kit';
import { blocks } from '$lib/catalog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => {
	return [
		...blocks.map((block) => ({ path: block.slug })),
		...blocks.map((block) => ({ path: `${block.slug}/embed` }))
	];
};

export const load: PageLoad = ({ params }) => {
	redirect(308, `/chapters/${params.path}`);
};
