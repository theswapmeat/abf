/*
 * Real AB Fitness contact details, sourced from the current abfitness.ae
 * (footer contact block + LocalBusiness JSON-LD + Google Maps embed). Kept
 * in one module so every component (footer, contact page, JSON-LD, WhatsApp
 * button) reads the same numbers instead of re-typing them.
 */

export const business = {
	name: 'AB Fitness',
	url: 'https://abfitness.ae',
	logo: 'https://abfitness.ae/assets/ab_fitness_logo.png',
	email: 'info@abfitness.ae',

	phone: {
		display: '+971 4 341 8663',
		href: 'tel:+97143418663'
	},
	mobile: {
		display: '+971 58 599 3057',
		href: 'tel:+971585993057'
	},
	whatsapp: {
		/** Digits only, no plus — the format wa.me expects. */
		number: '971585993446',
		href: 'https://wa.me/971585993446'
	},

	address: {
		street: 'Mina Rashid, Maritime City, Port Rashid',
		locality: 'Dubai',
		region: 'Dubai',
		country: 'AE',
		postalCode: '10100',
		full: 'Mina Rashid, Maritime City, Port Rashid, Dubai, United Arab Emirates'
	},

	geo: {
		lat: 25.25987077757748,
		lng: 55.26843450936796
	},

	/** Google's CID-based deep link — points straight at the existing verified listing. */
	googleMapsUrl: 'https://www.google.com/maps?cid=15301945696706700099',
	googleMapsEmbedSrc:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3184510453157!2d55.26843450936796!3d25.25987077757748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f439cd765712b%3A0xd45b6e89b8852343!2sAB%20FITNESS!5e0!3m2!1sen!2sae',
	wazeUrl: 'https://waze.com/ul?ll=25.25987077757748,55.26843450936796&navigate=yes',

	/** Gym floor access — 24/7. Coached-class and front-desk hours vary, see schedule.ts. */
	openingHours: 'Mo-Su 00:00-24:00',

	social: {
		instagram: 'https://www.instagram.com/abfitness_uae',
		facebook: 'https://www.facebook.com/abfitnessdubai',
		youtube: 'https://www.youtube.com/@abfitnessgym',
		tiktok: 'https://www.tiktok.com/@abfitnessgym'
	}
} as const;
