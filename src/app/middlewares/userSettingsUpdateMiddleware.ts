import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'

import * as userSettingsSlice from '@/features/userSettings/slice'
import { syncSettings } from '@/features/userSettings/sync'
import { extractChangedValues } from '@/features/userSettings/utils/extractChangedValues'

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
	async effect(_, listener) {
		const prev = (listener.getOriginalState() as RootState).settings
		const next = (listener.getState() as RootState).settings
		const diff = extractChangedValues(prev, next, ['isDirty'])
		if (Object.keys(diff).length !== 0) {
			syncSettings(diff)
		}

		listener.dispatch(userSettingsSlice.save())
	},
})

export {
	userSettingsUpdateMiddleware,
}
