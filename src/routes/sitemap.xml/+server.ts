import { PUBLIC_PATHS } from '$lib/site/seo';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = ({ url }) => {
	const origin = url.origin;
	const body = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
		...PUBLIC_PATHS.map(
			(path) =>
				`  <url><loc>${new URL(path, origin).href}</loc><changefreq>weekly</changefreq></url>`
		),
		'</urlset>'
	].join('\n');

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
