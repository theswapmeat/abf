<script lang="ts">
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { fade } from 'svelte/transition';
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
	// Compared against `${base}/` (not a bare '/') because under a subpath
	// deploy (GitHub Pages serves this at /abf/) the home page's real
	// pathname is /abf/, not /.
	let isHome = $derived(page.url.pathname === `${base}/`);
	let transparent = $derived(isHome && !scrolled && !open);

	// Buy/Book Classes duplicate the hero's own two CTA buttons while the
	// hero is on screen, so they're hidden there and only appear once the
	// user scrolls past it (or is on any other page, where there's no hero
	// CTA to be redundant with). Get a Free Class has no such duplicate
	// anywhere, so it's unconditional.
	let showSecondaryCtas = $derived(!isHome || scrolled);

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
		<a href="{base}/" class="shrink-0" aria-label="AB Fitness — home">
			<img src={logo} alt="AB Fitness" width="112" height="82" class="h-12 w-auto sm:h-14" />
		</a>

		<div class="flex items-center gap-2 sm:gap-3">
			<!--
				Wrapper divs carry the responsive hidden/md:block split instead
				of passing "hidden md:inline-flex" straight to Button — Button's
				own base classes always include inline-flex, and a class prop
				fighting the component's own base over the same `display`
				property is a source-order-dependent cascade conflict, not
				something JS string concatenation order controls. Wrapping in
				a plain element with no competing display utility avoids it
				entirely (this was previously broken exactly this way: both
				buttons were showing on mobile despite "hidden").
			-->
			{#if showSecondaryCtas}
				<div class="hidden md:block" transition:fade={{ duration: 200 }}>
					<Button href="/membership" variant="outline" size="sm">
						{dict.nav.buyClasses}
					</Button>
				</div>
			{/if}
			{#if showSecondaryCtas}
				<div transition:fade={{ duration: 200 }}>
					<!--
						Shorter label below the sm breakpoint — the full "Book
						Classes"/"Get a Free Class" text was wrapping onto two
						lines in the cramped mobile header (logo + 2 buttons +
						hamburger competing for ~360px), which read as an
						oversized, broken-looking button. Swapping the text
						itself (not the button's own padding/size) keeps this
						completely independent of Button's own size/geometry
						math, so there's no risk of reintroducing the corner-
						bleed issue that comes from mismatching a button's
						declared size against its actual rendered height.
					-->
					<Button href="/schedule" variant="primary" size="sm">
						<span class="sm:hidden">{dict.nav.bookClassesShort}</span>
						<span class="hidden sm:inline">{dict.nav.bookClasses}</span>
					</Button>
				</div>
			{/if}
			<!--
				Anchors to the home page's pre-footer orientation section
				(PreFooterCta.svelte, id="free-orientation") — that section
				only exists on "/", so this always targets "/#free-orientation"
				rather than a same-page hash, working correctly from any page.
				Unconditional (unlike Buy/Book Classes above) — always
				visible, every page, every viewport, since nothing else
				duplicates it.

				The rotating gradient ring is a separate span BEHIND the
				Button, not something baked into Button.svelte itself — it's
				a one-off treatment for this single button, not a reusable
				variant. It's skewed the same as the button (shape-lean) and
				needs its OWN corner-overscan on top of that, same idea as
				Button.svelte's shapeOverscan: at a ring height of 42px
				(sm's 36px button + 3px reveal top and bottom), skewing it
				shifts the top/bottom edges by 42/2*tan(10deg) ≈ 3.7px, so
				-6.7px (3px reveal + 3.7px overscan) horizontally keeps the
				ring's slanted edges from receding inside the button's own
				corners the way a plain -3px-all-round inset did — which is
				what made this look like a rectangle glowing behind a
				parallelogram instead of an actual border tracing its shape.
				The wrapper is inline-block so it shrink-wraps to the
				Button's own rendered size; the ring is positioned first so
				it paints behind the Button (later sibling) with no z-index
				needed.
			-->
			<div class="relative inline-block">
				<span
					class="gradient-border-ring animate-gradient-spin shape-lean -inset-y-0.75 -left-[6.7px] -right-[6.7px]"
					aria-hidden="true"
				></span>
				<Button href="/#free-orientation" variant="primary" size="sm">
					<span class="sm:hidden">{dict.nav.getFreeClassShort}</span>
					<span class="hidden sm:inline">{dict.nav.getFreeClass}</span>
				</Button>
			</div>

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
