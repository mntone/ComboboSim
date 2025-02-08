import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { createAppAsyncThunk } from '@/app/hooks'

import { RESOURCELOADER_INITIAL_STATE, RESOURCELOADER_NAME } from './constants'
import type { DynamicResource } from './types'

const fetchResource = createAppAsyncThunk(
	`${RESOURCELOADER_NAME}/fetch`,
	async function(resId: string, { signal }) {
		const res = await fetch(`/locales/${resId}.json`, { signal })
		if (!res.ok) {
			throw new Error('Failed to fetch resource')
		}
		return await res.json()
	},
	{
		condition(resId, { getState }) {
			const { res: { resId: currentResId, state } } = getState()
			if (state === 'ready') {
				return undefined
			}

			if (resId !== currentResId) {
				return undefined
			}

			return false
		},
	},
)

const resourceLoaderSlice = createSlice({
	name: RESOURCELOADER_NAME,
	initialState: RESOURCELOADER_INITIAL_STATE,
	reducers: {
	},
	extraReducers: function(builder) {
		builder
			.addCase(fetchResource.pending, function(state, action) {
				state.state = 'loading'
				state.resId = action.meta.arg
			})
			.addCase(fetchResource.fulfilled, function(state, action: PayloadAction<DynamicResource>) {
				state.state = 'complete'
				state.res = action.payload
			})
			.addCase(fetchResource.rejected, function(state) {
				state.state = 'failure'
				state.resId = null
				state.res = null
			})
	},
})

export {
	fetchResource,
}

export default resourceLoaderSlice.reducer
