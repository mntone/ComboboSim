import { t } from '@lingui/core/macro'
import type { ReadonlyDeep } from 'type-fest'

import type { Move, MoveNameDisplayMode, MoveNameDisplayModes } from '@/common/types'

function getBaseMoveName(move: ReadonlyDeep<Move>, locale?: string): string | undefined {
	return move.names && locale
		? move.names[locale] ?? move.names.en
		: undefined
}

function getPreferredMoveName(
	displayModes: MoveNameDisplayModes,
	locale?: string,
	res?: Record<string, string> | null,
	move?: ReadonlyDeep<Move> | undefined,
): string | undefined {
	if (move == null) {
		return undefined
	}

	const displayMode: MoveNameDisplayMode = move.category === 'common'
		? 'movepriority'
		: displayModes[move.category]
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
		return name ? t`${moveName}: ${name}` : moveName
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
		return name ? t`${name} (${moveName})` : moveName
	}
	}
}

export {
	getPreferredMoveName,
}
