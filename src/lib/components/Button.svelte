<script lang="ts">
	import type { Snippet } from 'svelte';
	import { base as basePath } from '$app/paths';

	interface Props {
		variant?: 'primary' | 'outline' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		target?: '_blank';
		type?: 'button' | 'submit';
		disabled?: boolean;
		class?: string;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		href,
		target,
		type = 'button',
		disabled = false,
		class: className = '',
		onclick,
		children
	}: Props = $props();

	const base =
		'relative inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50 disabled:pointer-events-none';

	/*
	 * The skewed parallelogram (shape-lean, border, shine sweep) lives on a
	 * separate absolutely-positioned span, NOT as an ancestor of the label —
	 * the label sits in its own unskewed sibling span instead. Previously the
	 * label was nested inside the skewed shape with a counter-skew wrapper to
	 * cancel the angle back upright; that still visibly blurred the label,
	 * because a `transform` forces the browser to rasterize its content to a
	 * bitmap and geometrically warp it, and that happens per-element even
	 * when a child's transform nets out to a visual no-op against its parent.
	 * Keeping the label completely outside any transformed ancestor is the
	 * only way to guarantee it renders with normal, fully crisp text — this
	 * is also why the shape span uses group-hover: throughout instead of its
	 * own hover: (it's no longer the hovered element's own ancestor chain for
	 * the label, so state has to be read off the shared `.group` parent).
	 */
	const shine =
		"before:content-[''] before:absolute before:inset-y-0 before:-left-1/4 before:w-1/4 before:transition-transform before:duration-500 before:ease-out group-hover:before:translate-x-[520%]";

	/*
	 * origin-bottom, not the default center: form inputs' parallelogram
	 * (the `parallelogram` clip-path utility) keeps its bottom-left corner
	 * fixed at the field's true left edge and only shifts the top-left
	 * corner inward — so a button sitting right below/after a field in the
	 * same column had its diagonal edge start from a visibly different
	 * horizontal position than the field's, even though both were the same
	 * true 10deg angle. Pivoting the skew from the bottom edge instead of
	 * the center makes the button's bottom-left corner ALSO land exactly at
	 * its own true left edge, matching that same anchor point (confirmed
	 * via computed transform-origin/matrix comparison against a contact-page
	 * input, not just eyeballing it).
	 *
	 * This span is flush (inset-0), not overscan-extended on the left the
	 * way it briefly was mid-fix — extending the left edge outward to
	 * protect the top-left corner from receding also drags the BOTTOM-left
	 * corner along with it (a plain rectangle's left edge is one straight
	 * line pre-transform; you can't move it for one row without moving it
	 * for all rows), which undoes the exact alignment this is for.
	 *
	 * A same-color fill behind the outer element was tried as a fix for the
	 * resulting top-left recede and reverted — it "hid" the gap by matching
	 * color, but since that fill is an unskewed rectangle, it also visibly
	 * squared off that corner, making the button look rectangular there
	 * instead of like a parallelogram. Confirmed by rendering it, not just
	 * reasoning about it. Left as a small, deliberate recede instead — it's
	 * the same kind of corner every other shape-lean element in the app
	 * already has (cards, nav tiles), just usually unnoticed because
	 * nothing else there has a border tracing that exact edge.
	 */
	const shapeBase: Record<string, string> = {
		// Invert punch (fill flips yellow -> ink) plus the same diagonal shine
		// sweep used on outline — the shine reads as a light streak against
		// the now-dark hover fill instead of the paper-tinted streak it used
		// pre-invert. border-2, not border: a 1px stroke on a skewX'd diagonal
		// edge aliases visibly (few pixels for the browser to blend the edge
		// across) — 2px reads noticeably cleaner at the same 10deg angle,
		// confirmed by a side-by-side pixel-level render comparison, and
		// matches the 2px weight already used for the other skewed cards'
		// border-t/border-b.
		primary: `shape-lean isolate overflow-hidden border-2 border-primary bg-primary transition-colors duration-200 group-hover:bg-ink ${shine} before:bg-primary/25`,
		outline: `shape-lean isolate overflow-hidden border-2 border-secondary-line transition-colors duration-200 group-hover:border-primary ${shine} before:bg-primary/25`,
		ghost: ''
	};

	let shapeClasses = $derived(variant === 'ghost' ? '' : `absolute inset-0 origin-bottom ${shapeBase[variant]}`);

	const textColors: Record<string, string> = {
		primary: 'text-ink transition-colors duration-200 group-hover:text-primary',
		outline: 'text-paper transition-colors duration-200 group-hover:text-primary',
		ghost: 'text-paper transition-colors duration-200 hover:text-primary'
	};

	/*
	 * py bumped up from the pre-refactor values (py-2/py-3/py-4) by exactly
	 * the border's own width. The border used to live on the outer element
	 * itself, where an auto-sized box's border adds to its footprint on top
	 * of padding+content. Now it's painted on an absolutely-positioned inset-0
	 * child instead (see the shapes comment above), which draws the border
	 * WITHIN whatever size it inherits rather than adding to it — so without
	 * this bump every button would render 4px shorter than before. This
	 * keeps the actual rendered footprint (and every alignment fix tuned
	 * against it, e.g. the /contact form-vs-map button row) unchanged.
	 */
	const sizes: Record<string, string> = {
		sm: 'px-4 py-2.5 text-xs',
		md: 'px-6 py-3.5 text-sm',
		lg: 'px-8 py-4.5 text-base'
	};

	let classes = $derived(`group ${base} ${sizes[size]} ${className}`);

	// Root-relative hrefs ("/schedule") are internal routes and need the
	// deploy's base path prefixed (GitHub Pages serves this at /abf/, not
	// the domain root). Anything else — tel:, mailto:, wa.me, full URLs — is
	// left untouched.
	let resolvedHref = $derived(href?.startsWith('/') ? `${basePath}${href}` : href);
</script>

{#if href}
	<a href={resolvedHref} {target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} class={classes}>
		{#if variant !== 'ghost'}<span class={shapeClasses} aria-hidden="true"></span>{/if}
		<span class="relative z-10 {textColors[variant]}">{@render children()}</span>
	</a>
{:else}
	<button {type} {disabled} {onclick} class={classes}>
		{#if variant !== 'ghost'}<span class={shapeClasses} aria-hidden="true"></span>{/if}
		<span class="relative z-10 {textColors[variant]}">{@render children()}</span>
	</button>
{/if}
