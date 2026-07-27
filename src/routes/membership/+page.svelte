<script lang="ts">
	import { getDictionary } from '$lib/i18n';
	import { GYM_MEMBERSHIP_PLANS, PT_PACKAGES } from '$lib/data/membership';
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import GymPlanCard from '$lib/components/GymPlanCard.svelte';
	import PtPackageCard from '$lib/components/PtPackageCard.svelte';

	const dict = getDictionary();
</script>

<Seo
	title={dict.membership.headline}
	description="AB Fitness membership pricing in AED — 3, 6, and 12-month gym membership terms plus personal training packages."
	path="/membership"
/>

<PageHero eyebrow={dict.membership.eyebrow} headline={dict.membership.headline} intro={dict.membership.intro} />

<section class="container-page py-16 md:py-24">
	<h2 class="text-display-3 font-display font-normal text-paper uppercase">{dict.membership.gymHeading}</h2>
	<div class="mt-8 grid gap-6 md:grid-cols-3">
		{#each GYM_MEMBERSHIP_PLANS as plan, i (plan.id)}
			<div use:reveal={{ index: i }}>
				<GymPlanCard {plan} />
			</div>
		{/each}
	</div>

	<h2 class="text-display-3 mt-20 font-display font-normal text-paper uppercase">{dict.membership.ptHeading}</h2>
	<p class="mt-2 text-muted">{dict.membership.ptIntro}</p>
	<div class="mt-8 grid gap-6 md:grid-cols-3">
		{#each PT_PACKAGES as pkg, i (pkg.id)}
			<div use:reveal={{ index: i }}>
				<PtPackageCard {pkg} />
			</div>
		{/each}
	</div>

	<p class="mt-10 text-sm text-muted">{dict.membership.compareNote}</p>
</section>
