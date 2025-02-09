import { createSelector } from '@reduxjs/toolkit'

import type { Move, MoveCategoryType } from '@/common/types'

import type { RootState } from '@/app/store'

import type { CharacterParameterState, MoveCategory, NormalizedMove } from './types'

function selectMovesById(moves: Move[]): ReadonlyMap<string, Move> {
	return new Map(moves.map(function(move) {
		return [move.id, move]
	}))
}

function selectMovesGroupedByCategory(moves: Move[]): MoveCategory[] {
	return Object
		.entries(moves.reduce<Record<string, Move[]>>(function(output, moveItem) {
			const category = moveItem.category;
			(output[category] ||= []).push(moveItem)
			return output
		}, {}))
		.map(function([id, moveItems]): MoveCategory {
			return {
				id: id as MoveCategoryType,
				moves: moveItems,
			}
		})
}

function getMovesByCategory(
	params: { [key: string]: CharacterParameterState },
	characterId: string | null,
): NormalizedMove {
	if (characterId !== null) {
		const moves = params[characterId].param?.moves
		if (moves != null) {
			const movesById = selectMovesById(moves)
			const movesByCategory = selectMovesGroupedByCategory(moves)
			return {
				moves,
				movesById,
				movesByCategory,
			}
		}
	}

	return {
		moves: [],
		movesById: new Map(),
		movesByCategory: [],
	}
}

const selectNormalizedMoves = createSelector(
	function(_: RootState, characterId: string | null): string | null {
		return characterId
	},
	function(state: RootState) {
		return state.param.characters
	},
	function(characterId, params): NormalizedMove {
		return getMovesByCategory(params, characterId)
	},
)

export {
	selectNormalizedMoves,
}
