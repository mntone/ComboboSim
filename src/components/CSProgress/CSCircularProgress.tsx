import * as styles from './styles.css'
import type { CSCircularProgressProps } from './types'

function CSCircularProgress({ size }: CSCircularProgressProps) {
	return (
		<svg className={styles.circular[size ?? 'md']} viewBox='-8 -8 16 16'>
			<circle r={6} />
		</svg>
	)
}

export {
	CSCircularProgress,
}
