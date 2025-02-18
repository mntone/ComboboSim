import type { PropsWithChildren } from 'react'

import * as styles from './styles.css'

function CSButtonGroup({ children }: PropsWithChildren) {
	return (
		<div className={styles.group}>
			{children}
		</div>
	)
}

export {
	CSButtonGroup,
}
