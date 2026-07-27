<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { base } from '$app/paths';
	import { getDictionary } from '$lib/i18n';
	import { business } from '$lib/data/business';
	import { submitForm } from '$lib/utils/submitForm';
	import Button from './Button.svelte';

	const dict = getDictionary();
	const year = new Date().getFullYear();

	let email = $state('');
	let agreed = $state(false);
	let error = $state('');
	let status = $state<'idle' | 'submitting' | 'success'>('idle');

	const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!EMAIL_RE.test(email)) {
			error = dict.form.errorEmail;
			return;
		}
		if (!agreed) {
			error = dict.form.privacyError;
			return;
		}
		error = '';
		status = 'submitting';
		const result = await submitForm(env.PUBLIC_NEWSLETTER_ENDPOINT, { form: 'footer-newsletter', email });
		status = result.ok ? 'success' : 'idle';
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	const socialLinks = [
		{ label: 'Instagram', href: business.social.instagram, icon: `${base}/media/gym/insta-icon.png` },
		{ label: 'Facebook', href: business.social.facebook, icon: `${base}/media/gym/fb-icon.png` },
		{ label: 'YouTube', href: business.social.youtube, icon: `${base}/media/gym/youtube-icon-min.png` },
		{ label: 'TikTok', href: business.social.tiktok, icon: `${base}/media/gym/tiktok-min.png` }
	];
</script>

<footer class="border-t border-ink-line bg-ink">
	<div class="container-page grid gap-12 py-16 md:grid-cols-3">
		<div>
			<h2 class="text-xs font-semibold tracking-widest text-secondary uppercase opacity-70">
				{dict.footer.infoHeading}
			</h2>
			<address class="mt-4 not-italic text-sm leading-relaxed text-muted">
				{business.name}<br />
				{business.address.street}<br />
				{business.address.locality}, {business.address.country}
			</address>
			<div class="mt-4 flex flex-col gap-1 text-sm">
				<a href={business.phone.href} class="text-paper transition-colors hover:text-primary">{business.phone.display}</a>
				<a href={business.mobile.href} class="text-paper transition-colors hover:text-primary">{business.mobile.display}</a>
				<a
					href={`${business.whatsapp.href}?text=${encodeURIComponent(dict.whatsapp.prefilledMessage)}`}
					target="_blank"
					rel="noopener noreferrer"
					class="text-paper transition-colors hover:text-primary"
				>
					WhatsApp
				</a>
				<a href={`mailto:${business.email}`} class="text-paper transition-colors hover:text-primary">{business.email}</a>
			</div>
			<p class="mt-4 text-sm text-muted">
				<span class="font-medium text-paper">{dict.footer.hoursLabel}:</span>
				{dict.footer.hoursValue}
			</p>
			<div class="mt-4 flex gap-4 text-xs font-semibold uppercase tracking-wide text-primary">
				<a href={business.googleMapsUrl} target="_blank" rel="noopener noreferrer" class="hover:underline">
					Google Maps →
				</a>
				<a href={business.wazeUrl} target="_blank" rel="noopener noreferrer" class="hover:underline">Waze →</a>
			</div>
		</div>

		<div>
			<h2 class="text-xs font-semibold tracking-widest text-secondary uppercase opacity-70">
				{dict.footer.moreHeading}
			</h2>
			<ul class="mt-4 flex flex-col gap-2 text-sm">
				{#each dict.footer.moreLinks as link (link.href)}
					<li><a href="{base}{link.href}" class="text-paper transition-colors hover:text-primary">{link.label}</a></li>
				{/each}
			</ul>

			<h2 class="mt-8 text-xs font-semibold tracking-widest text-secondary uppercase opacity-70">Follow</h2>
			<div class="mt-4 flex gap-3">
				{#each socialLinks as social (social.href)}
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={social.label}
						class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full opacity-90 transition-opacity hover:opacity-100"
					>
						<img src={social.icon} alt="" aria-hidden="true" width="36" height="36" loading="lazy" />
					</a>
				{/each}
			</div>
		</div>

		<div>
			<h2 class="text-xs font-semibold tracking-widest text-secondary uppercase opacity-70">
				{dict.footer.newsletterHeading}
			</h2>
			<p class="mt-4 text-sm text-muted">{dict.footer.newsletterBody}</p>

			{#if status === 'success'}
				<p class="mt-4 text-sm font-medium text-primary" role="status">{dict.newsletter.successHeading}</p>
			{:else}
				<form onsubmit={handleSubmit} novalidate class="mt-4 flex flex-col gap-3">
					<label for="footer-newsletter-email" class="sr-only">{dict.form.email}</label>
					<input
						id="footer-newsletter-email"
						type="email"
						required
						bind:value={email}
						placeholder={dict.newsletter.emailPlaceholder}
						aria-invalid={Boolean(error)}
						aria-describedby={error ? 'footer-newsletter-error' : undefined}
						class="parallelogram border-t-2 border-b-2 bg-paper/5 px-3 py-2.5 text-sm text-paper outline-none {error
							? 'border-primary'
							: 'border-secondary-line focus:border-primary'}"
					/>

					<label class="flex items-start gap-2 text-xs text-muted">
						<input type="checkbox" bind:checked={agreed} class="mt-0.5 accent-primary" />
						{dict.form.privacyLabel}
					</label>

					{#if error}
						<p id="footer-newsletter-error" role="alert" class="text-xs font-medium text-primary">{error}</p>
					{/if}

					<Button type="submit" size="sm" disabled={status === 'submitting'} class="self-start">
						{status === 'submitting' ? dict.form.submitting : dict.form.submit}
					</Button>
				</form>
			{/if}
		</div>
	</div>

	<div class="container-page flex flex-col items-center justify-between gap-4 border-t border-ink-line py-6 sm:flex-row">
		<p class="text-xs text-muted">&copy; {year} {business.name}. {dict.footer.rights}</p>
		<button
			type="button"
			onclick={scrollToTop}
			class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-paper transition-colors hover:text-primary"
		>
			{dict.footer.scrollToTop}
			<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</div>
</footer>
