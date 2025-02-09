import type { Character, CharacterSummary, Move, MoveCategoryType } from '@/common/types'

export type ParameterStateType =
	| 'ready'
	| 'loading'
	| 'complete'
	| 'failure'

export interface CharacterParameterState extends CharacterSummary {
	state: ParameterStateType
	param: Character | null
}

export interface ParameterState {
	characters: CharacterParameterState[]
	charactersById: { [key: string]: CharacterParameterState }
}

export interface MoveCategory {
	readonly id: MoveCategoryType
	readonly moves: readonly Move[]
}

export interface NormalizedMove {
	readonly moves: readonly Move[]
	readonly movesById: ReadonlyMap<string, Move>
	readonly movesByCategory: MoveCategory[]
}
