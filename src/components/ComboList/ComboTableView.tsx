import { i18n } from '@lingui/core'
import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'
import { Cell, Column, Row, TableBody, TableHeader } from '@react-stately/table'
import { useCallback, useMemo, type JSX } from 'react'
import { TbX } from 'react-icons/tb'
import type { ReadonlyDeep } from 'type-fest'

import { getPreferredMoveName } from '@/common/getPreferredMoveName'

import { CSButton } from '../CSButton'
import { CSTable } from '../CSTable'

import {
	COMBOTABLE_COLUMNS,
	guageFormat,
	scaleFormat,
} from './constants'
import type { Combo, ComboTableViewProps } from './types'

function ComboTableView({
	columns,
	displayModes,
	items,
	locale,
	onDelete,
	res,
}: ReadonlyDeep<ComboTableViewProps>) {
	const { t } = useLingui()

	const headerColumns = useMemo(function() {
		return COMBOTABLE_COLUMNS.filter(function(col) {
			return col.required || Array.from(columns).includes(col.id)
		})
	}, [columns])

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

	return (
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
	)
}

export {
	ComboTableView,
}
