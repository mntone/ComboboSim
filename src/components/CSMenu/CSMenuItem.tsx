import { useMenuItem } from '@react-aria/menu'
import { useRef } from 'react'
import { TbCheck } from 'react-icons/tb'

import * as styles from './styles.css'
import type { CSMenuItemProps } from './types'

function CSMenuItem<T extends object>({ item, state }: CSMenuItemProps<T>) {
	// Get props for the menu item element
	const ref = useRef<HTMLDivElement>(null)
	const { menuItemProps, isSelected } = useMenuItem({ key: item.key }, state, ref)

	return (
		<div
			ref={ref}
			className={styles.menuItem}
			{...menuItemProps}
		>
			{isSelected && <TbCheck aria-hidden size={16} />}
			{item.rendered}
		</div>
	)
}

export {
	CSMenuItem,
}
