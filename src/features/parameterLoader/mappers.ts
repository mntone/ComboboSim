import type { Character, Move } from '@/common/types'

import { CONTEXT_PARAMS, DEFAULT_CONTEXT_PARAMS } from './constants'
import type { CharacterExtension, CharacterJson, MoveJson, ParameterContext } from './types'

function getContexts(ext?: CharacterExtension[]): ParameterContext[] {
	if (typeof ext === 'undefined' || ext.length === 0) {
		return DEFAULT_CONTEXT_PARAMS
	}

	const contexts: Partial<ParameterContext>[][] = [
		DEFAULT_CONTEXT_PARAMS,
		...ext.map(function(name) {
			return CONTEXT_PARAMS[name]
		}),
	]

	const result: ParameterContext[] = []

	function combine(curContext: Partial<ParameterContext>, depth: number) {
		if (depth === contexts.length) {
			result.push(curContext as ParameterContext)
			return
		}

		for (const context of contexts[depth]) {
			const newContext = Object.assign({}, curContext, context)
			combine(newContext, depth + 1)
		}
	}

	combine({}, 0)
	return result
}

function mapMove(contexts: ParameterContext[], json: MoveJson): Move {
	void contexts

	// let values: MoveValues[] | MoveValues
	// if (typeof json.overrides !== 'undefined') {
	// 	const fn = compileOverrides(json.overrides)
	// 	values = contexts.map(function(context) {
	// 		const value = Object.assign({}, baseValue)
	// 		fn(value, context)
	// 		return value
	// 	})
	// } else {
	// 	values = baseValue
	// }

	return json
}

function mapCharacter(json: CharacterJson): Character {
	// const contexts = getContexts(json.use)

	const character: Character = {
		id: json.id,
		names: json.names,
		vitality: json.vitality,
		moves: json.moves,
	}
	return character as Character
}

export {
	getContexts,

	mapMove,
	mapCharacter,
}
