import type { DataSerializer } from './types'

const JsonDataSerializer: DataSerializer = {
	serialize(data) {
		return data ? JSON.stringify(data) : null
	},

	deserialize(str) {
		return str ? JSON.parse(str) : undefined
	},
} as const

export {
	JsonDataSerializer,
}
