import { configureStore } from '@reduxjs/toolkit'

import comboSlice from '@/features/combo/slice'
import parameterLoaderSlice from '@/features/parameterLoader/slice'
import resourceLoaderSlice from '@/features/resourceLoader/slice'
import userSettingsSlice from '@/features/userSettings/slice'

import characterIdChangeMiddleware from './middlewares/characterIdChangeMiddleware'

const store = configureStore({
	reducer: {
		combo: comboSlice,
		param: parameterLoaderSlice,
		res: resourceLoaderSlice,
		settings: userSettingsSlice,
	},
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware().prepend(
			characterIdChangeMiddleware.middleware,
		)
	},
})

// Infer the `RootState` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Get the type of our store variable
export type AppStore = typeof store

// Infer the `AppDispatch` types from the store itself
export type AppDispatch = AppStore['dispatch']

export default store
