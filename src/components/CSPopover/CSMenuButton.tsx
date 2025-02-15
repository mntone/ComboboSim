import { Button } from '@heroui/button'
import { useMenuTrigger } from '@react-aria/menu'
import { useMenuTriggerState } from '@react-stately/menu'
import { useRef } from 'react'
import { TbChevronDown, TbSelector } from 'react-icons/tb'

import { CSMenu } from '../CSMenu'

import { CSPopover } from './CSPopover'
import type { CSMenuTriggerProps } from './types'

function CSMenuButton<T extends object>({
	isLoading,
	label,
	placement = 'bottom start',
	trigger,
	...props
}: CSMenuTriggerProps<T>) {
	// Create state based on the incoming props
	const state = useMenuTriggerState(props)

	// Get props for the button and menu elements
	const ref = useRef(null)
	const { menuTriggerProps, menuProps } = useMenuTrigger<T>({ trigger }, state, ref)

	return (
		<>
			<Button
				ref={ref}
				className='justify-between text-left'
				endContent={props.selectionMode === 'none'
					? <TbChevronDown className='justify-end' size={16} />
					: <TbSelector className='justify-end' size={16} />}
				isLoading={isLoading}
				{...menuTriggerProps}
			>
				{label}
			</Button>
			{state.isOpen && (
				<CSPopover
					placement={placement}
					state={state}
					triggerRef={ref}
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
