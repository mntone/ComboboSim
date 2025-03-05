import type { ReadonlyDeep } from 'type-fest'

import type { Move } from '@/common/types'
import { copyObjectOmittedByNames } from '@/common/utils/copyObject'

import type { ComboItem, HitType } from '../types'

function initComboState(
	move: Move,
	prevItem: ReadonlyDeep<ComboItem> | undefined,
	offset: number,
	hitType: HitType,
): ComboItem {
	if (typeof prevItem !== 'undefined') {
		const state = copyObjectOmittedByNames(prevItem, ['move']) as ComboItem

		// Update state
		state.index += 1
		state.move = move

		state.damage = 0
		state.drive = 0
		state.super = 0

		state.hitType = 'normal'

		state.startFrame += prevItem.ownerFrame + offset
		state.ownerFrame = move.totalFrames
		state.targetFrame -= prevItem.ownerFrame
		return state
	} else {
		const state: ComboItem = {
			index: 0,
			move,

			damage: 0,
			drive: 0,
			scale: 1,
			super: 0,

			totalDamage: 0,
			totalDrive: 0,
			totalSuper: 0,

			combo: 0,
			juggle: 0,

			isScaleActive: false,
			special: false,
			hitType,
			rush: 'inactive',
			p1: 100,
			p2: 1,

			startFrame: offset,
			ownerFrame: move.totalFrames,
			targetFrame: 0,
		}
		return state
	}
}

export {
	initComboState,
}
