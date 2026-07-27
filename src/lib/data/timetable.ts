import { getTrainerBySlug } from './trainers';

export interface TimetableEntry {
	day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
	time: string;
	formatId: string;
	coachSlug: string;
}

/*
 * Sample weekly grid — replace with the live class-booking feed before
 * launch. coachSlug values reference the real roster in trainers.ts;
 * swim/cycle don't have a dedicated specialist on that roster yet, so
 * those slots are assigned to a general personal trainer as a placeholder.
 */
export const TIMETABLE: TimetableEntry[] = [
	{ day: 'Monday', time: '06:30', formatId: 'strength', coachSlug: 'martin' },
	{ day: 'Monday', time: '12:00', formatId: 'swim', coachSlug: 'oscar-tebek' },
	{ day: 'Monday', time: '18:00', formatId: 'mma', coachSlug: 'ian-entwistle' },
	{ day: 'Monday', time: '19:30', formatId: 'cycle', coachSlug: 'shivam' },
	{ day: 'Tuesday', time: '07:00', formatId: 'recovery', coachSlug: 'ramandeep-kaur' },
	{ day: 'Tuesday', time: '17:00', formatId: 'kids', coachSlug: 'nariman' },
	{ day: 'Tuesday', time: '18:30', formatId: 'strength', coachSlug: 'martin' },
	{ day: 'Tuesday', time: '20:00', formatId: 'mma', coachSlug: 'jury' },
	{ day: 'Wednesday', time: '06:30', formatId: 'cycle', coachSlug: 'shivam' },
	{ day: 'Wednesday', time: '12:00', formatId: 'swim', coachSlug: 'oscar-tebek' },
	{ day: 'Wednesday', time: '18:00', formatId: 'mma', coachSlug: 'ian-entwistle' },
	{ day: 'Thursday', time: '07:00', formatId: 'strength', coachSlug: 'abdul-mohsin' },
	{ day: 'Thursday', time: '17:00', formatId: 'kids', coachSlug: 'nariman' },
	{ day: 'Thursday', time: '19:00', formatId: 'recovery', coachSlug: 'ramandeep-kaur' },
	{ day: 'Friday', time: '09:00', formatId: 'cycle', coachSlug: 'shivam' },
	{ day: 'Friday', time: '17:30', formatId: 'mma', coachSlug: 'jury' },
	{ day: 'Saturday', time: '09:00', formatId: 'kids', coachSlug: 'nariman' },
	{ day: 'Saturday', time: '11:00', formatId: 'strength', coachSlug: 'martin' },
	{ day: 'Saturday', time: '18:00', formatId: 'swim', coachSlug: 'oscar-tebek' },
	{ day: 'Sunday', time: '08:00', formatId: 'recovery', coachSlug: 'ramandeep-kaur' },
	{ day: 'Sunday', time: '18:30', formatId: 'mma', coachSlug: 'ian-entwistle' }
];

export function coachName(slug: string): string {
	return getTrainerBySlug(slug)?.name ?? 'AB Fitness Coach';
}
