import type { MoveJson } from '@/features/parameterLoader/types'

export const MOCK_5LP: MoveJson = {
	id: 'jim.5LP',
	names: {
		ja: 'ピヨ',
	},
	category: 'normal',
	input: '5LP',
	inputModern: '5L',
	damage: 300,
	damageInitial: 20,
	driveHit: 250,
	driveBlock: -500,
	drivePunish: -2000,
	superarts: 300,
}

export const MOCK_5MP: MoveJson = {
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

export const MOCK_2MP: MoveJson = {
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

export const MOCK_236HK: MoveJson = {
	id: 'jim.236HK',
	names: {
		en: 'H Wind',
		ja: '強 ウィンド',
	},
	category: 'special',
	input: '236HK',
	inputModern: '236H',
	damage: [400, 400],
	driveHit: 2000,
	driveBlock: -4000,
	drivePunish: -4000,
	superarts: 1350,
}

export const MOCK_MOVE_SPECIAL: MoveJson = {
	id: 'jim.236LP',
	names: {
		en: 'L Pao Pao',
		ja: '弱 パオパオ',
	},
	category: 'special',
	input: '236LP',
	inputModern: '2SP',
	damage: [
		50,
		1300,
	],
	driveHit: 2000,
	driveBlock: -2000,
	drivePunish: -8000,
	superarts: 2150,
	overrides: {
		'JIM_POINT==2': {
			'damage[1]': 1450,
		},
		'JIM_POINT==3': {
			'damage[1]': 1600,
			'superarts': 3150,
		},
		'JIM_POINT==4': {
			'damage[1]': 1750,
			'superarts': 3150,
		},
		'JIM_POINT==5': {
			'damage[1]': 1900,
			'superarts': 4150,
		},
	},
}

export const MOCK_RUSH: MoveJson = {
	id: 'jim.656',
	category: 'common',
	input: '656',
	inputModern: '656',
	damage: 0,
	driveHit: 0,
	driveBlock: 0,
	drivePunish: 0,
	superarts: 0,
}
