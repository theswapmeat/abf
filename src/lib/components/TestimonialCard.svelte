<script lang="ts">
	import type { Testimonial } from '$lib/data/testimonials';

	interface Props {
		testimonial: Testimonial;
	}

	let { testimonial }: Props = $props();
</script>

<!--
	mx-5 md:mx-0: a skewX'd element that spans (nearly) the full container
	width has its slanted corners reach BEYOND that rectangular width — the
	shift is height/2 * tan(10deg), independent of width, so a tall card in
	a narrow mobile single-column layout can overshoot the container's own
	padding and get visibly cut off at the viewport edge. Extra margin here
	insets the card enough to give the corners room; restored to 0 at md+
	once the grid goes two-column and container-page's own padding doubles,
	both of which give it enough natural clearance already.
-->
<figure
	class="shape-lean mx-5 flex h-full flex-col justify-between overflow-hidden border-t-2 border-b-2 border-secondary-line bg-ink-line md:mx-0"
>
	<blockquote class="shape-unlean p-10 pb-0 text-lg text-paper">{testimonial.quote}</blockquote>
	<figcaption class="shape-unlean p-10 pt-6 text-sm">
		<span class="font-semibold text-paper">{testimonial.attribution}</span>
		<span class="text-muted"> — {testimonial.format}</span>
	</figcaption>
</figure>
