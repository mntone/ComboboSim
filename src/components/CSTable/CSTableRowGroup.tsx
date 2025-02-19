import { useTableRowGroup } from '@react-aria/table'

import type { CSTableRowGroupProps } from './types'

function CSTableRowGroup({ type: Element, children }: CSTableRowGroupProps) {
	const { rowGroupProps } = useTableRowGroup()
	return (
		<Element {...rowGroupProps}>
			{children}
		</Element>
	)
}

export {
	CSTableRowGroup,
}
