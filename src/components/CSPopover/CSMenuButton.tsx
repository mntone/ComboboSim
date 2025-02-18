import { useMenuTrigger } from '@react-aria/menu'
import { useMenuTriggerState } from '@react-stately/menu'
import type { DOMRefValue } from '@react-types/shared'
import { useRef } from 'react'
import { TbChevronDown, TbSelector } from 'react-icons/tb'

import { unwrapDOMRef } from '@/utils/useDOMRef'

import { CSButton } from '../CSButton'
import { CSMenu } from '../CSMenu'

import { CSPopover } from './CSPopover'
import type { CSMenuTriggerProps } from './types'

function CSMenuButton<T extends object>({
	isDisabled,
	isLoading,
	label,
	placement = 'bottom start',
	trigger,
	...props
}: CSMenuTriggerProps<T>) {
	// Create state based on the incoming props
	const state = useMenuTriggerState(props)

	// Get props for the button and menu elements
	const ref = useRef<DOMRefValue<HTMLButtonElement> | null>(null)
	const domRef = unwrapDOMRef<HTMLButtonElement>(ref)
	const { menuTriggerProps, menuProps } = useMenuTrigger<T>({ trigger }, state, domRef)

	return (
		<>
			<CSButton
				ref={ref}
				isDisabled={isDisabled}
				isLoading={isLoading}
				symbol={props.selectionMode === 'none'
					? <TbChevronDown className='justify-end' size={16} />
					: <TbSelector className='justify-end' size={16} />}
				{...menuTriggerProps}
			>
				{label}
			</CSButton>
			{state.isOpen && (
				<CSPopover
					crossOffset={-23}
					placement={placement}
					state={state}
					triggerRef={domRef}
				>
					<CSMenu {...props} {...menuProps} />
				</CSPopover>
			)}
		</>
	)
}

export {
	CSMenuButton,
}
