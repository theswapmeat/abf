<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		eyebrow: string;
		headline: string;
		intro?: string;
		children?: Snippet;
	}

	let { eyebrow, headline, intro, children }: Props = $props();
</script>

<section class="border-b border-ink-line bg-ink">
	<div class="container-page py-20 md:py-28">
		<p class="text-eyebrow font-semibold text-primary uppercase">{eyebrow}</p>
		<h1 class="text-display-1 mt-3 max-w-4xl font-display font-normal text-paper uppercase">{headline}</h1>
		{#if intro}
			<p class="mt-6 max-w-2xl text-lg text-muted">{intro}</p>
		{/if}
		{#if children}
			<div class="mt-8">{@render children()}</div>
		{/if}
	</div>
</section>
