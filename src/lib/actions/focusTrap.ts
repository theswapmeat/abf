import type { Action } from 'svelte/action';

const FOCUSABLE_SELECTOR =
	'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface FocusTrapOptions {
	active: boolean;
	onEscape?: () => void;
}

/** Traps Tab/Shift+Tab inside the node and calls onEscape on the Escape key. Used by the nav overlay and the newsletter modal. */
export const focusTrap: Action<HTMLElement, FocusTrapOptions> = (node, options) => {
	let opts = options;
	let previouslyFocused: HTMLElement | null = null;

	function getFocusable(): HTMLElement[] {
		return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
			(el) => el.offsetParent !== null
		);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!opts.active) return;

		if (event.key === 'Escape') {
			opts.onEscape?.();
			return;
		}

		if (event.key !== 'Tab') return;

		const focusable = getFocusable();
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		const current = document.activeElement;

		if (event.shiftKey && current === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && current === last) {
			event.preventDefault();
			first.focus();
		}
	}

	function activate() {
		previouslyFocused = document.activeElement as HTMLElement | null;
		const focusable = getFocusable();
		focusable[0]?.focus();
		document.addEventListener('keydown', handleKeydown);
	}

	function deactivate() {
		document.removeEventListener('keydown', handleKeydown);
		previouslyFocused?.focus();
	}

	if (opts.active) activate();

	return {
		update(next) {
			const wasActive = opts.active;
			opts = next;
			if (!wasActive && opts.active) activate();
			if (wasActive && !opts.active) deactivate();
		},
		destroy() {
			if (opts.active) deactivate();
		}
	};
};
