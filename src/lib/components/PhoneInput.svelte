<script lang="ts">
	import { UAE_DIAL_CODE, isValidUaeMobile, toE164Uae, toNationalDigits } from '$lib/utils/phone';

	interface Props {
		id: string;
		value: string;
		describedBy?: string;
		invalid?: boolean;
		required?: boolean;
	}

	let { id, value = $bindable(''), describedBy, invalid = false, required = false }: Props = $props();

	let national = $state(toNationalDigits(value));

	function handleInput(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		national = input.value.replace(/\D/g, '').slice(0, 9);
		value = national ? toE164Uae(national) : '';
	}
</script>

<div
	class="parallelogram flex items-stretch border-t-2 border-b-2 bg-paper/5 {invalid
		? 'border-primary'
		: 'border-secondary-line focus-within:border-primary'}"
>
	<span class="flex items-center border-e border-secondary-line px-3 text-sm text-muted select-none">
		{UAE_DIAL_CODE}
	</span>
	<input
		{id}
		type="tel"
		inputmode="numeric"
		autocomplete="tel-national"
		placeholder="5X XXX XXXX"
		{required}
		aria-invalid={invalid}
		aria-describedby={describedBy}
		value={national}
		oninput={handleInput}
		class="w-full bg-transparent px-3 py-3 text-sm text-paper outline-none placeholder:text-muted"
	/>
</div>

{#if national.length > 0}
	<span class="sr-only" aria-live="polite">
		{isValidUaeMobile(national) ? 'Valid UAE mobile number' : 'Invalid UAE mobile number'}
	</span>
{/if}
