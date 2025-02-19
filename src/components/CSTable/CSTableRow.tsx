import { useTableRow } from '@react-aria/table'
import { useRef } from 'react'

import { row as rowStyle } from './styles.css'
import type { CSTableRowProps } from './types'

function CSTableRow<T extends object>({ children, item, state }: CSTableRowProps<T>) {
	const ref = useRef<HTMLTableRowElement>(null)
	const { rowProps } = useTableRow({ node: item }, state, ref)
	return (
		<tr
			ref={ref}
			className={rowStyle}
			{...rowProps}
		>
			{children}
		</tr>
	)
}

export {
	CSTableRow,
}
