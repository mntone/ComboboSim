import type { RootState } from '@/app/store'
import type { MoveNameDisplayModes } from '@/components/MoveLabel/types'

function selectMoveNameDisplayModes(state: Pick<RootState, 'settings'>): MoveNameDisplayModes {
	return state.settings.moveNameDisplayMode
}

export {
	selectMoveNameDisplayModes,
}
