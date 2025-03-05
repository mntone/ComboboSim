import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { COMBO_INITIAL_STATE, COMBO_NAME } from './constants'
import type { PushComboData } from './types'
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

		pushCombo(state, action: PayloadAction<PushComboData | undefined>) {
			const data = action.payload
			if (data) {
				const newItem = createComboItem(data, state.combos)
				state.combos.push(newItem)
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
