export interface MoveNames {
	en?: string
	ja: string
}

export type MoveCategoryType =
	| 'normal'
	| 'unique'
	| 'special'
	| 'superarts'
	| 'throws'
	| 'common'

export interface MoveValues {
	damage: number[] | number
	damageAdditional?: number
	damageInitial?: number
	damageImmediate?: number
	damageImmediateCancel?: number
	damageScaleMin?: number
	damageScaleCounter?: number
	damageScalePunish?: number
	driveHit: number
	driveBlock: number
	drivePunish: number
	superarts: number
	superartsPunish?: number
}

export interface Move {
	id: string
	names?: MoveNames
	category: MoveCategoryType
	input: string
	inputModern?: string
	inputModernAlt?: string
	values: MoveValues[] | MoveValues
}

export interface CharacterNames {
	en: string
	ja: string
}

export interface Character {
	id: string
	names: CharacterNames
	vitality: number
	moves: Move[]
}

export interface CharacterSummary {
	id: string
	names: CharacterNames
}

export interface ParameterIndex {
	characters: CharacterSummary[]
}
