import './app.css'

import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { useCallback, useEffect } from 'react'

import CharacterList from '@/components/CharacterListBox/CharacterListBox'
import ComboView from '@/features/combo/components/ComboView'
import MoveListBox from '@/features/combo/components/MoveListBox'
import ResultView from '@/features/combo/components/ResultView'
import { setCharacterId } from '@/features/combo/slice'
import { fetchResource } from '@/features/resourceLoader/slice'
import { spaces } from '@/styles/index.css'

import { useAppDispatch } from './hooks'

async function dynamicActivate(locale: string) {
	const { messages } = await import(`../locales/${locale}.po`)
	i18n.loadAndActivate({
		locale,
		messages,
	})
}

function App() {
	const dispatch = useAppDispatch()

	const handleCharacterChange = useCallback(function(key: string) {
		dispatch(setCharacterId(key))
	}, [dispatch])

	useEffect(function() {
		document.body.classList.add(spaces.compact)

		dynamicActivate('ja')
		dispatch(fetchResource('abbr_ja'))
	}, [])

	return (
		<I18nProvider i18n={i18n}>
			<CharacterList onChange={handleCharacterChange} />
			<ComboView />
			<MoveListBox />
			<ResultView />
		</I18nProvider>
	)
}

export default App
