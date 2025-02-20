import { useLingui } from '@lingui/react/macro'
import { Item } from '@react-stately/collections'
import type { Selection } from '@react-types/shared'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useAppSelector } from '@/app/hooks'
import { selectCharacterArray, selectCharacters } from '@/features/parameterLoader/selectors'
import type { CharacterParameterState } from '@/features/parameterLoader/types'

import { CSMenuButton } from '../CSPopover'

import type { CharacterListProps } from './types'

function CharacterList({
	defaultSelectedKey,
	onChange,
}: Readonly<CharacterListProps>) {
	const { i18n: { locale } } = useLingui()
	const characterArray = useAppSelector(selectCharacterArray)
	const characters = useAppSelector(selectCharacters)
	const [selectedKeys, setSelectedKeys] = useState(new Set([defaultSelectedKey ?? characterArray[0].id]))

	const getLocalizedName = useMemo(function() {
		return locale === 'ja'
			? function(item: CharacterParameterState) { return item.names.ja }
			: function(item: CharacterParameterState) { return item.names.en }
	}, [locale])

	const handleCharacterChange = useCallback(function(keys: Selection) {
		if (import.meta.env.DEV && !(keys instanceof Set)) {
			console.log('Expected Set<string>, but got invalid type')
		}

		const keySet = keys as Set<string>
		setSelectedKeys(keySet)

		const selectedKey = keySet.keys().next().value
		if (import.meta.env.DEV && typeof selectedKey === 'undefined') {
			console.log('Failed to get character id')
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		onChange?.call(null, selectedKey!)
	}, [setSelectedKeys])

	const selectedKey = useMemo(function(): string {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return selectedKeys.keys().next().value!
	}, [selectedKeys])

	useEffect(function() {
		onChange?.call(null, selectedKey)
	}, [])

	return (
		<CSMenuButton
			disallowEmptySelection
			items={characterArray}
			label={getLocalizedName(characters[selectedKey])}
			selectedKeys={selectedKeys}
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

export default CharacterList
