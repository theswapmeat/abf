<script lang="ts">
	import { base } from '$app/paths';
	import { getDictionary } from '$lib/i18n';
	import Button from './Button.svelte';

	const dict = getDictionary();

	/*
	 * Real AB Fitness floor footage, self-hosted from static/media so the
	 * new site doesn't depend on the old one staying up. Poster paints
	 * immediately; video is only mounted after first paint so it never
	 * competes with LCP. At ~56MB this is heavy for a hero video — worth
	 * re-encoding (H.264 at a lower bitrate, or AV1/WebM) before launch.
	 */
	const posterSrc = `${base}/media/gym/best-gym-in-dubai.jpg`;
	const videoSrc = `${base}/media/gym/ab-fitness-gym.mp4`;

	let videoReady = $state(false);

	$effect(() => {
		const id = requestAnimationFrame(() => {
			videoReady = true;
		});
		return () => cancelAnimationFrame(id);
	});
</script>

<section class="relative flex flex-1 items-center overflow-hidden bg-ink">
	<img
		src={posterSrc}
		alt=""
		aria-hidden="true"
		class="absolute inset-0 h-full w-full object-cover"
		class:opacity-0={videoReady}
	/>

	{#if videoReady}
		<video
			autoplay
			muted
			loop
			playsinline
			preload="none"
			poster={posterSrc}
			class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
		>
			<source src={videoSrc} type="video/mp4" />
		</video>
	{/if}

	<div class="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-ink/20"></div>

	<div class="container-page relative z-10 py-16">
		<h1 class="text-display-1 max-w-4xl font-display font-normal text-paper uppercase">{dict.home.heroHeadline}</h1>
		<p class="mt-6 max-w-xl text-lg text-paper/90">{dict.home.heroSub}</p>

		<div class="mt-8 flex flex-wrap gap-4">
			<Button href="/schedule" variant="primary" size="lg">{dict.home.heroCtaPrimary}</Button>
			<Button href="/membership" variant="outline" size="lg">{dict.home.heroCtaSecondary}</Button>
		</div>
	</div>
</section>
