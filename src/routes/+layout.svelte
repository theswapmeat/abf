<script lang="ts">
	import '../app.css';
	import { getDictionary } from '$lib/i18n';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import WhatsAppButton from '$lib/components/WhatsAppButton.svelte';
	import NewsletterModal from '$lib/components/NewsletterModal.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';

	let { children } = $props();
	const dict = getDictionary();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="any" />
</svelte:head>

<JsonLd />

<a href="#main-content" class="sr-only-focusable rounded-full bg-primary px-4 py-2 text-sm font-semibold text-ink">
	{dict.common.skipToContent}
</a>

<Header />

<main id="main-content">
	{@render children()}
</main>

<Footer />
<WhatsAppButton />
<NewsletterModal />
