import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

function env(name: string): string | undefined {
	const node = globalThis as typeof globalThis & {
		process?: { env?: Record<string, string | undefined> };
	};
	return node.process?.env?.[name];
}

function prerenderOrigin() {
	const fromPublic = env('PUBLIC_SITE_ORIGIN');
	if (fromPublic) return fromPublic.replace(/\/$/, '');
	const production = env('VERCEL_PROJECT_PRODUCTION_URL');
	if (production) return `https://${production}`;
	const preview = env('VERCEL_URL');
	if (preview) return `https://${preview}`;
	return 'http://localhost:5173';
}

export default defineConfig({
	server: {
		host: true
	},
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			prerender: {
				origin: prerenderOrigin()
			}
		})
	]
});
