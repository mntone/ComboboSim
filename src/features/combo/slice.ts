import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Move } from '@/common/types'

import { COMBO_INITIAL_STATE, COMBO_NAME } from './constants'
import { createComboItem } from './utils'

const comboSlice = createSlice({
	name: COMBO_NAME,
	initialState: COMBO_INITIAL_STATE,
	reducers: {
		setCharacterId(state, action: PayloadAction<string>) {
			const id = action.payload
			if (id !== null) {
				if (state.combos.length !== 0) {
					state.combos = []
				}
				state.characterId = id
			}
		},

		pushCombo(state, action: PayloadAction<Move | undefined>) {
			const move = action.payload
			if (move) {
				const prevItem = state.combos.at(-1)
				const newItem = createComboItem(move, prevItem)
				state.combos = [...state.combos, newItem]
			}
		},

		dropComboRight(state, action: PayloadAction<number>) {
			const index = action.payload
			if (index >= 0 && index < state.combos.length) {
				state.combos = state.combos.slice(0, index)
			}
		},
	},
})

export const {
	setCharacterId,

	pushCombo,
	dropComboRight,
} = comboSlice.actions
export default comboSlice.reducer
