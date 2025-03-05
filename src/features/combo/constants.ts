import type { ComboSliceState } from './types'

const COMBO_NAME = 'combo'

const COMBO_INITIAL_STATE: ComboSliceState = {
	characterId: null,
	combos: [],
}

export {
	COMBO_NAME,
	COMBO_INITIAL_STATE,
}
