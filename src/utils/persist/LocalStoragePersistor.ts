import type { Persistor } from './types'

class LocalStoragePersistor implements Persistor {
	#key: string

	constructor(key: string) {
		this.#key = key
	}

	clear(): void {
		localStorage.removeItem(this.#key)
	}

	load() {
		return localStorage.getItem(this.#key)
	}

	save(str: string | null): boolean {
		if (str === null) {
			this.clear()
		} else {
			localStorage.setItem(this.#key, str)
		}
		return true
	}
}

export {
	LocalStoragePersistor,
}
