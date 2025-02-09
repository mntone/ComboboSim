import fetchMock, { type RouteResponse, type UserRouteConfig } from 'fetch-mock'

import fetchJson from './fetchJson'

const DEFAULT_RESPONSE: RouteResponse = {
	status: 200,
	headers: { 'Content-Type': 'application/json' },
}

const DEFAULT_OPTIONS: UserRouteConfig = {
	delay: 200,
}

beforeAll(() => {
	fetchMock.mockGlobal()
})

afterAll(() => {
	fetchMock.unmockGlobal()
})

test('should return data for a successful request', async () => {
	const response: RouteResponse = Object.assign({}, DEFAULT_RESPONSE, {
		body: { message: 'OK' },
	})
	fetchMock.getOnce('/api/ok', response, DEFAULT_OPTIONS)

	const json = await fetchJson('/api/ok')
	expect(json).toEqual({ message: 'OK' })
})

test('should throw an error for non-200 response (404)', async () => {
	const response: RouteResponse = Object.assign({}, DEFAULT_RESPONSE, {
		status: 404,
		body: { message: 'NG' },
	})
	fetchMock.getOnce('/api/ng-status', response, DEFAULT_OPTIONS)

	await expect(fetchJson('/api/ng-status'))
		.rejects.toThrow('Fetch failed: status \'404\'')
})

test('should throw an error if Content-Type is missing', async () => {
	const response: RouteResponse = {
		status: 200,
	}
	fetchMock.getOnce('/api/ng-notype', response, DEFAULT_OPTIONS)

	await expect(fetchJson('/api/ng-notype')).rejects.toThrow('Missing content type: expected JSON')
})

test('should throw an error for non-JSON content type', async () => {
	const response: RouteResponse = Object.assign({}, DEFAULT_RESPONSE, {
		body: 'Plain text response',
		headers: { 'Content-Type': 'text/plain' },
	})
	fetchMock.getOnce('/api/ng-json', response, DEFAULT_OPTIONS)

	await expect(fetchJson('/api/ng-json'))
		.rejects.toThrow('Unexpected content type: expected JSON, but got \'text/plain\'')
})

test('should handle network failure', async () => {
	fetchMock.getOnce('/api/ng-type', { throws: new TypeError('Network request failed') })

	await expect(fetchJson('/api/ng-type'))
		.rejects.toThrow('Network request failed')
})
