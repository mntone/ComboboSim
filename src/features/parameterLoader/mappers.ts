import type { Character, Move, MoveValues } from '@/common/types'

import { COMMON_MOVES, CONTEXT_PARAMS, DEFAULT_CONTEXT_PARAMS } from './constants'
import type { CharacterExtension, CharacterJson, MoveJson, ParameterContext } from './types'
import compileOverrides from './utils/compileOverrides'
import copyObjectPickedByNames from './utils/copyObjectPickedByNames'

function getContexts(ext: CharacterExtension[]): ParameterContext[] {
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
	const targetPropertyNames = [
		'damage',
		'damageAdditional',
		'damageInitial',
		'damageImmediate',
		'damageImmediateCancel',
		'damageScaleMin',
		'damageScaleCounter',
		'damageScalePunish',
		'driveHit',
		'driveBlock',
		'drivePunish',
		'superarts',
		'superartsPunish',
	]
	const baseValue: MoveValues = copyObjectPickedByNames(json, targetPropertyNames) as MoveValues

	let values: MoveValues[] | MoveValues
	if (typeof json.overrides !== 'undefined') {
		const fn = compileOverrides(json.overrides)
		values = contexts.map(function(context) {
			const value = Object.assign({}, baseValue)
			fn(value, context)
			return value
		})
	} else {
		values = baseValue
	}

	const move: Move = {
		id: json.id,
		names: json.names,
		category: json.category,
		input: json.input,
		inputModern: json.inputModern,
		inputModernAlt: json.inputModernAlt,
		values,
	}
	return move
}

function mapCharacter(json: CharacterJson): Character {
	const contexts = json.use ? getContexts(json.use) : DEFAULT_CONTEXT_PARAMS
	const bindMapMove = mapMove.bind(null, contexts)

	const moves = json.moves.map(bindMapMove)
	moves.push(...COMMON_MOVES)

	const character: Character = {
		id: json.id,
		names: json.names,
		vitality: json.vitality,
		moves,
	}
	return character as Character
}

export {
	mapMove,
	mapCharacter,
}
