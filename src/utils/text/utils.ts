import { SYNTAX_ERROR_UNEXPECTED_TOKEN } from './constants'

function getSyntaxError(expr: string, pos: number): SyntaxError {
	const message = SYNTAX_ERROR_UNEXPECTED_TOKEN
		.replace('{expr}', expr)
		.replace('{col}', (pos + 1).toString())
	return new SyntaxError(message)
}

function isDecimal(code: number): boolean {
	return 48 /* 0 */ <= code && code <= 57 /* 9 */
}

function isLower(code: number): boolean {
	return 97 /* a */ <= code && code <= 122 /* z */
}

function isLowerAndUnderscore(code: number): boolean {
	return isLower(code) || code === 95
}

function isUpper(code: number): boolean {
	return 65 /* A */ <= code && code <= 90 /* Z */
}

function isUpperAndUnderscore(code: number): boolean {
	return isUpper(code) || code === 95
}

function isLetter(code: number): boolean {
	return isUpper(code) || isLower(code)
}

export {
	getSyntaxError,

	isDecimal,
	isLower,
	isLowerAndUnderscore,
	isUpper,
	isUpperAndUnderscore,

	isLetter,
}
