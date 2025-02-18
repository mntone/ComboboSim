import { createVar, globalStyle, styleVariants } from '@vanilla-extract/css'

const controlFontSize = createVar()

const controlLineHeight = createVar()

const controlMinHeight = createVar()

globalStyle(':root', {
	vars: {
		[controlFontSize]: '.8125rem',
		[controlLineHeight]: '1rem',
		[controlMinHeight]: '28px',
	},
})

const spaces = styleVariants({
	compact: {
		vars: {
			[controlMinHeight]: '22px',
		},
	},
	large: {
		vars: {
			[controlMinHeight]: '32px',
		},
	},
})

export {
	controlFontSize,
	controlLineHeight,
	controlMinHeight,

	spaces,
}
