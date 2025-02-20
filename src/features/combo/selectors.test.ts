import * as mock from '@/mocks/mockData.test'

import { DEFAULT_CONTEXT_PARAMS } from '../parameterLoader/constants'
import { mapMove } from '../parameterLoader/mappers'

import { selectResult } from './selectors'
import type { ComboState } from './types'
import { createComboItem } from './utils'

test('should get the result of items in the array', () => {
	const comboItem1 = createComboItem(mapMove(DEFAULT_CONTEXT_PARAMS, mock.MOCK_5MP))
	const comboItem2 = createComboItem(mapMove(DEFAULT_CONTEXT_PARAMS, mock.MOCK_RUSH), comboItem1)
	const comboItem3 = createComboItem(mapMove(DEFAULT_CONTEXT_PARAMS, mock.MOCK_2MP), comboItem2)

	const mockState = {
		combo: {
			characterId: null,
			combos: [
				comboItem1,
				comboItem2,
				comboItem3,
			],
		} satisfies ComboState,
	}

	const result = selectResult(mockState)
	expect(result.comboDamage).toBe(1110)
	expect(result.drive).toBe(0.15)
	expect(result.superarts).toBe(0.1)
})

test('should return 0 if the items is empty', () => {
	const mockState = {
		combo: {
			characterId: null,
			combos: [],
		} satisfies ComboState,
	}

	const result = selectResult(mockState)
	expect(result.comboDamage).toBe(0)
	expect(result.drive).toBe(0)
	expect(result.superarts).toBe(0)
})
