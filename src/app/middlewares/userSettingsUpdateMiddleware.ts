import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'

import * as userSettingsSlice from '@/features/userSettings/slice'

import type { RootState } from '../store'

const targetActions = isAnyOf(
	userSettingsSlice.setComboTableColumns,
	userSettingsSlice.setResourceId,
	userSettingsSlice.setMoveNameDisplayMode,
	userSettingsSlice.skipComboDeletionAlert,
	userSettingsSlice.toggleSkipComboDeletionAlert,
)

const userSettingsUpdateMiddleware = createListenerMiddleware()

userSettingsUpdateMiddleware.startListening({
	predicate(action, currentState) {
		return targetActions(action) && (currentState as RootState).settings.isDirty
	},
	effect: async function(_, listener) {
		listener.dispatch(userSettingsSlice.save())
	},
})

export {
	userSettingsUpdateMiddleware,
}
