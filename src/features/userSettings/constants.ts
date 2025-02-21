import { JsonDataSerializer } from '@/utils/persist/JsonDataSerializer'
import { LocalStoragePersistor } from '@/utils/persist/LocalStoragePersistor'
import type { DataSerializer, Persistor } from '@/utils/persist/types'

import type { UserSettings } from './types'

const USERSETTINGS_NAME = 'settings'

const USERSETTINGS_CHANNEL_NAME = '_s'

const USERSETTINGS_DEFAULT_PERSISTOR: Persistor = new LocalStoragePersistor('_user')

const USERSETTINGS_DEFAULT_SERIALIZER: DataSerializer = JsonDataSerializer

const USERSETTINGS_INITIAL_STATE: UserSettings = {
	isDirty: false,
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
	USERSETTINGS_CHANNEL_NAME,
	USERSETTINGS_DEFAULT_PERSISTOR,
	USERSETTINGS_DEFAULT_SERIALIZER,
	USERSETTINGS_INITIAL_STATE,
}
