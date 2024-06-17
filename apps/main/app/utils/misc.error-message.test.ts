import { expect, test } from 'vitest'
import { getErrorMessage } from './misc.tsx'

test('Error object returns message', () => {
	const message = 'a fake error'
	expect(getErrorMessage(new Error(message))).toBe(message)
})

test('String returns itself', () => {
	const message = 'a fake error'
	expect(getErrorMessage(message)).toBe(message)
})

test('undefined falls back to Unknown', () => {
	expect(getErrorMessage(undefined)).toBe('Unknown Error')
})
