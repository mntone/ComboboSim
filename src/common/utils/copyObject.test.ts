import { copyObjectPickedByNames, copyObjectOmittedByNames } from './copyObject'

describe('copyObjectPickedByNames', () => {
	test('should return an empty object when given an empty object', () => {
		expect(copyObjectPickedByNames({}, ['a', 'b'])).toEqual({})
	})

	test('should return an object with only the specified keys', () => {
		const obj = { a: 1, b: 2, c: 3 }
		expect(copyObjectPickedByNames(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 })
	})

	test('should return an empty object if no keys match', () => {
		const obj = { a: 1, b: 2 }
		expect(copyObjectPickedByNames(obj, ['x', 'y'])).toEqual({})
	})
})

describe('copyObjectOmittedByNames', () => {
	test('should return an empty object when given an empty object', () => {
		expect(copyObjectOmittedByNames({}, ['a', 'b'])).toEqual({})
	})

	test('should return an object without the specified keys', () => {
		const obj = { a: 1, b: 2, c: 3 }
		expect(copyObjectOmittedByNames(obj, ['a', 'c'])).toEqual({ b: 2 })
	})

	test('should return the same object if no keys match', () => {
		const obj = { a: 1, b: 2 }
		expect(copyObjectOmittedByNames(obj, ['x', 'y'])).toEqual({ a: 1, b: 2 })
	})
})
