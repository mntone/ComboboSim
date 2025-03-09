import { i18n } from '@lingui/core'
import { I18nProvider as LingUII18nProvider } from '@lingui/react'
import { I18nProvider as ReactAriaI18nProvider } from '@react-aria/i18n'
import { useEffect, type ReactNode } from 'react'

import { REACTARIA_LANGUAGES } from '@/common/i18n/constants'
import { detectLanguage } from '@/common/i18n/detect'

import { fetchResource } from '@/features/resourceLoader/slice'

import { useAppDispatch } from '../hooks'

async function dynamicActivate(locale: string) {
	const { messages } = await import(`../../locales/${locale}.po`)
	i18n.loadAndActivate({
		locale,
		messages,
	})
}

function I18nProvider({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch()
	const locale = detectLanguage()
	const reactAriaLocale = REACTARIA_LANGUAGES[locale]

	useEffect(function() {
		document.documentElement.setAttribute('lang', locale)
		dynamicActivate(locale)
		dispatch(fetchResource('capcom_' + locale))
	}, [locale])

	return (
		<ReactAriaI18nProvider locale={reactAriaLocale}>
			<LingUII18nProvider i18n={i18n}>
				{children}
			</LingUII18nProvider>
		</ReactAriaI18nProvider>
	)
}

export {
	I18nProvider,
}
