<script lang="ts">
	import { business } from '$lib/data/business';

	const schema = {
		'@context': 'https://schema.org',
		'@type': ['ExerciseGym', 'LocalBusiness'],
		name: business.name,
		image: business.logo,
		url: business.url,
		telephone: business.phone.display,
		email: business.email,
		priceRange: 'AED',
		address: {
			'@type': 'PostalAddress',
			streetAddress: business.address.street,
			addressLocality: business.address.locality,
			addressRegion: business.address.region,
			addressCountry: business.address.country,
			postalCode: business.address.postalCode
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: business.geo.lat,
			longitude: business.geo.lng
		},
		openingHoursSpecification: {
			'@type': 'OpeningHoursSpecification',
			dayOfWeek: [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday'
			],
			opens: '00:00',
			closes: '23:59'
		},
		sameAs: [business.social.instagram, business.social.facebook, business.social.youtube, business.social.tiktok]
	};
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`}
</svelte:head>
