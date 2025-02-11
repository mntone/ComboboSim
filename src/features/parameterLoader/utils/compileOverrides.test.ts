/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { MoveValues } from '@/common/types'

import { MOCK_MOVE_SPECIAL } from '@/mocks/mockData.test'

import type { MoveOverrides, ParameterContext } from '../types'

import compileOverrides from './compileOverrides'

test('should correctly apply overrides based on conditions', () => {
	const compiledFn = compileOverrides(MOCK_MOVE_SPECIAL.overrides!)
	expect(compiledFn).not.toBeNull()

	const move: MoveValues = Object.assign({}, MOCK_MOVE_SPECIAL)
	if (Array.isArray(move.damage)) {
		compiledFn!(move, { JIM_POINT: 2 } as unknown as ParameterContext)
		expect(move.damage[1]).toBe(1450)

		move.damage[1] = 1300 // Reset for next test
		compiledFn!(move, { JIM_POINT: 3 } as unknown as ParameterContext)
		expect(move.damage[1]).toBe(1600)
		expect(move.superarts).toBe(3150)
	}
})

test('should throw syntax error for invalid syntax', () => {
	const invalidConditionOverrides: MoveOverrides = {
		'INVALID_CONDITION!!': {
			'damage[1]': 1000,
		},
	}
	expect(() => compileOverrides(invalidConditionOverrides))
		.toThrowError('Unexpected token \'INVALID_CONDITION!!\' at column 18')

	const invalidPathOverrides: MoveOverrides = {
		CA: {
			'invalid-path!!': 1000,
		},
	}
	expect(() => compileOverrides(invalidPathOverrides))
		.toThrowError('Unexpected token \'invalid-path!!\' at column 8')
})
