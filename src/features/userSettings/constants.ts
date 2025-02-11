import type { UserSettings } from './types'

const USERSETTINGS_NAME = 'settings'

const USERSETTINGS_INITIAL_STATE: UserSettings = {
	comboTableColumns: null,
	resourceId: null,
	moveNameDisplayMode: {
		normal: 'movepriority',
		unique: 'nameonly',
		special: 'nameonly',
		superarts: 'nameonly',
		throws: 'movepriority',
	},
	skipComboDeletionAlert: false,
}

export {
	USERSETTINGS_NAME,
	USERSETTINGS_INITIAL_STATE,
}
