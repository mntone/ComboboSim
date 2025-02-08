import { Button, ButtonGroup } from '@heroui/button'
import { Listbox, ListboxItem, ListboxSection } from '@heroui/listbox'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover'
import type { SharedSelection } from '@heroui/system'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { useCallback, useMemo, useState } from 'react'
import { TbPlus } from 'react-icons/tb'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import MoveName from '@/components/MoveLabel/MoveName'
import { pushCombo } from '@/features/combo/slice'
import { selectMoveItemsByCategory } from '@/features/parameterLoader/selectors'
import { selectDynamicResource } from '@/features/resourceLoader/selectors'
import { selectMoveNameDisplayModes } from '@/features/userSettings/selectors'

const categoryNames = {
	normal: msg`Normal Moves`,
	unique: msg`Unique Attacks`,
	special: msg`Special Moves`,
	superarts: msg`Super Arts`,
	throws: msg`Throws`,
	common: msg`Common Moves`,
}

function MoveListBox() {
	const { i18n: { locale }, t } = useLingui()
	const dispatch = useAppDispatch()
	const moveItemsByCategory = useAppSelector(selectMoveItemsByCategory)
	const displayModes = useAppSelector(selectMoveNameDisplayModes)
	const res = useAppSelector(selectDynamicResource)

	const [selectedMoveKeys, setSelectedMoveKeys] = useState<Set<string>>(new Set([]))
	const [isOpen, setIsOpen] = useState(false)

	const moveItems = useMemo(function() {
		return moveItemsByCategory.flatMap(function(cat) {
			return cat.moves
		})
	}, [moveItemsByCategory.length])

	const getMoveItemByKey = useCallback(function(key?: string) {
		if (!key) {
			return undefined
		}

		const targetMoveItem = moveItems.find(function(moveItem) {
			return moveItem.id === key
		})
		return targetMoveItem
	}, [moveItems])

	const getCurrentMoveName = useCallback(function(keys: Set<string>) {
		const key = keys.keys().next().value
		if (!key) {
			return <></>
		}

		const targetMoveItem = getMoveItemByKey(key)
		if (!targetMoveItem) {
			return <></>
		}

		return (
			<MoveName
				displayModes={displayModes}
				locale={locale}
				move={targetMoveItem.data}
				res={res}
			/>
		)
	}, [locale, displayModes, res, getMoveItemByKey])

	const handleMoveChange = useCallback(function(keys: SharedSelection) {
		if (import.meta.env.DEV && !(keys instanceof Set)) {
			console.log('Expected Set<string>, but got invalid type.')
		}

		setSelectedMoveKeys(keys as Set<string>)
		setIsOpen(false)
	}, [setSelectedMoveKeys, setIsOpen])

	const handleAddMove = useCallback(function() {
		const selectedMoveKey = selectedMoveKeys.keys().next().value
		if (selectedMoveKey) {
			const targetMoveItem = getMoveItemByKey(selectedMoveKey)
			if (targetMoveItem) {
				setIsOpen(false)
				dispatch(pushCombo(targetMoveItem.data))
			}
		}
	}, [dispatch, selectedMoveKeys, getMoveItemByKey, setIsOpen])

	return (
		<ButtonGroup
			className='max-w-64'
			fullWidth
		>
			<Popover
				classNames={{
					content: 'p-0 min-w-64 overflow-clip',
				}}
				isOpen={isOpen}
				offset={4}
				placement='bottom-start'
				triggerType='listbox'
				onOpenChange={setIsOpen}
			>
				<PopoverTrigger>
					<Button className='justify-start'>
						{getCurrentMoveName(selectedMoveKeys)}
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Listbox
						classNames={{
							base: 'p-0',
							list: 'p-1 py-2 max-h-[32rem] overflow-y-auto',
						}}
						items={moveItemsByCategory}
						selectedKeys={selectedMoveKeys}
						selectionMode='single'
						onSelectionChange={handleMoveChange}
					>
						{moveItemsByCategory => (
							<ListboxSection
								title={t(categoryNames[moveItemsByCategory.id])}
							>
								{moveItemsByCategory.moves.map(function(moveItem) {
									return (
										<ListboxItem
											key={moveItem.id}
											classNames={{
												base: 'px-3',
											}}
										>
											<MoveName
												displayModes={displayModes}
												locale={locale}
												move={moveItem.data}
												res={res}
											/>
										</ListboxItem>
									)
								})}
							</ListboxSection>
						)}
					</Listbox>
				</PopoverContent>
			</Popover>

			<Button
				aria-label='Add Move'
				isIconOnly
				onPress={handleAddMove}
			>
				<TbPlus size={16} />
			</Button>
		</ButtonGroup>
	)
}

export default MoveListBox
