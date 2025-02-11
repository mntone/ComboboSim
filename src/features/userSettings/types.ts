import type { ComboTableColumnKey } from '@/components/ComboList'
import type { MoveNameDisplayModes } from '@/components/MoveLabel/types'

export interface UserSettings {
	comboTableColumns: ComboTableColumnKey[] | null
	resourceId: string | null
	moveNameDisplayMode: MoveNameDisplayModes
	skipComboDeletionAlert: boolean
}
