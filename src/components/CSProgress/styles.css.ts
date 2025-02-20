import { keyframes, style, styleVariants } from '@vanilla-extract/css'

import { semanticColor } from '@/styles/theme.css'

const circularAnimation = keyframes({
	'0%': {
		strokeDasharray: '0, 160px',
		transform: 'rotate(0deg)',
	},
	'50%': {
		strokeDasharray: '60px, 160px',
		strokeDashoffset: '-12px',
	},
	'100%': {
		strokeDasharray: '0, 160px',
		strokeDashoffset: '-94.2px',
		transform: 'rotate(360deg)',
	},
})

const base = style({
	display: 'inline-block',

	animation: `${circularAnimation} 1.5s linear infinite`,
	fill: 'none',
	stroke: semanticColor.accent,
	strokeDasharray: '2px, 160px',
	strokeLinecap: 'round',
})

export const circular = styleVariants({
	xs: [base, { strokeWidth: 2, width: 16, height: 16 }],
	sm: [base, { strokeWidth: 1.666, width: 24, height: 24 }],
	md: [base, { strokeWidth: 1.5, width: 32, height: 32 }],
	lg: [base, { strokeWidth: 1.333, width: 48, height: 48 }],
	xl: [base, { strokeWidth: 1.25, width: 64, height: 64 }],
})
