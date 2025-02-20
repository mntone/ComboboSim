import { assignVars } from '@vanilla-extract/css'

import { vars } from './theme.css'

const darkVars = assignVars(vars, {
	textPrimary: {
		default: '#FFF',
		highlight: '#000',
	},
	textSecondary: {
		default: '#EBEBF599',
		highlight: '#3C3C4399',
	},
	textTertiary: {
		default: 'rgb(235 235 245 / 30%)',
		highlight: 'rgb(60 60 67 / 30%)',
	},

	background: {
		primary: '#000',
		secondary: '#1C1C1C',
		tertiary: '#2C2C2C',
	},

	color: {
		red: '#FF453A',
		yellow: '#FFD60A',
		blue: '#0A84FF',
		purple: '#BF5AF2',
		pink: '#FF375F',
	},

	fill: {
		primary: 'rgb(120 120 128 / 36%)',
		secondary: 'rgb(120 120 128 / 32%)',
		tertiary: 'rgb(120 120 128 / 24%)',
		quatemary: 'rgb(120 120 128 / 18%)',
	},

	separator: {
		default: 'rgb(84 84 86 / 60%)',
	},

	material: {
		ultraThin: 'rgb(0 0 0 / 50%)',
		thin: '#0003',
		medium: 'rgb(0 0 0 / 29%)',
		thick: '#0006',
		ultraThick: 'rgb(0 0 0 / 10%)',
	},
})

export {
	darkVars,
}
