import type { Move } from '@/common/types'

import { INITIAL_PRORATION } from './constants'
import type { ComboItem, ProrationState } from './types'

function calcImmediate(state: ProrationState, move: Move, isFirst: boolean): number {
	if (isFirst) {
		return 0
	} else if (move.proration?.immediateCancel && state.special) {
		return move.proration.immediateCancel
	} else if (move.proration?.immediate) {
		return move.proration.immediate
	} else {
		return 0
	}
}

function patchProration(state: ProrationState, move: Move, isFirst: boolean): void {
	if (move.input === '656' || move.input === '656MM') {
		if (!state.rush) {
			state.rush = true
			state.p2 *= move.proration?.scaling ?? 0.85
		}
	} else {
		state.special = move.category === 'special'

		if (isFirst && move.proration?.initial) {
			state.p1 -= move.proration.initial
		} else if (move.proration?.additional) {
			state.p1 -= move.proration.additional
		} else {
			state.p1 -= 10
		}
	}
}

function calcScale(state: ProrationState, moveItem: Move, isFirst: boolean = false): number {
	const immediate = calcImmediate(state, moveItem, isFirst)
	const baseScale = 0.01 * Math.floor(((state.p1 > 80 ? 100 : Math.max(10, state.p1)) - immediate) * state.p2)
	const scale = Math.max(moveItem.damageScaleMin ?? 0, baseScale)
	patchProration(state, moveItem, isFirst)
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
	if (!prevItem) {
		const proration = Object.assign({}, INITIAL_PRORATION)
		const scale = calcScale(proration, move, true)
		const damage = calcDamage(move.damage, scale)
		const newItem: ComboItem = {
			id: '0',
			damage,
			comboDamage: damage,
			scale,
			drive: move.driveHit,
			superarts: move.superarts,

			index: 0,
			move,
			proration,
		}
		return newItem
	}

	const index = prevItem.index + 1
	const proration = Object.assign({}, prevItem.proration)
	const scale = calcScale(proration, move)
	const damage = calcDamage(move.damage, scale)
	const newItem: ComboItem = {
		id: index.toString(),
		damage,
		comboDamage: prevItem.comboDamage + damage,
		scale,
		drive: proration.rush ? prevItem.drive : prevItem.drive + move.driveHit,
		superarts: prevItem.superarts + move.superarts,

		index,
		move,
		proration,
	}
	return newItem
}

export {
	createComboItem,
}
