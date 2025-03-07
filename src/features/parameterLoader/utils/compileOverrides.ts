import { isUpper } from '@/utils/text/utils'

import { parseCondition } from '../../../utils/text/parseCondition'
import { parsePath } from '../../../utils/text/parsePath'
import { DEFAULT_CONDITION_PARSER_OPTIONS } from '../constants'
import type { MoveOverride, MoveOverrideConditionFunctionType, MoveOverrides } from '../types'

function buildExpression([cond, overrides]: [string, MoveOverride]): string {
	const tokens = parseCondition(cond, DEFAULT_CONDITION_PARSER_OPTIONS)
	const expr = 'if('
		+ tokens.map(function(token) {
			return isUpper(token.charCodeAt(0)) ? 'c.' + token : token
		}).join('')
		+ '){'
		+ Object.entries(overrides).map(function([key, val]) {
			const pathTokens = parsePath(key)
			const valueStr = Array.isArray(val) ? `[${val.join(',')}]` : val
			return `m.${pathTokens.join('')}=${valueStr}`
		}).join(';')
		+ '}'
	return expr
}

/**
 * Parses and compiles a condition string into a reusable function.
 * Supports "==" and "!=" operators, logical AND (&&), OR (||), and parentheses.
 * Optimized for better token parsing and safer evaluation.
 */
function compileOverrides(overrides: MoveOverrides): MoveOverrideConditionFunctionType {
	// Build expression
	const expr = Object.entries(overrides).map(buildExpression).join('')

	// Compile function
	const func = new Function('m', 'c', expr) as MoveOverrideConditionFunctionType

	return func
}

export {
	compileOverrides,
}
