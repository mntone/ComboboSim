import type { RootState } from '@/app/store'

import type { DynamicResource } from './types'

function selectDynamicResource(state: Pick<RootState, 'res'>): DynamicResource | null {
	return state.res.res
}

export {
	selectDynamicResource,
}
