import type { ParameterIndex } from '@/common/types'

import indexJson from '@/params/index.json'

import { parameterLoaderAdapter } from './adapter'
import type { CharacterParameterState } from './types'

function initializeParameterState() {
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
	return parameterLoaderAdapter.getInitialState(undefined, charactersById)
}

export {
	initializeParameterState,
}
