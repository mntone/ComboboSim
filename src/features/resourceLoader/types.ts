export interface DynamicResource {
	readonly id: string
	readonly [Key: string]: string
}

export type ResourceLoaderStateType =
	| 'loading'
	| 'complete'
	| 'failure'

export interface ResourceLoaderState {
	state: ResourceLoaderStateType
	res: DynamicResource | null
}
