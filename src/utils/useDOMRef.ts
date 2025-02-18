import type { DOMRef, DOMRefValue, RefObject } from '@react-types/shared'
import { useImperativeHandle, useRef } from 'react'

function createDOMRef<T extends HTMLElement = HTMLElement>(ref: RefObject<T | null>): DOMRefValue<T> {
	return {
		UNSAFE_getDOMNode() {
			return ref.current
		},
	}
}

function unwrapDOMRef<T extends HTMLElement>(ref: RefObject<DOMRefValue<T> | null>): RefObject<T | null> {
	return {
		get current() {
			return ref.current && ref.current.UNSAFE_getDOMNode()
		},
	}
}

function useDOMRef<T extends HTMLElement = HTMLElement>(ref: DOMRef<T>): RefObject<T | null> {
	const domRef = useRef<T>(null)
	useImperativeHandle(ref, function() {
		return createDOMRef(domRef)
	})
	return domRef
}

export {
	createDOMRef,
	unwrapDOMRef,
	useDOMRef,
}
