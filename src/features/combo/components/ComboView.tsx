import { useLingui } from '@lingui/react/macro'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TbPlus } from 'react-icons/tb'
import type { ReadonlyDeep } from 'type-fest'

import type { Move } from '@/common/types'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ComboTableView, type Combo, type ComboTableColumnKey } from '@/components/ComboList'
import { ComboViewOptionsButton } from '@/components/ComboList/ComboViewOptionsButton'
import { COMBOTABLE_DEFAULT_COLUMNS } from '@/components/ComboList/constants'
import { CSButton, CSButtonGroup } from '@/components/CSButton'
import { HitTypeList } from '@/components/HitTypeList'
import { MoveList } from '@/components/MoveList'
import { CharacterListBox } from '@/features/combo/components/CharacterListBox'
import type { CharacterParameterState } from '@/features/parameterLoader/types'
import { selectDynamicResource } from '@/features/resourceLoader/selectors'
import { selectComboTableColumns, selectMoveNameDisplayModes } from '@/features/userSettings/selectors'
import { setComboTableColumns } from '@/features/userSettings/slice'

import { selectCharacterId, selectComboItems, selectLastComboItem } from '../selectors'
import { dropComboRight, pushCombo, setCharacterId } from '../slice'
import type { HitType } from '../types'

function hasItem<T>(collection: T[] | undefined): collection is T[] {
	return collection !== undefined && collection.length !== 0
}

function isDependent(targetMove: Move, prevMoveId: string): boolean {
	// No dependent data
	if (!hasItem(targetMove.dependencies)) {
		return false
	}

	return !targetMove.dependencies.includes(prevMoveId)
}

function ComboView() {
	const { i18n: { locale } } = useLingui()
	const dispatch = useAppDispatch()

	const [move, setMove] = useState<Move>()
	const [hitType, setHitType] = useState<HitType>('normal')

	const characterId = useAppSelector(selectCharacterId)
	const columns = useAppSelector(selectComboTableColumns)
	const displayModes = useAppSelector(selectMoveNameDisplayModes)
	const res = useAppSelector(selectDynamicResource)

	const comboItems = useAppSelector(selectComboItems)
	const lastComboItem = useAppSelector(selectLastComboItem)

	const columnSet = useMemo(function() {
		return new Set(columns ?? COMBOTABLE_DEFAULT_COLUMNS)
	}, [columns])

	const filterMove = useMemo(function() {
		if (lastComboItem) {
			const lastMoveId = lastComboItem.move.id
			return function(move: Move): boolean {
				return !isDependent(move, lastMoveId)
			}
		} else {
			return function(move: Move): boolean {
				return move.dependencies == null
			}
		}
	}, [lastComboItem])

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

	const handleAdd = useCallback(function() {
		if (move) {
			dispatch(pushCombo({
				hitType,
				inputType: 'meaty',
				offset: 0,
				move,
			}))
		}
	}, [dispatch, hitType, move])

	useEffect(function() {
		setMove(undefined)
		setHitType('normal')
	}, [lastComboItem])

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

			<CSButtonGroup>
				<MoveList
					characterKey={characterId}
					filter={filterMove}
					selectedMove={move}
					onMoveChange={setMove}
				/>

				{lastComboItem == null && (
					<HitTypeList
						selectedHitType={hitType}
						onHitTypeChange={setHitType}
					/>
				)}

				<CSButton
					aria-label='Add Move'
					isDisabled={move == null}
					isIconOnly
					variant='primary'
					onPress={handleAdd}
				>
					<TbPlus size={16} />
				</CSButton>
			</CSButtonGroup>
		</>
	)
}

export {
	ComboView,
}
