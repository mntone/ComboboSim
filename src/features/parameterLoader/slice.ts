import { createSlice } from '@reduxjs/toolkit'

import type { Character } from '@/common/types'

import { createAppAsyncThunk } from '@/app/hooks'
import fetchJson from '@/utils/fetchJson'

import { PARAMETERLOADER_NAME } from './constants'
import { initializeParameterState } from './initializeParameterState'
import { snakeToCamel } from './utils/caseConversion'
import mapKeysDeep from './utils/mapKeysDeep'

const fetchParam = createAppAsyncThunk(
	`${PARAMETERLOADER_NAME}/fetch`,
	async function(id: string, { signal }) {
		const json = await fetchJson(`/params/${id}.json`, signal)
		return mapKeysDeep(json, snakeToCamel) as Character
	},
	{
		condition(id, { getState }) {
			const { param: { charactersById: characters } } = getState()
			const fetchStatus = characters[id].state
			return fetchStatus === 'ready'
		},
	},
)

const parameterLoaderSlice = createSlice({
	name: PARAMETERLOADER_NAME,
	initialState: initializeParameterState(),
	reducers: {
	},
	extraReducers: function(builder) {
		builder
			.addCase(fetchParam.pending, function(state, action) {
				const key = action.meta.arg
				state.charactersById[key].state = 'loading'
			})
			.addCase(fetchParam.fulfilled, function(state, action) {
				const key = action.meta.arg
				const targetState = state.charactersById[key]
				targetState.state = 'complete'
				targetState.param = action.payload
			})
			.addCase(fetchParam.rejected, function(state, action) {
				const key = action.meta.arg
				const targetState = state.charactersById[key]
				targetState.state = 'failure'
				targetState.param = null
			})
	},
})

export {
	fetchParam,
}

export default parameterLoaderSlice.reducer
