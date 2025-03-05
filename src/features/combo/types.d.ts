import type { Move } from '@/common/types'

import type { Combo } from '@/components/ComboList/types'

type Rush = 'inactive' | 'active_first' | 'active'

export type InputType =
	| 'cancel'
	| 'meaty'

export type HitType =
	| 'normal'
	| 'counter'
	| 'punish'

export interface PushComboData {
	hitType: HitType
	inputType: InputType
	offset: number
	move: Move
}

export interface ComboState {
	/**
	 * The combo count, incremented by +1 for each move in the combo.
	 */
	combo: number

	/**
	 * The juggle count, incremented by +1 for each hit.
	 */
	juggle: number

	/**
	 * Indicates whether the P1 scaling is active.
	 * - `true`: P1 scaling is applied.
	 * - `false`: P1 scaling is not applied.
	 */
	isScaleActive: boolean

	special: boolean
	hitType: HitType

	/**
	 * The state of Drive Rush.
	 * - `inactive`: Drive Rush is not active.
	 * - `active_first`: Drive Rush is active, but it is the first move,
	 *   so the P2 scaling does not include the Drive Rush bonus.
	 * - `active`: Drive Rush is fully active.
	 */
	rush: Rush

	/**
	 * The scaling value for the combo.
	 */
	p1: number

	/**
	 * The multiplier scaling value for the combo.
	 */
	p2: number

	startFrame: number
	ownerFrame: number
	targetFrame: number
}

export interface ComboItem extends Combo, ComboState {
}

export interface ComboSliceState {
	characterId: string | null
	combos: ComboItem[]
}
