/*
 * English copy. This is the ONLY place UI strings live — components read
 * from here rather than hardcoding text, so adding a locale later is a
 * matter of adding a sibling file + a routing rule, not a rewrite.
 *
 * Shipping English only, per brief. Do not add machine-translated locales.
 */

export const en = {
	meta: {
		dir: 'ltr' as const,
		lang: 'en' as const
	},

	nav: {
		links: [
			{ label: 'Classes', href: '/classes' },
			{ label: 'Our Team', href: '/team' },
			{ label: 'Membership', href: '/membership' },
			{ label: 'Schedule', href: '/schedule' },
			{ label: 'Locations', href: '/locations' },
			{ label: 'First Timers', href: '/first-timers' },
			{ label: 'FAQ', href: '/faq' },
			{ label: 'Contact', href: '/contact' }
		],
		bookClasses: 'Book Classes',
		buyClasses: 'Buy Classes',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		overlayGroups: [
			{
				heading: 'Discipline',
				links: [
					{ label: 'MMA & Muay Thai', href: '/classes#mma' },
					{ label: 'Strength & Conditioning', href: '/classes#strength' },
					{ label: 'Group Cycle', href: '/classes#cycle' },
					{ label: 'Swim Fitness', href: '/classes#swim' }
				]
			},
			{
				heading: 'Strong',
				links: [
					{ label: 'Our Team', href: '/team' },
					{ label: 'Schedule', href: '/schedule' },
					{ label: 'Events', href: '/classes#events' }
				]
			},
			{
				heading: 'Conquer',
				links: [
					{ label: 'First Timers', href: '/first-timers' },
					{ label: 'Kids Martial Arts', href: '/classes#kids' },
					{ label: 'Recovery & Physio', href: '/classes#recovery' }
				]
			},
			{
				heading: 'Consistency',
				links: [
					{ label: 'Membership & Pricing', href: '/membership' },
					{ label: 'Locations', href: '/locations' },
					{ label: 'FAQ', href: '/faq' },
					{ label: 'Contact', href: '/contact' }
				]
			}
		],
		promoTiles: [
			{
				heading: 'Memberships',
				body: 'Unlimited classes, open gym floor, and every format under one plan.',
				cta: 'See plans',
				href: '/membership'
			},
			{
				heading: 'Intro Pack',
				body: 'Three classes, a trainer check-in, and a plan for what comes next.',
				cta: 'Get started',
				href: '/first-timers'
			}
		]
	},

	home: {
		heroHeadline: 'Train like it matters.',
		heroSub: 'MMA, strength, cycle, and swim — one membership, every format, no off days.',
		heroCtaPrimary: 'Book Classes',
		heroCtaSecondary: 'Buy Classes',
		// The scrolling marquee's word list. Started as the nav overlay's four
		// group headings reused as a statement, but the marquee doesn't have
		// to stay 1:1 with nav sections — this is its own list now.
		principles: ['Discipline', 'Strong', 'Conquer', 'Consistency', 'Believe'],
		pillarsEyebrow: 'Why AB Fitness',
		pillars: [
			{
				title: 'Every format, one roof',
				body: 'MMA arena, strength floor, cycle studio, and a full swim lane — stop paying for four memberships.'
			},
			{
				title: 'Coached, not just supervised',
				body: 'Every class is led, every form is checked. You show up, we make sure the session works.'
			},
			{
				title: 'Open around your day',
				body: '24 hours, seven days a week. Early shift, late shift, prayer break — the floor is open when you are.'
			}
		],
		formatsEyebrow: 'Class Formats',
		formatsHeadline: 'Pick a format. Show up. Repeat.',
		formatsCta: 'See the full schedule',
		trainersEyebrow: 'Coaches',
		trainersHeadline: 'The team behind every session',
		trainersCta: 'Meet the full team',
		testimonialsEyebrow: 'Member Results',
		testimonialsHeadline: 'What our members say',
		membershipEyebrow: 'Membership',
		membershipHeadline: 'Plans built around how often you train',
		membershipCta: 'Compare all plans',
		locationEyebrow: 'Visit',
		locationHeadline: 'Find us at Mina Rashid',
		locationCta: 'Get directions',
		newsletterEyebrow: 'Stay in the loop',
		newsletterHeadline: 'Class drops, events, and member offers',
		newsletterBody: 'One email a month, mostly about new class times and events. Unsubscribe whenever.'
	},

	team: {
		eyebrow: 'Our Team',
		headline: 'Coaches who show up for every rep',
		intro:
			'Every trainer at AB Fitness is a specialist first — MMA, strength, swim, recovery — and a coach second. That order is deliberate: we hire for depth in one discipline, then teach the floor.',
		cardHoverCta: 'View profile',
		emptyState: 'Trainer roster is being updated — check back shortly.'
	},

	trainerDetail: {
		backToTeam: 'Back to Our Team',
		specialtiesHeading: 'Specialties',
		certificationsHeading: 'Certifications',
		bookWith: 'Book with',
		notFoundHeadline: 'Trainer not found',
		notFoundBody: "We couldn't find that profile. They may have moved teams, or the link is out of date.",
		notFoundCta: 'Back to Our Team'
	},

	classes: {
		eyebrow: 'Classes & Formats',
		headline: 'Every format, explained',
		intro:
			'Six formats, one membership. Drop into whichever fits your day — the floor, the ring, the pool, and the studio are all included.',
		formatCta: 'See schedule'
	},

	firstTimers: {
		eyebrow: 'First Timers',
		headline: "Never trained here? Start here.",
		intro:
			'Your first session should feel like a walkthrough, not a test. Here is exactly what happens from the moment you book to the moment you leave.',
		stepsHeading: 'Your first visit, step by step',
		steps: [
			{
				title: 'Book your free orientation',
				body: 'Tell us your goals and current experience. We match you with a coach, not a random class.'
			},
			{
				title: 'Tour and fit check',
				body: 'Arrive 20 minutes early. We walk the facility, fit any gear you need, and set expectations.'
			},
			{
				title: 'Your first class',
				body: 'Modified pace, coach beside you the whole time. Nobody is thrown into the deep end — including at the pool.'
			},
			{
				title: 'Plan your next step',
				body: 'After class, your coach recommends a format mix and a membership tier that matches your goals.'
			}
		],
		faqCta: 'Have more questions? Read the FAQ',
		cta: 'Book your free orientation'
	},

	membership: {
		eyebrow: 'Membership & Pricing',
		headline: 'Plans built around how often you train',
		intro:
			'Every plan includes full access to the gym floor, MMA arena, cycle studio, and pool. Pick a term — the longer the commitment, the lower the monthly rate. Prices in AED; terms and conditions apply.',
		gymHeading: 'Gym Membership',
		ptHeading: 'Personal Training Packages',
		ptIntro: 'Book a coach for one-on-one sessions, sold in 3, 6, or 12-month packages.',
		mostPopular: 'Most popular',
		perMonth: '/ month',
		ctaLabel: 'Start this plan',
		compareNote: 'Corporate and family group membership packages are available on request — ask at the front desk or via WhatsApp.'
	},

	schedule: {
		eyebrow: 'Schedule',
		headline: 'This week on the floor',
		intro: 'Live class grid — filter by format or day. Every class shown includes the coach leading it.',
		filterAll: 'All formats',
		ramadanNotice:
			'During Ramadan, evening class times shift later to sit after Iftar and Maghrib prayer. Updated timings are posted here and at the front desk once confirmed for the season.',
		bookCta: 'Book this class'
	},

	locations: {
		eyebrow: 'Locations',
		headline: 'One home base, easy to reach',
		intro:
			'AB Fitness is based at Mina Rashid, Maritime City — parking on site, five minutes from Port Rashid.',
		hoursHeading: 'Hours',
		hoursValue: 'Open 24 hours, 7 days a week',
		ramadanHoursNote:
			'The gym floor stays open 24 hours through Ramadan. Front-desk and coached-class hours are adjusted — see the schedule page for the current timetable.',
		directionsGoogle: 'Open in Google Maps',
		directionsWaze: 'Open in Waze',
		amenitiesHeading: 'On site'
	},

	faq: {
		eyebrow: 'FAQ',
		headline: 'Questions, answered',
		intro: "Can't find what you're after? Message us on WhatsApp and we'll get back to you the same day.",
		contactCta: 'Ask us on WhatsApp'
	},

	/*
	 * Generic boilerplate, not legal advice — placeholder structure/language
	 * to have reviewed by UAE counsel before launch (data-protection specifics
	 * e.g. PDPL Federal Decree-Law No. 45 of 2021 references, retention
	 * periods, and the effective date below all need real sign-off). See
	 * README "Still placeholder, swap before launch".
	 */
	privacyPolicy: {
		eyebrow: 'Privacy Policy',
		headline: 'Your privacy matters',
		intro: 'How AB Fitness collects, uses, and protects your information.',
		effectiveDateLabel: 'Effective date',
		effectiveDate: '26 July 2026',
		sections: [
			{
				heading: 'Introduction',
				body: "AB Fitness (\"we\", \"us\", \"our\") operates the abfitness.ae website and our Mina Rashid, Dubai facility. This policy explains what information we collect when you use our site, sign up for membership, book a class, or contact us, and how we use, share, and protect it. By using our website or services, you agree to the practices described here."
			},
			{
				heading: 'Information We Collect',
				body: 'We may collect your name, email address, phone number, preferred location, and any details you include in a message when you fill out a form on this site (contact, orientation, or newsletter sign-up), book a class, or message us on WhatsApp. If you visit in person or take out a membership, we may also collect billing and identification details required to administer that membership. We also collect basic usage data (pages visited, device/browser type, approximate location) via standard website analytics.'
			},
			{
				heading: 'How We Use Your Information',
				body: 'We use your information to respond to enquiries, process class bookings and membership sign-ups, send confirmations and schedule updates, and — where you have opted in — send marketing communications about classes, offers, and events. We also use aggregated, non-identifying usage data to understand how the site is used and to improve it.'
			},
			{
				heading: 'Cookies & Tracking',
				body: 'Our website may use cookies and similar technologies to keep the site working correctly and to understand aggregate traffic patterns. You can control or disable cookies through your browser settings; doing so may affect some site functionality.'
			},
			{
				heading: 'Sharing Your Information',
				body: "We don't sell your personal information. We may share it with trusted service providers who help us run our business (for example, booking, payment, or email platforms), each bound to protect your data, or where required by UAE law or a valid legal request."
			},
			{
				heading: 'Data Retention',
				body: 'We keep personal information only as long as needed for the purpose it was collected — for example, for the duration of your membership plus a reasonable period afterward for record-keeping, or until you ask us to delete it, whichever is relevant.'
			},
			{
				heading: 'Your Rights',
				body: 'You can ask us to access, correct, or delete the personal information we hold about you, or to stop sending you marketing communications at any time (every marketing email includes an unsubscribe link). To make a request, contact us using the details below.'
			},
			{
				heading: "Children's Privacy",
				body: 'Our services are intended for adults and for minors accompanied by a parent or guardian. We do not knowingly collect personal information directly from children without appropriate parental consent.'
			},
			{
				heading: 'Changes to This Policy',
				body: 'We may update this policy from time to time to reflect changes to our practices or for legal reasons. We will update the effective date above whenever we do.'
			},
			{
				heading: 'Contact Us',
				body: 'If you have questions about this policy or how we handle your information, contact us using the details below.'
			}
		]
	},

	contact: {
		eyebrow: 'Contact',
		headline: "Let's talk",
		intro: 'Fastest response is WhatsApp. For anything else, call, email, or drop by Mina Rashid.',
		formHeading: 'Send a message',
		mapHeading: 'Find us'
	},

	ctaBand: {
		eyebrow: 'Ready to level up?',
		headline: 'Book your free orientation',
		body: 'One walkthrough, one trial class, zero pressure. Tell us where to reach you.',
		submit: 'Book my orientation'
	},

	form: {
		firstName: 'First name',
		lastName: 'Last name',
		fullName: 'Full name',
		email: 'Email',
		phone: 'Phone number',
		phonePlaceholder: '5X XXX XXXX',
		message: 'Message',
		submit: 'Submit',
		submitting: 'Sending…',
		successHeading: "You're in.",
		successBody: "Thanks — someone from the team will reach out shortly. If it's urgent, WhatsApp us.",
		errorRequired: 'This field is required.',
		errorEmail: 'Enter a valid email address.',
		errorPhone: 'Enter a valid UAE mobile number, e.g. 050 123 4567.',
		privacyLabel: 'I agree to receive emails from AB Fitness and accept the privacy policy.',
		privacyError: 'Please accept the privacy policy to continue.'
	},

	newsletter: {
		eyebrow: 'Before you go',
		headline: "Get 10% off your first month",
		body: 'Join the list for class drops, events, and member-only offers. One email a month, max.',
		emailPlaceholder: 'Your email address',
		submit: 'Get my code',
		dismiss: 'No thanks',
		close: 'Close',
		successHeading: 'Check your inbox',
		successBody: "Your code is on its way. Welcome to AB Fitness."
	},

	whatsapp: {
		label: 'Chat on WhatsApp',
		prefilledMessage: 'Hello, I would like to know more about AB Fitness membership and classes.'
	},

	footer: {
		infoHeading: 'Info',
		moreHeading: 'More',
		newsletterHeading: 'Newsletter',
		newsletterBody: 'Class drops and offers, once a month.',
		hoursLabel: 'Hours',
		hoursValue: 'Open 24 hours, 7 days a week',
		scrollToTop: 'Back to top',
		rights: 'All rights reserved.',
		moreLinks: [
			{ label: 'Classes', href: '/classes' },
			{ label: 'Membership', href: '/membership' },
			{ label: 'Our Team', href: '/team' },
			{ label: 'FAQ', href: '/faq' },
			{ label: 'Privacy Policy', href: '/privacy-policy' }
		]
	},

	common: {
		skipToContent: 'Skip to content',
		close: 'Close',
		loading: 'Loading…'
	}
};

export type Dictionary = typeof en;
