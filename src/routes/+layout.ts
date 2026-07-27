// Every route is statically prerendered at build time — there's no server
// backing this deploy target (GitHub Pages). Dynamic routes (/team/[slug])
// are discovered by SvelteKit's crawler following links from prerendered
// pages (e.g. /team links to every trainer), so no explicit `entries()` is
// needed as long as every page stays reachable by a link from somewhere.
export const prerender = true;
