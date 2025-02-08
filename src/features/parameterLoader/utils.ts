function mapKeysDeep(obj: unknown, mapper: (key: string) => string): unknown {
	if (Array.isArray(obj)) {
		return obj.map(function(item) {
			return mapKeysDeep(item, mapper)
		})
	}

	if (obj !== null && typeof obj === 'object') {
		const entries = Object.entries(obj) as [string, unknown][]
		const transformedEntries = entries.map(function([key, value]) {
			return [
				mapper(key),
				mapKeysDeep(value, mapper),
			]
		})
		return Object.fromEntries(transformedEntries) as unknown
	}

	return obj
}

function snakeToCamel(key: string): string {
	let result = ''
	let toUpper = false
	for (let i = 0; i < key.length; i++) {
		const char = key[i]
		if (char === '_') {
			toUpper = true
		} else if (toUpper) {
			result += char.toUpperCase()
			toUpper = false
		} else {
			result += char
		}
	}
	return result
}

export {
	mapKeysDeep,
	snakeToCamel,
}
