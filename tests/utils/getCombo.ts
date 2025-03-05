import type { PushComboData } from '@/features/combo/types'
import { DEFAULT_CONTEXT_PARAMS } from '@/features/parameterLoader/constants'
import { mapMove } from '@/features/parameterLoader/mappers'
import type { MoveJson } from '@/features/parameterLoader/types'

const getCombo = (moveJson: MoveJson): PushComboData => {
	const move = mapMove(DEFAULT_CONTEXT_PARAMS, moveJson)
	return {
		hitType: 'normal',
		inputType: 'meaty',
		offset: 0,
		move,
	}
}

export {
	getCombo,
}
