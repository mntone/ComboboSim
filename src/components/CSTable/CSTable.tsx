import { useTable } from '@react-aria/table'
import { useTableState } from '@react-stately/table'
import { useRef } from 'react'

import { CSTableColumn } from './CSTableColumn'
import { CSTableColumnEmpty } from './CSTableColumnEmpty'
import { CSTableHeaderColumn } from './CSTableHeaderColumn'
import { CSTableHeaderRow } from './CSTableHeaderRow'
import { CSTableRow } from './CSTableRow'
import { CSTableRowGroup } from './CSTableRowGroup'
import { table as tableStyle } from './styles.css'
import type { CSTableProps } from './types'

function CSTable<T extends object>({ children, empty, ...props }: CSTableProps<T>) {
	// Create table state based on the incoming props
	const state = useTableState({ children })
	const { collection } = state

	// Get props for the table element
	const ref = useRef<HTMLTableElement>(null)
	const { gridProps } = useTable(props, state, ref)

	let content
	if (typeof empty !== 'undefined' && collection.size === 0) {
		content = (
			<CSTableColumnEmpty columnCount={collection.columnCount}>
				{empty}
			</CSTableColumnEmpty>
		)
	} else {
		content = [...collection.body.childNodes].map(function(row) {
			return (
				<CSTableRow
					key={row.key}
					item={row}
					state={state}
				>
					{[...row.childNodes].map(function(col) {
						return (
							<CSTableColumn
								key={col.key}
								item={col}
								state={state}
							/>
						)
					})}
				</CSTableRow>
			)
		})
	}

	return (
		<table
			ref={ref}
			className={tableStyle}
			{...gridProps}
		>
			<CSTableRowGroup type='thead'>
				{collection.headerRows.map(function(row) {
					return (
						<CSTableHeaderRow
							key={row.key}
							item={row}
							state={state}
						>
							{[...row.childNodes].map(function(col) {
								return (
									<CSTableHeaderColumn
										key={col.key}
										item={col}
										state={state}
									/>
								)
							})}
						</CSTableHeaderRow>
					)
				})}
			</CSTableRowGroup>
			<CSTableRowGroup type='tbody'>
				{content}
			</CSTableRowGroup>
		</table>
	)
}

export {
	CSTable,
}
