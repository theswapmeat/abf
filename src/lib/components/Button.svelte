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
	 * The shape span is inset-y-0 (full height) but NOT flush left/right —
	 * it overshoots the parent horizontally on both sides by height/2 *
	 * tan(10deg), one per size (heights are fixed per size: sm 36px, md
	 * 48px, lg 60px). Without this, a plain inset-0 span skews around its
	 * own center, and since skewX shifts the top edge one way and the
	 * bottom edge the other, two OPPOSITE corners end up receding inside
	 * the parent's rectangular bounds instead of reaching its edge — which
	 * exposed the page background through a small triangular gap at those
	 * corners (only ever noticed once a button had a glow to highlight the
	 * gap against, but it's present on every button this shape is used on).
	 * Overshooting by that same amount on both sides means even the
	 * receding edge still reaches at least as far as the original corner.
	 */
	const shapeOverscan: Record<string, string> = {
		sm: '-left-[3.2px] -right-[3.2px]',
		md: '-left-[4.25px] -right-[4.25px]',
		lg: '-left-[5.3px] -right-[5.3px]'
	};

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

	let shapeClasses = $derived(
		variant === 'ghost' ? '' : `absolute inset-y-0 ${shapeOverscan[size]} ${shapeBase[variant]}`
	);

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
