import type { PartialDeep } from 'type-fest'

import type { MoveNameDisplayModes } from '@/common/types'

import type { ComboTableColumnKey } from '@/components/ComboList'

export interface UserSettings {
	isDirty: boolean
	comboTableColumns: ComboTableColumnKey[] | null
	resourceId: string | null
	moveNameDisplayMode: MoveNameDisplayModes
	skipComboDeletionAlert: boolean
}

export type PatchableUserSettings = PartialDeep<Omit<UserSettings, 'isDirty'>>

export type UserSettingsSyncPayload = PatchableUserSettings
export type UserSettingsPingPayload = number

export type UserSettingsMessage = {
	type: 'sync'
	payload: UserSettingsSyncPayload
} | {
	type: 'ping'
	payload: UserSettingsPingPayload
} | {
	type: 'pong'
	target: number
	payload: UserSettingsSyncPayload
}
