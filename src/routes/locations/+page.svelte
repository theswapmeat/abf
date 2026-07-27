<script lang="ts">
	import { getDictionary } from '$lib/i18n';
	import { LOCATIONS } from '$lib/data/locations';
	import { isDuringRamadan } from '$lib/utils/schedule';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import LocationCard from '$lib/components/LocationCard.svelte';

	const dict = getDictionary();
	const ramadanActive = isDuringRamadan();
</script>

<Seo
	title={dict.locations.headline}
	description="AB Fitness is located at Mina Rashid, Maritime City, Dubai — open 24 hours with on-site parking."
	path="/locations"
/>

<PageHero eyebrow={dict.locations.eyebrow} headline={dict.locations.headline} intro={dict.locations.intro} />

<section class="container-page py-16 md:py-24">
	<div class="mb-10 flex flex-wrap items-center gap-3 rounded-xl border border-secondary-line p-5">
		<span class="text-xs font-semibold tracking-widest text-secondary uppercase opacity-70">
			{dict.locations.hoursHeading}
		</span>
		<span class="text-paper">{dict.locations.hoursValue}</span>
	</div>

	{#if ramadanActive}
		<p class="mb-10 rounded-xl border border-primary/30 bg-primary-dim p-5 text-sm text-paper">
			{dict.locations.ramadanHoursNote}
		</p>
	{/if}

	<div class="flex flex-col gap-8">
		{#each LOCATIONS as location (location.id)}
			<LocationCard {location} />
		{/each}
	</div>
</section>
