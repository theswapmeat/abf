<script lang="ts">
	import { base } from '$app/paths';
	import type { ClassFormat } from '$lib/data/classes';

	interface Props {
		format: ClassFormat;
	}

	let { format }: Props = $props();
</script>

<a
	href={`${base}/classes#${format.id}`}
	id={format.id}
	class="group relative block aspect-3/4 overflow-hidden scroll-mt-24 [clip-path:polygon(23.5%_0,100%_0,76.5%_100%,0_100%)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
>
	<img
		src={format.image.src}
		alt={format.image.alt}
		loading="lazy"
		class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
	/>
	<div class="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-transparent"></div>

	<div class="absolute top-3 inset-e-3 flex flex-col items-end gap-1.5">
		<span class="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-ink">{format.intensity}</span>
		<span class="rounded-full bg-ink/80 px-2.5 py-1 text-xs font-medium text-paper backdrop-blur-sm">
			{format.duration}
		</span>
	</div>

	<div class="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5 ps-7 pe-12">
		<h3 class="text-lg font-bold text-paper">{format.name}</h3>
		<p class="text-sm text-muted">{format.tagline}</p>
	</div>
</a>
