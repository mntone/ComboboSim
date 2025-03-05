import type { MoveJson } from '@/features/parameterLoader/types'

export const MOCK_5LP: MoveJson = {
	id: 'jim.5LP',
	names: {
		ja: 'ピヨ',
	},
	category: 'normal',
	input: '5LP',
	inputModern: '5L',
	scaleInitial: 20,
	totalFrames: 16,
	cancels: [
		{
			frameEnd: 6,
			frameStart: 3,
			frameReady: 1,
			targets: [
				'jim.236HK',
				'jim.236LP',
			],
		},
		{
			frameEnd: 11,
			frameStart: 6,
			frameReady: 1,
			targets: [
				'jim.656',
			],
		},
		{
			frameEnd: 14,
			frameStart: 11,
			frameReady: 3,
			targets: [
				'jim.5LP',
			],
		},
	],
	hits: [
		{
			id: 0,
			type: 'strike',
			damage: 300,
			driveHit: 250,
			driveTargetBlock: -500,
			driveTargetBlockBurnout: 250,
			driveTargetHitPunish: -2000,
			frameEnd: 6,
			frameStart: 3,
			frameTargetBlock: 12,
			frameTargetHit: 17,
			superHit: 300,
		},
	],
}

export const MOCK_5MP: MoveJson = {
	id: 'jim.5MP',
	names: {
		ja: 'ワオ',
	},
	category: 'normal',
	input: '5MP',
	inputModern: '5M',
	totalFrames: 24,
	cancels: [
		{
			frameEnd: 10,
			frameStart: 6,
			frameReady: 1,
			targets: [
				'jim.236HK',
				'jim.236LP',
			],
		},
		{
			frameEnd: 10,
			frameStart: 6,
			frameReady: 3,
			targets: [
				'jim.656',
			],
		},
	],
	hits: [
		{
			id: 0,
			type: 'strike',
			damage: 600,
			driveHit: 1500,
			driveTargetBlock: -3000,
			driveTargetBlockBurnout: 1500,
			driveTargetHitPunish: -4000,
			frameEnd: 10,
			frameStart: 6,
			frameTargetBlock: 17,
			frameTargetHit: 20,
			superHit: 500,
		},
	],
}

export const MOCK_2MP: MoveJson = {
	id: 'jim.2MP',
	names: {
		ja: 'クオ',
	},
	category: 'normal',
	input: '2MP',
	inputModern: '2M',
	totalFrames: 20,
	totalFramesMiss: 22,
	cancels: [
		{
			frameEnd: 9,
			frameStart: 6,
			frameReady: 1,
			targets: [
				'jim.236HK',
				'jim.236LP',
				'jim.656',
			],
		},
	],
	hits: [
		{
			id: 0,
			type: 'strike',
			damage: 600,
			driveHit: 1500,
			driveTargetBlock: -3000,
			driveTargetBlockBurnout: 1500,
			driveTargetHitPunish: -4000,
			frameEnd: 9,
			frameStart: 6,
			frameTargetBlock: 13,
			frameTargetHit: 20,
			superHit: 500,
		},
	],
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
	totalFrames: 46,
	cancels: [
		{
			frameEnd: 19,
			frameStart: 13,
			frameReady: 31,
			targets: [
				'jim.236HK',
				'jim.236LP',
			],
		},
	],
	hits: [
		{
			id: 0,
			type: 'strike',
			damage: 400,
			driveHit: 1000,
			driveTargetBlock: -2000,
			driveTargetBlockBurnout: 1000,
			driveTargetHitPunish: -4000,
			frameEnd: 16,
			frameStart: 13,
			frameTargetBlock: 14,
			frameTargetHit: 20,
			superHit: 600,
		},
		{
			id: 1,
			type: 'strike',
			damage: 400,
			driveHit: 1000,
			driveTargetBlock: -2000,
			driveTargetBlockBurnout: 1000,
			driveTargetHitPunish: -4000,
			frameEnd: 22,
			frameStart: 19,
			frameTargetBlock: 16,
			frameTargetHit: 28,
			frameTargetHitCounter: 28,
			frameTargetHitPunish: 28,
			superHit: 750,
		},
	],
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
	totalFrames: 155,
	totalFramesMiss: 60,
	hits: [
		{
			id: 0,
			type: 'strike',
			damage: 50,
			driveHit: 1000,
			driveTargetBlock: -2000,
			driveTargetBlockBurnout: 1000,
			driveTargetHitPunish: -8000,
			frameEnd: 23,
			frameStart: 21,
			frameTargetBlock: 16,
			frameTargetHit: 20,
			superHit: 150,
		},
		{
			id: 1,
			type: 'throw',
			damage: 1300,
			driveHit: 2000,
			driveTargetBlock: 0,
			driveTargetBlockBurnout: 0,
			driveTargetHitPunish: 0,
			frameEnd: 117,
			frameStart: 116,
			frameTargetBlock: 6,
			frameTargetHit: 10,
			frameTargetHitCounter: 10,
			frameTargetHitPunish: 10,
			superHit: 2000,
		},
	],
	overrides: {
		'JIM_POINT==2': {
			'hits[1].damage': 1450,
		},
		'JIM_POINT==3': {
			'total_frames': 201,
			'hits[1].damage': 1600,
			'hits[1].super_hit': 3150,
		},
		'JIM_POINT==4': {
			'total_frames': 201,
			'hits[1].damage': 1750,
			'hits[1].super_hit': 3150,
		},
		'JIM_POINT==5': {
			'total_frames': 206,
			'hits[1].damage': 1900,
			'hits[1].super_hit': 4150,
		},
	},
}

export const MOCK_RUSH: MoveJson = {
	id: 'jim.656',
	category: 'common',
	input: '656',
	inputModern: '656',
	totalFrames: 46,
	cancels: [
		{
			frameEnd: 46,
			frameStart: 8,
			frameReady: 1,
			targets: [
				'jim.5LP',
				'jim.5MP',
				'jim.2MP',
				'jim.236HK',
				'jim.236LP',
			],
		},
	],
}
