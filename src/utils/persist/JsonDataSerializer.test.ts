import { JsonDataSerializer } from './JsonDataSerializer'

describe('serialize', () => {
	test('should serialize an object to a JSON string', () => {
		const data = { key: 'value', num: 42 }
		expect(JsonDataSerializer.serialize(data)).toBe(JSON.stringify(data))
	})

	test('should return null when input is undefined', () => {
		expect(JsonDataSerializer.serialize(undefined)).toBeNull()
	})
})

describe('deserialize', () => {
	test('should deserialize a JSON string to an object', () => {
		const json = '{"key":"value","num":42}'
		expect(JsonDataSerializer.deserialize(json)).toEqual(JSON.parse(json))
	})

	test('should return undefined when input is null', () => {
		expect(JsonDataSerializer.deserialize(null)).toBeUndefined()
	})
})
