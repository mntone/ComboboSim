export interface Persistor {
	clear(): void
	load(): string | null
	save(str: string | null): boolean
}

export interface DataSerializer {
	serialize(data?: object): string | null
	deserialize(str: string | null): object | undefined
}
