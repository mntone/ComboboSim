import { getCombo } from '@/tests/utils/getCombo'
import * as mock from '@/tests/utils/mockData'

import type { ComboItem } from './types'
import { createComboItem } from './utils'

test('should get the result with low attack', () => {
	const combos: ComboItem[] = []
	combos.push(createComboItem(getCombo(mock.MOCK_5LP), combos))
	combos.push(createComboItem(getCombo(mock.MOCK_5LP), combos))

	const comboItem3 = createComboItem(getCombo(mock.MOCK_236HK), combos)
	combos.push(comboItem3)

	expect(comboItem3.scale).toBeCloseTo(0.7, 2)
	expect(comboItem3.totalDamage).toBe(1100)
	expect(comboItem3.totalDrive).toBe(2500)
	expect(comboItem3.totalSuper).toBe(1950)
})

test('should get the result with cancel drive rush', () => {
	const combos: ComboItem[] = []
	combos.push(createComboItem(getCombo(mock.MOCK_5MP), combos))
	combos.push(createComboItem(getCombo(mock.MOCK_RUSH), combos))

	const comboItem3 = createComboItem(getCombo(mock.MOCK_2MP), combos)
	combos.push(comboItem3)

	expect(comboItem3.scale).toBeCloseTo(0.85, 2)
	expect(comboItem3.totalDamage).toBe(1110)
	expect(comboItem3.totalDrive).toBe(1500)
	expect(comboItem3.totalSuper).toBe(1000)
})
