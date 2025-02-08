import type { ReadonlyDeep } from 'type-fest'

import type { Move } from '@/common/types'

import type { MoveNameDisplayMode } from './types'

function getBaseMoveName(move: ReadonlyDeep<Move>, locale?: string): string | undefined {
	return move.names
		? locale === 'ja'
			? move.names.ja
			: move.names.en
		: undefined
}

function getPreferredMoveName(
	move: ReadonlyDeep<Move>,
	displayMode: MoveNameDisplayMode,
	locale?: string,
	res?: Record<string, string> | null,
) {
	switch (displayMode) {
	case 'moveonly': {
		if (res == null) {
			return move.id
		}

		const moveName = res[`cmd_${move.input}`]
		return moveName
	}
	case 'movepriority': {
		if (res == null) {
			return move.id
		}

		const moveName = res[`cmd_${move.input}`]
		const name = getBaseMoveName(move, locale)
		return name ? `${moveName} (${name})` : moveName
	}
	case 'nameonly': {
		const name = getBaseMoveName(move, locale)
		return name
	}
	case 'namepriority': {
		const name = getBaseMoveName(move, locale)
		if (res == null) {
			return name
		}

		const moveName = res[`cmd_${move.input}`]
		return `${name} (${moveName})`
	}
	}
}

export {
	getBaseMoveName,
	getPreferredMoveName,
}
