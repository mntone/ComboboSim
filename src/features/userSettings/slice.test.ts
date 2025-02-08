import { USERSETTINGS_INITIAL_STATE } from './constants'
import slice, { setResourceId, skipComboDeletionAlert, toggleSkipComboDeletionAlert } from './slice'

test('should return the initial state when passed an empty action', () => {
	const newState = slice(undefined, { type: ' ' })
	expect(newState).toEqual(USERSETTINGS_INITIAL_STATE)
})

test('should handle setResourceId action', () => {
	const newState = slice(USERSETTINGS_INITIAL_STATE, setResourceId('capcom_ja'))
	expect(newState.resourceId).toBe('capcom_ja')
})

test('should handle skipComboDeletionAlert action', () => {
	const newState = slice(USERSETTINGS_INITIAL_STATE, skipComboDeletionAlert())
	expect(newState.skipComboDeletionAlert).toBe(true)
})

test('should toggle toggleSkipComboDeletionAlert', () => {
	const newState = slice(USERSETTINGS_INITIAL_STATE, toggleSkipComboDeletionAlert())
	expect(newState.skipComboDeletionAlert).toBe(true)

	const toggledBackState = slice(newState, toggleSkipComboDeletionAlert())
	expect(toggledBackState.skipComboDeletionAlert).toBe(false)
})
