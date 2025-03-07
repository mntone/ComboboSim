import { useLingui } from '@lingui/react/macro'
import { Item } from '@react-stately/collections'

import { useSetToSingleValue } from '@/common/hooks/useSetToSingleValue'

import type { HitType } from '@/features/combo/types'

import { CSMenuButton } from '../CSPopover'

import { hitTypeNameArray, HIT_TYPE_NAMES } from './constants'
import type { HitTypeListProps, HitTypeNamesKey } from './types'

function HitTypeList({ selectedHitType, onHitTypeChange }: HitTypeListProps) {
	const { t } = useLingui()

	const handleHitTypeChange = useSetToSingleValue(
		onHitTypeChange,
		function(hitType: string | undefined): HitType {
			return hitType as HitType
		},
		[onHitTypeChange],
	)

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
