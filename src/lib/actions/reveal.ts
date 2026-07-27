import type { Action } from 'svelte/action';

interface RevealOptions {
	/** Stagger index — multiplied into a transition-delay via a CSS custom property. */
	index?: number;
	stepMs?: number;
}

/**
 * Toggles [data-revealed] once the node crosses the viewport; app.css's
 * `.reveal` rule does the actual animating via transition + reduced-motion
 * guard. This is the svelte/transition + IntersectionObserver stand-in for
 * Framer Motion's scroll-triggered variants.
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	const { index = 0, stepMs = 80 } = options ?? {};
	node.classList.add('reveal');
	node.style.setProperty('--reveal-delay', `${index * stepMs}ms`);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.setAttribute('data-revealed', '');
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
