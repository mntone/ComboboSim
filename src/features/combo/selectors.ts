import { createSelector } from '@reduxjs/toolkit'

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

const selectResult = createSelector(
	selectLastComboItem,
	function(item: ComboItem | undefined) {
		if (item) {
			return {
				totalDamage: item.totalDamage,
				totalDrive: 0.0001 * item.totalDrive,
				totalSuper: 0.0001 * item.totalSuper,
			}
		} else {
			return {
				totalDamage: 0,
				totalDrive: 0,
				totalSuper: 0,
			}
		}
	},
)

export {
	selectCharacterId,
	selectComboItems,
	selectLastComboItem,
	selectResult,
}
