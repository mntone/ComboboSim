export interface DynamicResource {
	readonly id: string
	readonly [Key: string]: string
}

export type ResourceLoaderStateType =
	| 'ready'
	| 'loading'
	| 'complete'
	| 'failure'

export interface ResourceLoaderState {
	state: ResourceLoaderStateType
	resId: string | null
	res: DynamicResource | null
}
