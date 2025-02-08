import type { Move } from '@/common/types'

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

export interface MoveNameBaseProps {
	displayModes: MoveNameDisplayModes
	locale: string
	res?: Record<string, string> | null
}

export interface MoveNameProps extends MoveNameBaseProps {
	move?: Move
}
