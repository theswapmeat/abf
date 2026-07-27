export interface ClassFormat {
	id: string;
	name: string;
	tagline: string;
	description: string;
	intensity: 'Low' | 'Moderate' | 'High';
	duration: string;
	image: { src: string; alt: string };
	/** True where the photo is licensed stock (Unsplash) rather than an actual AB Fitness photo. */
	isStockImage?: true;
}

export const CLASS_FORMATS: ClassFormat[] = [
	{
		id: 'mma',
		name: 'MMA & Muay Thai',
		tagline: 'Striking, clinch, and ground work in one room.',
		description:
			'Coached striking and grappling rounds on the same arena floor our fight team trains on. Pad work, bag work, and live drilling, scaled to your level.',
		intensity: 'High',
		duration: '60 min',
		image: { src: '/media/gym/ab-fitness-mma-classes.jpg', alt: 'MMA class in progress at AB Fitness' }
	},
	{
		id: 'strength',
		name: 'Strength & Conditioning',
		tagline: 'Barbell strength blocks with a conditioning finisher.',
		description:
			'Programmed strength cycles — squat, hinge, press, pull — followed by a short conditioning piece. Coached sets, spotted lifts, no guesswork.',
		intensity: 'High',
		duration: '50 min',
		image: { src: '/media/gym/strength-abfitness.jpg', alt: 'Strength training floor at AB Fitness' }
	},
	{
		id: 'cycle',
		name: 'Group Cycle',
		tagline: 'Studio rides built around music and intervals.',
		description:
			'Low-impact, high-output rides in a dedicated studio. Resistance and cadence intervals coached live, every bike fitted before you start.',
		intensity: 'Moderate',
		duration: '45 min',
		image: { src: '/media/gym/cycling-studio-abfitness.jpg', alt: 'Group cycle studio at AB Fitness' }
	},
	{
		id: 'swim',
		name: 'Swim Fitness',
		tagline: 'Lane-based fitness swimming and stroke correction.',
		description:
			'Structured swim sets in a full lap pool, coached lane-side. Open to all levels, with stroke correction built into the warm-up.',
		intensity: 'Moderate',
		duration: '45 min',
		// No AB Fitness swim photo published yet (only a small facility icon exists) — licensed Unsplash stock.
		image: { src: '/media/stock/swim-fitness.jpg', alt: 'Swimmer doing freestyle laps in a pool' },
		isStockImage: true
	},
	{
		id: 'recovery',
		name: 'Recovery & Physio',
		tagline: 'Guided mobility work and one-to-one physiotherapy.',
		description:
			'Mobility classes and DHA-licensed physiotherapy sessions for members managing load, returning from injury, or just staying ahead of it.',
		intensity: 'Low',
		duration: '30–45 min',
		// No AB Fitness physio photo published yet (only a small facility icon exists) — licensed Unsplash stock.
		image: { src: '/media/stock/recovery-physio.jpg', alt: 'Physiotherapist assessing a client’s knee' },
		isStockImage: true
	},
	{
		id: 'kids',
		name: 'Kids Martial Arts',
		tagline: 'Muay Thai fundamentals for ages 6–14.',
		description:
			'Discipline-first martial arts classes for kids, run by safeguarding-certified coaches, in a class split by age and experience.',
		intensity: 'Moderate',
		duration: '40 min',
		image: { src: '/media/gym/kids-muay-thai.jpg', alt: 'Kids Muay Thai class at AB Fitness' }
	}
];

export function getClassFormat(id: string): ClassFormat | undefined {
	return CLASS_FORMATS.find((format) => format.id === id);
}
