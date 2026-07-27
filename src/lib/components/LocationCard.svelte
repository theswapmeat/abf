<script lang="ts">
	import type { Location } from '$lib/data/locations';
	import { getDictionary } from '$lib/i18n';
	import Button from './Button.svelte';

	interface Props {
		location: Location;
	}

	let { location }: Props = $props();
	const dict = getDictionary();
</script>

<!--
	This card and its map are deliberately plain rectangles, not the
	parallelogram used everywhere else. Google's embed places its own UI
	(the business info popup, the "open in Maps" link, the attribution bar)
	wherever the map happens to be panned/zoomed to, with zero awareness of
	a custom clip-path — a decorative cut landed on top of that live content
	and sliced through the business name/address in the popup and the
	attribution text, not just background map tiles. That's not a tunable
	offset problem, it's fundamentally unsafe to shape-clip: fix each time,
	it can fail again the next time the embed's internal layout shifts.
-->
<div class="overflow-hidden rounded-2xl border border-secondary-line bg-ink-line">
	<div class="grid md:grid-cols-2">
		<iframe
			src={location.embedSrc}
			title={`Map to ${location.name}`}
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			class="h-64 w-full border-0 md:h-full"
		></iframe>

		<div class="flex flex-col justify-center gap-4 p-8">
			<h3 class="text-xl font-bold text-paper">{location.name}</h3>
			<p class="text-sm text-muted">{location.address}</p>

			<div class="mt-2 flex flex-wrap gap-3">
				<Button href={location.googleMapsUrl} variant="primary" size="sm">{dict.locations.directionsGoogle}</Button>
				<Button href={location.wazeUrl} variant="outline" size="sm">{dict.locations.directionsWaze}</Button>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-3 gap-x-4 gap-y-8 border-t border-secondary-line p-8 sm:grid-cols-4 md:grid-cols-6">
		{#each location.amenities as amenity (amenity.label)}
			<div class="flex flex-col items-center gap-2 text-center">
				<img src={amenity.icon} alt="" aria-hidden="true" width="40" height="40" loading="lazy" />
				<span class="text-xs font-medium text-paper">{amenity.label}</span>
			</div>
		{/each}
	</div>

	{#if location.highlights.length}
		<ul class="grid gap-x-8 gap-y-2 border-t border-secondary-line p-8 text-sm text-muted sm:grid-cols-2">
			{#each location.highlights as highlight (highlight)}
				<li class="flex items-start gap-2">
					<span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary"></span>
					{highlight}
				</li>
			{/each}
		</ul>
	{/if}
</div>
