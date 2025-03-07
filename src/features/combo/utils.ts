import type { ReadonlyDeep } from 'type-fest'

import type { Move } from '@/common/types'

import type { ComboItem, ComboState, HitType, PushComboData } from './types'
import { getComboUtils } from './utils/getComboUtils'
import { initComboState } from './utils/initComboState'

function applyDriveRushIfRequired(move: ReadonlyDeep<Move>, state: ComboState) {
	if (move.input === '656' || move.input === '656MM') {
		if (state.rush !== 'active') {
			if (state.combo === 0) {
				state.rush = 'active_first'
			} else {
				state.rush = 'active'
				state.p2 *= 0.85
			}
		}
		return
	}
}

function calcScale(move: ReadonlyDeep<Move>, state: ComboState): number {
	const immediate = move.scaleImmediateCancel && state.special
		? move.scaleImmediateCancel
		: move.scaleImmediate ?? 0
	state.p1 -= immediate

	let p1
	if (state.isScaleActive) {
		p1 = Math.max(10, state.p1)
	} else if (state.combo === 1) {
		p1 = 100 - immediate
	} else {
		p1 = 100
	}

	const baseScale = 0.01 * Math.floor(p1 * state.p2)
	const scale = Math.max(move.scaleMinimum ?? 0.1, baseScale)

	state.special = move.category === 'special'

	if (state.combo === 0 && move.scaleInitial) {
		state.isScaleActive = true
		state.p1 -= move.scaleInitial
	} else {
		if (state.combo === 1) {
			state.isScaleActive = true
		}
		state.p1 -= move.scaleAdditional ?? 10
	}

	return scale
}

function validInput(
	combo: ReadonlyDeep<PushComboData>,
	chain: ReadonlyDeep<ComboItem[]>,
) {
	if (chain.length === 0) {
		if (combo.inputType === 'cancel') {
			throw new Error('Is meaty attack only')
		}
	} else {
		if (combo.hitType !== 'normal') {
			throw new Error('Is normal hit only')
		}
	}
}

function simulateMove(
	move: Move,
	chain: ReadonlyDeep<ComboItem[]>,
	offset: number,
	maxFrame: number,
	hitType: HitType,
): ComboItem {
	const state = initComboState(move, chain.at(-1), offset, hitType)

	// Update proration state with the current move.
	applyDriveRushIfRequired(move, state)

	if (move.hits && move.hits.length !== 0) {
		// Update scale if there is a hit.
		state.scale = calcScale(move, state)

		const comboUtils = getComboUtils(state.hitType)
		for (const hit of move.hits) {
			if (hit.frameStart > maxFrame) {
				break
			}
			++state.juggle

			const baseDamage = comboUtils.getBaseDamage(hit)
			state.damage += Math.floor(state.scale * baseDamage)
			if (state.rush === 'inactive') {
				state.drive += hit.driveHit
			}
			state.super += comboUtils.getSuper(hit)
			state.targetFrame = comboUtils.getTargetFrame(hit)
		}

		// Update state
		++state.combo
		state.totalDamage += state.damage
		state.totalDrive += state.drive
		state.totalSuper += state.super
	}

	return state
}

function createComboItem(
	data: PushComboData,
	chain: ComboItem[],
): ComboItem {
	validInput(data, chain)

	if (data.inputType === 'cancel') {
		// Rollback
		const prevItem = chain[length - 1]
		chain[length - 1] = simulateMove(prevItem.move, chain.toSpliced(length - 1), 0, data.offset, prevItem.hitType)

		const newItem = simulateMove(data.move, chain, 0, Infinity, data.hitType)
		return newItem
	} else {
		const newItem = simulateMove(data.move, chain, data.offset, Infinity, data.hitType)
		return newItem
	}
}

export {
	createComboItem,
}
