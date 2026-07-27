/*
 * Real AB Fitness coaching roster — names, roles, experience, qualifications
 * and specialties pulled directly from the live /trainers page, photos from
 * /assets on the same site. This is the one content file in this project
 * that is NOT placeholder; no isPlaceholderContent flag, nothing to swap.
 */

import { base } from '$app/paths';

export interface Trainer {
	slug: string;
	name: string;
	role: string;
	specialties: string[];
	certifications: string[];
	bio: string;
	portrait: { src: string; alt: string };
}

interface RawTrainer {
	slug: string;
	name: string;
	role: string;
	image: string;
	experience: string;
	qualification: string;
	specialization: string;
}

const RAW_TRAINERS: RawTrainer[] = [
	{
		slug: 'martin',
		name: 'Martin',
		role: 'Fitness Manager',
		image: 'martin-profile.png',
		experience: '7 years of experience in bodybuilding and fitness, and professional at diet.',
		qualification:
			'Level 2 certificate in gym instructor career, sport fitness Academy Dubai.\nLevel 3 Certificate in personal trainer career, sport fitness Academy.',
		specialization: 'Fat Loss, Strength Training, Functional Training, Body Transformation, Bodybuilding'
	},
	{
		slug: 'ian-entwistle',
		name: 'Ian Entwistle',
		role: 'MMA & No-Gi Coach',
		image: 'enty-profile.png',
		experience: '20+ years of experience in MMA and no-gi coaching. Former UFC athlete.',
		qualification:
			'Black Belt in Brazilian Jiu-Jitsu (Carlson Gracie)\nLevel 2 Catch Wrestling Specialist\nFormer UFC Athlete and Professional MMA Coach\nCombat Sports Performance Specialist',
		specialization:
			'Mixed Martial Arts (MMA), Brazilian Jiu-Jitsu (BJJ), Submission Grappling, Wrestling & Takedowns, Fight Camp Preparation'
	},
	{
		slug: 'nariman',
		name: 'Nariman',
		role: 'MMA & Wrestling Coach',
		image: 'nariman.png',
		experience: '5 years of experience in personal training and Wushu martial arts.',
		qualification:
			'PTE Level 2 International Certificate, Dubai\n2018 International Open Kung-Fu Championship (Gold)\n8th National Kickboxing Championship (Silver)',
		specialization:
			'Fat Burning & Weight Management, Martial Arts Training, Kickboxing, Strength & Resistance Training, Combat Sport'
	},
	{
		slug: 'gopadon',
		name: 'Gopadon',
		role: 'Personal Trainer',
		image: 'gopa-profile.png',
		experience: '5 years of experience in personal training and Wushu martial arts.',
		qualification:
			'PTE Level 2 International Certificate, Dubai\n2018 International Open Kung-Fu Championship (Gold)\n8th National Kickboxing Championship (Silver)',
		specialization:
			'Fat Burning & Weight Management, Martial Arts Training, Kickboxing, Strength & Resistance Training, Combat Sport'
	},
	{
		slug: 'ramandeep-kaur',
		name: 'Dr. Ramandeep Kaur',
		role: 'Personal Trainer',
		image: 'ramandeep-profile.png',
		experience: '4 years of combined experience in physiotherapy, fitness coaching, and personal training.',
		qualification:
			'Active IQ Level 3 Diploma in Gym Instructing & Personal Training (REPs Certified, UK/UAE)\nBachelor of Physiotherapy (B.P.T.), India\nSpecialized Training in Hydrotherapy, Cupping Therapy & Dry Needling',
		specialization:
			'Body Transformation, Fat Loss, Rehabilitation & Recovery, Functional Fitness, Posture Correction, Hydrotherapy'
	},
	{
		slug: 'abdul-mohsin',
		name: 'Abdul Mohsin',
		role: 'Personal Trainer',
		image: 'abdul-mohsin.png',
		experience: '5 years of experience in personal training and bodybuilding.',
		qualification:
			'International Diploma in Personal Training (PD Approved, UK)\nLevel 2 Certificate in Fitness Instructing\nLevel 3 Certificate in Personal Training\nCPR & First Aid Certified',
		specialization:
			'Weight Loss & Fat Loss Programs, Cardio, HIIT & Strength Circuit Training, Senior Fitness & Geriatric Training, Mobility & Balance'
	},
	{
		slug: 'oscar-tebek',
		name: 'Oscar Tebek',
		role: 'Personal Trainer',
		image: 'oscar-profile.png',
		experience: '5 years of experience in personal training.',
		qualification: 'Level 2 Certification in Fitness Instructing',
		specialization:
			'Personal Training, Group Fitness Training, Weight Loss & Fat Reduction, Strength & Functional Training, Nutrition & Lifestyle Guidance'
	},
	{
		slug: 'reyhaneh-safaei-moghaddam',
		name: 'Reyhaneh Safaei Moghaddam',
		role: 'Personal Trainer',
		image: 'rihana-personal-trainer.png',
		experience:
			'10 years of experience in Dragon Boat rowing, including international competitions across Asia and Europe, plus 9 years in mountaineering and rock climbing.',
		qualification:
			'IFBB Level 5, 7 & 9 (Malaysia, Dubai)\nAdvanced Bodybuilding & Fitness Coach (Thailand)\nCertified in First Aid & Emergency Response',
		specialization:
			'Bodybuilding, Strength Training, Aerobic Fitness, Functional Training, Body Transformation & Fat Loss'
	},
	{
		slug: 'jaswinder',
		name: 'Jaswinder',
		role: 'Personal Trainer',
		image: 'personal-trainer-jaswinder.png',
		experience: '5 years of experience in personal training.',
		qualification:
			'Diploma in Personal Training (PD Approved), Registered with REPs UAE\nHypertrophy Practical Course Certified\nBodybuilding Contest Prep Specialist',
		specialization:
			'Fat Loss Transformation, Muscle Gain & Hypertrophy, Strength Development, Flexibility & Mobility, Posture Correction'
	},
	{
		slug: 'shahood',
		name: 'Shahood',
		role: 'Personal Trainer',
		image: 'shahood.png',
		experience: '9 years of experience in personal training.',
		qualification:
			'Diploma in Personal Training, Extreme Fitness Academy International (EFA), UK\nEFA Certified Trainer (Level 2 & Level 3)\nCertified in First Aid & CPR',
		specialization:
			'Personal Training & Customized Programs, Strength & Body Conditioning, Functional Fitness, Fat Loss & Body Transformation, Group Fitness Coaching'
	},
	{
		slug: 'jury',
		name: 'Jury',
		role: 'Boxing Coach',
		image: 'jury.png',
		experience: '14 years of experience as a boxing coach.',
		qualification:
			'Professional Boxing Coach\nCertified Muay Thai Trainer\nPhilippine Boxing Federation Champion (2021)',
		specialization:
			'Boxing Coaching & Technical Training, Muay Thai Training, Fight Preparation, Strength & Conditioning, Sparring Preparation'
	},
	{
		slug: 'shivam',
		name: 'Shivam',
		role: 'Personal Trainer',
		image: 'shivam.png',
		experience: '7 years of experience in personal training.',
		qualification:
			'Diploma in Personal Training, Extreme Fitness Academy International (EFA), Dubai\nEFA Certified Trainer (Level 2 & Level 3)\nCertified in First Aid & CPR',
		specialization:
			'Vegetarian Lifestyle Coaching, Personal Training & Customized Programs, Strength & Body Conditioning, Functional Fitness, Fat Loss & Body Transformation'
	}
];

function splitList(value: string): string[] {
	return value
		.split(/\n|•/)
		.map((part) => part.trim())
		.filter(Boolean);
}

export const TRAINERS: Trainer[] = RAW_TRAINERS.map((trainer) => ({
	slug: trainer.slug,
	name: trainer.name,
	role: trainer.role,
	bio: trainer.experience,
	certifications: splitList(trainer.qualification),
	specialties: trainer.specialization
		.split(',')
		.map((part) => part.trim())
		.filter(Boolean)
		.slice(0, 5),
	portrait: { src: `${base}/media/gym/${trainer.image}`, alt: `${trainer.name}, ${trainer.role} at AB Fitness` }
}));

export function getTrainerBySlug(slug: string): Trainer | undefined {
	return TRAINERS.find((trainer) => trainer.slug === slug);
}
