import { useLingui } from '@lingui/react/macro'
import { Item } from '@react-stately/collections'
import type { Selection } from '@react-types/shared'
import { useCallback, useMemo } from 'react'

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

	const characterKeySet = useMemo(function() {
		return new Set(characterKey ? [characterKey] : [])
	}, [characterKey])

	const getLocalizedName = useMemo(function() {
		return locale === 'ja'
			? function(item: CharacterParameterState) { return item.names.ja }
			: function(item: CharacterParameterState) { return item.names.en }
	}, [locale])

	const handleCharacterChange = useCallback(function(keys: Selection) {
		if (import.meta.env.DEV && !(keys instanceof Set)) {
			console.log('Expected Set<string>, but got invalid type')
			return
		}

		const characterKey = (keys as Set<string>).keys().next().value
		if (import.meta.env.DEV && typeof characterKey === 'undefined') {
			console.log('Failed to get character id')
			return
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const character = characters[characterKey!]
		onCharacterChange?.call(null, character)
	}, [onCharacterChange])

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
