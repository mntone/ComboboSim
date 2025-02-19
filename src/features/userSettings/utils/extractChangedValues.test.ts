import { extractChangedValues } from './extractChangedValues'

test('should return an empty object when there are no changes', () => {
	const initial = { name: 'Alice', age: 25 }
	const modified = { name: 'Alice', age: 25 }
	expect(extractChangedValues(initial, modified)).toEqual({})
})

test('should return changed values for flat objects', () => {
	const initial = { name: 'Alice', age: 25 }
	const modified = { name: 'Alice', age: 30 }
	expect(extractChangedValues(initial, modified)).toEqual({ age: 30 })
})

test('should return changed values for nested objects', () => {
	const initial = { name: 'Alice', address: { city: 'New York', zip: '10001' } }
	const modified = { name: 'Alice', address: { city: 'Los Angeles', zip: '10001' } }
	expect(extractChangedValues(initial, modified)).toEqual({ address: { city: 'Los Angeles' } })
})

test('should return new properties added in modified object', () => {
	const initial = { name: 'Alice' }
	const modified = { name: 'Alice', age: 30 }
	expect(extractChangedValues(initial, modified)).toEqual({ age: 30 })
})

test('should handle null values correctly', () => {
	const initial = { name: 'Alice', age: 25 }
	const modified = { name: 'Alice', age: null }
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	expect(extractChangedValues(initial, modified as any)).toEqual({ age: null })
})

test('should return undefined if both initial and modified are null', () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	expect(extractChangedValues(null as any, null as any)).toEqual({})
})

test('should return modified object if initial is empty', () => {
	const initial = {}
	const modified = { name: 'Alice', age: 30 }
	expect(extractChangedValues(initial, modified)).toEqual(modified)
})
