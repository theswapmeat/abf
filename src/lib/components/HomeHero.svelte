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

<!-- id is a hook for Header.svelte's IntersectionObserver — it watches this
	 section to know exactly when the hero (and its own Book/Buy Classes CTAs)
	 has scrolled out of view, rather than guessing with a fixed scrollY value. -->
<section id="home-hero" class="relative flex flex-1 items-center overflow-hidden bg-ink">
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

		<!--
			Two separate button pairs, not one pair with responsive
			padding/text-size classes tacked on: passing size overrides
			straight to Button's `class` prop would fight its own
			size-driven classes over the same properties (padding, font-size)
			in a source-order-dependent way — the same class of bug that
			broke "hidden md:inline-flex" on the header buttons earlier.
			Two plain wrapper divs with their own hidden/flex, each holding
			a differently-sized Button instance, sidesteps that entirely.
			lg was too wide for two buttons to fit on one line below md
			(they wrapped onto separate lines), so mobile gets sm instead;
			the desktop pair (lg) is completely unchanged.
		-->
		<div class="mt-8 flex flex-wrap gap-3 md:hidden">
			<Button href="/schedule" variant="primary" size="sm">{dict.home.heroCtaPrimary}</Button>
			<Button href="/membership" variant="outline" size="sm">{dict.home.heroCtaSecondary}</Button>
		</div>
		<div class="mt-8 hidden flex-wrap gap-4 md:flex">
			<Button href="/schedule" variant="primary" size="lg">{dict.home.heroCtaPrimary}</Button>
			<Button href="/membership" variant="outline" size="lg">{dict.home.heroCtaSecondary}</Button>
		</div>
	</div>
</section>
