<script lang="ts">
	import { business } from '$lib/data/business';

	interface Props {
		title: string;
		description: string;
		/** Path only, e.g. "/team" — combined with business.url for canonical + OG. */
		path: string;
		image?: string;
	}

	let { title, description, path, image = business.logo }: Props = $props();

	let fullTitle = $derived(`${title} | ${business.name}`);
	let canonical = $derived(`${business.url}${path}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={business.name} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>
