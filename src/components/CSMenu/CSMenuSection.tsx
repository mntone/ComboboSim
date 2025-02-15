import { useMenuSection } from '@react-aria/menu'
import { getChildNodes } from '@react-stately/collections'

import { CSMenuItem } from './CSMenuItem'
import { menuSection, menuSectionHeader } from './styles.css'
import type { MenuSectionProps } from './types'

function CSMenuSection<T extends object>({ item, state }: MenuSectionProps<T>) {
	// Get props for the menu section element
	const { itemProps, headingProps, groupProps } = useMenuSection({
		'aria-label': item['aria-label'],
		'heading': item.rendered,
	})
	return (
		<div {...itemProps}>
			{item.rendered && (
				<span className={menuSectionHeader} {...headingProps}>
					{item.rendered}
				</span>
			)}
			<div className={menuSection} {...groupProps}>
				{[...getChildNodes(item, state.collection)].map(function(node) {
					let item = (
						<CSMenuItem
							key={node.key}
							item={node}
							state={state}
						/>
					)

					if (node.wrapper) {
						item = node.wrapper(item)
					}

					return item
				})}
			</div>
		</div>
	)
}

export {
	CSMenuSection,
}
