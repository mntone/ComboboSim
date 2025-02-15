import { createVar, globalStyle } from '@vanilla-extract/css'

const accent = createVar()

globalStyle(':root', {
	'vars': {
		[accent]: '#9F48C9',
	},
	'@media': {
		'(prefers-color-scheme: dark)': {
			vars: {
				[accent]: '#CC65FF',
			},
		},
	},
})

export {
	accent,
}
