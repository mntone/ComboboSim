import type { RootState } from '@/app/store'

import type { ComboItem } from './types'

function selectCharacterId(state: Pick<RootState, 'combo'>): string | null {
	return state.combo.characterId
}

function selectComboItems(state: Pick<RootState, 'combo'>): ComboItem[] {
	return state.combo.combos
}

function selectLastComboItem(state: Pick<RootState, 'combo'>): ComboItem | undefined {
	return state.combo.combos.at(-1)
}

function selectResult(state: Pick<RootState, 'combo'>) {
	const item = state.combo.combos.at(-1)
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
	selectCharacterId,
	selectComboItems,
	selectLastComboItem,
	selectResult,
}
