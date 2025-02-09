import { createListenerMiddleware, type UnknownAction } from '@reduxjs/toolkit'

import { setCharacterId } from '@/features/combo/slice'
import { fetchParam } from '@/features/parameterLoader/slice'

import type { RootState } from '../store'

const characterIdChangeMiddleware = createListenerMiddleware()

characterIdChangeMiddleware.startListening({
	actionCreator: setCharacterId,
	effect: async function(_, listener) {
		const prevState = listener.getOriginalState() as RootState
		const nextState = listener.getState() as RootState

		const newCharacterId = nextState.combo.characterId
		if (newCharacterId !== null
			&& prevState.combo.characterId !== nextState.combo.characterId) {
			listener.dispatch(fetchParam(newCharacterId) as unknown as UnknownAction)
		}
	},
})

export default characterIdChangeMiddleware
