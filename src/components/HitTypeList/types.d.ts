import type { MessageDescriptor } from '@lingui/core'

export type HitTypeNames = Record<HitType, MessageDescriptor>

export type HitTypeNamesKey = keyof HitTypeNames

export interface HitTypeListProps {
	selectedHitType: HitType
	onHitTypeChange?: (hitType: HitType) => void
}
