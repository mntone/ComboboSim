import type { ParameterIndex } from '@/common/types'

import indexJson from '@/params/index.json'

import type { CharacterParameterState, ParameterState } from './types'

function initializeParameterState(): ParameterState {
	const typedJson = indexJson as ParameterIndex
	const characters = Object.fromEntries(typedJson.characters.map(function(character): [string, CharacterParameterState] {
		return [
			character.id,
			{
				state: 'ready',
				param: null,
				...character,
			},
		]
	}))
	return {
		characters,
	}
}

export {
	initializeParameterState,
}
