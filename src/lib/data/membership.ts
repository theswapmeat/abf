/*
 * Real pricing, pulled directly from the live /membership page. Gym access
 * is sold as a term commitment (not the Essential/Premium/Elite feature
 * tiers a typical gym site might invent), plus separate personal-training
 * session packages. AED, terms and conditions apply per the source site.
 */

export interface GymMembershipPlan {
	id: string;
	termMonths: number;
	label: string;
	totalAed: number;
	monthlyAed: number;
	mostPopular?: boolean;
}

export const GYM_MEMBERSHIP_PLANS: GymMembershipPlan[] = [
	{ id: '3-month', termMonths: 3, label: '3 Months', totalAed: 1499, monthlyAed: 499 },
	{ id: '6-month', termMonths: 6, label: '6 Months', totalAed: 1799, monthlyAed: 299, mostPopular: true },
	{ id: '12-month', termMonths: 12, label: '12 Months', totalAed: 2699, monthlyAed: 224 }
];

export interface PtPackage {
	id: string;
	termMonths: number;
	label: string;
	sessions: number;
	totalAed: number;
	monthlyAed: number;
	perSessionAed: number;
}

export const PT_PACKAGES: PtPackage[] = [
	{ id: 'pt-3-month', termMonths: 3, label: '3 Months', sessions: 30, totalAed: 4999, monthlyAed: 1666, perSessionAed: 166 },
	{ id: 'pt-6-month', termMonths: 6, label: '6 Months', sessions: 60, totalAed: 7999, monthlyAed: 1333, perSessionAed: 133 },
	{ id: 'pt-12-month', termMonths: 12, label: '12 Months', sessions: 120, totalAed: 12999, monthlyAed: 1083, perSessionAed: 108 }
];
