export interface FaqEntry {
	question: string;
	answer: string;
}

export const FAQS: FaqEntry[] = [
	{
		question: 'What are your opening hours?',
		answer:
			'The gym floor is open 24 hours a day, 7 days a week. Front-desk staffed hours and coached-class times are posted on the Schedule page, and shift slightly during Ramadan to sit around Iftar.'
	},
	{
		question: 'Do I need to book classes in advance?',
		answer:
			'Coached classes (MMA, strength, cycle, swim, kids) fill up, so booking through the app or via WhatsApp is recommended. Open gym floor access never needs a booking.'
	},
	{
		question: 'Is there a free trial?',
		answer:
			'Yes — first-timers get a free orientation plus a trial class before choosing a membership. See the First Timers page to book one.'
	},
	{
		question: 'Is parking available on site?',
		answer: 'Yes, on-site parking is available at the Mina Rashid location.'
	},
	{
		question: 'Can I freeze or cancel my membership?',
		answer:
			'Memberships can be cancelled with 30 days notice. Freezes are available for documented travel or medical reasons — ask at the front desk or via WhatsApp.'
	},
	{
		question: 'Do you offer personal training?',
		answer:
			'Yes, personal training is available as standalone sessions or bundled into the Elite membership tier. See the Membership & Pricing page for details.'
	},
	{
		question: 'Is the gym suitable for complete beginners?',
		answer:
			'Yes. Every format has a coach running the room, and first-timers get a guided orientation before their first class — see First Timers for what to expect.'
	},
	{
		question: 'Do you run kids classes?',
		answer:
			'Yes, Kids Martial Arts runs for ages 6–14 with safeguarding-certified coaches, split by age and experience level.'
	}
];
