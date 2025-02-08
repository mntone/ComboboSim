import { heroui } from '@heroui/theme'

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,ts,tsx}',
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'media',
	plugins: [heroui({
		layout: {
			radius: {
				large: '16px',
			},
		},
	})],
}
