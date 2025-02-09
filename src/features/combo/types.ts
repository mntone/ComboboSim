import type { Combo } from '@/components/ComboList/types'

export interface ProrationState {
	special: boolean
	rush: boolean
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
