import type { ReadonlyDeep } from 'type-fest'

import type { LanguageInfo } from './type'

export const LANGUAGES: ReadonlyDeep<LanguageInfo[]> = [
	{ code: 'en', name: 'English' } as const,
	{ code: 'ja', name: '日本語' } as const,
	{ code: 'zh-Hans', name: '简体中文' } as const,
	{ code: 'zh-Hant', name: '繁體中文' } as const,
] as const

export const AVAILABLE_LOCALE = LANGUAGES.map(function(info) {
	return info.code
})

export const DEFAULT_LOCALE = 'en'

export const FALLBACK_LANGUAGES: { [locale: string]: string } = {
	'en-GB': 'en',
	'en-US': 'en',
	'ja-JP': 'ja',
	'zh-cmn-Hans': 'zh-Hans',
	'zh-cmn-Hant': 'zh-Hant',
	'zh-cmn-Hans-CN': 'zh-Hans',
	'zh-cmn-Hant-TW': 'zh-Hant',
	'zh-CN': 'zh-Hans',
	'zh-TW': 'zh-Hant',
}

export const REACTARIA_LANGUAGES: { [locale: string]: string } = {
	'en': 'en-US',
	'ja': 'ja-JP',
	'zh-Hans': 'zh-CN',
	'zh-Hant': 'zh-TW',
}
