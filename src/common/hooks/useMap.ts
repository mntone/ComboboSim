import { useMemo } from 'react'

import { asMap, asReadonlyMap } from '../utils/asMap'

function useMap<T extends { id: string }>(items: T[] | null | undefined): Map<string, T>
function useMap<T>(items: [string, T][] | null | undefined): Map<string, T>
function useMap<T>(items: [string, T][] | { readonly id: string }[] | null | undefined): Map<string, T> {
	const map = useMemo(function() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return asMap(items as any) as Map<string, T>
	}, [items])
	return map
}

function useReadonlyMap<T extends { readonly id: string }>(items: T[] | null | undefined): ReadonlyMap<string, T>
function useReadonlyMap<T>(items: (readonly [string, T])[] | null | undefined): ReadonlyMap<string, T>
function useReadonlyMap<T>(items: (readonly [string, T])[] | T[] | null | undefined): ReadonlyMap<string, T> {
	const map = useMemo(function() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return asReadonlyMap(items as any) as ReadonlyMap<string, T>
	}, [items])
	return map
}

export {
	useMap,
	useReadonlyMap,
}
