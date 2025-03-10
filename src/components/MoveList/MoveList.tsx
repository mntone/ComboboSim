import { useLingui } from '@lingui/react/macro'
import { Item, Section } from '@react-stately/collections'
import { useMemo } from 'react'

import { getPreferredMoveName } from '@/common/getPreferredMoveName'
import { useReadonlyMap } from '@/common/hooks/useMap'
import { useSetToSingleValue } from '@/common/hooks/useSetToSingleValue'
import type { Move } from '@/common/types'
import { groupBy } from '@/common/utils/groupBy'

import { useAppSelector } from '@/app/hooks'
import { CSMenuButton } from '@/components/CSPopover'
import { selectIsCharacterLoading, selectMoves } from '@/features/parameterLoader/selectors'
import { selectDynamicResource } from '@/features/resourceLoader/selectors'
import { selectMoveNameDisplayModes } from '@/features/userSettings/selectors'

import { MOVE_CATEGORY_NAMES } from './constants'
import { moveList } from './styles.css'
import type { MoveListProps } from './types'

function MoveList({ characterKey, filter, selectedMove, onMoveChange }: MoveListProps) {
	const { i18n: { locale }, t } = useLingui()
	const isLoading = useAppSelector(function(state) {
		return selectIsCharacterLoading(state, characterKey)
	})
	const displayModes = useAppSelector(selectMoveNameDisplayModes)
	const res = useAppSelector(selectDynamicResource)

	const moves = useAppSelector(function(state) {
		return selectMoves(state, characterKey)
	})
	const movesById = useReadonlyMap(moves)
	const movesByCategory = useMemo(function() {
		if (moves == null) {
			return []
		}

		return groupBy(moves.filter(filter), function(move) {
			return move.category
		})
	}, [moves, filter])

	const isDisabled = isLoading || movesById?.size === 0

	const getMoveName = getPreferredMoveName.bind(null, displayModes, locale, res)

	const handleMoveChange = useSetToSingleValue(
		onMoveChange,
		function(moveId: string | undefined): Move | undefined {
			if (moveId) {
				const move = movesById.get(moveId)
				return move
			} else {
				return undefined
			}
		},
		[onMoveChange, movesById],
	)

	return (
		<CSMenuButton
			classNames={{
				base: moveList,
			}}
			isDisabled={isDisabled}
			isLoading={isLoading}
			items={movesByCategory}
			label={selectedMove ? getMoveName(selectedMove) : ''}
			selectedKeys={selectedMove?.id}
			selectionMode='single'
			onSelectionChange={handleMoveChange}
		>
			{function(moveCategories) {
				return (
					<Section
						key={moveCategories.id}
						items={moveCategories.items}
						title={t(MOVE_CATEGORY_NAMES[moveCategories.id])}
					>
						{function(move) {
							return (
								<Item key={move.id}>
									{getMoveName(move)}
								</Item>
							)
						}}
					</Section>
				)
			}}
		</CSMenuButton>
	)
}

export {
	MoveList,
}
