import type { CONDITION_PARSER_OPTIONS } from './types'
import { getSyntaxError, isDecimal } from './utils'

const MODE_VARIABLE_FIRST = -1
const MODE_VARIABLE = 0
const MODE_DECIMAL = 1

/**
 * Parse a condition string into tokens.
 *
 * Supports "==" and "!=" operators, logical AND (&&), OR (||), and parentheses.
 */
function parseCondition(cond: string, options: CONDITION_PARSER_OPTIONS): string[] {
	const tokens: string[] = []

	let buffer: string = ''
	let mode = MODE_VARIABLE_FIRST
	for (let i = 0; i < cond.length; ++i) {
		const code = cond.charCodeAt(i)

		if (code === 32 /* space */) {
			if (buffer !== '') tokens.push(buffer)
			buffer = ''
		} else if (mode !== MODE_VARIABLE_FIRST && (code === 61 /* = */ || code === 33 /* ! */)) {
			if (buffer !== '') tokens.push(buffer)
			buffer = ''

			if (cond[i + 1] !== '=') {
				throw getSyntaxError(cond, i)
			}

			tokens.push(cond[i] + '==')
			mode = MODE_DECIMAL
			++i
		} else if (mode !== MODE_VARIABLE_FIRST && (code === 60 /* < */ || code === 62 /* > */)) {
			if (buffer !== '') tokens.push(buffer)
			buffer = ''

			if (cond[i + 1] === '=') {
				tokens.push(cond[i] + '=')
				mode = MODE_DECIMAL
				++i
			} else {
				tokens.push(cond[i])
				mode = MODE_DECIMAL
			}
		} else if (mode !== MODE_VARIABLE_FIRST && (code === 38 /* & */ || code === 124 /* | */)) {
			if (buffer !== '') tokens.push(buffer)
			buffer = ''

			const char = cond[i]
			if (cond[i + 1] !== char) {
				throw getSyntaxError(cond, i)
			}

			tokens.push(char + char)
			mode = MODE_VARIABLE_FIRST
			++i
		} else {
			switch (mode) {
			// @ts-expect-error Require fallthrough
			case MODE_VARIABLE_FIRST:
				mode = MODE_VARIABLE
			// eslint-disable-next-line no-fallthrough
			case MODE_VARIABLE:
				if (!options.isKeyCharacter(code)) {
					throw getSyntaxError(cond, i)
				}
				buffer += cond[i]
				break
			case MODE_DECIMAL:
				if (!isDecimal(code)) {
					throw getSyntaxError(cond, i)
				}
				buffer += cond[i]
				break
			}
		}
	}

	if (mode !== MODE_VARIABLE && buffer === '') {
		throw getSyntaxError(cond, cond.length)
	}

	if (buffer !== '') tokens.push(buffer)

	return tokens
}

export {
	parseCondition,
}
