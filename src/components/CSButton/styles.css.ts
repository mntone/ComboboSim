import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { accent, red } from '@/styles/accent.css'
import * as space from '@/styles/space.css'
import { vars } from '@/styles/theme.css'

const group = style({
	display: 'flex',
})

const symbolButton = style({
	display: 'flex',

	alignItems: 'center',
	alignSelf: 'stretch',
	marginInlineStart: 'auto',

	backgroundColor: accent,
	borderRadius: 4,
	boxShadow: `0 0.5px 3px 0 color-mix(in srgb, ${accent} 12%, transparent), 0 1px 2px 0 color-mix(in srgb, ${accent} 12%, transparent), 0 0.5px 1px 0 color-mix(in srgb, ${accent} 24%, transparent)`,
	color: vars.textPrimary.highlight,
})

const button = recipe({
	base: {
		'display': 'flex',
		'userSelect': 'none',

		'alignItems': 'center',
		'gap': 7,
		'justifyContent': 'space-between',
		'paddingBlock': 3,
		'paddingInline': 7,
		'minHeight': space.controlMinHeight,
		'minWidth': 100,

		'border': 'none',
		'borderRadius': 5,
		'fontSize': space.controlFontSize,
		'lineHeight': space.controlLineHeight,
		'outline': 'none',
		'outlineOffset': 4,
		'transition': 'outline-offset 167ms ease-in-out',
		'WebkitAppearance': 'none',

		'selectors': {
			'&.focus-visible': {
				outline: `3px solid color-mix(in srgb, ${accent} 66%, transparent)`,
				outlineOffset: 0,
			},
			[`&:has(${symbolButton})`]: {
				paddingInlineEnd: 3,
			},
			[`${group} > &`]: {
				borderRadius: 0,
			},
			[`${group} > &:first-child`]: {
				borderStartStartRadius: 5,
				borderEndStartRadius: 5,
			},
			[`${group} > &:last-child`]: {
				borderStartEndRadius: 5,
				borderEndEndRadius: 5,
			},
			'&:disabled': {
				color: vars.textTertiary.default,
				pointerEvents: 'none',
			},
		},

		'@media': {
			'(prefers-reduced-motion)': {
				transition: 'none',
			},
		},
	},

	variants: {
		variant: {
			primary: {
				backgroundColor: accent,
				backgroundImage: 'linear-gradient(rgb(255 255 255 / 17%), transparent)',
				boxShadow: `0 1px 2.5px 0 color-mix(in srgb, ${accent} 24%, transparent), 0 0 0.5px 0 color-mix(in srgb, ${accent} 12%, transparent)`,
				color: vars.textPrimary.highlight,

				selectors: {
					'&.active': {
						backgroundColor: `color-mix(in srgb, ${accent} 85%, transparent)`,
					},
					'&:disabled': {
						backgroundColor: 'rgb(255 255 255 / 50%)',
						boxShadow: '0 0.5px 2.5px 0 rgb(0 0 0 / 15%), 0 0 0.5px 0 rgb(0 0 0 / 3%)',
					},
				},
			},
			secondary: {
				backgroundColor: '#FFF',
				boxShadow: '0 0.5px 2.5px 0 rgb(0 0 0 / 30%), 0 0 0.5px 0 rgb(0 0 0 / 5%)',

				selectors: {
					'&.active': {
						backgroundColor: 'rgb(255 255 255 / 85%)',
					},
					'&:disabled': {
						backgroundColor: 'rgb(255 255 255 / 50%)',
						boxShadow: '0 0.5px 2.5px 0 rgb(0 0 0 / 15%), 0 0 0.5px 0 rgb(0 0 0 / 3%)',
					},
				},
			},
			light: {
				backgroundColor: 'transparent',

				selectors: {
					'&:hover': {
						backgroundColor: 'rgb(0 0 0 / 10%)',
					},
					'&.active': {
						backgroundColor: 'rgb(0 0 0 / 15%)',
					},
				},
			},
		},
		isDestructive: {
			true: {
				color: red,
			},
		},
		isIconOnly: {
			true: {
				minWidth: 'unset',
				textAlign: 'center',
			},
		},
	},

	defaultVariants: {
		variant: 'secondary',
	},
})

export {
	group,
	symbolButton,

	button,
}
