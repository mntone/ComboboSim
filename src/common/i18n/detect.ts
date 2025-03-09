import { fromNavigator, fromUrl, multipleDetect, type LocaleString } from '@lingui/detect-locale'

import { AVAILABLE_LOCALE, DEFAULT_LOCALE, FALLBACK_LANGUAGES } from './constants'

function defaultLocaleFallback(): LocaleString {
	return DEFAULT_LOCALE
}

function detectLanguage(): LocaleString {
	const locales = multipleDetect(
		fromUrl('lang'),
		fromNavigator(),
		defaultLocaleFallback,
	)

	for (const locale of locales) {
		if (AVAILABLE_LOCALE.includes(locale)) {
			return locale
		}

		const fallbackLocale = FALLBACK_LANGUAGES[locale]
		if (fallbackLocale !== undefined) {
			return fallbackLocale
		}
	}

	return DEFAULT_LOCALE
}

export {
	detectLanguage,
}
