import { Button } from '@heroui/button'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown'
import type { SharedSelection } from '@heroui/system'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table'
import { i18n } from '@lingui/core'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { useCallback, useMemo, useState, type JSX } from 'react'
import { TbChevronDown, TbList, TbX } from 'react-icons/tb'
import type { ReadonlyDeep } from 'type-fest'

import MoveName from '../MoveLabel/MoveName'

import {
	COMBOTABLE_COLUMNS,
	COMBOTABLE_DEFAULT_COLUMNS,
	COMBOTABLE_OPTIONAL_COLUMNS,
	guageFormat,
	scaleFormat,
} from './constants'
import type { Combo, ComboTableColumnKey, ComboTableViewProps } from './types'

function ComboTableView({
	defaultColumns,
	displayModes,
	items,
	locale,
	onColumnsChange: onColumnChange,
	onDelete,
	res,
}: ReadonlyDeep<ComboTableViewProps>) {
	const { t } = useLingui()
	const [selectedColumns, setSelectedColumns] = useState(new Set(defaultColumns ?? COMBOTABLE_DEFAULT_COLUMNS))

	const headerColumns = useMemo(function() {
		return COMBOTABLE_COLUMNS.filter(function(col) {
			return col.required || Array.from(selectedColumns).includes(col.id)
		})
	}, [selectedColumns])

	const renderCell = useCallback(function(item: ReadonlyDeep<Combo>, key: string): JSX.Element | string {
		switch (key) {
		case 'name':
			return (
				<MoveName
					displayModes={displayModes}
					locale={locale}
					move={item.move}
					res={res}
				/>
			)
		case 'damage':
		case 'comboDamage':
			return i18n.number(item[key])
		case 'scale':
			return i18n.number(item.scale, scaleFormat)
		case 'drive':
		case 'superarts':
			return i18n.number(0.0001 * item[key], guageFormat)
		case 'actions':
			return (
				<Button
					isIconOnly
					size='sm'
					variant='light'
					onPress={() => onDelete?.call(null, item)}
				>
					<TbX size={16} />
				</Button>
			)
		default:
			return ''
		}
	}, [locale, displayModes, res, onDelete])

	const handleColumnsChange = useCallback(function(keys: SharedSelection) {
		if (import.meta.env.DEV && !(keys instanceof Set)) {
			console.log('Expected Set<string>, but got invalid type.')
		}

		const columns = keys as Set<ComboTableColumnKey>
		setSelectedColumns(columns)
		onColumnChange?.call(null, columns)
	}, [setSelectedColumns, onColumnChange])

	const toolbar = useMemo(function() {
		return (
			<div className='flex flex-col gap-4'>
				<Dropdown offset={4} placement='bottom-end'>
					<DropdownTrigger>
						<Button
							className='justify-between text-left'
							endContent={(
								<TbChevronDown className='justify-end' size={16} />
							)}
							startContent={(
								<TbList size={16} />
							)}
						>
							<div className='w-full'>
								{t(msg`View Options`)}
							</div>
						</Button>
					</DropdownTrigger>
					<DropdownMenu
						aria-label={t(msg`View Options for Combo Table`)}
						closeOnSelect={false}
						selectedKeys={selectedColumns}
						selectionMode='multiple'
						onSelectionChange={handleColumnsChange}
					>
						{COMBOTABLE_OPTIONAL_COLUMNS.map(function(col) {
							return (
								<DropdownItem key={col.id}>
									{t(col.name)}
								</DropdownItem>
							)
						})}
					</DropdownMenu>
				</Dropdown>
			</div>
		)
	}, [selectedColumns])

	return (
		<Table
			classNames={{
				th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
				td: ['py-0.5'],
			}}
			removeWrapper
			topContent={toolbar}
		>
			<TableHeader columns={headerColumns}>
				{function(col) {
					return (
						<TableColumn
							key={col.id}
							align={col.align ?? 'end'}
						>
							{t(col.name)}
						</TableColumn>
					)
				}}
			</TableHeader>
			<TableBody
				emptyContent={t(msg`No moves found`)}
				items={items}
			>
				{function(comboItem) {
					return (
						<TableRow key={comboItem.id}>
							{function(key) {
								return (
									<TableCell>
										{renderCell(comboItem, key as string)}
									</TableCell>
								)
							}}
						</TableRow>
					)
				}}
			</TableBody>
		</Table>
	)
}

export default ComboTableView
