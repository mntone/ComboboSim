import type { MoveNameDisplayModes } from '@/common/types'

import type { ComboTableColumnKey } from '@/components/ComboList'

export interface UserSettings {
	isDirty: boolean
	comboTableColumns: ComboTableColumnKey[] | null
	resourceId: string | null
	moveNameDisplayMode: MoveNameDisplayModes
	skipComboDeletionAlert: boolean
}
