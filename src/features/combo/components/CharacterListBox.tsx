import { useLingui } from '@lingui/react/macro'
import { Item } from '@react-stately/collections'

import { useSetToSingleValue } from '@/common/hooks/useSetToSingleValue'

import { useAppSelector } from '@/app/hooks'
import { CSMenuButton } from '@/components/CSPopover'
import { CHARACTER_NAMES } from '@/features/parameterLoader/constants'
import { selectCharacterArray, selectCharacters } from '@/features/parameterLoader/selectors'
import type { CharacterParameterState } from '@/features/parameterLoader/types'

import type { CharacterListProps } from './types'

function CharacterListBox({
	characterKey,
	onCharacterChange,
}: Readonly<CharacterListProps>) {
	const { t } = useLingui()

	const characterArray = useAppSelector(selectCharacterArray)
	const characters = useAppSelector(selectCharacters)
	const characterKeySet = new Set(characterKey ? [characterKey] : [])

	const handleCharacterChange = useSetToSingleValue(
		onCharacterChange,
		function(id: string | undefined): CharacterParameterState {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const character = characters[id!]
			return character
		},
		[onCharacterChange, characters],
	)

	return (
		<CSMenuButton
			disallowEmptySelection
			items={characterArray}
			label={characterKey ? t(CHARACTER_NAMES[characterKey as keyof typeof CHARACTER_NAMES]) : ''}
			selectedKeys={characterKeySet}
			selectionMode='single'
			onSelectionChange={handleCharacterChange}
		>
			{function(item) {
				return (
					<Item key={item.id}>
						{t(CHARACTER_NAMES[item.id as keyof typeof CHARACTER_NAMES])}
					</Item>
				)
			}}
		</CSMenuButton>
	)
}

export {
	CharacterListBox,
}
