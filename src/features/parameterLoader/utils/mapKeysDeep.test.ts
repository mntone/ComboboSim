import { snakeToCamel } from './caseConversion'
import mapKeysDeep from './mapKeysDeep'

test('should map all keys in a flat object', () => {
	const obj = { snake_case_key: 'value' }
	const result = mapKeysDeep(obj, snakeToCamel)
	expect(result).toEqual({ snakeCaseKey: 'value' })
})

test('should map keys in a nested object', () => {
	const obj = { snake_case_key: { another_snake_case: 'value' } }
	const result = mapKeysDeep(obj, snakeToCamel)
	expect(result).toEqual({ snakeCaseKey: { anotherSnakeCase: 'value' } })
})

test('should return an empty object if input is empty', () => {
	const result = mapKeysDeep({}, snakeToCamel)
	expect(result).toEqual({})
})

test('should handle arrays of objects', () => {
	const obj = [{ snake_case_key: 'value' }, { another_snake_case: 'value2' }]
	const result = mapKeysDeep(obj, snakeToCamel)
	expect(result).toEqual([{ snakeCaseKey: 'value' }, { anotherSnakeCase: 'value2' }])
})
