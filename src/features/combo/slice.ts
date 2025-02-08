import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { Move } from '@/common/types'

import { COMBO_INITIAL_STATE, COMBO_NAME } from './constants'
import { createComboItem } from './utils'

const comboSlice = createSlice({
	name: COMBO_NAME,
	initialState: COMBO_INITIAL_STATE,
	reducers: {
		push(state, action: PayloadAction<Move | undefined>) {
			const move = action.payload
			if (move) {
				const prevItem = state.items.at(-1)
				const newItem = createComboItem(move, prevItem)
				state.items = [...state.items, newItem]
			}
		},

		dropRight(state, action: PayloadAction<number>) {
			const index = action.payload
			if (index >= 0 && index < state.items.length) {
				state.items = state.items.slice(0, index)
			}
		},
	},
})

export const {
	push: pushCombo,
	dropRight: dropComboRight,
} = comboSlice.actions
export default comboSlice.reducer
