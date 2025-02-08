import type { RootState } from '@/app/store'

import type { ComboItem } from './types'

function selectComboItems(state: Pick<RootState, 'combo'>): ComboItem[] {
	return state.combo.items
}

function selectResult(state: Pick<RootState, 'combo'>) {
	const item = state.combo.items.at(-1)
	if (item) {
		return {
			comboDamage: item.comboDamage,
			drive: 0.0001 * item.drive,
			superarts: 0.0001 * item.superarts,
		}
	} else {
		return {
			comboDamage: 0,
			drive: 0,
			superarts: 0,
		}
	}
}

export {
	selectComboItems,
	selectResult,
}
