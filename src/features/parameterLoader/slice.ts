import { createSlice } from '@reduxjs/toolkit'

import { createAppAsyncThunk } from '@/app/hooks'
import fetchJson from '@/utils/fetchJson'

import { PARAMETERLOADER_NAME } from './constants'
import { initializeParameterState } from './initializeParameterState'
import { mapCharacter } from './mappers'
import type { CharacterJson } from './types'
import { snakeToCamel } from './utils/caseConversion'
import mapKeysDeep from './utils/mapKeysDeep'

const fetchParam = createAppAsyncThunk(
	`${PARAMETERLOADER_NAME}/fetch`,
	async function(id: string, { signal }) {
		const json = await fetchJson(`/params/${id}.json`, signal)
		const camelJson = mapKeysDeep(json, snakeToCamel) as CharacterJson
		const character = mapCharacter(camelJson)
		return character
	},
	{
		condition(id, { getState }) {
			const { param: { entities } } = getState()
			const fetchStatus = entities[id].state
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
				state.entities[key].state = 'loading'
			})
			.addCase(fetchParam.fulfilled, function(state, action) {
				const key = action.meta.arg
				const targetState = state.entities[key]
				targetState.state = 'complete'
				targetState.param = action.payload
			})
			.addCase(fetchParam.rejected, function(state, action) {
				const key = action.meta.arg
				const targetState = state.entities[key]
				targetState.state = 'failure'
				targetState.param = null
			})
	},
})

export {
	fetchParam,
}

export default parameterLoaderSlice.reducer
