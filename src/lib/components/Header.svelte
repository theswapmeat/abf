<script lang="ts">
	import { page } from '$app/state';
	import { getDictionary } from '$lib/i18n';
	import logo from '$lib/assets/logo.png';
	import Button from './Button.svelte';
	import NavOverlay from './NavOverlay.svelte';

	const dict = getDictionary();
	let open = $state(false);
	let scrolled = $state(false);

	// Only the home page has a hero worth floating over transparently — every
	// other page's PageHero is a flat color block, so a see-through header
	// there would just reveal that same color, not the hero video underneath.
	let isHome = $derived(page.url.pathname === '/');
	let transparent = $derived(isHome && !scrolled && !open);

	$effect(() => {
		if (!isHome) return;
		const onScroll = () => {
			scrolled = window.scrollY > 40;
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function toggle() {
		open = !open;
	}

	function close() {
		open = false;
	}
</script>

<!--
	Home page only: fixed (not sticky) so it's lifted out of document flow and
	overlaps the hero instead of pushing it down. sticky still reserves its
	own height in flow — a transparent sticky header just reveals the plain
	page background behind it, not the hero video, because the video (inside
	HomeHero's own section) never renders underneath a block that's taking up
	space above it. Every other page keeps the original sticky behavior
	unchanged (their PageHero needs the header's space reserved, not overlapped).
-->
<header
	class="top-0 z-40 border-b transition-colors duration-300 {isHome
		? 'fixed inset-x-0'
		: 'sticky'} {transparent ? 'border-transparent bg-transparent' : 'border-ink-line bg-ink/90 backdrop-blur'}"
>
	<div class="container-page flex h-16 items-center justify-between py-3 md:h-20">
		<a href="/" class="shrink-0" aria-label="AB Fitness — home">
			<img src={logo} alt="AB Fitness" width="112" height="82" class="h-12 w-auto sm:h-14" />
		</a>

		<div class="flex items-center gap-2 sm:gap-3">
			<Button href="/membership" variant="outline" size="sm" class="hidden md:inline-flex">
				{dict.nav.buyClasses}
			</Button>
			<Button href="/schedule" variant="primary" size="sm">
				{dict.nav.bookClasses}
			</Button>

			<!--
				Three bars, no circle/border chrome. On hover the top bar nudges
				right and the bottom bar nudges left (middle stays put) so the
				stack leans like the app-wide parallelogram shape instead of a
				generic hamburger animation.
			-->
			<button
				type="button"
				onclick={toggle}
				aria-expanded={open}
				aria-controls="nav-overlay"
				class="group ms-1 flex h-11 w-11 flex-col items-center justify-center gap-1.5"
			>
				<span class="sr-only">{open ? dict.nav.closeMenu : dict.nav.openMenu}</span>
				<span
					class="block h-0.5 w-5 bg-paper transition-transform duration-200 ease-out group-hover:translate-x-0.5"
				></span>
				<span class="block h-0.5 w-5 bg-paper"></span>
				<span
					class="block h-0.5 w-5 bg-paper transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
				></span>
			</button>
		</div>
	</div>
</header>

<NavOverlay {open} onClose={close} />
