import { getSyntaxError, isDecimal, isLower } from './utils'

/**
 * Parse a path string into tokens.
 *
 * Supports indexer operator ([]) and member access expression (.).
 */
function parsePath(path: string): string[] {
	const tokens: string[] = []

	let buffer: string = ''
	let indexer = false
	let upper = false
	for (let i = 0; i < path.length; ++i) {
		const code = path.charCodeAt(i)
		if (indexer) {
			// Parse indexer (e.g., [4])
			if (code === 93 /* ] */) {
				if (buffer === '') {
					throw getSyntaxError(path, i)
				}

				tokens.push(buffer, ']')
				buffer = ''
				indexer = false
			} else if (isDecimal(code)) {
				buffer += path[i]
			} else {
				throw getSyntaxError(path, i)
			}
		} else {
			if (isLower(code)) {
				if (upper) {
					upper = false
					buffer += path[i].toUpperCase()
				} else {
					buffer += path[i]
				}
			} else if (i !== 0) {
				if (code === 46 /* . */) {
					if (i === 0) {
						throw getSyntaxError(path, i)
					}

					if (buffer !== '') {
						tokens.push(buffer, '.')
						buffer = ''
					} else {
						tokens.push('.')
					}
				} else if (code === 91 /* [ */) {
					if (buffer === '') {
						throw getSyntaxError(path, i)
					}

					tokens.push(buffer, '[')
					buffer = ''
					indexer = true
				} else if (code === 95 /* _ */) {
					upper = true
				} else {
					throw getSyntaxError(path, i)
				}
			} else {
				throw getSyntaxError(path, i)
			}
		}
	}
	if (buffer !== '') tokens.push(buffer)

	return tokens
}

export {
	parsePath,
}
