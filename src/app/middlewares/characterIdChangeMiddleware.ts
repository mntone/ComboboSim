import { createListenerMiddleware, type UnknownAction } from '@reduxjs/toolkit'

import { setCharacterId } from '@/features/combo/slice'
import { fetchParam } from '@/features/parameterLoader/slice'

import type { RootState } from '../store'

const characterIdChangeMiddleware = createListenerMiddleware()

characterIdChangeMiddleware.startListening({
	predicate(action, currentState, originalState) {
		return setCharacterId.match(action)
			&& (currentState as RootState).combo.characterId != null
			&& (currentState as RootState).combo.characterId !== (originalState as RootState).combo.characterId
	},
	async effect(_, listener) {
		const nextState = listener.getState() as RootState
		const newCharacterId = nextState.combo.characterId as string
		listener.dispatch(fetchParam(newCharacterId) as unknown as UnknownAction)
	},
})

export {
	characterIdChangeMiddleware,
}
