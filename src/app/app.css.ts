import { globalStyle } from '@vanilla-extract/css'

import { semanticColor, vars } from '@/styles/index.css'
import { darkVars } from '@/styles/themeDark.css'
import { lightVars } from '@/styles/themeLight.css'

globalStyle(':root', {
	'vars': Object.assign({}, lightVars, {
		[semanticColor.accent]: vars.color.purple,
		[semanticColor.error]: vars.color.red,
		[semanticColor.warning]: vars.color.yellow,
	}),

	'@media': {
		'(prefers-color-scheme: dark)': {
			vars: darkVars,
		},
	},
})

globalStyle('body', {
	backgroundColor: vars.background.primary,
	color: vars.textPrimary.default,
	colorScheme: 'light dark',
})

globalStyle('.thm-lt', {
	colorScheme: 'light',
	vars: lightVars,
})

globalStyle('.thm-dk', {
	colorScheme: 'dark',
	vars: darkVars,
})
