import parsePath from './parsePath'

test('should handle simple property name', () => {
	expect(parsePath('damage')).toEqual(['damage'])
})

test('should handle property name with upper character', () => {
	expect(parsePath('driveHit')).toEqual(['driveHit'])
})

test('should handle property name with indexer', () => {
	expect(parsePath('damage[2]')).toEqual(['damage', '[', '2', ']'])
})

test('should handle property name with member access', () => {
	expect(parsePath('names.en')).toEqual(['names', '.', 'en'])
})

test('should throw syntax error for invalid syntax', () => {
	expect(() => parsePath('damage[abc]'))
		.toThrowError('Unexpected token \'damage[abc]\' at column 8')  // invalid index
	expect(() => parsePath('invalid-path!!'))
		.toThrowError('Unexpected token \'invalid-path!!\' at column 8')  // invalid characters
})
