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
	snakeToCamel,
}
