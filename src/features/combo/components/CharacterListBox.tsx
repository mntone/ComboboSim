import { useLingui } from '@lingui/react/macro'
import { Item } from '@react-stately/collections'

import { useSetToSingleValue } from '@/common/hooks/useSetToSingleValue'

import { useAppSelector } from '@/app/hooks'
import { CSMenuButton } from '@/components/CSPopover'
import { selectCharacterArray, selectCharacters } from '@/features/parameterLoader/selectors'
import type { CharacterParameterState } from '@/features/parameterLoader/types'

import type { CharacterListProps } from './types'

function CharacterListBox({
	characterKey,
	onCharacterChange,
}: Readonly<CharacterListProps>) {
	const { i18n: { locale } } = useLingui()
	const characterArray = useAppSelector(selectCharacterArray)
	const characters = useAppSelector(selectCharacters)
	const characterKeySet = new Set(characterKey ? [characterKey] : [])

	const getLocalizedName = useMemo(function() {
		return locale === 'ja'
			? function(item: CharacterParameterState) { return item.names.ja }
			: function(item: CharacterParameterState) { return item.names.en }
	}, [locale])

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
			label={characterKey ? getLocalizedName(characters[characterKey]) : ''}
			selectedKeys={characterKeySet}
			selectionMode='single'
			onSelectionChange={handleCharacterChange}
		>
			{function(item) {
				return (
					<Item key={item.id}>
						{getLocalizedName(item)}
					</Item>
				)
			}}
		</CSMenuButton>
	)
}

export {
	CharacterListBox,
}
