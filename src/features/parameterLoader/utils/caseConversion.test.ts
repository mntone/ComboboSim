import { snakeToCamel } from './caseConversion'

test('should convert snake_case to camelCase', () => {
	expect(snakeToCamel('hello_world')).toBe('helloWorld')
	expect(snakeToCamel('my_variable_name')).toBe('myVariableName')
})

test('should handle strings with only one word', () => {
	expect(snakeToCamel('hello')).toBe('hello')
})

test('should return an empty string if input is empty', () => {
	expect(snakeToCamel('')).toBe('')
})

test('should handle already camelCase strings', () => {
	expect(snakeToCamel('alreadyCamel')).toBe('alreadyCamel')
})
