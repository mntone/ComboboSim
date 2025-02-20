import type { MoveNameDisplayModes } from '@/common/types'

import type { RootState } from '@/app/store'

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
