import { configureStore } from '@reduxjs/toolkit'

import { getCombo } from '@/tests/utils/getCombo'
import { MOCK_5MP } from '@/tests/utils/mockData'

import slicer, { pushCombo, dropComboRight } from './slice'
const getMockStore = () =>
	configureStore({
		reducer: { test: slicer },
	})

test('should initialize with an empty array', () => {
	const store = getMockStore()
	const state = store.getState().test
	expect(state.combos).toStrictEqual([])
})

test('should push items correctly', () => {
	const store = getMockStore()
	store.dispatch(pushCombo(getCombo(MOCK_5MP)))
	const state = store.getState().test
	expect(state.combos).toMatchObject([{ index: 0 }])
})

test('should drop items after the specified index', () => {
	const store = getMockStore()
	store.dispatch(pushCombo(getCombo(MOCK_5MP)))
	store.dispatch(pushCombo(getCombo(MOCK_5MP)))
	store.dispatch(pushCombo(getCombo(MOCK_5MP)))
	store.dispatch(pushCombo(getCombo(MOCK_5MP)))

	store.dispatch(dropComboRight(2))

	const state = store.getState().test
	expect(state.combos).toMatchObject([{ index: 0 }, { index: 1 }])
})

test('should handle invalid indices gracefully (no action)', () => {
	const store = getMockStore()
	store.dispatch(pushCombo(getCombo(MOCK_5MP)))
	store.dispatch(pushCombo(getCombo(MOCK_5MP)))
	store.dispatch(pushCombo(getCombo(MOCK_5MP)))

	store.dispatch(dropComboRight(-1))
	let state = store.getState().test
	expect(state.combos).toMatchObject([{ index: 0 }, { index: 1 }, { index: 2 }])

	store.dispatch(dropComboRight(10))
	state = store.getState().test
	expect(state.combos).toMatchObject([{ index: 0 }, { index: 1 }, { index: 2 }])
})

test('should remove all elements when the index is zero', () => {
	const store = getMockStore()
	store.dispatch(pushCombo(getCombo(MOCK_5MP)))
	store.dispatch(pushCombo(getCombo(MOCK_5MP)))

	store.dispatch(dropComboRight(0))

	const state = store.getState().test
	expect(state.combos).toMatchObject([])
})
