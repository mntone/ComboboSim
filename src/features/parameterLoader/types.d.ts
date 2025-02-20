import type { Character, CharacterNames, CharacterSummary, Move, MoveCategoryType, MoveNames, MoveValues } from '@/common/types'

export type MoveOverride = Record<string, number[] | number>

export type MoveOverrides = { [cond: string]: MoveOverride }

export interface MoveJson extends MoveValues {
	id: string
	names?: MoveNames
	category: MoveCategoryType
	dependency?: string
	input: string
	inputModern?: string
	inputModernAlt?: string
	overrides?: MoveOverrides
}

export type CharacterExtension =
	| 'manon_medal'

export interface CharacterJson {
	id: string
	names: CharacterNames
	use?: CharacterExtension[]
	vitality: number
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

export interface CharacterParameterState extends CharacterSummary {
	state: ParameterStateType
	param: Character | null
}

export interface MoveCategory {
	id: MoveCategoryType
	moves: Move[]
}

export interface NormalizedMove {
	readonly movesById: ReadonlyMap<string, Move>
	readonly movesByCategory: readonly MoveCategory[]
}

export type MoveOverrideConditionFunctionType = (item: MoveValues, ctx: ParameterContext) => void
