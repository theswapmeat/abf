/*
 * Ramadan shifts ~11 days earlier each Gregorian year and is confirmed by
 * local moon sighting, so exact dates can't be computed — these are public
 * estimates for the Islamicity-calendar dates, +/- a day, meant to gate a
 * banner, not to publish as the definitive gym timetable. Re-confirm each
 * year against the UAE General Authority of Islamic Affairs announcement
 * and update the coached-class hours in the schedule data separately.
 */
const ESTIMATED_RAMADAN_PERIODS: ReadonlyArray<{ start: string; end: string }> = [
	{ start: '2026-02-18', end: '2026-03-19' },
	{ start: '2027-02-08', end: '2027-03-09' }
];

export function isDuringRamadan(date: Date = new Date()): boolean {
	const time = date.getTime();
	return ESTIMATED_RAMADAN_PERIODS.some(({ start, end }) => {
		const startTime = new Date(`${start}T00:00:00+04:00`).getTime();
		const endTime = new Date(`${end}T23:59:59+04:00`).getTime();
		return time >= startTime && time <= endTime;
	});
}
