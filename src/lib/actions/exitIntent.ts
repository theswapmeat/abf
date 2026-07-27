import type { Action } from 'svelte/action';

const STORAGE_KEY = 'abf-newsletter-dismissed';
const MOUSE_LEAVE_THRESHOLD_PX = 20;

interface ExitIntentOptions {
	onTrigger: () => void;
	/** Fallback for touch devices, which have no mouseleave-to-top gesture. */
	inactivityMs?: number;
}

function alreadyDismissed(): boolean {
	try {
		return localStorage.getItem(STORAGE_KEY) === '1';
	} catch {
		return false;
	}
}

/** Fires onTrigger once per browser (persisted via localStorage) on exit-intent or prolonged inactivity. */
export const exitIntent: Action<HTMLElement, ExitIntentOptions> = (node, options) => {
	let opts = options;
	let fired = false;
	let inactivityTimer: ReturnType<typeof setTimeout> | undefined;

	function fire() {
		if (fired || alreadyDismissed()) return;
		fired = true;
		opts.onTrigger();
	}

	function handleMouseLeave(event: MouseEvent) {
		if (event.clientY <= MOUSE_LEAVE_THRESHOLD_PX) fire();
	}

	function resetInactivityTimer() {
		if (!opts.inactivityMs) return;
		clearTimeout(inactivityTimer);
		inactivityTimer = setTimeout(fire, opts.inactivityMs);
	}

	if (!alreadyDismissed()) {
		document.addEventListener('mouseleave', handleMouseLeave);
		resetInactivityTimer();
		document.addEventListener('scroll', resetInactivityTimer, { passive: true });
		document.addEventListener('pointerdown', resetInactivityTimer);
	}

	return {
		update(next) {
			opts = next;
		},
		destroy() {
			document.removeEventListener('mouseleave', handleMouseLeave);
			document.removeEventListener('scroll', resetInactivityTimer);
			document.removeEventListener('pointerdown', resetInactivityTimer);
			clearTimeout(inactivityTimer);
		}
	};
};

export function markNewsletterDismissed() {
	try {
		localStorage.setItem(STORAGE_KEY, '1');
	} catch {
		/* private browsing / storage disabled — modal will simply re-offer next visit */
	}
}
