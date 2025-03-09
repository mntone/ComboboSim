import type { MessageDescriptor } from '@lingui/core'

import type { Character, Move, MoveValues } from '@/common/types'
export type MoveOverride = Record<string, number[] | number>

export type MoveOverrides = { [cond: string]: MoveOverride }

export interface MoveJson extends Move {
	overrides?: MoveOverrides
}

export type CharacterExtension =
	| 'manon_medal'

export interface CharacterJson extends Exclude<Character, 'moves'> {
	version?: number
	use?: CharacterExtension[]
	moves: MoveJson[]
}

export interface ParameterContext {
	CA: boolean
	MANON_MEDAL?: number
}

export type ParameterStateType =
	| 'ready'
	| 'loading'
	| 'complete'
	| 'failure'

export interface CharacterParameterState {
	id: string
	name: MessageDescriptor
	state: ParameterStateType
	param: Character | null
}

export type MoveOverrideConditionFunctionType = (item: MoveValues, ctx: ParameterContext) => void
