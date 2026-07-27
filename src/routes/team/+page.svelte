<script lang="ts">
	import { getDictionary } from '$lib/i18n';
	import { TRAINERS } from '$lib/data/trainers';
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import TrainerCard from '$lib/components/TrainerCard.svelte';

	const dict = getDictionary();
</script>

<Seo
	title={dict.team.headline}
	description="Meet the AB Fitness coaching team — MMA, strength, swim, cycle, recovery, and kids martial arts specialists in Dubai."
	path="/team"
/>

<PageHero eyebrow={dict.team.eyebrow} headline={dict.team.headline} intro={dict.team.intro} />

<section class="container-page py-16 md:py-24">
	{#if TRAINERS.length === 0}
		<p class="text-muted">{dict.team.emptyState}</p>
	{:else}
		<div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{#each TRAINERS as trainer, i (trainer.slug)}
				<div use:reveal={{ index: i }}>
					<TrainerCard {trainer} />
				</div>
			{/each}
		</div>
	{/if}
</section>
