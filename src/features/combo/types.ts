import type { Combo } from '@/components/ComboList/types'

export interface ProrationState {
	readonly rush: boolean
	readonly p1: number
	readonly p2: number
}

export interface ComboItem extends Combo {
	readonly index: number
	readonly proration: ProrationState
}

export interface ComboState {
	items: ComboItem[]
}
