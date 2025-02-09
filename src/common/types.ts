export interface MoveNames {
	en?: string
	ja: string
}

export interface Proration {
	initial?: number
	immediate?: number
	scaling?: number
}

export type MoveCategoryType =
	| 'normal'
	| 'unique'
	| 'special'
	| 'superarts'
	| 'throws'
	| 'common'

export interface MoveOverride {
	type: string
	extension?: string
	values: number[]
	criticalArts?: true
}

export interface Move {
	id: string
	names?: MoveNames
	category: MoveCategoryType
	input: string
	inputModern?: string
	inputModernAlt?: string
	damage: number[] | number
	damageScaleMin?: number
	damageScaleCounter?: number
	damageScalePunish?: number
	proration?: Proration
	driveHit: number
	driveBlock: number
	drivePunish: number
	superarts: number
	superartsPunish?: number
	overrides?: MoveOverride[]
}

export interface CharacterNames {
	en: string
	ja: string
}

export type CharacterExtension =
	| 'manon_medal'

export interface Character {
	id: string
	names: CharacterNames
	use: CharacterExtension[]
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
