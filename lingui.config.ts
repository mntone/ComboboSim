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
	],
	compileNamespace: 'json',
}

export default config
