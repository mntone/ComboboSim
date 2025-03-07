import type { Selection } from '@react-types/shared'
import { useMemo, type DependencyList, type Key } from 'react'

function useSetToSingleValue<T, U extends Key>(
	next: ((val: T) => void) | undefined,
	map: (val: U | undefined) => T,
	deps: DependencyList,
): ((keys: Selection) => void) | undefined {
	const wrap = useMemo(function() {
		if (typeof next !== 'function') {
			return undefined
		}

		return function(keys: Selection) {
			if (import.meta.env.DEV && !(keys instanceof Set)) {
				console.log('Expected Set<string>, but got invalid type.')
			}

			const val0 = (keys as Set<U>).keys().next().value
			const val1 = map(val0)
			next(val1)
		}
	}, deps)
	return wrap
}

export {
	useSetToSingleValue,
}
