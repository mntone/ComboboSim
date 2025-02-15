import { createVar, style } from '@vanilla-extract/css'

import { accent } from '@/styles/accent.css'
import * as space from '@/styles/space.css'
import { vars } from '@/styles/theme.css'

const menuPaddingStart = createVar()

export const menu = style({
	display: 'flex',

	flexDirection: 'column',
	justifyContent: 'space-between',
	minWidth: 100,
	padding: 5,

	color: vars.textPrimary.default,
	fontSize: space.listFontSize,
	fontWeight: 600,
	lineHeight: space.listLineHeight,

	vars: {
		[menuPaddingStart]: '7px',
	},

	selectors: {
		'&:has([role=menuitemradio]), &:has([role=menuitemcheckbox])': {
			vars: {
				[menuPaddingStart]: '25px',
			},
		},
	},
})

export const menuSectionHeader = style({
	display: 'flex',

	alignItems: 'center',
	minHeight: `calc(5px + ${space.listMinHeight})`,
	paddingBlock: `8px 3px`,
	paddingInline: `${menuPaddingStart} 12px`,

	color: vars.textSecondary.default,

	selectors: {
		[`${menu} > div:first-child > &`]: {
			minHeight: space.listMinHeight,
			paddingBlockStart: 3,
		},
	},
})

export const menuSection = style({
})

export const menuItem = style({
	'display': 'flex',

	'alignItems': 'center',
	'gap': 2,
	'minHeight': space.listMinHeight,
	'paddingBlock': 3,
	'paddingInline': `${menuPaddingStart} 12px`,

	'borderRadius': 5,
	'outline': 'none',

	':focus': {
		backgroundColor: accent,
		color: vars.textPrimary.highlight,
	},

	'selectors': {
		'&[aria-checked=true]': {
			paddingInlineStart: 7,
		},

		'&[aria-disabled]': {
			color: vars.textTertiary.default,
		},
	},
})
