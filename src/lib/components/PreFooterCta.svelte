<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { getDictionary } from '$lib/i18n';
	import { isValidUaeMobile } from '$lib/utils/phone';
	import { submitForm } from '$lib/utils/submitForm';
	import FormField from './FormField.svelte';
	import PhoneInput from './PhoneInput.svelte';
	import Button from './Button.svelte';

	const dict = getDictionary();

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let errors = $state<Record<string, string>>({});
	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validate(): boolean {
		const next: Record<string, string> = {};
		if (!name.trim()) next.name = dict.form.errorRequired;
		if (!EMAIL_RE.test(email)) next.email = dict.form.errorEmail;
		if (!isValidUaeMobile(phone)) next.phone = dict.form.errorPhone;
		errors = next;
		return Object.keys(next).length === 0;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validate()) return;

		status = 'submitting';
		const result = await submitForm(env.PUBLIC_LEAD_FORM_ENDPOINT, {
			form: 'pre-footer-orientation',
			name,
			email,
			phone
		});
		status = result.ok ? 'success' : 'error';
	}
</script>

<section class="border-y border-ink-line bg-primary-dim">
	<div class="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
		<div>
			<p class="text-eyebrow font-semibold text-primary uppercase">{dict.ctaBand.eyebrow}</p>
			<h2 class="text-display-2 mt-3 font-display font-normal text-paper uppercase">{dict.ctaBand.headline}</h2>
			<p class="mt-4 max-w-md text-muted">{dict.ctaBand.body}</p>
		</div>

		{#if status === 'success'}
			<div class="rounded-2xl border border-secondary-line p-8" role="status">
				<h3 class="text-xl font-bold text-paper">{dict.form.successHeading}</h3>
				<p class="mt-2 text-muted">{dict.form.successBody}</p>
			</div>
		{:else}
			<form onsubmit={handleSubmit} novalidate class="grid gap-4 sm:grid-cols-2">
				<FormField label={dict.form.fullName} id="prefooter-name" error={errors.name} required>
					{#snippet children({ id, describedBy, invalid })}
						<input
							{id}
							bind:value={name}
							required
							aria-invalid={invalid}
							aria-describedby={describedBy}
							class="parallelogram border-t-2 border-b-2 bg-paper/5 px-3 py-3 text-sm text-paper outline-none {invalid
								? 'border-primary'
								: 'border-secondary-line focus:border-primary'}"
						/>
					{/snippet}
				</FormField>

				<FormField label={dict.form.email} id="prefooter-email" error={errors.email} required>
					{#snippet children({ id, describedBy, invalid })}
						<input
							{id}
							type="email"
							bind:value={email}
							required
							aria-invalid={invalid}
							aria-describedby={describedBy}
							class="parallelogram border-t-2 border-b-2 bg-paper/5 px-3 py-3 text-sm text-paper outline-none {invalid
								? 'border-primary'
								: 'border-secondary-line focus:border-primary'}"
						/>
					{/snippet}
				</FormField>

				<FormField label={dict.form.phone} id="prefooter-phone" error={errors.phone} required>
					{#snippet children({ id, describedBy, invalid })}
						<PhoneInput {id} bind:value={phone} {describedBy} {invalid} required />
					{/snippet}
				</FormField>

				<div class="flex flex-col justify-end">
					{#if status === 'error'}
						<p role="alert" class="mb-3 text-sm font-medium text-primary">
							Something went wrong — please try again or WhatsApp us directly.
						</p>
					{/if}
					<Button type="submit" disabled={status === 'submitting'} class="w-full sm:w-auto">
						{status === 'submitting' ? dict.form.submitting : dict.ctaBand.submit}
					</Button>
				</div>
			</form>
		{/if}
	</div>
</section>
