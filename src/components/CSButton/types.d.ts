import type { AriaButtonProps } from '@react-aria/button'
import type { AriaFocusRingProps } from '@react-aria/focus'
import type { ReactNode } from 'react'

export type CSButtonVariant = 'primary' | 'secondary' | 'light'

export interface CSButtonProps extends AriaButtonProps, Pick<AriaFocusRingProps, 'autoFocus'> {
	isDestructive?: boolean
	isIconOnly?: boolean
	isLoading?: boolean
	symbol?: ReactNode
	variant?: CSButtonVariant
}
