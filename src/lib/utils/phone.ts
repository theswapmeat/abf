export const UAE_DIAL_CODE = '+971';

/** UAE mobile national number: 5 + a valid operator digit (0,2-9) + 7 digits. */
const UAE_MOBILE_NATIONAL = /^5[02-9]\d{7}$/;

/** Strips spaces/dashes and any leading +971 / 971 / 0 down to the bare national number. */
export function toNationalDigits(input: string): string {
	const digits = input.replace(/[\s-]/g, '');
	return digits.replace(/^\+?971/, '').replace(/^0/, '');
}

export function isValidUaeMobile(input: string): boolean {
	return UAE_MOBILE_NATIONAL.test(toNationalDigits(input));
}

export function toE164Uae(input: string): string {
	return `${UAE_DIAL_CODE}${toNationalDigits(input)}`;
}

export function formatUaeMobileDisplay(input: string): string {
	const digits = toNationalDigits(input);
	if (digits.length !== 9) return input;
	return `${UAE_DIAL_CODE} ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}
