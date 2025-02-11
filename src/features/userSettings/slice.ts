import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { ComboTableColumnKey } from '@/components/ComboList'
import type { MoveNameDisplayModes } from '@/components/MoveLabel/types'

import { USERSETTINGS_INITIAL_STATE, USERSETTINGS_NAME } from './constants'

const userSettingsSlice = createSlice({
	name: USERSETTINGS_NAME,
	initialState: USERSETTINGS_INITIAL_STATE,
	reducers: {
		setComboTableColumns(state, action: PayloadAction<ComboTableColumnKey[] | null>) {
			state.comboTableColumns = action.payload
		},

		setResourceId(state, action: PayloadAction<string>) {
			state.resourceId = action.payload
		},

		setMoveNameDisplayMode(state, action: PayloadAction<MoveNameDisplayModes>) {
			state.moveNameDisplayMode = action.payload
		},

		skipComboDeletionAlert(state) {
			state.skipComboDeletionAlert = true
		},

		toggleSkipComboDeletionAlert(state) {
			state.skipComboDeletionAlert = !state.skipComboDeletionAlert
		},
	},
})

export const {
	setComboTableColumns,
	setResourceId,
	setMoveNameDisplayMode,
	skipComboDeletionAlert,
	toggleSkipComboDeletionAlert,
} = userSettingsSlice.actions
export default userSettingsSlice.reducer
