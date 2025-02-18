import { DismissButton, Overlay, usePopover } from '@react-aria/overlays'
import { useRef } from 'react'

import * as styles from './styles.css'
import type { CSPopoverProps } from './types'

function CSPopover({
	children,
	offset = -14,
	state,
	...props
}: CSPopoverProps) {
	// Get props for the popover element
	const popoverRef = useRef<HTMLDivElement>(null)
	const { popoverProps, underlayProps } = usePopover({
		containerPadding: 0,
		offset,
		popoverRef,
		...props,
	}, state)
	return (
		<Overlay>
			<div className={styles.backdrop} {...underlayProps} />
			<div
				ref={popoverRef}
				className={styles.popover}
				{...popoverProps}
			>
				<DismissButton onDismiss={state.close} />
				{children}
				<DismissButton onDismiss={state.close} />
			</div>
		</Overlay>
	)
}

export {
	CSPopover,
}
