import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import * as space from '@/styles/space.css'
import { semanticColor, vars } from '@/styles/theme.css'

const group = style({
	display: 'flex',
})

const symbolButton = style({
	display: 'flex',

	alignItems: 'center',
	alignSelf: 'stretch',
	marginInlineStart: 'auto',
})

globalStyle(`${symbolButton} > svg`, {
	strokeWidth: space.controlSymbolStrokeWidth,
	height: space.controlSymbolSize,
	width: space.controlSymbolSize,
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
		'borderRadius': space.controlBorderRadius,
		'color': vars.textPrimary.default,
		'fontSize': space.controlFontSize,
		'lineHeight': space.controlLineHeight,
		'outline': 'none',
		'outlineOffset': 4,
		'transition': 'outline-offset 167ms ease-in-out',
		'WebkitAppearance': 'none',

		'selectors': {
			'&.focus-visible': {
				outline: `3px solid color-mix(in srgb, ${semanticColor.accent} 66%, transparent)`,
				outlineOffset: 0,
			},
			[`&:has(${symbolButton})`]: {
				paddingInlineEnd: 3,
			},
			[`${group} > &`]: {
				borderRadius: 0,
			},
			[`${group} > &:first-child`]: {
				borderStartStartRadius: space.controlBorderRadius,
				borderEndStartRadius: space.controlBorderRadius,
			},
			[`${group} > &:last-child`]: {
				borderStartEndRadius: space.controlBorderRadius,
				borderEndEndRadius: space.controlBorderRadius,
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
				backgroundColor: semanticColor.accent,
				color: vars.textPrimary.highlight,

				selectors: {
					'&.active': {
						backgroundColor: `color-mix(in srgb, ${semanticColor.accent} 85%, transparent)`,
					},
					'&:disabled': {
						backgroundColor: vars.fill.quatemary,
					},
				},
			},
			secondary: {
				backgroundColor: vars.fill.tertiary,

				selectors: {
					'&:hover, &.active, &[aria-expanded=true]': {
						backgroundColor: vars.fill.secondary,
					},
					'&:disabled': {
						backgroundColor: vars.fill.quatemary,
					},
				},
			},
			light: {
				backgroundColor: 'transparent',

				selectors: {
					'&:hover': {
						backgroundColor: vars.fill.tertiary,
					},
					'&.active, &[aria-expanded=true]': {
						backgroundColor: vars.fill.primary,
					},
				},
			},
		},
		isDestructive: {
			true: {
				color: vars.color.red,
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
