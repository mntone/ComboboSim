import { createGlobalThemeContract, createGlobalVar, styleVariants } from '@vanilla-extract/css'

const vars = createGlobalThemeContract({
	textPrimary: {
		default: 'tx1',
		highlight: 'tx1-hgl',
	},
	textSecondary: {
		default: 'tx2',
		highlight: 'tx2-hgl',
	},
	textTertiary: {
		default: 'tx3',
		highlight: 'tx3-hgl',
	},

	background: {
		primary: 'bg1',
		secondary: 'bg2',
		tertiary: 'bg3',
	},

	color: {
		red: 'red',
		yellow: 'yel',
		blue: 'blu',
		purple: 'ppe',
		pink: 'pnk',
	},

	fill: {
		primary: 'fl1',
		secondary: 'fl2',
		tertiary: 'fl3',
		quatemary: 'fl4',
	},

	separator: {
		default: 'sep',
	},

	material: {
		ultraThin: 'mrl-utn',
		thin: 'mrl-tn',
		medium: 'mrl-md',
		thick: 'mrl-tk',
		ultraThick: 'mrl-utk',
	},
})

const semanticColor = {
	accent: createGlobalVar('act'),
	error: createGlobalVar('err'),
	warning: createGlobalVar('wrn'),
}

const material = styleVariants({
	ultraThin: {
		backdropFilter: 'blur(30px)',
		backgroundColor: vars.material.ultraThin,
	},
	thin: {
		backdropFilter: 'blur(30px)',
		backgroundColor: vars.material.thin,
	},
	medium: {
		backdropFilter: 'blur(30px)',
		backgroundColor: vars.material.medium,
	},
	thick: {
		backdropFilter: 'blur(30px)',
		backgroundColor: vars.material.thick,
	},
	ultraThick: {
		backdropFilter: 'blur(30px)',
		backgroundColor: vars.material.ultraThick,
	},
})

export {
	vars,
	semanticColor,
	material,
}
