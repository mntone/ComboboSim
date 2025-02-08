import type { Character, Move, MoveCategoryType } from '@/common/types'

export type MoveStateType =
	| 'loading'
	| 'complete'
	| 'failure'

export interface CharacterState {
	state: MoveStateType
	data: Character | null
}

export interface MoveItem {
	readonly id: string
	readonly data: Move
}

export interface CategoryItem {
	readonly id: MoveCategoryType
	readonly moves: MoveItem[]
}
