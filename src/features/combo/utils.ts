import type { ReadonlyDeep } from 'type-fest'

import type { Move, MoveValues } from '@/common/types'

import { INITIAL_PRORATION } from './constants'
import type { ComboItem, ProrationState } from './types'

function calcImmediate(state: ProrationState, values: MoveValues): number {
	if (values.damageImmediateCancel && state.special) {
		return values.damageImmediateCancel
	} else {
		return values.damageImmediate ?? 0
	}
}

function patchProrationImmediate(state: ProrationState, immediate: number): void {
	state.p1 -= immediate
}

function patchProration(state: ProrationState, move: ReadonlyDeep<Move>, values: MoveValues, isFirst: boolean): void {
	if (move.input === '656' || move.input === '656MM') {
		if (state.rush !== 'active') {
			if (isFirst) {
				state.rush = 'active_first'
			} else {
				state.rush = 'active'
				state.p2 *= 0.85
			}
		}
	} else {
		--state.count
		state.special = move.category === 'special'

		if (isFirst && values.damageInitial) {
			state.count = 0
			state.p1 -= values.damageInitial
		} else {
			state.p1 -= values.damageAdditional ?? 10
		}
	}
}

function calcScale(state: ProrationState, move: ReadonlyDeep<Move>, values: MoveValues, isFirst: boolean = false): number {
	const immediate = calcImmediate(state, values)
	patchProrationImmediate(state, immediate)

	let p1
	switch (state.count) {
	case 2:
		p1 = 100
		break
	case 1:
		p1 = 100 - immediate
		break
	default:
		p1 = Math.max(10, state.p1)
		break
	}

	const baseScale = 0.01 * Math.floor(p1 * state.p2)
	const scale = Math.max(values.damageScaleMin ?? 0, baseScale)
	patchProration(state, move, values, isFirst)
	return scale
}

function calcDamage(cur: readonly number[] | number, scale: number): number {
	if (Array.isArray(cur)) {
		return cur.reduce(function(value, item) {
			return value + Math.floor(scale * item)
		}, 0)
	}
	if (typeof cur === 'number') {
		return Math.floor(scale * cur)
	}
	return 0
}

function createComboItem(move: Move, prevItem?: ComboItem): ComboItem {
	const values = Array.isArray(move.values) ? move.values[0] : move.values

	if (!prevItem) {
		const proration = Object.assign({}, INITIAL_PRORATION)
		const scale = calcScale(proration, move, values, true)
		const damage = calcDamage(values.damage, scale)
		const newItem: ComboItem = {
			id: '0',
			damage,
			comboDamage: damage,
			scale,
			drive: values.driveHit,
			superarts: values.superarts,

			index: 0,
			move,
			proration,
		}
		return newItem
	}

	const index = prevItem.index + 1
	const proration = Object.assign({}, prevItem.proration)
	const scale = calcScale(proration, move, values)
	const damage = calcDamage(values.damage, scale)
	const newItem: ComboItem = {
		id: index.toString(),
		damage,
		comboDamage: prevItem.comboDamage + damage,
		scale,
		drive: proration.rush === 'active' ? prevItem.drive : prevItem.drive + values.driveHit,
		superarts: prevItem.superarts + values.superarts,

		index,
		move,
		proration,
	}
	return newItem
}

export {
	createComboItem,
}
