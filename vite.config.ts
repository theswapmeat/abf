import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// Fully static export — every route is prerendered (see
			// src/routes/+layout.ts) since there's no server backing this
			// deploy target (GitHub Pages). strict: true (the default) fails
			// the build loudly if anything turns out not to be prerenderable,
			// instead of silently shipping a broken route.
			adapter: adapter(),

			// GitHub Pages project sites are served from a subpath
			// (theswapmeat.github.io/abf/), not the domain root, so every
			// internal link/asset reference has to be prefixed with this at
			// runtime (see $app/paths `base` usage throughout the app).
			// BASE_PATH is set by the GitHub Actions deploy workflow; local
			// dev/build defaults to '' (root), matching how the site has
			// always run locally.
			paths: {
				// Type-asserted: SvelteKit wants a literal '' | `/${string}`,
				// but an env var is a plain string at the type level. We
				// control its only two real values (unset, or '/abf' from
				// the deploy workflow), both of which satisfy that shape.
				base: (process.env.BASE_PATH ?? '') as '' | `/${string}`
			}
		})
	]
});
