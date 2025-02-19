import type { DataSerializer, Persistor } from '@/utils/persist/types'

import { USERSETTINGS_DEFAULT_PERSISTOR, USERSETTINGS_DEFAULT_SERIALIZER, USERSETTINGS_INITIAL_STATE } from './constants'
import type { UserSettings } from './types'
import { extractChangedValues } from './utils/extractChangedValues'

function initializeState(
	persistor: Persistor = USERSETTINGS_DEFAULT_PERSISTOR,
	serializer: DataSerializer = USERSETTINGS_DEFAULT_SERIALIZER,
): UserSettings {
	const json = persistor.load()
	const extractData = serializer.deserialize(json) as Partial<UserSettings>
	return extractData
		? Object.assign({}, USERSETTINGS_INITIAL_STATE, extractData)
		: USERSETTINGS_INITIAL_STATE
}

function saveState(
	data: UserSettings,
	persistor: Persistor = USERSETTINGS_DEFAULT_PERSISTOR,
	serializer: DataSerializer = USERSETTINGS_DEFAULT_SERIALIZER,
) {
	const extractData = extractChangedValues(USERSETTINGS_INITIAL_STATE, data)
	const json = serializer.serialize(extractData)
	persistor.save(json)
}

export {
	initializeState,
	saveState,
}
