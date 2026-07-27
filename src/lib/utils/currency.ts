/** UAE market formatting: "AED 350", never a $ sign or decimals on whole dirhams. */
export function formatAED(amount: number): string {
	const rounded = Number.isInteger(amount) ? amount : Math.round(amount * 100) / 100;
	const formatted = rounded.toLocaleString('en-US', {
		minimumFractionDigits: Number.isInteger(rounded) ? 0 : 2,
		maximumFractionDigits: 2
	});
	return `AED ${formatted}`;
}
