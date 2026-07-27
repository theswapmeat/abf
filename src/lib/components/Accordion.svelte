<script lang="ts">
	import type { FaqEntry } from '$lib/data/faq';

	interface Props {
		items: FaqEntry[];
	}

	let { items }: Props = $props();
</script>

<div class="divide-y divide-ink-line border-y border-ink-line">
	{#each items as item (item.question)}
		<details class="group py-5">
			<summary
				class="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-paper marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:text-lg"
			>
				{item.question}
				<svg
					viewBox="0 0 20 20"
					width="20"
					height="20"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					class="shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
				>
					<path d="M10 4v12M4 10h12" stroke-linecap="round" />
				</svg>
			</summary>
			<p class="mt-3 max-w-2xl text-sm text-muted sm:text-base">{item.answer}</p>
		</details>
	{/each}
</div>
