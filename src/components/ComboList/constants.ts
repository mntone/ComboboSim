import { msg } from '@lingui/core/macro'

import type { ComboTableColumn, ComboTableColumnKey } from './types'

export const scaleFormat: Intl.NumberFormatOptions = {
	maximumFractionDigits: 0,
	roundingMode: 'floor',
	style: 'percent',
} as const

export const guageFormat: Intl.NumberFormatOptions = {
	minimumFractionDigits: 3,
} as const

export const COMBOTABLE_COLUMNS: ComboTableColumn[] = [
	{
		id: 'name',
		name: msg`Moves`,
		required: true,
	},
	{
		id: 'damage',
		name: msg`Damage`,
		dataType: 'number',
	},
	{
		id: 'scale',
		name: msg`Damage Scale`,
		dataType: 'number',
	},
	{
		id: 'comboDamage',
		name: msg`Combo Damage`,
		dataType: 'number',
	},
	{
		id: 'drive',
		name: msg`Drive Guage`,
		dataType: 'number',
	},
	{
		id: 'superarts',
		name: msg`Super Art Guage`,
		dataType: 'number',
	},
	{
		id: 'actions',
		name: msg`Actions`,
		required: true,
	},
]

export const COMBOTABLE_OPTIONAL_COLUMNS
	= COMBOTABLE_COLUMNS.filter(function(col) {
		return !col.required
	})

export const COMBOTABLE_DEFAULT_COLUMNS: ComboTableColumnKey[] = [
	'comboDamage',
	'drive',
	'superarts',
] as const
