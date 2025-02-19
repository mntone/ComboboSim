import type { MessageDescriptor } from '@lingui/core'
import type { ReadonlyDeep } from 'type-fest'

import type { Move, MoveNameDisplayModes } from '@/common/types'

import type { CSTableColumnAlign, CSTableColumnData } from '../CSTable'

export interface Combo {
	id: string
	move: Move
	damage: number
	comboDamage: number
	scale: number
	drive: number
	superarts: number
}

export type ComboTableColumnKey =
	| keyof Omit<Combo, 'id'>
	| 'name'
	| 'actions'

export interface ComboTableColumn {
	readonly id: ComboTableColumnKey
	readonly name: MessageDescriptor
	readonly align?: CSTableColumnAlign
	readonly dataType?: CSTableColumnData
	readonly required?: true
}

export interface ComboListProps {
	displayModes: MoveNameDisplayModes
	items: Combo[]
	locale: string
	res?: Record<string, string> | null

	onDelete?: (item: ReadonlyDeep<Combo>) => void
}

export interface ComboTableViewProps extends ComboListProps {
	defaultColumns?: ComboTableColumnKey[] | null

	onColumnsChange?: (columns: Set<ComboTableColumnKey>) => void
}
