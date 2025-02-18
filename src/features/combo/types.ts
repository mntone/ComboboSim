import type { Combo } from '@/components/ComboList/types'

type Rush = 'inactive' | 'active_first' | 'active'

export interface ProrationState {
	count: number
	special: boolean
	rush: Rush
	p1: number
	p2: number
}

export interface ComboItem extends Combo {
	readonly index: number
	readonly proration: ProrationState
}

export interface ComboState {
	characterId: string | null
	combos: ComboItem[]
}
