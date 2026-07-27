<script lang="ts">
	import { getDictionary } from '$lib/i18n';
	import { CLASS_FORMATS, getClassFormat } from '$lib/data/classes';
	import { TIMETABLE, coachName } from '$lib/data/timetable';
	import { business } from '$lib/data/business';
	import { isDuringRamadan } from '$lib/utils/schedule';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import Chip from '$lib/components/Chip.svelte';
	import Button from '$lib/components/Button.svelte';

	const dict = getDictionary();
	const ramadanActive = isDuringRamadan();

	let activeFormat = $state<string>('all');

	let filtered = $derived(
		activeFormat === 'all' ? TIMETABLE : TIMETABLE.filter((entry) => entry.formatId === activeFormat)
	);

	let byDay = $derived(
		filtered.reduce<Record<string, typeof TIMETABLE>>((acc, entry) => {
			(acc[entry.day] ??= []).push(entry);
			return acc;
		}, {})
	);

	const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	function bookHref(formatId: string, day: string, time: string) {
		const formatName = getClassFormat(formatId)?.name ?? formatId;
		const message = `Hello, I would like to book the ${formatName} class on ${day} at ${time}.`;
		return `${business.whatsapp.href}?text=${encodeURIComponent(message)}`;
	}
</script>

<Seo
	title={dict.schedule.headline}
	description="This week's live AB Fitness class schedule — filter by format or day and book your spot on WhatsApp."
	path="/schedule"
/>

<PageHero eyebrow={dict.schedule.eyebrow} headline={dict.schedule.headline} intro={dict.schedule.intro} />

{#if ramadanActive}
	<div class="border-b border-primary/30 bg-primary-dim">
		<p class="container-page py-3 text-sm text-paper">
			<span class="font-semibold text-primary">Ramadan hours:</span>
			{dict.schedule.ramadanNotice}
		</p>
	</div>
{/if}

<section class="container-page py-16 md:py-24">
	<div class="flex flex-wrap gap-2" role="group" aria-label={dict.schedule.filterAll}>
		<button
			type="button"
			onclick={() => (activeFormat = 'all')}
			class={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
				activeFormat === 'all' ? 'border-primary bg-primary text-ink' : 'border-secondary-line text-paper hover:border-primary'
			}`}
		>
			{dict.schedule.filterAll}
		</button>
		{#each CLASS_FORMATS as format (format.id)}
			<button
				type="button"
				onclick={() => (activeFormat = format.id)}
				class={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
					activeFormat === format.id
						? 'border-primary bg-primary text-ink'
						: 'border-secondary-line text-paper hover:border-primary'
				}`}
			>
				{format.name}
			</button>
		{/each}
	</div>

	<div class="mt-10 flex flex-col gap-10">
		{#each dayOrder as day (day)}
			{#if byDay[day]?.length}
				<div>
					<h2 class="text-lg font-bold text-paper">{day}</h2>
					<ul class="mt-4 divide-y divide-ink-line border-y border-ink-line">
						{#each byDay[day].sort((a, b) => a.time.localeCompare(b.time)) as entry (entry.time + entry.formatId)}
							{@const format = getClassFormat(entry.formatId)}
							<li class="flex flex-wrap items-center justify-between gap-3 py-4">
								<div class="flex items-center gap-4">
									<span class="w-16 font-mono text-sm text-primary">{entry.time}</span>
									<div>
										<p class="font-semibold text-paper">{format?.name}</p>
										<p class="text-sm text-muted">Coached by {coachName(entry.coachSlug)}</p>
									</div>
								</div>
								<div class="flex items-center gap-3">
									<Chip>{format?.duration}</Chip>
									<Button href={bookHref(entry.formatId, entry.day, entry.time)} target="_blank" size="sm">
										{dict.schedule.bookCta}
									</Button>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		{/each}
	</div>
</section>
