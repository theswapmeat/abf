import { base } from '$app/paths';
import { business } from './business';

export interface Amenity {
	label: string;
	icon: string;
}

export interface Location {
	id: string;
	name: string;
	address: string;
	googleMapsUrl: string;
	wazeUrl: string;
	embedSrc: string;
	amenities: Amenity[];
	/** Verbatim highlights from the facility list published on the source site. */
	highlights: string[];
}

/** Single confirmed location today; structured as a list so a second branch is additive, not a rewrite. */
export const LOCATIONS: Location[] = [
	{
		id: 'mina-rashid',
		name: 'AB Fitness — Mina Rashid',
		address: business.address.full,
		googleMapsUrl: business.googleMapsUrl,
		wazeUrl: business.wazeUrl,
		embedSrc: business.googleMapsEmbedSrc,
		amenities: [
			{ label: 'Gym Floor', icon: `${base}/media/gym/gym-icon.png` },
			{ label: 'MMA Arena', icon: `${base}/media/gym/mma-arena.png` },
			{ label: 'Cycle Studio', icon: `${base}/media/gym/cycle-studio.png` },
			{ label: 'Swimming Pool', icon: `${base}/media/gym/swimming-pool.png` },
			{ label: 'Physiotherapy Studio', icon: `${base}/media/gym/physiotherapy.png` },
			{ label: 'Sauna', icon: `${base}/media/gym/sauna.png` },
			{ label: 'Changing Rooms', icon: `${base}/media/gym/changing-room.png` },
			{ label: 'Shower Rooms', icon: `${base}/media/gym/shower-rooms.png` },
			{ label: 'Lockers', icon: `${base}/media/gym/lockers.png` },
			{ label: 'On-Site Parking', icon: `${base}/media/gym/parking.png` },
			{ label: 'Marina Views', icon: `${base}/media/gym/yacht-views.png` }
		],
		highlights: [
			'120,000 sqm open-plan facility overlooking Mina Rashid marina',
			'Technogym equipment including an outdoor rig',
			'Indoor cycling/spin studio with 32 bikes',
			'124m international indoor sprint track',
			'Performance training area with Keiser equipment',
			'300+ sqm indoor training turf',
			'25m, 2-lane swimming pool plus outdoor pool',
			'Separate male and female saunas and locker rooms',
			'Normatec recovery equipment'
		]
	}
];
