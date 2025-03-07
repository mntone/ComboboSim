import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { Item } from '@react-stately/collections'
import type { Selection } from '@react-types/shared'
import { useCallback } from 'react'

import { CSMenuButton } from '../CSPopover'

import { COMBOTABLE_OPTIONAL_COLUMNS } from './constants'
import type { ComboTableColumnKey, ComboViewOptionsButtonProps } from './types'

function ComboViewOptionsButton({
	selectedColumns,
	onColumnsChange,
}: ComboViewOptionsButtonProps) {
	const { t } = useLingui()
	const handleColumnsChange = useCallback(function(keys: Selection) {
		if (import.meta.env.DEV && !(keys instanceof Set)) {
			console.log('Expected Set<string>, but got invalid type.')
		}

		const columns = keys as Set<ComboTableColumnKey>
		onColumnsChange?.(columns)
	}, [onColumnsChange])

	return (
		<CSMenuButton
			items={COMBOTABLE_OPTIONAL_COLUMNS}
			label={t(msg`View Options`)}
			selectedKeys={selectedColumns}
			selectionMode='multiple'
			onSelectionChange={handleColumnsChange}
		>
			{function(col) {
				return (
					<Item key={col.id}>
						{t(col.name)}
					</Item>
				)
			}}
		</CSMenuButton>
	)
}

export {
	ComboViewOptionsButton,
}
