import type { AriaTableProps } from '@react-aria/table'
import type { TableBodyProps, TableHeaderProps, TableState } from '@react-stately/table'
import type { GridNode } from '@react-types/grid'
import type { ReactNode } from 'react'

export type CSTableColumnAlign =
	| 'left'
	| 'center'
	| 'right'
	| 'start'
	| 'end'

export type CSTableColumnData =
	| 'string'
	| 'number'

export interface CSTableColumnProps<T> {
	item: GridNode<T>
	state: TableState<T>
}

export interface CSTableHeaderColumnProps<T> extends CSTableColumnProps<T> {
	align?: CSTableColumnAlign
	dataType?: CSTableColumnData
}

export interface CSTableRowProps<T> {
	children: ReactNode
	item: GridNode<T>
	state: TableState<T>
}

export interface CSTableEmptyRowProps {
	children: ReactNode
	columnCount: number
}

export interface CSTableRowGroupProps {
	type: 'thead' | 'tbody' | 'tfoot'
	children: ReactNode
}

export interface CSTableProps<T> extends AriaTableProps<T> {
	children?: [ReactElement<TableHeaderProps<T>>, ReactElement<TableBodyProps<T>>]
	empty?: ReactNode
}
