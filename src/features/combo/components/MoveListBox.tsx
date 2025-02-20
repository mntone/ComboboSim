import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { Item, Section } from '@react-stately/collections'
import type { Selection } from '@react-types/shared'
import { useCallback, useState } from 'react'
import { TbPlus } from 'react-icons/tb'

import { getPreferredMoveName } from '@/common/getPreferredMoveName'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { CSButton, CSButtonGroup } from '@/components/CSButton'
import { CSMenuButton } from '@/components/CSPopover'
import { pushCombo } from '@/features/combo/slice'
import { selectIsCharacterLoading, selectNormalizedMoves } from '@/features/parameterLoader/selectors'
import { selectDynamicResource } from '@/features/resourceLoader/selectors'
import { selectMoveNameDisplayModes } from '@/features/userSettings/selectors'

import { moveListBox } from './styles.css'

const categoryNames = {
	normal: msg`Normal Moves`,
	unique: msg`Unique Attacks`,
	special: msg`Special Moves`,
	superarts: msg`Super Arts`,
	throws: msg`Throws`,
	common: msg`Common Moves`,
}

function MoveListBox() {
	const { i18n: { locale }, t } = useLingui()
	const dispatch = useAppDispatch()
	const isLoading = useAppSelector(function(state) {
		return selectIsCharacterLoading(state, state.combo.characterId)
	})
	const normalizedMoves = useAppSelector(function(state) {
		return selectNormalizedMoves(state, state.combo.characterId)
	})
	const displayModes = useAppSelector(selectMoveNameDisplayModes)
	const res = useAppSelector(selectDynamicResource)

	const [selectedMoveKeys, setSelectedMoveKeys] = useState<Set<string>>(new Set([]))
	const [isOpen, setIsOpen] = useState(false)

	const getCurrentMoveName = useCallback(function(keys: Set<string>) {
		const selectedKey = keys.keys().next().value
		if (selectedKey) {
			const targetMove = normalizedMoves.movesById.get(selectedKey)
			const moveName = getPreferredMoveName(targetMove, displayModes, locale, res)
			return moveName
		}

		return <></>
	}, [locale, displayModes, res, normalizedMoves.movesById])

	const handleMoveChange = useCallback(function(keys: Selection) {
		if (import.meta.env.DEV && !(keys instanceof Set)) {
			console.log('Expected Set<string>, but got invalid type.')
		}

		setSelectedMoveKeys(keys as Set<string>)
		setIsOpen(false)
	}, [setSelectedMoveKeys, setIsOpen])

	const handleAddMove = useCallback(function() {
		const selectedKey = selectedMoveKeys.keys().next().value
		if (selectedKey) {
			const targetMoveItem = normalizedMoves.movesById.get(selectedKey)
			if (targetMoveItem) {
				setIsOpen(false)
				dispatch(pushCombo(targetMoveItem))
			}
		}
	}, [dispatch, selectedMoveKeys, normalizedMoves.movesById, setIsOpen])

	return (
		<CSButtonGroup>
			<CSMenuButton
				classNames={{
					base: moveListBox,
				}}
				isDisabled={isLoading}
				isLoading={isLoading}
				isOpen={isOpen}
				items={normalizedMoves.movesByCategory}
				label={getCurrentMoveName(selectedMoveKeys)}
				selectedKeys={selectedMoveKeys}
				selectionMode='single'
				onOpenChange={setIsOpen}
				onSelectionChange={handleMoveChange}
			>
				{function(moveCategories) {
					return (
						<Section
							key={moveCategories.id}
							title={t(categoryNames[moveCategories.id])}
						>
							{moveCategories.moves.map(function(move) {
								return (
									<Item key={move.id}>
										{getPreferredMoveName(move, displayModes, locale, res)}
									</Item>
								)
							})}
						</Section>
					)
				}}
			</CSMenuButton>

			<CSButton
				aria-label='Add Move'
				isDisabled={typeof selectedMoveKeys.keys().next().value === 'undefined'}
				isIconOnly
				variant='primary'
				onPress={handleAddMove}
			>
				<TbPlus size={16} />
			</CSButton>
		</CSButtonGroup>
	)
}

export default MoveListBox
