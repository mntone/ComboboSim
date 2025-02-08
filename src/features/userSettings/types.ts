import type { MoveNameDisplayModes } from '@/components/MoveLabel/types'

export interface UserSettings {
	resourceId: string | null
	moveNameDisplayMode: MoveNameDisplayModes
	skipComboDeletionAlert: boolean
}
