<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		id: string;
		error?: string;
		required?: boolean;
		hint?: string;
		children: Snippet<[{ id: string; describedBy: string | undefined; invalid: boolean }]>;
	}

	let { label, id, error, required = false, hint, children }: Props = $props();

	let describedBy = $derived(error ? `${id}-error` : hint ? `${id}-hint` : undefined);
</script>

<div class="flex flex-col gap-1.5">
	<label for={id} class="text-sm font-medium text-paper">
		{label}
		{#if required}<span aria-hidden="true" class="text-primary"> *</span>{/if}
	</label>

	{@render children({ id, describedBy, invalid: Boolean(error) })}

	{#if hint && !error}
		<p id={`${id}-hint`} class="text-xs text-muted">{hint}</p>
	{/if}

	{#if error}
		<p id={`${id}-error`} role="alert" class="text-xs font-medium text-primary">{error}</p>
	{/if}
</div>
