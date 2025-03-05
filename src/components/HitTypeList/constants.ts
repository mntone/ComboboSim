import type { MessageDescriptor } from '@lingui/core'
import { msg } from '@lingui/core/macro'

import type { HitType } from '@/features/combo/types'

import type { HitTypeNames } from './types'

export const HIT_TYPE_NAMES: HitTypeNames = {
	normal: msg`Normal`,
	counter: msg`Counter`,
	punish: msg`Punish Counter`,
}

export const hitTypeNameArray: { id: HitType, value: MessageDescriptor }[]
	= Object.entries(HIT_TYPE_NAMES).map(function([id, value]) {
		return { id: id as HitType, value }
	})
