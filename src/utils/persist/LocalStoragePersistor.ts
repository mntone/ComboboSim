import type { Persistor } from './types'

class LocalStoragePersistor implements Persistor {
	#key: string
	#disabled = false

	constructor(key: string) {
		this.#key = key

		try {
			if (typeof window.localStorage === 'undefined') {
				console.log('LocalStorage is unavailable')

				this.#disabled = true
			}
		} catch (err: unknown) {
			if (err instanceof Error && err.name === 'SecurityError') {
				console.log('LocalStorage access forbidden')

				this.#disabled = true
			} else {
				throw err
			}
		}
	}

	get disabled(): boolean {
		return this.#disabled
	}

	clear(): void {
		if (!this.#disabled) {
			localStorage.removeItem(this.#key)
		}
	}

	load() {
		if (this.#disabled) {
			return null
		} else {
			return localStorage.getItem(this.#key)
		}
	}

	save(str: string | null): boolean {
		if (this.#disabled) {
			return false
		}

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
