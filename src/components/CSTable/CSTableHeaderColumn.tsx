import { useTableColumnHeader } from '@react-aria/table'
import { useRef } from 'react'

import { headerRow as headerRowStyle } from './styles.css'
import type { CSTableHeaderColumnProps } from './types'

function CSTableHeaderColumn<T extends object>({ item, state }: CSTableHeaderColumnProps<T>) {
	const ref = useRef<HTMLTableCellElement>(null)
	const { columnHeaderProps } = useTableColumnHeader({ node: item }, state, ref)
	return (
		<th
			ref={ref}
			className={headerRowStyle}
			colSpan={item.colspan}
			{...columnHeaderProps}
		>
			{item.rendered}
		</th>
	)
}

export {
	CSTableHeaderColumn,
}
