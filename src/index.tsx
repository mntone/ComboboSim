import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'

import App from './app/App'
import store from './app/store'

const elem = document.getElementById('app')
if (import.meta.env.DEV && !elem) {
	alert('Failed to find the root element')
} else {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const root = createRoot(elem!)
	root.render(
		<React.StrictMode>
			<ReduxProvider store={store}>
				<App />
			</ReduxProvider>
		</React.StrictMode>,
	)
}
