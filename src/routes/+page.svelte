<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { getDictionary } from '$lib/i18n';
	import { CLASS_FORMATS } from '$lib/data/classes';
	import { TRAINERS } from '$lib/data/trainers';
	import { TESTIMONIALS } from '$lib/data/testimonials';
	import { GYM_MEMBERSHIP_PLANS } from '$lib/data/membership';
	import { LOCATIONS } from '$lib/data/locations';
	import { submitForm } from '$lib/utils/submitForm';
	import { reveal } from '$lib/actions/reveal';

	import Seo from '$lib/components/Seo.svelte';
	import HomeHero from '$lib/components/HomeHero.svelte';
	import PrinciplesMarquee from '$lib/components/PrinciplesMarquee.svelte';
	import ClassFormatCard from '$lib/components/ClassFormatCard.svelte';
	import TrainerCard from '$lib/components/TrainerCard.svelte';
	import TestimonialCard from '$lib/components/TestimonialCard.svelte';
	import GymPlanCard from '$lib/components/GymPlanCard.svelte';
	import LocationCard from '$lib/components/LocationCard.svelte';
	import PreFooterCta from '$lib/components/PreFooterCta.svelte';
	import Button from '$lib/components/Button.svelte';

	const dict = getDictionary();
	const trainerPreview = TRAINERS.slice(0, 4);
	const mainLocation = LOCATIONS[0];

	let newsletterEmail = $state('');
	let newsletterAgreed = $state(false);
	let newsletterError = $state('');
	let newsletterStatus = $state<'idle' | 'submitting' | 'success'>('idle');

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	async function handleNewsletterSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!EMAIL_RE.test(newsletterEmail)) {
			newsletterError = dict.form.errorEmail;
			return;
		}
		if (!newsletterAgreed) {
			newsletterError = dict.form.privacyError;
			return;
		}
		newsletterError = '';
		newsletterStatus = 'submitting';
		const result = await submitForm(env.PUBLIC_NEWSLETTER_ENDPOINT, {
			form: 'home-newsletter',
			email: newsletterEmail
		});
		newsletterStatus = result.ok ? 'success' : 'idle';
	}
</script>

<Seo
	title="Best Gym in Dubai — MMA, Strength, Cycle & Swim"
	description="AB Fitness is a 24-hour gym at Mina Rashid, Dubai offering MMA & Muay Thai, strength & conditioning, group cycle, swim fitness, and personal training under one membership."
	path="/"
/>

<!--
	Header is fixed (not sticky) on this page specifically — see Header.svelte
	— so it overlaps the hero instead of reserving its own height above it.
	That means the hero + marquee pair sizes against the FULL viewport
	(100dvh), not 100dvh minus header height. Hero is flex-1 (grows to fill
	whatever's left after the marquee's own natural height), so the marquee's
	bottom edge lands on the viewport's bottom edge on load without
	hardcoding either height.
-->
<div class="flex min-h-dvh flex-col">
	<HomeHero />
	<PrinciplesMarquee />
</div>

