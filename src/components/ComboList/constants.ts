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

export const COMBOTABLE_COLUMNS = [
	{
		id: 'name',
		name: msg`Moves`,
		align: 'start',
		required: true,
	},
	{
		id: 'damage',
		name: msg`Damage`,
	},
	{
		id: 'scale',
		name: msg`Damage Scale`,
	},
	{
		id: 'comboDamage',
		name: msg`Combo Damage`,
	},
	{
		id: 'drive',
		name: msg`Drive Guage`,
	},
	{
		id: 'superarts',
		name: msg`Super Art Guage`,
	},
	{
		id: 'actions',
		name: msg`Actions`,
		required: true,
	},
] satisfies ComboTableColumn[]

export const COMBOTABLE_OPTIONAL_COLUMNS
	= COMBOTABLE_COLUMNS.filter(function(col) {
		return !col.required
	})

export const COMBOTABLE_DEFAULT_COLUMNS: ComboTableColumnKey[] = [
	'comboDamage',
	'drive',
	'superarts',
] as const
