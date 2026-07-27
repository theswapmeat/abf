import { error } from '@sveltejs/kit';
import { getTrainerBySlug } from '$lib/data/trainers';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const trainer = getTrainerBySlug(params.slug);
	if (!trainer) error(404, 'Trainer not found');
	return { trainer };
};
