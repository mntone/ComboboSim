import type { ParameterIndex } from '@/common/types'

import indexJson from '@/params/index.json'

import type { CharacterParameterState, ParameterState } from './types'

function initializeParameterState(): ParameterState {
	const typedJson = indexJson as ParameterIndex
	const charactersById = Object.fromEntries(typedJson.characters.map(function(character): [string, CharacterParameterState] {
		return [
			character.id,
			{
				state: 'ready',
				param: null,
				...character,
			},
		]
	}))
	const characters = Object.values(charactersById)
	return {
		characters,
		charactersById,
	}
}

export {
	initializeParameterState,
}
