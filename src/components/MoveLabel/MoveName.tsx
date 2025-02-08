import type { ReadonlyDeep } from 'type-fest'

import type { MoveNameDisplayMode, MoveNameProps } from './types'
import { getPreferredMoveName } from './utils'

function MoveName({ displayModes, locale, move, res }: ReadonlyDeep<MoveNameProps>) {
	if (move === undefined) {
		return ''
	}

	const displayMode: MoveNameDisplayMode = move.category === 'common'
		? 'movepriority'
		: displayModes[move.category]
	return getPreferredMoveName(move, displayMode, locale, res)
}

export default MoveName
