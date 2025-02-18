import type { Move } from '@/common/types'

import type { CONDITION_PARSER_OPTIONS } from '@/utils/text/types'
import { isUpperAndUnderscore } from '@/utils/text/utils'

import type { ParameterContext } from './types'

const PARAMETERLOADER_NAME = 'param'

const DEFAULT_CONDITION_PARSER_OPTIONS: CONDITION_PARSER_OPTIONS = {
	isKeyCharacter: isUpperAndUnderscore,
} as const

const DEFAULT_CONTEXT_PARAMS: ParameterContext[] = [
	{ CA: false },
	{ CA: true },
]

const CONTEXT_PARAMS: { [key: string]: Partial<ParameterContext>[] } = {
	manon_medal: [
		{ MANON_MEDAL: 1 },
		{ MANON_MEDAL: 2 },
		{ MANON_MEDAL: 3 },
		{ MANON_MEDAL: 4 },
		{ MANON_MEDAL: 5 },
	],
}

const COMMON_MOVES: Move[] = [
	{
		id: 'common.656MM',
		category: 'common',
		input: '656MM',
		inputModern: '656DP',
		values: {
			damage: 0,
			driveHit: 0,
			driveBlock: 0,
			drivePunish: 0,
			superarts: 0,
		},
	},
	{
		id: 'common.656',
		category: 'common',
		input: '656',
		inputModern: '656',
		values: {
			damage: 0,
			driveHit: 0,
			driveBlock: 0,
			drivePunish: 0,
			superarts: 0,
		},
	},
]

export {
	PARAMETERLOADER_NAME,

	DEFAULT_CONDITION_PARSER_OPTIONS,

	DEFAULT_CONTEXT_PARAMS,
	CONTEXT_PARAMS,

	COMMON_MOVES,
}
