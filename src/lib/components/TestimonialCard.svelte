<script lang="ts">
	import type { Testimonial } from '$lib/data/testimonials';

	interface Props {
		testimonial: Testimonial;
	}

	let { testimonial }: Props = $props();
</script>

<figure
	class="shape-lean flex h-full flex-col justify-between overflow-hidden border-t-2 border-b-2 border-secondary-line bg-ink-line"
>
	<blockquote class="shape-unlean p-10 pb-0 text-lg text-paper">{testimonial.quote}</blockquote>
	<figcaption class="shape-unlean p-10 pt-6 text-sm">
		<span class="font-semibold text-paper">{testimonial.attribution}</span>
		<span class="text-muted"> — {testimonial.format}</span>
	</figcaption>
</figure>
