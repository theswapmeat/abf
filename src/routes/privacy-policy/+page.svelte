<script lang="ts">
	import { getDictionary } from '$lib/i18n';
	import { business } from '$lib/data/business';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';

	const dict = getDictionary();
</script>

<Seo
	title={dict.privacyPolicy.headline}
	description="How AB Fitness collects, uses, and protects your information."
	path="/privacy-policy"
/>

<PageHero eyebrow={dict.privacyPolicy.eyebrow} headline={dict.privacyPolicy.headline} intro={dict.privacyPolicy.intro} />

<section class="container-page py-16 md:py-24">
	<p class="text-sm text-muted">
		{dict.privacyPolicy.effectiveDateLabel}: {dict.privacyPolicy.effectiveDate}
	</p>

	<div class="mt-10 flex max-w-3xl flex-col gap-10">
		{#each dict.privacyPolicy.sections as section (section.heading)}
			<div>
				<h2 class="text-xl font-bold text-paper">{section.heading}</h2>
				<p class="mt-3 text-muted">{section.body}</p>
			</div>
		{/each}
	</div>

	<div class="mt-10 flex max-w-3xl flex-col gap-2 border-t border-ink-line pt-8 text-sm">
		<a href={business.phone.href} class="text-paper transition-colors hover:text-primary">{business.phone.display}</a>
		<a href={`mailto:${business.email}`} class="text-paper transition-colors hover:text-primary">{business.email}</a>
	</div>
</section>
