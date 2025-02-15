import type { AriaMenuItemProps, AriaMenuProps } from '@react-aria/menu'
import type { TreeState } from '@react-stately/tree'
import type { Node } from '@react-types/shared'

export interface CSMenuClassNames {
	base?: string
}

export interface CSMenuProps<T> extends AriaMenuProps<T> {
	classNames?: CSMenuClassNames
}

export interface MenuSectionProps<T> {
	item: Node<T>
	state: TreeState<T>
}

export interface CSMenuItemProps<T> extends Omit<AriaMenuItemProps, 'onAction' | 'onClose'> {
	item: Node<T>
	state: TreeState<T>
}
