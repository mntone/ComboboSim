import { createGlobalTheme, createGlobalThemeContract, styleVariants } from '@vanilla-extract/css'

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

	materialThin: {
		backdropFilter: 'mrl-tn-bd',
		backgroundColor: 'mrl-tn-bg',
	},
	materialMedium: {
		backdropFilter: 'mrl-md-bd',
		backgroundColor: 'mrl-md-bg',
	},
	materialThick: {
		backdropFilter: 'mrl-tk-bd',
		backgroundColor: 'mrl-tk-bg',
	},
})

createGlobalTheme(':root', vars, {
	textPrimary: {
		default: 'light-dark(rgb(0 0 0 / 85%), rgb(255 255 255 / 85%))',
		highlight: 'light-dark(rgb(255 255 255 / 85%), rgb(0 0 0 / 85%))',
	},
	textSecondary: {
		default: 'light-dark(rgb(0 0 0 / 50%), rgb(255 255 255 / 50%))',
		highlight: 'light-dark(rgb(255 255 255 / 50%), rgb(0 0 0 / 50%))',
	},
	textTertiary: {
		default: 'light-dark(rgb(0 0 0 / 25%), rgb(255 255 255 / 25%))',
		highlight: 'light-dark(rgb(255 255 255 / 25%), rgb(0 0 0 / 25%))',
	},

	materialThin: {
		backdropFilter: 'blur(30px)',
		backgroundColor: 'light-dark(rgb(246 246 246 / 48%), #0003)',
	},
	materialMedium: {
		backdropFilter: 'blur(30px)',
		backgroundColor: 'light-dark(#F6F6F699, rgb(0 0 0 / 29%))',
	},
	materialThick: {
		backdropFilter: 'blur(30px)',
		backgroundColor: 'light-dark(rgb(246 246 246 / 72%), #0006)',
	},
})

const material = styleVariants({
	thin: {
		backdropFilter: vars.materialThin.backdropFilter,
		backgroundColor: vars.materialThin.backgroundColor,
	},
	medium: {
		backdropFilter: vars.materialMedium.backdropFilter,
		backgroundColor: vars.materialMedium.backgroundColor,
	},
	thick: {
		backdropFilter: vars.materialThick.backdropFilter,
		backgroundColor: vars.materialThick.backgroundColor,
	},
})

export {
	vars,
	material,
}