<section class="container-page py-20 md:py-28">
	<p class="text-eyebrow font-semibold text-primary uppercase">{dict.home.pillarsEyebrow}</p>
	<div class="mt-10 grid gap-8 md:grid-cols-3">
		{#each dict.home.pillars as pillar, i (pillar.title)}
			<div use:reveal={{ index: i }}>
				<h2 class="text-xl font-bold text-paper">{pillar.title}</h2>
				<p class="mt-3 text-muted">{pillar.body}</p>
			</div>
		{/each}
	</div>
</section>

<section class="border-t border-ink-line bg-ink py-20 md:py-28">
	<div class="container-page">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div>
				<p class="text-eyebrow font-semibold text-primary uppercase">{dict.home.formatsEyebrow}</p>
				<h2 class="text-display-2 mt-3 font-display font-normal text-paper uppercase">{dict.home.formatsHeadline}</h2>
			</div>
			<Button href="/classes" variant="ghost">{dict.home.formatsCta} →</Button>
		</div>

		<div class="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
			{#each CLASS_FORMATS as format, i (format.id)}
				<div use:reveal={{ index: i }}>
					<ClassFormatCard {format} />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="border-t border-ink-line py-20 md:py-28">
	<div class="container-page">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div>
				<p class="text-eyebrow font-semibold text-primary uppercase">{dict.home.trainersEyebrow}</p>
				<h2 class="text-display-2 mt-3 font-display font-normal text-paper uppercase">{dict.home.trainersHeadline}</h2>
			</div>
			<Button href="/team" variant="ghost">{dict.home.trainersCta} →</Button>
		</div>

		<div class="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
			{#each trainerPreview as trainer, i (trainer.slug)}
				<div use:reveal={{ index: i }}>
					<TrainerCard {trainer} />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="border-t border-ink-line bg-ink py-20 md:py-28">
	<div class="container-page">
		<p class="text-eyebrow font-semibold text-primary uppercase">{dict.home.testimonialsEyebrow}</p>
		<h2 class="text-display-2 mt-3 font-display font-normal text-paper uppercase">{dict.home.testimonialsHeadline}</h2>

		<div class="mt-10 grid gap-6 md:grid-cols-2">
			{#each TESTIMONIALS as testimonial, i (testimonial.quote)}
				<div use:reveal={{ index: i }}>
					<TestimonialCard {testimonial} />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="border-t border-ink-line py-20 md:py-28">
	<div class="container-page">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div>
				<p class="text-eyebrow font-semibold text-primary uppercase">{dict.home.membershipEyebrow}</p>
				<h2 class="text-display-2 mt-3 font-display font-normal text-paper uppercase">{dict.home.membershipHeadline}</h2>
			</div>
			<Button href="/membership" variant="ghost">{dict.home.membershipCta} →</Button>
		</div>

		<div class="mt-10 grid gap-6 md:grid-cols-3">
			{#each GYM_MEMBERSHIP_PLANS as plan, i (plan.id)}
				<div use:reveal={{ index: i }}>
					<GymPlanCard {plan} />
				</div>
			{/each}
		</div>
	</div>
</section>

<section class="border-t border-ink-line bg-ink py-20 md:py-28">
	<div class="container-page">
		<p class="text-eyebrow font-semibold text-primary uppercase">{dict.home.locationEyebrow}</p>
		<h2 class="text-display-2 mt-3 font-display font-normal text-paper uppercase">{dict.home.locationHeadline}</h2>
		<div class="mt-10">
			<LocationCard location={mainLocation} />
		</div>
	</div>
</section>

<PreFooterCta />

<section class="border-t border-ink-line py-20 md:py-28">
	<div class="container-page grid gap-8 md:grid-cols-2 md:items-center">
		<div>
			<p class="text-eyebrow font-semibold text-primary uppercase">{dict.home.newsletterEyebrow}</p>
			<h2 class="text-display-3 mt-3 font-display font-normal text-paper uppercase">{dict.home.newsletterHeadline}</h2>
			<p class="mt-4 max-w-md text-muted">{dict.home.newsletterBody}</p>
		</div>

		{#if newsletterStatus === 'success'}
			<p class="text-lg font-semibold text-primary" role="status">{dict.newsletter.successHeading}</p>
		{:else}
			<form onsubmit={handleNewsletterSubmit} novalidate class="flex flex-col gap-3">
				<div class="flex flex-col gap-3 sm:flex-row">
					<label for="home-newsletter-email" class="sr-only">{dict.form.email}</label>
					<input
						id="home-newsletter-email"
						type="email"
						required
						bind:value={newsletterEmail}
						placeholder={dict.newsletter.emailPlaceholder}
						aria-invalid={Boolean(newsletterError)}
						aria-describedby={newsletterError ? 'home-newsletter-error' : undefined}
						class="parallelogram flex-1 border-t-2 border-b-2 bg-paper/5 px-4 py-3 text-sm text-paper outline-none {newsletterError
							? 'border-primary'
							: 'border-secondary-line focus:border-primary'}"
					/>
					<Button type="submit" disabled={newsletterStatus === 'submitting'}>
						{newsletterStatus === 'submitting' ? dict.form.submitting : dict.form.submit}
					</Button>
				</div>
				<label class="flex items-start gap-2 text-xs text-muted">
					<input type="checkbox" bind:checked={newsletterAgreed} class="mt-0.5 accent-primary" />
					{dict.form.privacyLabel}
				</label>
				{#if newsletterError}
					<p id="home-newsletter-error" role="alert" class="text-xs font-medium text-primary">{newsletterError}</p>
				{/if}
			</form>
		{/if}
	</div>
</section>
