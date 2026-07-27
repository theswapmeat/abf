<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { getDictionary } from '$lib/i18n';
	import { business } from '$lib/data/business';
	import { LOCATIONS } from '$lib/data/locations';
	import { isValidUaeMobile } from '$lib/utils/phone';
	import { submitForm } from '$lib/utils/submitForm';
	import Seo from '$lib/components/Seo.svelte';
	import PageHero from '$lib/components/PageHero.svelte';
	import FormField from '$lib/components/FormField.svelte';
	import PhoneInput from '$lib/components/PhoneInput.svelte';
	import Button from '$lib/components/Button.svelte';

	const dict = getDictionary();
	const location = LOCATIONS[0];

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let errors = $state<Record<string, string>>({});
	let status = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validate(): boolean {
		const next: Record<string, string> = {};
		if (!name.trim()) next.name = dict.form.errorRequired;
		if (!EMAIL_RE.test(email)) next.email = dict.form.errorEmail;
		if (!isValidUaeMobile(phone)) next.phone = dict.form.errorPhone;
		if (!message.trim()) next.message = dict.form.errorRequired;
		errors = next;
		return Object.keys(next).length === 0;
	}

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validate()) return;
		status = 'submitting';
		const result = await submitForm(env.PUBLIC_LEAD_FORM_ENDPOINT, {
			form: 'contact',
			name,
			email,
			phone,
			message
		});
		status = result.ok ? 'success' : 'error';
	}
</script>

<Seo
	title={dict.contact.headline}
	description="Contact AB Fitness in Dubai — call, WhatsApp, email, or send a message. Located at Mina Rashid, Maritime City."
	path="/contact"
/>

<PageHero eyebrow={dict.contact.eyebrow} headline={dict.contact.headline} intro={dict.contact.intro} />

<section class="container-page py-16 md:py-24">
	<!--
		Both columns are flex flex-col so the grid's default row-stretch
		makes them equal height, and the form/iframe each take flex-1 so
		whichever one is naturally shorter grows to fill that shared height
		instead of leaving its trailing buttons stranded above the other
		column's. (This is what was misaligned before: the iframe had a
		fixed h-96 with no relationship to the form's organic height, so
		Submit and the directions buttons landed at different y-positions.)
		The phone/WhatsApp/email block is deliberately outside this grid,
		below it — it's not meant to be height-matched against the map.
	-->
	<div class="grid gap-12 md:grid-cols-2">
		<div class="flex flex-col">
			<h2 class="text-xl font-bold text-paper">{dict.contact.formHeading}</h2>

			{#if status === 'success'}
				<div class="mt-6 rounded-2xl border border-secondary-line p-8" role="status">
					<h3 class="text-lg font-bold text-paper">{dict.form.successHeading}</h3>
					<p class="mt-2 text-muted">{dict.form.successBody}</p>
				</div>
			{:else}
				<form onsubmit={handleSubmit} novalidate class="mt-6 flex flex-1 flex-col gap-4">
				<FormField label={dict.form.fullName} id="contact-name" error={errors.name} required>
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

				<FormField label={dict.form.email} id="contact-email" error={errors.email} required>
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

				<FormField label={dict.form.phone} id="contact-phone" error={errors.phone} required>
					{#snippet children({ id, describedBy, invalid })}
						<PhoneInput {id} bind:value={phone} {describedBy} {invalid} required />
					{/snippet}
				</FormField>

				<FormField label={dict.form.message} id="contact-message" error={errors.message} required>
					{#snippet children({ id, describedBy, invalid })}
						<textarea
							{id}
							bind:value={message}
							required
							rows="4"
							aria-invalid={invalid}
							aria-describedby={describedBy}
							class="parallelogram resize-none border-t-2 border-b-2 bg-paper/5 px-3 py-3 text-sm text-paper outline-none {invalid
								? 'border-primary'
								: 'border-secondary-line focus:border-primary'}"
						></textarea>
					{/snippet}
				</FormField>

				{#if status === 'error'}
					<p role="alert" class="text-sm font-medium text-primary">
						Something went wrong — please try again or WhatsApp us directly.
					</p>
				{/if}

				<Button type="submit" disabled={status === 'submitting'} class="w-full sm:w-auto">
					{status === 'submitting' ? dict.form.submitting : dict.form.submit}
				</Button>
			</form>
		{/if}
		</div>

		<div class="flex flex-col">
			<h2 class="text-xl font-bold text-paper">{dict.contact.mapHeading}</h2>
			<!--
				Plain rectangle, not the parallelogram — Google's embed places its
				own UI (business info popup, attribution bar) with no awareness of
				a custom clip-path, and a decorative cut here sliced straight
				through the popup's business name/address, not just map tiles.
				Unsafe to shape-clip regardless of the offset used.
				flex-1 (not a fixed h-96) so it grows to match the form column's
				height instead of leaving the directions buttons stranded above
				where Submit ends.
			-->
			<iframe
				src={location.embedSrc}
				title={`Map to ${location.name}`}
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
				class="mt-6 min-h-64 w-full flex-1 rounded-2xl border-0"
			></iframe>
			<div class="mt-4 flex flex-wrap gap-3">
				<Button href={business.googleMapsUrl} target="_blank" variant="primary" size="sm">
					{dict.locations.directionsGoogle}
				</Button>
				<Button href={business.wazeUrl} target="_blank" variant="outline" size="sm">
					{dict.locations.directionsWaze}
				</Button>
			</div>
		</div>
	</div>

	<div class="mt-10 flex flex-col gap-2 border-t border-ink-line pt-8 text-sm">
		<a href={business.phone.href} class="text-paper transition-colors hover:text-primary">{business.phone.display}</a>
		<a
			href={`${business.whatsapp.href}?text=${encodeURIComponent(dict.whatsapp.prefilledMessage)}`}
			target="_blank"
			rel="noopener noreferrer"
			class="text-paper transition-colors hover:text-primary"
		>
			WhatsApp: {business.mobile.display}
		</a>
		<a href={`mailto:${business.email}`} class="text-paper transition-colors hover:text-primary">{business.email}</a>
	</div>
</section>
