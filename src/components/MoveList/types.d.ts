export interface MoveListProps {
	characterKey: string | null
	filter: (move: Move) => boolean
	selectedMove?: Move
	onMoveChange?: (move: Move | undefined) => void
}
