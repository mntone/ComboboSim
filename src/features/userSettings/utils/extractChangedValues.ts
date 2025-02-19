/* eslint-disable @typescript-eslint/no-explicit-any */

function extractChangedValues<T extends Record<string, any>>(initial: T, modified: T): Partial<T> {
	function deepDiff(objA: any, objB: any): any {
		if (objA === objB) {
			return undefined
		}
		if (typeof objA !== 'object' || typeof objB !== 'object' || objA === null || objB === null) {
			return objB
		}

		const diff: Record<string, any> = {}
		let hasChanges = false
		for (const key in objB) {
			if (!Object.prototype.hasOwnProperty.call(objA, key)) {
				diff[key] = objB[key]
				hasChanges = true
			} else {
				const valueDiff = deepDiff(objA[key], objB[key])
				if (valueDiff !== undefined) {
					diff[key] = valueDiff
					hasChanges = true
				}
			}
		}
		return hasChanges ? diff : undefined
	}

	return deepDiff(initial, modified) || {}
}

export {
	extractChangedValues,
}
