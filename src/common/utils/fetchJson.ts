const DEFAULT_REQUEST_OPTIONS: RequestInit = {
	credentials: 'omit',
	headers: new Headers({
		Accept: 'application/json',
	}),
	mode: 'same-origin',
	referrerPolicy: 'no-referrer',
}

async function fetchJson(input: RequestInfo | URL, signal?: AbortSignal) {
	const options = Object.assign({ signal }, DEFAULT_REQUEST_OPTIONS)
	const res = await fetch(input, options)
	if (!res.ok) {
		throw new Error(`Fetch failed with status ${res.status}`)
	}

	const contentType = res.headers.get('content-type')
	if (contentType === null) {
		throw new Error(`Missing Content-Type: expected 'application/json'`)
	}
	if (!contentType.includes('application/json')) {
		throw new Error(`Unexpected Content-Type: expected 'application/json', but got '${contentType}'`)
	}

	return await res.json()
}

export {
	fetchJson,
}
