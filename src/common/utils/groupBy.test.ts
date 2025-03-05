import { groupBy } from './groupBy'

test('should return an empty array when given an empty array', () => {
	const result = groupBy([], () => {
		throw new Error('Invalid call')
	})
	expect(result).toEqual([])
})

test('should group items by a given key', () => {
	const items = [
		{ id: 1, category: 'A' },
		{ id: 2, category: 'B' },
		{ id: 3, category: 'A' },
		{ id: 4, category: 'B' },
		{ id: 5, category: 'C' },
	]

	const result = groupBy(items, item => item.category)
	expect(result).toEqual([
		{
			id: 'A',
			items: [
				{ id: 1, category: 'A' },
				{ id: 3, category: 'A' },
			],
		},
		{
			id: 'B',
			items: [
				{ id: 2, category: 'B' },
				{ id: 4, category: 'B' },
			],
		},
		{
			id: 'C',
			items: [
				{ id: 5, category: 'C' },
			],
		},
	])
})

test('should handle non-string group keys', () => {
	const items = [
		{ id: 1, group: 10 },
		{ id: 2, group: 20 },
		{ id: 3, group: 10 },
	]

	const result = groupBy(items, item => item.group.toString())
	expect(result).toEqual([
		{
			id: '10',
			items: [
				{ id: 1, group: 10 },
				{ id: 3, group: 10 },
			],
		},
		{
			id: '20',
			items: [
				{ id: 2, group: 20 },
			],
		},
	])
})
