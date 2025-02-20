import { useLingui } from '@lingui/react/macro'
import { useCallback, useMemo } from 'react'
import type { ReadonlyDeep } from 'type-fest'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ComboTableView, type Combo, type ComboTableColumnKey } from '@/components/ComboList'
import { ComboViewOptionsButton } from '@/components/ComboList/ComboViewOptionsButton'
import { CharacterListBox } from '@/features/combo/components/CharacterListBox'
import type { CharacterParameterState } from '@/features/parameterLoader/types'
import { selectDynamicResource } from '@/features/resourceLoader/selectors'
import { selectComboTableColumns, selectMoveNameDisplayModes } from '@/features/userSettings/selectors'
import { setComboTableColumns } from '@/features/userSettings/slice'

import { selectCharacterId, selectComboItems } from '../selectors'
import { dropComboRight, setCharacterId } from '../slice'

function ComboView() {
	const { i18n: { locale } } = useLingui()
	const characterId = useAppSelector(selectCharacterId)
	const columns = useAppSelector(selectComboTableColumns)
	const displayModes = useAppSelector(selectMoveNameDisplayModes)
	const res = useAppSelector(selectDynamicResource)

	const dispatch = useAppDispatch()
	const comboItems = useAppSelector(selectComboItems)

	const columnSet = useMemo(function() {
		return new Set(columns)
	}, [columns])

	const handleCharacterChange = useCallback(function(character: CharacterParameterState) {
		dispatch(setCharacterId(character.id))
	}, [dispatch])

	const handleColumns = useCallback(function(columns: Set<ComboTableColumnKey>) {
		dispatch(setComboTableColumns(Array.from(columns)))
	}, [dispatch])

	const handleDelete = useCallback(function(targetCombo: ReadonlyDeep<Combo>) {
		const index = comboItems.findLastIndex(function(combo) {
			return targetCombo === combo
		})
		if (index !== -1) {
			dispatch(dropComboRight(index))
		}
	}, [dispatch, comboItems])

	return (
		<>
			<CharacterListBox
				characterKey={characterId}
				onCharacterChange={handleCharacterChange}
			/>
			<ComboViewOptionsButton
				selectedColumns={columnSet}
				onColumnsChange={handleColumns}
			/>
			<ComboTableView
				columns={columnSet}
				displayModes={displayModes}
				items={comboItems}
				locale={locale}
				res={res}
				onDelete={handleDelete}
			/>
		</>
	)
}

export {
	ComboView,
}
