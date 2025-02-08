import type { Move } from '@/common/types'

export const MOCK_MOVE1: Move = {
	id: 'jim.5MP',
	names: {
		ja: 'ワオ',
	},
	category: 'normal',
	input: '5MP',
	inputModern: '5M',
	damage: 600,
	driveHit: 1500,
	driveBlock: -3000,
	drivePunish: -4000,
	superarts: 500,
}

export const MOCK_MOVE2: Move = {
	id: 'jim.2MP',
	names: {
		ja: 'クオ',
	},
	category: 'normal',
	input: '2MP',
	inputModern: '2M',
	damage: 600,
	driveHit: 1500,
	driveBlock: -3000,
	drivePunish: -4000,
	superarts: 500,
}

export const MOCK_RUSH: Move = {
	id: 'jim.656',
	category: 'common',
	input: '656',
	inputModern: '656',
	damage: 0,
	proration: {
		initial: 0.85,
	},
	driveHit: 0,
	driveBlock: 0,
	drivePunish: 0,
	superarts: 0,
}
