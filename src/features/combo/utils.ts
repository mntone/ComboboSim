import type { Move } from '@/common/types'

import { INITIAL_PRORATION } from './constants'
import type { ComboItem, ProrationState } from './types'

function calcProration(prev: ProrationState, cur: Move): ProrationState {
	let rush = prev.rush
	let p2 = prev.p2
	if (cur.input === '656') {
		if (rush) {
			return prev
		}

		rush = true
		p2 *= cur.proration?.scaling ?? 0.85
		return {
			rush,
			p1: prev.p1,
			p2,
		}
	}

	return {
		rush,
		p1: prev.p1 - 10,
		p2,
	}
}

function calcScale(state: ProrationState, moveItem: Move, isFirst: boolean = false): number {
	const immediate = isFirst ? 0 : moveItem.proration?.immediate ?? 0
	const scale = 0.01 * Math.floor(((state.p1 > 80 ? 100 : Math.max(10, state.p1)) - immediate) * state.p2)
	return Math.max(moveItem.damageScaleMin ?? 0, scale)
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
		const proration = INITIAL_PRORATION
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
	const proration = calcProration(prevItem.proration, move)
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
