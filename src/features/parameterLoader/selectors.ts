import { createSelector, type EntityState } from '@reduxjs/toolkit'

import type { RootState } from '@/app/store'

import type { CharacterParameterState } from './types'

function selectCharacters(state: RootState) {
	return state.param.entities
}

const selectCharacterArray = createSelector(
	function(state: RootState) {
		return state.param
	},
	function(param: EntityState<CharacterParameterState, string>) {
		return param.ids.map(function(id) {
			return param.entities[id]
		})
	},
)

function getCharacterId(_: RootState, characterId: string | null): string | null {
	return characterId
}

const selectMoves = createSelector(
	getCharacterId,
	selectCharacters,
	function(characterId, params) {
		if (characterId === null) {
			return undefined
		}

		const moves = params[characterId].param?.moves
		return moves
	},
)

const selectIsCharacterLoading = createSelector(
	function(_: RootState, characterId: string | null): string | null {
		return characterId
	},
	selectCharacters,
	function(characterId: string | null, params: { [key: string]: CharacterParameterState }): boolean {
		if (characterId === null) {
			return false
		}
		return params[characterId].state === 'loading'
	},
)

export {
	selectCharacters,
	selectCharacterArray,

	selectMoves,
	selectIsCharacterLoading,
}
