import type { CharacterParameterState } from '../types'

export interface CharacterListProps {
	characterKey?: string | null
	onCharacterChange?: (character: CharacterParameterState) => void
}
