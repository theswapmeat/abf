<script lang="ts">
	import { business } from '$lib/data/business';
	import { getDictionary } from '$lib/i18n';

	const dict = getDictionary();
	let href = $derived(`${business.whatsapp.href}?text=${encodeURIComponent(dict.whatsapp.prefilledMessage)}`);
</script>

<a
	{href}
	target="_blank"
	rel="noopener noreferrer"
	aria-label={dict.whatsapp.label}
	class="fixed inset-e-4 bottom-4 sm:inset-e-6 sm:bottom-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-ink shadow-lg shadow-black/40 transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
>
	<svg viewBox="0 0 32 32" width="30" height="30" fill="currentColor" aria-hidden="true">
		<path
			d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.386.633 4.62 1.735 6.553L4 29l7.633-1.702A11.94 11.94 0 0 0 16 27c6.628 0 12-5.373 12-12.001C28 8.373 22.629 3 16.001 3Zm6.996 17.09c-.297.833-1.469 1.529-2.404 1.729-.639.137-1.474.246-4.284-.92-3.594-1.49-5.907-5.13-6.088-5.366-.174-.235-1.462-1.946-1.462-3.712 0-1.766.926-2.635 1.254-2.997.328-.362.717-.453.956-.453.239 0 .478.002.687.013.22.011.516-.083.807.617.297.716 1.01 2.482 1.098 2.663.087.181.146.393.03.629-.116.235-.174.382-.34.588-.166.206-.35.46-.5.617-.166.174-.34.363-.146.712.194.35.862 1.42 1.85 2.3 1.27 1.132 2.34 1.483 2.69 1.65.35.166.554.14.76-.084.206-.223.878-1.024 1.113-1.375.235-.35.47-.293.79-.176.323.117 2.05.966 2.402 1.142.352.176.586.264.673.41.087.148.087.851-.211 1.684Z"
		/>
	</svg>
</a>
