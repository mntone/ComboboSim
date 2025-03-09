import { lingui } from '@lingui/vite-plugin'
import optimizeLocales from '@react-aria/optimize-locales-plugin'
import { vanillaExtractPlugin as vanillaExtract } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import csp from 'vite-plugin-csp-guard'
import { createHtmlPlugin as html } from 'vite-plugin-html'
import { defineConfig } from 'vitest/config'

import packageJson from './package.json'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	return {
		build: {
			rollupOptions: {
				output: {
					assetFileNames: 'a/[name]-[hash:6].[ext]',
					chunkFileNames: 'a/[name]-[hash:6].js',
					entryFileNames: 'a/main-[hash:6].js',
					generatedCode: {
						constBindings: true,
						objectShorthand: true,
						preset: 'es2015',
					},
					manualChunks(id) {
						if (id.includes('node_modules')) {
							return 'ven'
						}
					},
				},
			},
		},
		define: {
			'import.meta.env.APP_VERSION': JSON.stringify(packageJson.version),
		},
		esbuild: mode === 'production' && {
			drop: ['console'],
		},
		plugins: [
			{
				...optimizeLocales.vite({
					locales: [
						'en-US',
						'ja-JP',
						'zh-CN',
						'zh-TW',
					],
				}),
				enforce: 'pre',
			},
			vanillaExtract(),
			react({
				babel: {
					plugins: ['@lingui/babel-plugin-lingui-macro'],
				},
			}),
			lingui(),
			html({ minify: true }),
			csp({
				build: {
					sri: true,
				},
				policy: {
					'script-src': ['\'self\'', '\'unsafe-eval\''],
				},
			}),
		],
		resolve: {
			alias: [
				{ find: '@', replacement: '/src' },
				{ find: '@/tests', replacement: '/tests' },
			],
		},
		test: {
			environment: 'jsdom',
			globals: true,
		},
	}
})
