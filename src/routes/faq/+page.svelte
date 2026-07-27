<script lang="ts">
	import { getDictionary } from '$lib/i18n';
	import { FAQS } from '$lib/data/faq';
	import { business } from '$lib/data/business';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import Button from '$lib/components/Button.svelte';

	const dict = getDictionary();

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: FAQS.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer }
		}))
	};

	let whatsappHref = $derived(`${business.whatsapp.href}?text=${encodeURIComponent(dict.whatsapp.prefilledMessage)}`);
</script>

<Seo
	title={dict.faq.headline}
	description="Answers to common questions about AB Fitness membership, hours, booking, and facilities in Dubai."
	path="/faq"
/>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(faqSchema)}<\/script>`}
</svelte:head>

<PageHero eyebrow={dict.faq.eyebrow} headline={dict.faq.headline} intro={dict.faq.intro} />

<section class="container-page py-16 md:py-24">
	<Accordion items={FAQS} />

	<div class="mt-10">
		<Button href={whatsappHref} target="_blank" variant="primary">{dict.faq.contactCta}</Button>
	</div>
</section>
