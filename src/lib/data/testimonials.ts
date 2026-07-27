/** Lorem Ipsum placeholders — replace with real, consented member quotes before launch. */
export interface Testimonial {
	quote: string;
	attribution: string;
	format: string;
	isPlaceholderContent: true;
}

export const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
		attribution: 'AB Fitness Member',
		format: 'MMA & Muay Thai',
		isPlaceholderContent: true
	},
	{
		quote:
			'"Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."',
		attribution: 'AB Fitness Member',
		format: 'Strength & Conditioning',
		isPlaceholderContent: true
	},
	{
		quote:
			'"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."',
		attribution: 'AB Fitness Member',
		format: 'Swim Fitness',
		isPlaceholderContent: true
	},
	{
		quote:
			'"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
		attribution: 'AB Fitness Member',
		format: 'Group Cycle',
		isPlaceholderContent: true
	}
];
