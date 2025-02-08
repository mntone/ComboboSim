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

export type ComboKeys = keyof Combo

export interface ComboListProps extends MoveNameBaseProps {
	items: Combo[]
	onDelete?: (item: ReadonlyDeep<Combo>) => void
}

export interface ComboColumn {
	readonly id: string
	readonly name: MessageDescriptor
	readonly align?: 'start'
	readonly required?: true
}
