import { msg } from '@lingui/core/macro'
import { useLingui } from '@lingui/react/macro'

import * as styles from './styles.css'
import type { CSCircularProgressProps } from './types'

function CSCircularProgress({ size }: CSCircularProgressProps) {
	const { t } = useLingui()
	return (
		<svg
			aria-label={t(msg`Loading...`)}
			className={styles.circular[size ?? 'md']}
			role='progressbar'
			viewBox='-8 -8 16 16'
		>
			<circle r={6} />
		</svg>
	)
}

export {
	CSCircularProgress,
}
