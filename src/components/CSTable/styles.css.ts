import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import * as space from '@/styles/space.css'
import { vars } from '@/styles/theme.css'

const table = style({
	width: '100%',

	borderCollapse: 'collapse',

	fontSize: space.controlFontSize,
	lineHeight: space.controlLineHeight,
})

const row = style({
	minHeight: space.controlMinHeight,
})

const headerRow = style([row, {
	borderBottom: `1px solid ${vars.separatorPrimary.default}`,
	color: vars.textSecondary.default,
}])

const cell = recipe({
	base: {
		paddingInline: 7,

		selectors: {
			'&[data-datatype=number]': {
				fontFeatureSettings: '\'tnum\'',
				textWrap: 'nowrap',
			},
		},
	},
	variants: {
		align: {
			left: {
				textAlign: 'left',
			},
			center: {
				textAlign: 'center',
			},
			right: {
				textAlign: 'right',
			},
			start: {
				textAlign: 'start',
			},
			end: {
				textAlign: 'end',
			},
		},
	},
	defaultVariants: {
	},
})

const emptyCell = style([cell({ align: 'center' }), {
	height: `calc(6 * ${space.controlMinHeight})`,

	color: vars.textSecondary.default,
	userSelect: 'none',
}])

export {
	table,
	row,
	headerRow,
	emptyCell,

	cell,
}
