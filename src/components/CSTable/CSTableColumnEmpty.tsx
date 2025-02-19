import { emptyCell as emptyCellStyle } from './styles.css'
import type { CSTableEmptyRowProps } from './types'

function CSTableColumnEmpty({ children, columnCount }: CSTableEmptyRowProps) {
	return (
		<tr role='row'>
			<td
				className={emptyCellStyle}
				colSpan={columnCount}
				role='gridcell'
			>
				{children}
			</td>
		</tr>
	)
}

export {
	CSTableColumnEmpty,
}
