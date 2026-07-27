export interface SubmitResult {
	ok: boolean;
	error?: string;
}

/**
 * Posts JSON to an env-configured endpoint. No endpoint configured is not a
 * failure — it means the real backend hasn't been wired up yet, so we log
 * and resolve as if it succeeded rather than showing users a false error.
 */
export async function submitForm(endpoint: string | undefined, payload: Record<string, unknown>): Promise<SubmitResult> {
	if (!endpoint) {
		console.warn('[abf] No submit endpoint configured; form payload logged instead of sent.', payload);
		return { ok: true };
	}

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			return { ok: false, error: `Request failed with status ${response.status}` };
		}

		return { ok: true };
	} catch {
		return { ok: false, error: 'Network error — please try again.' };
	}
}
