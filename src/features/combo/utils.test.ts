import * as mock from '@/mocks/mockData.test'

import { DEFAULT_CONTEXT_PARAMS } from '../parameterLoader/constants'
import { mapMove } from '../parameterLoader/mappers'

import { createComboItem } from './utils'

const bindMapMove = mapMove.bind(null, DEFAULT_CONTEXT_PARAMS)

test('should get the result with low attack', () => {
	const comboItem1 = createComboItem(bindMapMove(mock.MOCK_5LP))
	const comboItem2 = createComboItem(bindMapMove(mock.MOCK_5LP), comboItem1)
	const comboItem3 = createComboItem(bindMapMove(mock.MOCK_236HK), comboItem2)

	expect(comboItem3.comboDamage).toBe(1100)
	expect(comboItem3.scale).toBeCloseTo(0.7, 2)
	expect(comboItem3.drive).toBe(2500)
	expect(comboItem3.superarts).toBe(1950)
})

test('should get the result with cancel drive rush', () => {
	const comboItem1 = createComboItem(bindMapMove(mock.MOCK_5MP))
	const comboItem2 = createComboItem(bindMapMove(mock.MOCK_RUSH), comboItem1)
	const comboItem3 = createComboItem(bindMapMove(mock.MOCK_2MP), comboItem2)

	expect(comboItem3.comboDamage).toBe(1110)
	expect(comboItem3.scale).toBeCloseTo(0.85, 2)
	expect(comboItem3.drive).toBe(1500)
	expect(comboItem3.superarts).toBe(1000)
})
