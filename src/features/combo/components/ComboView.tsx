import { useLingui } from '@lingui/react/macro'
import { useCallback } from 'react'
import type { ReadonlyDeep } from 'type-fest'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ComboTableView, type Combo, type ComboTableColumnKey } from '@/components/ComboList'
import { selectDynamicResource } from '@/features/resourceLoader/selectors'
import { selectComboTableColumns, selectMoveNameDisplayModes } from '@/features/userSettings/selectors'
import { setComboTableColumns } from '@/features/userSettings/slice'

import { selectComboItems } from '../selectors'
import { dropComboRight } from '../slice'

function ComboView() {
	const { i18n: { locale } } = useLingui()
	const columns = useAppSelector(selectComboTableColumns)
	const displayModes = useAppSelector(selectMoveNameDisplayModes)
	const res = useAppSelector(selectDynamicResource)

	const dispatch = useAppDispatch()
	const comboItems = useAppSelector(selectComboItems)

	const handleColumns = useCallback(function(columns: Set<ComboTableColumnKey>) {
		dispatch(setComboTableColumns(Array.from(columns)))
	}, [])

	const handleDelete = useCallback(function(targetCombo: ReadonlyDeep<Combo>) {
		const index = comboItems.findLastIndex(function(combo) {
			return targetCombo === combo
		})
		if (index !== -1) {
			dispatch(dropComboRight(index))
		}
	}, [dispatch, comboItems])

	return (
		<ComboTableView
			defaultColumns={columns}
			displayModes={displayModes}
			items={comboItems}
			locale={locale}
			res={res}
			onColumnsChange={handleColumns}
			onDelete={handleDelete}
		/>
	)
}

export default ComboView
