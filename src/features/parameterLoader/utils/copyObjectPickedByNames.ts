/* eslint-disable @typescript-eslint/no-explicit-any */

function copyObjectPickedByNames(obj: object, propertyNames: string[]): { [s: string]: any } {
	return Object.fromEntries(Object.entries(obj).filter(function([key]) {
		return propertyNames.includes(key)
	}))
}

export default copyObjectPickedByNames
