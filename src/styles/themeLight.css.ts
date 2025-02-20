import { assignVars } from '@vanilla-extract/css'

import { vars } from './theme.css'

const lightVars = assignVars(vars, {
	textPrimary: {
		default: '#000',
		highlight: '#FFF',
	},
	textSecondary: {
		default: '#3C3C4399',
		highlight: '#EBEBF599',
	},
	textTertiary: {
		default: 'rgb(60 60 67 / 30%)',
		highlight: 'rgb(235 235 245 / 30%)',
	},

	background: {
		primary: '#FFF',
		secondary: '#F2F2F7',
		tertiary: '#FFF',
	},

	color: {
		red: '#FF3B30',
		yellow: '#FC0',
		blue: '#007AFF',
		purple: '#AF52DE',
		pink: '#FF2D55',
	},

	fill: {
		primary: 'rgb(120 120 128 / 20%)',
		secondary: 'rgb(120 120 128 / 16%)',
		tertiary: 'rgb(120 120 128 / 12%)',
		quatemary: 'rgb(120 120 128 / 8%)',
	},

	separator: {
		default: 'rgb(84 84 86 / 34%)',
	},

	material: {
		ultraThin: 'rgb(246 246 246 / 36%)',
		thin: 'rgb(246 246 246 / 48%)',
		medium: '#F6F6F699',
		thick: 'rgb(246 246 246 / 72%)',
		ultraThick: 'rgb(246 246 246 / 84%)',
	},
})

export {
	lightVars,
}
