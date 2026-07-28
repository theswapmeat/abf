<script lang="ts">
	import type { PtPackage } from '$lib/data/membership';
	import { formatAED } from '$lib/utils/currency';
	import { business } from '$lib/data/business';
	import { getDictionary } from '$lib/i18n';
	import Button from './Button.svelte';

	interface Props {
		pkg: PtPackage;
	}

	let { pkg }: Props = $props();
	const dict = getDictionary();

	let joinHref = $derived(
		`${business.whatsapp.href}?text=${encodeURIComponent(`Hello, I would like to book the ${pkg.label} (${pkg.sessions} sessions) personal training package.`)}`
	);
</script>

<!--
	mx-5 md:mx-0: see the identical comment in TestimonialCard.svelte — a
	skewX'd element spanning the full mobile single-column width overshoots
	its container by height/2 * tan(10deg) at the slanted corners, and these
	plan cards are tall enough (pricing + features + button) to clear the
	container's own mobile padding and get cut off at the viewport edge.
-->
<div class="shape-lean mx-5 h-full overflow-hidden border-t-2 border-b-2 border-secondary-line bg-ink-line md:mx-0">
	<div class="shape-unlean flex h-full flex-col p-10">
		<h3 class="text-xl font-bold text-paper">{pkg.label}</h3>
		<p class="mt-1 text-sm text-muted">{pkg.sessions} sessions · {formatAED(pkg.totalAed)} billed upfront</p>

		<p class="mt-6 flex items-baseline gap-1">
			<span class="text-display-3 font-display font-normal text-paper">{formatAED(pkg.monthlyAed)}</span>
			<span class="text-sm text-muted">{dict.membership.perMonth}</span>
		</p>
		<p class="mt-1 text-sm text-primary">{formatAED(pkg.perSessionAed)} per session</p>

		<Button href={joinHref} target="_blank" variant="outline" class="mt-8 w-full">{dict.membership.ctaLabel}</Button>
	</div>
</div>
