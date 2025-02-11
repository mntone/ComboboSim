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

export {
	PARAMETERLOADER_NAME,

	DEFAULT_CONDITION_PARSER_OPTIONS,

	DEFAULT_CONTEXT_PARAMS,
	CONTEXT_PARAMS,
}
