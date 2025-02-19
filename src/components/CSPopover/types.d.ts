import type { AriaPopoverProps, Placement } from '@react-aria/overlays'
import type { MenuTriggerProps } from '@react-stately/menu'
import type { OverlayTriggerState } from '@react-stately/overlays'
import type { ReactNode } from 'react'

import type { CSMenuProps } from '../CSMenu/types'

export interface CSPopoverProps extends Omit<AriaPopoverProps, 'containerPadding' | 'popoverRef'> {
	children: ReactNode
	state: OverlayTriggerState
}

export interface CSMenuTriggerProps<T> extends CSMenuProps<T>, MenuTriggerProps {
	isDisabled?: boolean
	isLoading?: boolean
	label: ReactNode
	placement?: Placement
}
