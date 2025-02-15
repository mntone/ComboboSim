import { globalStyle } from '@vanilla-extract/css'

import { accent, vars } from '@/styles/index.css'

globalStyle('body', {
	'colorScheme': 'light dark',

	'accentColor': accent,
	'backgroundColor': 'light-dark(#FFF, #25252D)',
	'color': vars.textPrimary.default,
	'font': '-apple-system-body',
	'fontFamily': '-apple-system, BlinkMacSystemFont, \'Inter Variable\', \'BIZ UDGothic\', sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\', \'Noto Color Emoji\'',

	'@media': {
		'(min-width: 768px)': {
			fontSize: 13,
		},
	},
})
