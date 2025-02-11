import type { MessageDescriptor } from '@lingui/core'
import type { ReadonlyDeep } from 'type-fest'

import type { Move } from '@/common/types'

import type { MoveNameBaseProps } from '@/components/MoveLabel/types'

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
	readonly align?: 'start'
	readonly required?: true
}

export interface ComboListProps extends MoveNameBaseProps {
	items: Combo[]

	onDelete?: (item: ReadonlyDeep<Combo>) => void
}

export interface ComboTableViewProps extends ComboListProps {
	defaultColumns?: ComboTableColumnKey[] | null

	onColumnsChange?: (columns: Set<ComboTableColumnKey>) => void
}
