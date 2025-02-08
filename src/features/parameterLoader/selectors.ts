import type { MoveCategoryType } from '@/common/types'

import type { RootState } from '@/app/store'

import type { CategoryItem, MoveItem } from './types'

function selectMoveItems(state: Pick<RootState, 'param'>): MoveItem[] {
	return state.param.data?.moves.map(function(move) {
		return {
			id: move.id,
			data: move,
		} as const
	}) ?? []
}

function selectMoveItemsByCategory(state: Pick<RootState, 'param'>): CategoryItem[] {
	const moveItems = selectMoveItems(state)
	return Object
		.entries(moveItems.reduce<Record<string, MoveItem[]>>(function(output, moveItem) {
			const category = moveItem.data.category;
			(output[category] ||= []).push(moveItem)
			return output
		}, {}))
		.map(function([id, moveItems]): CategoryItem {
			return {
				id: id as MoveCategoryType,
				moves: moveItems,
			}
		})
}

export {
	selectMoveItems,
	selectMoveItemsByCategory,
}
