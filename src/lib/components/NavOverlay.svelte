<script lang="ts">
	import { getDictionary } from '$lib/i18n';
	import { focusTrap } from '$lib/actions/focusTrap';
	import { fade } from 'svelte/transition';

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open, onClose }: Props = $props();
	const dict = getDictionary();

	let flatLinks = $derived(dict.nav.overlayGroups.flatMap((group) => group.links));

	$effect(() => {
		document.body.style.overflow = open ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

{#if open}
	<div
		id="nav-overlay"
		class="fixed inset-0 z-50 overflow-y-auto bg-ink"
		transition:fade={{ duration: 180 }}
		use:focusTrap={{ active: open, onEscape: onClose }}
		role="dialog"
		aria-modal="true"
		aria-label={dict.nav.openMenu}
	>
		<div class="container-page flex items-center justify-end py-4 sm:py-5">
			<button
				type="button"
				onclick={onClose}
				class="flex h-10 w-10 items-center justify-center rounded-full text-paper transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
			>
				<span class="sr-only">{dict.nav.closeMenu}</span>
				<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
				</svg>
			</button>
		</div>

		<div class="container-page pb-16 pt-6 sm:pt-10">
			<nav class="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4 md:gap-x-10">
				{#each dict.nav.overlayGroups as group (group.heading)}
					<div>
						<h2 class="mb-3 text-xs font-semibold tracking-widest text-primary uppercase">
							{group.heading}
						</h2>
						<ul class="flex flex-col gap-2">
							{#each group.links as link (link.href)}
								{@const flatIndex = flatLinks.indexOf(link)}
								<li
									style={`transition-delay:${open ? flatIndex * 30 : 0}ms`}
									class={`transition-all duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
								>
									<a
										href={link.href}
										onclick={onClose}
										class="text-base font-semibold text-paper transition-colors hover:text-primary md:text-lg"
									>
										{link.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</nav>

			<div class="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:max-w-2xl">
				{#each dict.nav.promoTiles as tile (tile.heading)}
					<a
						href={tile.href}
						onclick={onClose}
						class="group shape-lean overflow-hidden border-t-2 border-b-2 border-secondary-line bg-primary-dim transition-colors hover:border-primary"
					>
						<span class="shape-unlean flex flex-col gap-1 px-5 py-3">
							<span class="text-sm font-semibold text-paper group-hover:text-primary">{tile.heading}</span>
							<span class="block text-xs text-muted">{tile.body}</span>
							<span class="mt-1 block text-xs font-semibold uppercase tracking-wide text-primary">
								{tile.cta} →
							</span>
						</span>
					</a>
				{/each}
			</div>
		</div>
	</div>
{/if}
