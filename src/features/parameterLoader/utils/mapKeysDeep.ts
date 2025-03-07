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

export {
	mapKeysDeep,
}
