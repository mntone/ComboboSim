import { asMap, asReadonlyMap } from './asMap'

describe('asMap', () => {
	test('should return an empty Map when input is undefined', () => {
		const result = asMap(undefined)
		expect(result).toBeInstanceOf(Map)
		expect(result.size).toBe(0)
	})

	test('should return an empty Map when input is null', () => {
		const result = asMap(null)
		expect(result).toBeInstanceOf(Map)
		expect(result.size).toBe(0)
	})

	test('should convert array to Map using id as key', () => {
		const items = [
			{ id: 'a', value: 1 },
			{ id: 'b', value: 2 },
		]
		const result = asMap(items)
		expect(result.size).toBe(2)
		expect(result.get('a')).toEqual({ id: 'a', value: 1 })
		expect(result.get('b')).toEqual({ id: 'b', value: 2 })
	})

	test('should convert array of key-value tuples to Map', () => {
		const items: [string, number][] = [
			['a', 1],
			['b', 2],
		]
		const result = asMap(items)
		expect(result.size).toBe(2)
		expect(result.get('a')).toBe(1)
		expect(result.get('b')).toBe(2)
	})
})

describe('asReadonlyMap', () => {
	test('should return the predefined empty Map when input is undefined', () => {
		const result = asReadonlyMap(undefined)
		expect(result).toBeInstanceOf(Map)
		expect(result.size).toBe(0)
	})

	test('should return the predefined empty Map when input is null', () => {
		const result = asReadonlyMap(null)
		expect(result).toBeInstanceOf(Map)
		expect(result.size).toBe(0)
	})

	test('should convert array to ReadonlyMap using id as key', () => {
		const items = [
			{ id: 'x', value: 10 },
			{ id: 'y', value: 20 },
		]
		const result = asReadonlyMap(items)
		expect(result.size).toBe(2)
		expect(result.get('x')).toEqual({ id: 'x', value: 10 })
		expect(result.get('y')).toEqual({ id: 'y', value: 20 })
	})

	test('should convert array of key-value tuples to ReadonlyMap', () => {
		const items: [string, boolean][] = [
			['x', true],
			['y', false],
		]
		const result = asReadonlyMap(items)
		expect(result.size).toBe(2)
		expect(result.get('x')).toBe(true)
		expect(result.get('y')).toBe(false)
	})
})
