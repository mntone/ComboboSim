import type { CharacterState } from './types'

const PARAMETERLOADER_NAME = 'param'

const PARAMETERLOADER_INITIAL_STATE: CharacterState = {
	state: 'loading',
	data: null,
}

export {
	PARAMETERLOADER_NAME,
	PARAMETERLOADER_INITIAL_STATE,
}
