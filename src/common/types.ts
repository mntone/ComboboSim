export interface FrameData {
	frameEnd: number
	frameStart: number
}

export interface CancelData extends FrameData {
	frameReady: number
	targets: string[]
}

export type DamageType =
	| 'strike'
	| 'projectile'
	| 'throw'

export interface HitData extends FrameData {
	id: number
	type: DamageType
	damage: number
	damageCounter?: number
	damagePunish?: number
	driveHit: number
	driveTargetBlock: number
	driveTargetBlockBurnout: number
	driveTargetHit?: number
	driveTargetHitPunish: number
	frameTargetBlock: number
	frameTargetHit: number
	frameTargetHitCounter?: number
	frameTargetHitPunish?: number
	superHit: number
	superHitPunish?: number
	superBlock?: number
	superTargetBlock?: number
	superTargetHit?: number
}

export interface MoveNames {
	ja: string
	[lang: string]: string
}

export type MoveNameDisplayMode =
	| 'moveonly'
	| 'movepriority'
	| 'nameonly'
	| 'namepriority'

export interface MoveNameDisplayModes {
	normal: MoveNameDisplayMode
	unique: MoveNameDisplayMode
	special: MoveNameDisplayMode
	superarts: MoveNameDisplayMode
	throws: MoveNameDisplayMode
}

export type MoveCategoryType =
	| 'normal'
	| 'unique'
	| 'special'
	| 'superarts'
	| 'throws'
	| 'common'

export interface Move {
	id: string
	names?: MoveNames
	category: MoveCategoryType

	input: string
	inputModern?: string
	inputModernAlt?: string
	scaleAdditional?: number
	scaleImmediate?: number
	scaleImmediateCancel?: number
	scaleInitial?: number
	scaleMinimum?: number
	totalFrames: number
	totalFramesBlock?: number
	totalFramesMiss?: number

	cancels?: CancelData[]
	dependencies?: string[]
	hits?: HitData[]
}

export interface CharacterNames {
	en: string
	ja: string
	[lang: string]: string
}

export interface Character {
	id: string
	names: CharacterNames
	vitality: number
	moves: Move[]
}
