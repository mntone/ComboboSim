import { createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from './store'

const useAppDispatch = useDispatch.withTypes<AppDispatch>()

const useAppSelector = useSelector.withTypes<RootState>()

const createAppAsyncThunk = createAsyncThunk.withTypes<{
	state: RootState
	dispatch: AppDispatch
}>()

export {
	useAppDispatch,
	useAppSelector,
	createAppAsyncThunk,
}
