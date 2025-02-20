import { createVar, globalStyle, styleVariants } from '@vanilla-extract/css'

const controlBorderRadius = createVar()

const controlFontSize = createVar()

const controlLineHeight = createVar()

const controlMinHeight = createVar()

const controlSymbolSize = createVar()

const controlSymbolStrokeWidth = createVar()

globalStyle(':root', {
	vars: {
		[controlBorderRadius]: '8px',
		[controlFontSize]: '1rem',
		[controlLineHeight]: '1.25rem',
		[controlMinHeight]: '32px',
		[controlSymbolSize]: '24px',
		[controlSymbolStrokeWidth]: '1.333333px',
	},
})

const spaces = styleVariants({
	compact: {
		vars: {
			[controlBorderRadius]: '6px',
			[controlFontSize]: '.8125rem',
			[controlLineHeight]: '1rem',
			[controlMinHeight]: '22px',
			[controlSymbolSize]: '16px',
			[controlSymbolStrokeWidth]: '2px',
		},
	},
	large: {
		vars: {
			[controlBorderRadius]: '12px',
			[controlLineHeight]: '1.333rem',
			[controlMinHeight]: '44px',
			[controlSymbolSize]: '36px',
			[controlSymbolStrokeWidth]: '0.8888889px',
		},
	},
})

export {
	controlBorderRadius,
	controlFontSize,
	controlLineHeight,
	controlMinHeight,
	controlSymbolSize,
	controlSymbolStrokeWidth,

	spaces,
}
