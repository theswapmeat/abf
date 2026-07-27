<script lang="ts">
	import { getDictionary } from '$lib/i18n';
	import { business } from '$lib/data/business';
	import Seo from '$lib/components/Seo.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const dict = getDictionary();
	let trainer = $derived(data.trainer);

	let bookHref = $derived(
		`${business.whatsapp.href}?text=${encodeURIComponent(`Hello, I would like to book a session with ${trainer.name}.`)}`
	);
</script>

<Seo
	title={trainer.name}
	description={`${trainer.name}, ${trainer.role} at AB Fitness Dubai. Specialties: ${trainer.specialties.join(', ')}.`}
	path={`/team/${trainer.slug}`}
	image={trainer.portrait.src}
/>

<section class="container-page py-16 md:py-24">
	<a href="/team" class="text-sm font-semibold text-muted transition-colors hover:text-primary">
		← {dict.trainerDetail.backToTeam}
	</a>

	<div class="mt-8 grid gap-10 md:grid-cols-2 md:items-center">
		<div class="mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border-2 border-secondary-line">
			<img src={trainer.portrait.src} alt={trainer.portrait.alt} class="h-full w-full object-cover" />
		</div>

		<div>
			<h1 class="text-display-2 font-display font-normal text-paper uppercase">{trainer.name}</h1>
			<p class="mt-2 text-lg text-primary">{trainer.role}</p>

			<p class="mt-6 max-w-xl text-muted">{trainer.bio}</p>

			<h2 class="mt-8 text-xs font-semibold tracking-widest text-secondary uppercase opacity-70">
				{dict.trainerDetail.specialtiesHeading}
			</h2>
			<div class="mt-3 flex flex-wrap gap-2">
				{#each trainer.specialties as specialty (specialty)}
					<Chip>{specialty}</Chip>
				{/each}
			</div>

			<h2 class="mt-6 text-xs font-semibold tracking-widest text-secondary uppercase opacity-70">
				{dict.trainerDetail.certificationsHeading}
			</h2>
			<ul class="mt-3 flex flex-col gap-1.5 text-sm text-muted">
				{#each trainer.certifications as cert (cert)}
					<li>{cert}</li>
				{/each}
			</ul>

			<Button href={bookHref} target="_blank" variant="primary" size="lg" class="mt-8">
				{dict.trainerDetail.bookWith}
				{trainer.name}
			</Button>
		</div>
	</div>
</section>
