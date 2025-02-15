import { createEntityAdapter } from '@reduxjs/toolkit'

import type { CharacterParameterState } from './types'

const parameterLoaderAdapter = createEntityAdapter({
	selectId: function(character: CharacterParameterState) {
		return character.id
	},
})

export {
	parameterLoaderAdapter,
}
