import { createVar, globalStyle, style } from '@vanilla-extract/css'

const listFontSize = createVar()

const listLineHeight = createVar()

const listMinHeight = createVar()

globalStyle(':root', {
	vars: {
		[listFontSize]: '.8125rem',
		[listLineHeight]: '1rem',
		[listMinHeight]: '28px',
	},
})

const compactSpace = style({
	vars: {
		[listMinHeight]: '22px',
	},
})

const largeSpace = style({
	vars: {
		[listMinHeight]: '32px',
	},
})

export {
	listFontSize,
	listLineHeight,
	listMinHeight,

	compactSpace,
	largeSpace,
}
