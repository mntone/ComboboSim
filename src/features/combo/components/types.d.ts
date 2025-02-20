import type { Move } from '@/common/types'

import type { CharacterParameterState } from '../types'

export interface CharacterListProps {
	characterKey?: string | null
	onCharacterChange?: (character: CharacterParameterState) => void
}

export interface MoveListBoxProps {
	characterKey: string | null
	lastMove?: Move
}
