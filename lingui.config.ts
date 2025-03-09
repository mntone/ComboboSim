import type { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
	catalogs: [
		{
			path: '<rootDir>/src/locales/{locale}',
			include: ['src'],
		},
	],
	sourceLocale: 'en',
	locales: [
		'en',
		'ja',
		'zh-Hans',
		'zh-Hant',
	],
	fallbackLocales: {
		'ja': 'en',
		'zh-Hans': ['zh', 'en'],
		'zh-Hant': ['zh', 'en'],
		'default': 'en',
	},
	compileNamespace: 'json',
}

export default config
