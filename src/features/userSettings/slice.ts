import { createSlice, prepareAutoBatched, type PayloadAction } from '@reduxjs/toolkit'

import type { MoveNameDisplayModes } from '@/common/types'

import type { ComboTableColumnKey } from '@/components/ComboList'

import { USERSETTINGS_NAME } from './constants'
import { initializeState, saveState } from './handleStates'
import type { PatchableUserSettings } from './types'

const userSettingsSlice = createSlice({
	name: USERSETTINGS_NAME,
	initialState: initializeState(),
	reducers: {
		save: {
			reducer(state) {
				state.isDirty = false
				saveState(state)
			},
			// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
			prepare: prepareAutoBatched<void>(),
		},
		patch(state, action: PayloadAction<PatchableUserSettings>) {
			Object.assign(state, action.payload)
		},

		setComboTableColumns(state, action: PayloadAction<ComboTableColumnKey[] | null>) {
			state.comboTableColumns = action.payload
			state.isDirty = true
		},

		setResourceId(state, action: PayloadAction<string | null>) {
			state.res = action.payload
			state.isDirty = true
		},

		setMoveNameDisplayMode(state, action: PayloadAction<MoveNameDisplayModes>) {
			state.moveNameDisplayMode = action.payload
			state.isDirty = true
		},

		skipComboDeletionAlert(state) {
			state.skipComboDeletionAlert = true
			state.isDirty = true
		},

		toggleSkipComboDeletionAlert(state) {
			state.skipComboDeletionAlert = !state.skipComboDeletionAlert
			state.isDirty = true
		},
	},
})

export const {
	save,
	patch: patchSettings,

	setComboTableColumns,
	setResourceId,
	setMoveNameDisplayMode,
	skipComboDeletionAlert,
	toggleSkipComboDeletionAlert,
} = userSettingsSlice.actions
export default userSettingsSlice.reducer
