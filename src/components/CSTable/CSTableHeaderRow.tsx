import { useTableHeaderRow } from '@react-aria/table'
import { useRef } from 'react'

import type { CSTableRowProps } from './types'

function CSTableHeaderRow<T extends object>({ children, item, state }: CSTableRowProps<T>) {
	const ref = useRef<HTMLTableRowElement>(null)
	const { rowProps, isPressed } = useTableHeaderRow({ node: item }, state, ref)
	return (
		<tr ref={ref} {...rowProps}>
			{children}
		</tr>
	)
}

export {
	CSTableHeaderRow,
}
