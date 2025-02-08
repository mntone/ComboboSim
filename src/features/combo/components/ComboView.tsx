import { useLingui } from '@lingui/react/macro'
import { useCallback } from 'react'
import type { ReadonlyDeep } from 'type-fest'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ComboTableView, type Combo } from '@/components/ComboList'
import { selectDynamicResource } from '@/features/resourceLoader/selectors'
import { selectMoveNameDisplayModes } from '@/features/userSettings/selectors'

import { selectComboItems } from '../selectors'
import { dropComboRight } from '../slice'

function ComboView() {
	const { i18n: { locale } } = useLingui()
	const displayModes = useAppSelector(selectMoveNameDisplayModes)
	const res = useAppSelector(selectDynamicResource)

	const dispatch = useAppDispatch()
	const comboItems = useAppSelector(selectComboItems)

	const handleDelete = useCallback(function(targetCombo: ReadonlyDeep<Combo>) {
		const index = comboItems.findLastIndex(function(combo) {
			return targetCombo === combo
		})
		if (index !== -1) {
			dispatch(dropComboRight(index))
		}
	}, [dispatch, comboItems])

	return (
		<ComboTableView
			displayModes={displayModes}
			items={comboItems}
			locale={locale}
			res={res}
			onDelete={handleDelete}
		/>
	)
}

export default ComboView
