import { parameterLoaderAdapter } from './adapter'
import { CHARACTER_NAMES } from './constants'
import type { CharacterParameterState } from './types'

function initializeParameterState() {
	const charactersById = Object.fromEntries(Object.entries(CHARACTER_NAMES).map(function([id, name]): [string, CharacterParameterState] {
		return [
			id,
			{
				id,
				name,
				state: 'ready',
				param: null,
			},
		]
	}))
	return parameterLoaderAdapter.getInitialState(undefined, charactersById)
}

export {
	initializeParameterState,
}
