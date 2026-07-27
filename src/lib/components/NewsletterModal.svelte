<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { env } from '$env/dynamic/public';
	import { getDictionary } from '$lib/i18n';
	import { exitIntent, markNewsletterDismissed } from '$lib/actions/exitIntent';
	import { focusTrap } from '$lib/actions/focusTrap';
	import { submitForm } from '$lib/utils/submitForm';
	import Button from './Button.svelte';

	const dict = getDictionary();

	let visible = $state(false);
	let email = $state('');
	let error = $state('');
	let status = $state<'idle' | 'submitting' | 'success'>('idle');

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function open() {
		visible = true;
	}

	function dismiss() {
		visible = false;
		markNewsletterDismissed();
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!EMAIL_RE.test(email)) {
			error = dict.form.errorEmail;
			return;
		}
		error = '';
		status = 'submitting';
		const result = await submitForm(env.PUBLIC_NEWSLETTER_ENDPOINT, { form: 'newsletter-exit-intent', email });
		status = result.ok ? 'success' : 'idle';
		if (result.ok) markNewsletterDismissed();
	}
</script>

<div use:exitIntent={{ onTrigger: open, inactivityMs: 45000 }} class="hidden" aria-hidden="true"></div>

{#if visible}
	<div class="fixed inset-0 z-50 flex items-center justify-center p-4" transition:fade={{ duration: 150 }}>
		<button
			type="button"
			aria-label={dict.newsletter.close}
			onclick={dismiss}
			class="absolute inset-0 bg-ink/80"
		></button>

		<div
			use:focusTrap={{ active: visible, onEscape: dismiss }}
			role="dialog"
			aria-modal="true"
			aria-labelledby="newsletter-modal-heading"
			transition:fly={{ y: 16, duration: 200 }}
			class="relative w-full max-w-md rounded-2xl border border-secondary-line bg-ink p-8"
		>
			<button
				type="button"
				onclick={dismiss}
				aria-label={dict.newsletter.close}
				class="absolute end-4 top-4 rounded-full p-1 text-paper transition-colors hover:text-primary"
			>
				<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
				</svg>
			</button>

			{#if status === 'success'}
				<h2 id="newsletter-modal-heading" class="text-xl font-bold text-paper">
					{dict.newsletter.successHeading}
				</h2>
				<p class="mt-2 text-muted">{dict.newsletter.successBody}</p>
			{:else}
				<p class="text-eyebrow font-semibold text-primary uppercase">{dict.newsletter.eyebrow}</p>
				<h2 id="newsletter-modal-heading" class="text-display-3 mt-2 font-display font-normal text-paper">
					{dict.newsletter.headline}
				</h2>
				<p class="mt-3 text-sm text-muted">{dict.newsletter.body}</p>

				<form onsubmit={handleSubmit} novalidate class="mt-5 flex flex-col gap-3">
					<div>
						<label for="newsletter-email" class="sr-only">{dict.form.email}</label>
						<input
							id="newsletter-email"
							type="email"
							required
							bind:value={email}
							placeholder={dict.newsletter.emailPlaceholder}
							aria-invalid={Boolean(error)}
							aria-describedby={error ? 'newsletter-email-error' : undefined}
							class="parallelogram w-full border-t-2 border-b-2 bg-paper/5 px-3 py-3 text-sm text-paper outline-none {error
								? 'border-primary'
								: 'border-secondary-line focus:border-primary'}"
						/>
						{#if error}
							<p id="newsletter-email-error" role="alert" class="mt-1 text-xs font-medium text-primary">{error}</p>
						{/if}
					</div>

					<Button type="submit" disabled={status === 'submitting'} class="w-full">
						{status === 'submitting' ? dict.form.submitting : dict.newsletter.submit}
					</Button>

					<button
						type="button"
						onclick={dismiss}
						class="text-xs text-muted underline-offset-2 hover:text-paper hover:underline"
					>
						{dict.newsletter.dismiss}
					</button>
				</form>
			{/if}
		</div>
	</div>
{/if}
