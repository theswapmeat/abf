<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children: Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<span
	class={`inline-flex items-center rounded-full border border-secondary-line px-3 py-1 text-xs font-medium uppercase tracking-wide text-secondary ${className}`}
>
	{@render children()}
</span>
