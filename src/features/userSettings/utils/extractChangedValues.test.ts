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

test('should detect array changes', () => {
	const initial = { scores: [100, 90, 80] }
	const modified = { scores: [100, 95, 80] }
	expect(extractChangedValues(initial, modified)).toEqual({ scores: [100, 95, 80] })
})

test('should return the entire array if it differs in any element', () => {
	const initial = { scores: [100, 90, 80] }
	const modified = { scores: [100, 90, 85] }
	expect(extractChangedValues(initial, modified)).toEqual({ scores: [100, 90, 85] })
})

test('should return the entire array if the length differs', () => {
	const initial = { scores: [100, 90, 80] }
	const modified = { scores: [100, 90] }
	expect(extractChangedValues(initial, modified)).toEqual({ scores: [100, 90] })
})

test('should detect newly added properties', () => {
	const initial = { a: 1 }
	const modified = { a: 1, b: 2 }
	expect(extractChangedValues(initial, modified)).toEqual({ b: 2 })
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
