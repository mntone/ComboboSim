/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { MOCK_MOVE_SPECIAL } from '@/tests/utils/mockData'

import type { MoveJson, MoveOverrides, ParameterContext } from '../types'

import { compileOverrides } from './compileOverrides'

test('should correctly apply overrides based on conditions', () => {
	const compiledFn = compileOverrides(MOCK_MOVE_SPECIAL.overrides!)
	expect(compiledFn).not.toBeNull()

	const move: MoveJson = Object.assign({}, MOCK_MOVE_SPECIAL)
	compiledFn!(move, { JIM_POINT: 2 } as unknown as ParameterContext)
	expect(move.totalFrames).toBe(155)
	expect(move.hits![1].damage).toBe(1450)

	// Reset for next test
	move.totalFrames = 155
	move.hits![1].damage = 1300
	compiledFn!(move, { JIM_POINT: 3 } as unknown as ParameterContext)
	expect(move.totalFrames).toBe(201)
	expect(move.hits![1].damage).toBe(1600)
	expect(move.hits![1].superHit).toBe(3150)
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
