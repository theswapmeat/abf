<script lang="ts">
	import { base } from '$app/paths';
	import type { Trainer } from '$lib/data/trainers';
	import { getDictionary } from '$lib/i18n';

	interface Props {
		trainer: Trainer;
	}

	let { trainer }: Props = $props();
	const dict = getDictionary();
</script>

<a
	href={`${base}/team/${trainer.slug}`}
	class="group flex flex-col items-center rounded-xl p-4 text-center transition-colors hover:bg-ink-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
>
	<!--
		CSS `border` doesn't trace a clip-path outline (it stays on the box's
		original rectangular edges), so the "frame" here is two nested,
		identically-clipped layers instead: the outer one is the frame color,
		the ~3px inset reveals it as a border around the inner (image) layer.
		22% targets the app-wide 10deg on this fixed aspect-4/5 box: for a
		height = 1.25 * width box, pct = 1.25 * tan(10deg) ≈ 22%. Percentage
		(not px) so it stays exactly 10deg at every breakpoint's rendered size.
	-->
	<span
		class="aspect-4/5 w-full bg-secondary-line transition-colors duration-300 [clip-path:polygon(22%_0,100%_0,78%_100%,0_100%)] group-hover:bg-primary"
	>
		<span class="block h-full w-full p-0.75">
			<span class="block h-full w-full overflow-hidden bg-ink [clip-path:polygon(22%_0,100%_0,78%_100%,0_100%)]">
				<img
					src={trainer.portrait.src}
					alt={trainer.portrait.alt}
					loading="lazy"
					class="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
				/>
			</span>
		</span>
	</span>

	<p class="mt-4 text-sm font-bold tracking-wide text-paper uppercase">{trainer.name}</p>
	<p class="text-xs text-muted">{trainer.role}</p>

	<!--
		Height is reserved up front (not animated 0 -> h on hover) so hovering
		never changes this card's box size. These cards sit in a CSS grid —
		growing one card's height grows its whole row's track, which shoves
		every row below it down the page. Opacity-only keeps the box constant.
	-->
	<p
		class="mt-2 h-8 text-xs font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
	>
		{trainer.specialties.slice(0, 2).join(' · ')}
	</p>
</a>
