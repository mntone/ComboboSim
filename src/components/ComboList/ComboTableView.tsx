import { i18n } from '@lingui/core'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { Item } from '@react-stately/collections'
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'
import type { Selection } from '@react-types/shared'
import { useCallback, useMemo, useState, type JSX } from 'react'
import { TbX } from 'react-icons/tb'
import type { ReadonlyDeep } from 'type-fest'

import { getPreferredMoveName } from '@/common/getPreferredMoveName'

import { CSButton } from '../CSButton'
import { CSMenuButton } from '../CSPopover'
import { CSTable } from '../CSTable'

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

	const renderCell = useCallback(function(item: ReadonlyDeep<Combo>, key: string): JSX.Element | string | undefined {
		switch (key) {
		case 'name':
			return getPreferredMoveName(item.move, displayModes, locale, res)
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
				<CSButton
					isDestructive
					isIconOnly
					variant='light'
					onPress={() => onDelete?.call(null, item)}
				>
					<TbX size={16} />
				</CSButton>
			)
		default:
			return ''
		}
	}, [locale, displayModes, res, onDelete])

	const handleColumnsChange = useCallback(function(keys: Selection) {
		if (import.meta.env.DEV && !(keys instanceof Set)) {
			console.log('Expected Set<string>, but got invalid type.')
		}

		const columns = keys as Set<ComboTableColumnKey>
		setSelectedColumns(columns)
		onColumnChange?.call(null, columns)
	}, [setSelectedColumns, onColumnChange])

	const toolbar = useMemo(function() {
		return (
			<CSMenuButton
				items={COMBOTABLE_OPTIONAL_COLUMNS}
				label={t(msg`View Options`)}
				selectedKeys={selectedColumns}
				selectionMode='multiple'
				onSelectionChange={handleColumnsChange}
			>
				{function(col) {
					return (
						<Item key={col.id}>
							{t(col.name)}
						</Item>
					)
				}}
			</CSMenuButton>
		)
	}, [selectedColumns])

	return (
		<>
			{toolbar}
			<CSTable
				aria-label={t(msg`Combo Table`)}
				empty={t(msg`No moves found`)}
			>
				<TableHeader columns={headerColumns}>
					{function({ id, name, ...col }) {
						return (
							<Column key={id} {...col}>
								{t(name)}
							</Column>
						)
					}}
				</TableHeader>
				<TableBody items={items}>
					{function(comboItem) {
						return (
							<Row key={comboItem.id}>
								{function(key) {
									return (
										<Cell>
											{renderCell(comboItem, key as string)}
										</Cell>
									)
								}}
							</Row>
						)
					}}
				</TableBody>
			</CSTable>
		</>
	)
}

export default ComboTableView
