import { getCombo } from '@/tests/utils/getCombo'
import * as mock from '@/tests/utils/mockData'

import { selectResult } from './selectors'
import type { ComboItem, ComboSliceState } from './types'
import { createComboItem } from './utils'

test('should get the result of items in the array', () => {
	const combos: ComboItem[] = []
	combos.push(createComboItem(getCombo(mock.MOCK_5MP), combos))
	combos.push(createComboItem(getCombo(mock.MOCK_RUSH), combos))
	combos.push(createComboItem(getCombo(mock.MOCK_2MP), combos))

	const mockState = {
		combo: {
			characterId: null,
			combos,
		} satisfies ComboSliceState,
	}

	const result = selectResult(mockState)
	expect(result.totalDamage).toBe(1110)
	expect(result.totalDrive).toBe(0.15)
	expect(result.totalSuper).toBe(0.1)
})

test('should return 0 if the items is empty', () => {
	const mockState = {
		combo: {
			characterId: null,
			combos: [],
		} satisfies ComboSliceState,
	}

	const result = selectResult(mockState)
	expect(result.totalDamage).toBe(0)
	expect(result.totalDrive).toBe(0)
	expect(result.totalSuper).toBe(0)
})
