import { style } from '@vanilla-extract/css'

import { vars } from '@/styles/index.css'

export const popover = style({
	contain: 'content',
	overflow: 'clip',
	overflowY: 'auto',
	userSelect: 'none',

	marginBlock: '16px',

	backdropFilter: 'blur(80px)',
	backgroundColor: vars.materialMedium.backgroundColor,
	borderRadius: 6,
	boxShadow: '0 0 1px 0 light-dark(#0006, #FFF6), 0 0 1.5px 0 light-dark(rgb(0 0 0 / 30%), rgb(255 255 255 / 30%)), 0 7px 22px 0 rgb(0 0 0 / 25%)',
})

export const backdrop = style({
	contain: 'content',

	position: 'fixed',
	inset: 0,
})
