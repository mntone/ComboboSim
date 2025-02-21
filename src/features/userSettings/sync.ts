import type { AppDispatch } from '@/app/store'

import { USERSETTINGS_CHANNEL_NAME, USERSETTINGS_DEFAULT_PERSISTOR, USERSETTINGS_INITIAL_STATE } from './constants'
import { patchSettings } from './slice'
import type { PatchableUserSettings, UserSettingsMessage } from './types'
import { extractChangedValues } from './utils/extractChangedValues'

let settingsChannel: BroadcastChannel | null = null

function setupSettingsSync(dispatch: AppDispatch): boolean {
	if (settingsChannel !== null || !('BroadcastChannel' in self)) {
		return false
	}

	const clientId = Date.now()
	const channel = new BroadcastChannel(USERSETTINGS_CHANNEL_NAME)

	let syncTimer: number = -1

	// BroadcastChannel receiving settings
	channel.onmessage = function(ev: MessageEvent<UserSettingsMessage>) {
		switch (ev.data.type) {
		case 'sync':
			dispatch(patchSettings(ev.data.payload))
			break
		case 'ping': {
			const target = ev.data.payload
			dispatch(function(_, getState) {
				const settings = getState().settings
				const payload = extractChangedValues(USERSETTINGS_INITIAL_STATE, settings)
				const responseMessage: UserSettingsMessage = {
					type: 'pong',
					target,
					payload,
				}
				channel.postMessage(responseMessage)
			})
			break
		}
		case 'pong':
			if (syncTimer !== -1 && ev.data.target === clientId) {
				clearTimeout(syncTimer)
				dispatch(patchSettings(ev.data.payload))
			}
			break
		}
	}

	// On first launch, sync settings with other tabs.
	// If localStorage is unsupported, use BroadcastChannel for fallback communication.
	if (USERSETTINGS_DEFAULT_PERSISTOR.disabled) {
		syncTimer = setTimeout(function() {
			syncTimer = -1
		}, 666)

		const pingMessage: UserSettingsMessage = {
			type: 'ping',
			payload: clientId,
		}
		channel.postMessage(pingMessage)
	}

	// Initialize the global settings channel for cross-tab communication.
	settingsChannel = channel

	return true
}

function syncSettings(payload: PatchableUserSettings) {
	settingsChannel?.postMessage({
		type: 'sync',
		payload,
	} satisfies UserSettingsMessage)
}

export {
	setupSettingsSync,
	syncSettings,
}
