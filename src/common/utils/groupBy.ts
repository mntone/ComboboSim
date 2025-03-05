function groupBy<T, ID extends string>(items: T[], getGroup: (item: T) => ID): { id: ID, items: T[] }[] {
	const group = Object
		.entries(items.reduce<Record<string, T[]>>(function(output, item) {
			const group = getGroup(item);
			(output[group] ||= []).push(item)
			return output
		}, {}))
		.map(function([id, items]) {
			return {
				id: id as ID,
				items,
			}
		})
	return group
}

export {
	groupBy,
}
