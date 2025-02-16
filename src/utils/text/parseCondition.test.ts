import parseCondition from './parseCondition'
import type { CONDITION_PARSER_OPTIONS } from './types'
import { isUpperAndUnderscore } from './utils'

const options: CONDITION_PARSER_OPTIONS = {
	isKeyCharacter: isUpperAndUnderscore,
}

test('should handle simple variable name', () => {
	expect(parseCondition('CA', options)).toEqual(['CA'])
})

test('should handle variable with operator and number', () => {
	expect(parseCondition('POINT==5', options)).toEqual(['POINT', '===', '5'])
	expect(parseCondition('POINT == 5', options)).toEqual(['POINT', '===', '5'])
	expect(parseCondition('FRAME<5', options)).toEqual(['FRAME', '<', '5'])
	expect(parseCondition('FRAME<=5', options)).toEqual(['FRAME', '<=', '5'])
	expect(parseCondition('FRAME>5', options)).toEqual(['FRAME', '>', '5'])
	expect(parseCondition('FRAME>=5', options)).toEqual(['FRAME', '>=', '5'])
})

test('should handle complex condition with multiple operators', () => {
	expect(parseCondition('CA&&POINT==5', options))
		.toEqual(['CA', '&&', 'POINT', '===', '5'])
	expect(parseCondition('CA && POINT == 5', options))
		.toEqual(['CA', '&&', 'POINT', '===', '5'])
})

test('should throw syntax error for invalid syntax', () => {
	expect(() => parseCondition('CA &&', options))
		.toThrowError('Unexpected token \'CA &&\' at column 6')  // missing next condition
	expect(() => parseCondition('&& POINT == 5', options))
		.toThrowError('Unexpected token \'&& POINT == 5\' at column 1')  // missing previous condition
	expect(() => parseCondition('CA ==', options))
		.toThrowError('Unexpected token \'CA ==\' at column 6')  // missing right operand
	expect(() => parseCondition('== 5', options))
		.toThrowError('Unexpected token \'== 5\' at column 1')  // missing left operand
	expect(() => parseCondition('POINT @ 5', options))
		.toThrowError('Unexpected token \'POINT @ 5\' at column 7')  // invalid operator
})
