interface ImportMetaEnv {
	readonly APP_VERSION: string
	readonly VITE_REQUEST_DELAY?: number
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
