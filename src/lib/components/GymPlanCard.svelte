<script lang="ts">
	import type { GymMembershipPlan } from '$lib/data/membership';
	import { formatAED } from '$lib/utils/currency';
	import { getDictionary } from '$lib/i18n';
	import { business } from '$lib/data/business';
	import Button from './Button.svelte';

	interface Props {
		plan: GymMembershipPlan;
	}

	let { plan }: Props = $props();
	const dict = getDictionary();

	let joinHref = $derived(
		`${business.whatsapp.href}?text=${encodeURIComponent(`Hello, I would like to sign up for the ${plan.label} gym membership.`)}`
	);
</script>

<div
	class={`shape-lean h-full overflow-hidden border-t-2 border-b-2 ${
		plan.mostPopular ? 'border-primary bg-primary-dim' : 'border-secondary-line bg-ink-line'
	}`}
>
	<div class="shape-unlean relative flex h-full flex-col p-10">
		{#if plan.mostPopular}
			<span
				class="absolute top-4 inset-e-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink"
			>
				{dict.membership.mostPopular}
			</span>
		{/if}

		<h3 class="text-xl font-bold text-paper">{plan.label}</h3>
		<p class="mt-1 text-sm text-muted">{formatAED(plan.totalAed)} billed upfront</p>

		<p class="mt-6 flex items-baseline gap-1">
			<span class="text-display-3 font-display font-normal text-paper">{formatAED(plan.monthlyAed)}</span>
			<span class="text-sm text-muted">{dict.membership.perMonth}</span>
		</p>

		<Button href={joinHref} target="_blank" variant={plan.mostPopular ? 'primary' : 'outline'} class="mt-8 w-full">
			{dict.membership.ctaLabel}
		</Button>
	</div>
</div>
