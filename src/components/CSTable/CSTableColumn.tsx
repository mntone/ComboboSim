import { useTableCell } from '@react-aria/table'
import { useRef } from 'react'

import { cell as cellStyle } from './styles.css'
import type { CSTableColumnProps, CSTableColumnAlign, CSTableColumnData } from './types'

function getDefaultAlign(dataType?: CSTableColumnData): CSTableColumnAlign | undefined {
	switch (dataType) {
	case 'number':
		return 'right'
	default:
		return undefined
	}
}

function CSTableColumn<T extends object>({ item, state }: CSTableColumnProps<T>) {
	const ref = useRef<HTMLTableCellElement>(null)
	const { gridCellProps } = useTableCell({ node: item }, state, ref)

	const dataType = item.column?.props.dataType ?? 'string'
	const align = item.column?.props.align ?? getDefaultAlign(dataType)
	return (
		<td
			ref={ref}
			className={cellStyle({ align })}
			data-datatype={dataType}
			{...gridCellProps}
		>
			{item.rendered}
		</td>
	)
}

export {
	CSTableColumn,
}
