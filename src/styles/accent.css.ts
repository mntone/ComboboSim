import { createVar, globalStyle } from '@vanilla-extract/css'

const red = createVar()

const accent = createVar()

globalStyle(':root', {
	'vars': {
		[red]: '#FF3B30',
		[accent]: '#9F48C9',
	},
	'@media': {
		'(prefers-color-scheme: dark)': {
			vars: {
				[red]: '#FF453A',
				[accent]: '#CC65FF',
			},
		},
	},
})

export {
	red,

	accent,
}
