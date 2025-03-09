import './app.css'

import { useEffect, useLayoutEffect } from 'react'

import { ComboView } from '@/features/combo/components/ComboView'
import ResultView from '@/features/combo/components/ResultView'
import { setupSettingsSync } from '@/features/userSettings/sync'
import { spaces } from '@/styles/index.css'

import { useAppDispatch } from './hooks'
import { I18nProvider } from './providers/I18nProvider'

function App() {
	const dispatch = useAppDispatch()

	useLayoutEffect(function() {
		document.body.classList.add(spaces.compact)
	}, [])

	useEffect(function() {
		setupSettingsSync(dispatch)
	}, [])

	return (
		<I18nProvider>
			<ComboView />
			<ResultView />
		</I18nProvider>
	)
}

export {
	App,
}
