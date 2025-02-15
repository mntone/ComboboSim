import { useMenu } from '@react-aria/menu'
import { useTreeState } from '@react-stately/tree'
import { useRef } from 'react'

import { CSMenuItem } from './CSMenuItem'
import { CSMenuSection } from './CSMenuSection'
import * as styles from './styles.css'
import type { CSMenuProps } from './types'

function CSMenu<T extends object>({ classNames, ...props }: CSMenuProps<T>) {
	// Create menu state based on the incoming props
	const state = useTreeState(props)

	// Get props for the menu element
	const ref = useRef<HTMLDivElement>(null)
	const { menuProps } = useMenu(props, state, ref)

	return (
		<div
			ref={ref}
			className={classNames?.base ? `${classNames.base} ${styles.menu}` : styles.menu}
			{...menuProps}
		>
			{[...state.collection].map(function(item) {
				return item.type === 'section'
					? (
						<CSMenuSection
							key={item.key}
							item={item}
							state={state}
						/>
					)
					: (
						<CSMenuItem
							key={item.key}
							item={item}
							state={state}
						/>
					)
			})}
		</div>
	)
}

export {
	CSMenu,
}
