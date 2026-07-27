<script lang="ts">
	import { getDictionary } from '$lib/i18n';

	const dict = getDictionary();
	const principles = dict.home.principles;

	/*
	 * The seamless-loop trick (track holds 2 identical halves, animates
	 * translateX(0) -> translateX(-50%), so the second half lands exactly
	 * where the first started) only looks seamless if ONE half is at least
	 * as wide as the viewport. Otherwise the content runs out before the
	 * loop resets — nothing left to slide in from the right, just a gap
	 * then a jump. Confirmed failing on a 2560px viewport: one un-repeated
	 * half was only ~900px. Repeating the word list padds each half out
	 * far enough to outrun any realistic browser width.
	 */
	const REPEATS_PER_HALF = 8;
	const TARGET_SPEED_PX_PER_S = 64;

	let trackEl = $state<HTMLDivElement>();

	$effect(() => {
		if (!trackEl) return;
		const halfWidth = trackEl.scrollWidth / 2;
		trackEl.style.animationDuration = `${halfWidth / TARGET_SPEED_PX_PER_S}s`;
	});
</script>

<div class="overflow-hidden border-y border-ink-line bg-ink py-6" aria-hidden="true">
	<div
		bind:this={trackEl}
		class="flex w-max animate-marquee gap-10 whitespace-nowrap motion-reduce:animate-none"
	>
		{#each { length: 2 } as _, half (half)}
			<div class="flex shrink-0 items-center gap-10">
				{#each { length: REPEATS_PER_HALF } as _, rep (rep)}
					{#each principles as word (word + rep)}
						<span class="flex items-center gap-10">
							<span class="text-display-3 font-display font-normal text-muted uppercase text-glow-primary">{word}</span>
							<span class="text-display-3 font-display font-normal text-primary">·</span>
						</span>
					{/each}
				{/each}
			</div>
		{/each}
	</div>
</div>
