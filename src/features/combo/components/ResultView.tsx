import { Plural, Trans } from '@lingui/react/macro'

import { useAppSelector } from '@/app/hooks'

import { selectResult } from '../selectors'

function ResultView() {
	const result = useAppSelector(selectResult)
	return (
		<dl className='[&>dt]:font-semibold [&>dd]:mb-2'>
			<dt><Trans>Damage</Trans></dt>
			<dd>
				<Plural
					other='#'
					value={result.totalDamage}
					zero='Zero'
				/>
			</dd>
			<dt><Trans>Drive Guage Increase</Trans></dt>
			<dd>
				<Plural
					other='#'
					value={result.totalDrive}
					zero='None'
				/>
			</dd>
			<dt><Trans>Super Art Guage Increase</Trans></dt>
			<dd>
				<Plural
					other='#'
					value={result.totalSuper}
					zero='None'
				/>
			</dd>
		</dl>
	)
}

export default ResultView
