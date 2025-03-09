import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import import_ from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import pluginLingui from 'eslint-plugin-lingui'
import react from 'eslint-plugin-react'
import ts from 'typescript-eslint'

const SEVERAL_OFF = 0
const SEVERAL_WARN = 1
const SEVERAL_ERROR = 2

const config = ts.config(
	js.configs.recommended,
	ts.configs.strict,
	import_.flatConfigs.recommended,
	react.configs.flat['jsx-runtime'],
	jsxA11y.flatConfigs.recommended,
	pluginLingui.configs['flat/recommended'],
	stylistic.configs.customize({
		braceStyle: '1tbs',
		indent: 'tab',
	}),

	// Project rules:
	{
		rules: {
			'import/no-default-export': SEVERAL_ERROR,
			'import/no-mutable-exports': SEVERAL_ERROR,
			'import/exports-last': SEVERAL_ERROR,
			'import/order': [SEVERAL_WARN, {
				'groups': [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
				],
				'pathGroups': [
					{
						pattern: '@/common/**',
						group: 'internal',
						position: 'before',
					},
					{
						pattern: '@/**',
						group: 'internal',
					},
				],
				'newlines-between': 'always',
				'alphabetize': {
					order: 'asc',
					orderImportKind: 'asc',
					caseInsensitive: true,
				},
			}],

			'@stylistic/arrow-parens': [SEVERAL_WARN, 'as-needed'],
			'@stylistic/indent': [SEVERAL_WARN, 'tab', { SwitchCase: 0 }],
			'@stylistic/jsx-quotes': [SEVERAL_WARN, 'prefer-single'],
			'@stylistic/jsx-max-props-per-line': [SEVERAL_WARN, { maximum: { single: 2, multi: 1 } }],
			'@stylistic/jsx-sort-props': [
				SEVERAL_WARN,
				{
					ignoreCase: true,
					callbacksLast: true,
					reservedFirst: true,
				},
			],
			'@stylistic/no-multi-spaces': [SEVERAL_WARN, { ignoreEOLComments: true }],
			'@stylistic/space-before-function-paren': [SEVERAL_WARN, {
				anonymous: 'never',
				named: 'never',
				asyncArrow: 'always',
			}],
		},
		settings: {
			'import/resolver': {
				alias: {
					map: [
						['@/tests', './tests'],
						['@', './src'],
					],
					extensions: ['.ts', '.tsx'],
				},
				typescript: {
					alwaysTryTypes: true,
				},
			},
		},
	},
	{
		files: ['*.config.ts'],
		rules: {
			'import/no-default-export': SEVERAL_OFF,
		},
	},
	{
		files: ['src/features/*/slice.ts'],
		rules: {
			'no-param-reassign': [SEVERAL_ERROR, { props: false }],
			'import/no-default-export': SEVERAL_OFF,
		},
	},
)

export default config
