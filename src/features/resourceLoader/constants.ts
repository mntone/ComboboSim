import type { ResourceLoaderState } from './types'

const RESOURCELOADER_NAME = 'res'

const RESOURCELOADER_INITIAL_STATE: ResourceLoaderState = {
	state: 'loading',
	res: null,
}

export {
	RESOURCELOADER_NAME,
	RESOURCELOADER_INITIAL_STATE,
}
