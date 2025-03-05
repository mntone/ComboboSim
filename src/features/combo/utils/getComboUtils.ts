import type { HitData } from '@/common/types'

import type { HitType } from '../types'

function getBaseDamage(hit: Pick<HitData, 'damage'>): number {
	return hit.damage
}

function getCounterBaseDamage(hit: Pick<HitData, 'damage' | 'damageCounter'>): number {
	return hit.damageCounter ?? Math.floor(1.2 * hit.damage)
}

function getPunishCounterBaseDamage(hit: Pick<HitData, 'damage' | 'damagePunish'>): number {
	return hit.damagePunish ?? Math.floor(1.2 * hit.damage)
}

function getSuper(hit: Pick<HitData, 'superHit'>): number {
	return hit.superHit
}

function getPunishCounterSuper(hit: Pick<HitData, 'superHit' | 'superHitPunish'>): number {
	return hit.superHitPunish ?? hit.superHit
}

function getTargetFrame(hit: Pick<HitData, 'frameStart' | 'frameTargetHit'>) {
	return hit.frameStart + hit.frameTargetHit
}

function getCounterTargetFrame(hit: Pick<HitData, 'frameStart' | 'frameTargetHit' | 'frameTargetHitCounter'>) {
	return hit.frameStart + (hit.frameTargetHitCounter ?? hit.frameTargetHit + 2)
}

function getPunishCounterTargetFrame(hit: Pick<HitData, 'frameStart' | 'frameTargetHit' | 'frameTargetHitPunish'>) {
	return hit.frameStart + (hit.frameTargetHitPunish ?? hit.frameTargetHit + 4)
}

const comboUtils = {
	normal: {
		getBaseDamage,
		getSuper,
		getTargetFrame,
	} as const,

	counter: {
		getBaseDamage: getCounterBaseDamage,
		getSuper,
		getTargetFrame: getCounterTargetFrame,
	} as const,

	punish: {
		getBaseDamage: getPunishCounterBaseDamage,
		getSuper: getPunishCounterSuper,
		getTargetFrame: getPunishCounterTargetFrame,
	} as const,
} as const

function getComboUtils(hitType: HitType) {
	return comboUtils[hitType]
}

export {
	getComboUtils,
}
