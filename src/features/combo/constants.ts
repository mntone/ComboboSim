import type { ComboState, ProrationState } from './types'

const COMBO_NAME = 'combo'

const COMBO_INITIAL_STATE: ComboState = {
	characterId: null,
	combos: [],
}

const INITIAL_PRORATION: ProrationState = {
	rush: false,
	p1: 100,
	p2: 1,
} as const

export {
	COMBO_NAME,
	COMBO_INITIAL_STATE,
	INITIAL_PRORATION,
}
