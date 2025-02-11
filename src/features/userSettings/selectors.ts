import type { RootState } from '@/app/store'
import type { MoveNameDisplayModes } from '@/components/MoveLabel/types'

function selectComboTableColumns(state: Pick<RootState, 'settings'>) {
	return state.settings.comboTableColumns
}

function selectMoveNameDisplayModes(state: Pick<RootState, 'settings'>): MoveNameDisplayModes {
	return state.settings.moveNameDisplayMode
}

export {
	selectComboTableColumns,
	selectMoveNameDisplayModes,
}
