<script lang="ts">
	import { getDictionary } from '$lib/i18n';
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Button from '$lib/components/Button.svelte';

	const dict = getDictionary();
</script>

<Seo
	title={dict.firstTimers.headline}
	description="New to AB Fitness? Here's exactly what happens from booking your free orientation to your first class."
	path="/first-timers"
/>

<PageHero eyebrow={dict.firstTimers.eyebrow} headline={dict.firstTimers.headline} intro={dict.firstTimers.intro}>
	<Button href="#steps" variant="primary" size="lg">{dict.firstTimers.cta}</Button>
</PageHero>

<section id="steps" class="container-page scroll-mt-20 py-16 md:py-24">
	<h2 class="text-display-3 font-display font-normal text-paper uppercase">{dict.firstTimers.stepsHeading}</h2>

	<ol class="mt-10 grid gap-8 md:grid-cols-2">
		{#each dict.firstTimers.steps as step, i (step.title)}
			<li use:reveal={{ index: i }} class="flex gap-5">
				<span class="text-display-3 shrink-0 font-display font-normal text-primary">{String(i + 1).padStart(2, '0')}</span>
				<div>
					<h3 class="text-lg font-bold text-paper">{step.title}</h3>
					<p class="mt-2 text-muted">{step.body}</p>
				</div>
			</li>
		{/each}
	</ol>

	<div class="mt-14 flex flex-wrap items-center gap-4 border-t border-ink-line pt-10">
		<Button href="/schedule" variant="primary" size="lg">{dict.firstTimers.cta}</Button>
		<Button href="/faq" variant="ghost">{dict.firstTimers.faqCta}</Button>
	</div>
</section>
