import { createSlice } from '@reduxjs/toolkit'

import type { Character } from '@/common/types'

import { createAppAsyncThunk } from '@/app/hooks'

import { PARAMETERLOADER_INITIAL_STATE, PARAMETERLOADER_NAME } from './constants'
import { snakeToCamel } from './utils/caseConversion'
import mapKeysDeep from './utils/mapKeysDeep'

const fetchParam = createAppAsyncThunk(`${PARAMETERLOADER_NAME}/fetch`, async function() {
	const res = await fetch('/params/20241202/manon.json')
	if (!res.ok) {
		throw new Error('Failed to fetch move')
	}

	const json = await res.json()
	return mapKeysDeep(json, snakeToCamel) as Character
})

const parameterLoaderSlice = createSlice({
	name: PARAMETERLOADER_NAME,
	initialState: PARAMETERLOADER_INITIAL_STATE,
	reducers: {
	},
	extraReducers: function(builder) {
		builder
			.addCase(fetchParam.pending, function(state) {
				state.state = 'loading'
			})
			.addCase(fetchParam.fulfilled, function(state, action) {
				state.state = 'complete'
				state.data = action.payload
			})
			.addCase(fetchParam.rejected, function(state) {
				state.state = 'failure'
				state.data = null
			})
	},
})

export {
	fetchParam,
}

export default parameterLoaderSlice.reducer
