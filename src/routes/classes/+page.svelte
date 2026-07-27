<script lang="ts">
	import { getDictionary } from '$lib/i18n';
	import { CLASS_FORMATS } from '$lib/data/classes';
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import Button from '$lib/components/Button.svelte';

	const dict = getDictionary();
</script>

<Seo
	title={dict.classes.headline}
	description="Every AB Fitness class format explained: MMA & Muay Thai, strength & conditioning, group cycle, swim fitness, recovery & physio, and kids martial arts."
	path="/classes"
/>

<PageHero eyebrow={dict.classes.eyebrow} headline={dict.classes.headline} intro={dict.classes.intro} />

<div class="divide-y divide-ink-line">
	{#each CLASS_FORMATS as format, i (format.id)}
		<section id={format.id} class="scroll-mt-20 border-ink-line">
			<div
				use:reveal={{ index: 0 }}
				class={`container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24 ${
					i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
				}`}
			>
				<img
					src={format.image.src}
					alt={format.image.alt}
					loading="lazy"
					class="aspect-4/3 w-full rounded-2xl object-cover"
				/>
				<div>
					<div class="flex gap-2">
						<Chip>{format.intensity} intensity</Chip>
						<Chip>{format.duration}</Chip>
					</div>
					<h2 class="text-display-3 mt-4 font-display font-normal text-paper uppercase">{format.name}</h2>
					<p class="mt-2 text-lg text-primary">{format.tagline}</p>
					<p class="mt-4 max-w-lg text-muted">{format.description}</p>
					<Button href="/schedule" variant="primary" class="mt-6">{dict.classes.formatCta}</Button>
				</div>
			</div>
		</section>
	{/each}
</div>
