import { useButton } from '@react-aria/button'
import { useFocusRing } from '@react-aria/focus'
import type { DOMRef } from '@react-types/shared'
import { forwardRef, useMemo, type ReactElement } from 'react'

import { useDOMRef } from '@/utils/useDOMRef'

import { CSCircularProgress } from '../CSProgress'

import * as styles from './styles.css'
import type { CSButtonProps } from './types'

const CSButton = forwardRef(function CSButton({
	autoFocus,
	children,
	isDestructive,
	isIconOnly,
	isLoading,
	symbol,
	variant = 'secondary',
	...props
}: CSButtonProps, ref: DOMRef<HTMLButtonElement>) {
	// Get props for the menu element
	const domRef = useDOMRef<HTMLButtonElement>(ref)
	const { buttonProps, isPressed } = useButton(props, domRef)
	const { focusProps, isFocusVisible } = useFocusRing({ autoFocus })

	let className = useMemo(function() {
		return styles.button({
			variant,
			isIconOnly,
			isDestructive,
		})
	}, [isDestructive, isIconOnly, variant])
	if (isPressed) {
		className += ` active`
	}
	if (isFocusVisible) {
		className += ` focus-visible`
	}

	return (
		<button
			ref={domRef}
			// eslint-disable-next-line jsx-a11y/no-autofocus
			autoFocus={autoFocus}
			className={className}
			{...buttonProps}
			{...focusProps}
		>
			{isLoading ? <CSCircularProgress size='xs' /> : children}
			{symbol && (
				<span className={styles.symbolButton}>
					{symbol}
				</span>
			)}
		</button>
	)
}) as (props: CSButtonProps & { ref?: DOMRef<HTMLButtonElement> }) => ReactElement

export {
	CSButton,
}
