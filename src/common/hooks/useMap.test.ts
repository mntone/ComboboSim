import { renderHook } from '@testing-library/react'

import { useMap, useReadonlyMap } from './useMap'

describe('useMap', () => {
	test('should return an empty Map when input is undefined', () => {
		const { result } = renderHook(() => useMap(undefined))
		expect(result.current).toBeInstanceOf(Map)
		expect(result.current.size).toBe(0)
	})

	test('should return an empty Map when input is null', () => {
		const { result } = renderHook(() => useMap(null))
		expect(result.current).toBeInstanceOf(Map)
		expect(result.current.size).toBe(0)
	})

	test('should convert array to Map using id as key', () => {
		const items = [
			{ id: 'a', value: 1 },
			{ id: 'b', value: 2 },
		]
		const { result } = renderHook(() => useMap(items))
		expect(result.current.size).toBe(2)
		expect(result.current.get('a')).toEqual({ id: 'a', value: 1 })
		expect(result.current.get('b')).toEqual({ id: 'b', value: 2 })
	})

	test('should convert array of key-value tuples to Map', () => {
		const items: [string, number][] = [
			['a', 1],
			['b', 2],
		]

		const { result } = renderHook(() => useMap(items))
		expect(result.current.size).toBe(2)
		expect(result.current.get('a')).toBe(1)
		expect(result.current.get('b')).toBe(2)
	})
})

describe('useReadonlyMap', () => {
	test('should return the predefined empty Map when input is undefined', () => {
		const { result } = renderHook(() => useReadonlyMap(undefined))
		expect(result.current).toBeInstanceOf(Map)
		expect(result.current.size).toBe(0)
	})

	test('should return the predefined empty Map when input is null', () => {
		const { result } = renderHook(() => useReadonlyMap(null))
		expect(result.current).toBeInstanceOf(Map)
		expect(result.current.size).toBe(0)
	})

	test('should convert array to ReadonlyMap using id as key', () => {
		const items = [
			{ id: 'x', value: 10 },
			{ id: 'y', value: 20 },
		]
		const { result } = renderHook(() => useReadonlyMap(items))
		expect(result.current.size).toBe(2)
		expect(result.current.get('x')).toEqual({ id: 'x', value: 10 })
		expect(result.current.get('y')).toEqual({ id: 'y', value: 20 })
	})

	test('should convert array of key-value tuples to ReadonlyMap', () => {
		const items: [string, boolean][] = [
			['x', true],
			['y', false],
		]
		const { result } = renderHook(() => useReadonlyMap(items))
		expect(result.current.size).toBe(2)
		expect(result.current.get('x')).toBe(true)
		expect(result.current.get('y')).toBe(false)
	})
})
