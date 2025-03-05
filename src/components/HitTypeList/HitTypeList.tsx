import { useLingui } from '@lingui/react/macro'
import { Item } from '@react-stately/collections'
import type { Selection } from '@react-types/shared'
import { useCallback } from 'react'

import type { HitType } from '@/features/combo/types'

import { CSMenuButton } from '../CSPopover'

import { hitTypeNameArray, HIT_TYPE_NAMES } from './constants'
import type { HitTypeListProps, HitTypeNamesKey } from './types'

function HitTypeList({ selectedHitType, onHitTypeChange }: HitTypeListProps) {
	const { t } = useLingui()

	const handleHitTypeChange = useCallback(function(keys: Selection) {
		if (typeof onHitTypeChange === 'function') {
			if (import.meta.env.DEV && !(keys instanceof Set)) {
				console.log('Expected Set<string>, but got invalid type')
				return
			}

			const hitTypeKey = (keys as Set<string>).keys().next().value as HitType
			onHitTypeChange(hitTypeKey)
		}
	}, [onHitTypeChange])

	return (
		<CSMenuButton
			disallowEmptySelection
			items={hitTypeNameArray}
			label={t(HIT_TYPE_NAMES[selectedHitType as HitTypeNamesKey])}
			selectedKeys={new Set([selectedHitType])}
			selectionMode='single'
			onSelectionChange={handleHitTypeChange}
		>
			{function(item) {
				return (
					<Item key={item.id}>
						{t(item.value)}
					</Item>
				)
			}}
		</CSMenuButton>
	)
}

export {
	HitTypeList,
}
