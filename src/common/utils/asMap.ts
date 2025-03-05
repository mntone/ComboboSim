const emptyMap = new Map()

function asMap<T extends { id: string }>(items: T[] | undefined): Map<string, T>
function asMap<T>(items: [string, T][] | undefined): Map<string, T>
function asMap<T>(items: [string, T][] | { readonly id: string }[] | undefined): Map<string, T> {
	if (typeof items !== 'undefined' && items.length !== 0) {
		if (Array.isArray(items[0])) {
			const byId = new Map(items as [string, T][])
			return byId
		} else {
			const byId = new Map(items.map(function(item) {
				return [(item as { id: string }).id, item as T]
			}))
			return byId
		}
	}
	return new Map()
}

function asReadonlyMap<T extends { readonly id: string }>(items: T[] | undefined): ReadonlyMap<string, T>
function asReadonlyMap<T>(items: (readonly [string, T])[] | undefined): ReadonlyMap<string, T>
function asReadonlyMap<T>(items: (readonly [string, T])[] | { readonly id: string }[] | undefined): ReadonlyMap<string, T> {
	if (typeof items !== 'undefined' && items.length !== 0) {
		if (Array.isArray(items[0])) {
			const byId = new Map(items as (readonly [string, T])[])
			return byId
		} else {
			const byId = new Map(items.map(function(item) {
				return [(item as { readonly id: string }).id, item as T]
			}))
			return byId
		}
	}
	return emptyMap
}

export {
	asMap,
	asReadonlyMap,
}
