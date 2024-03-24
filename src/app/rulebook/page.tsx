'use client'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useState } from 'react'

export default function RulebookPage() {
	return (
		<div className="pt-4 w-5/6 m-auto max-w-4xl">
			<div className="font-yellowtail font-extrabold text-5xl pt-2 pb-4 text-center">Rulebook</div>
			<div className="w-full mx-auto border-b border-2 border-slate-600"></div>
			{rulebook.map((section, i) => (
				<RuleCategory key={i} {...{ ruleData: section, i }} />
			))}
			<Image
				src="https://raw.githubusercontent.com/dreamsbydutch/pgctour/main/public/assets/2024PGC-schedule.png"
				alt="Schedule Image"
				width={1000}
				height={1000}
				className="py-8"
			/>
		</div>
	)
}

function RuleCategory({ ruleData, i }: { ruleData: [string, (string | [string, string[]])[]]; i: number }) {
	const [showState, setShowState] = useState(false)
	return (
		<div className="py-2 mx-auto border-b-2 border-slate-500" onClick={() => setShowState(!showState)}>
			<div className="text-center font-varela font-extrabold text-2xl py-3">
				{ruleData[0]}
				<span className="inline-flex pl-2">{showState ? <ChevronUpIcon /> : <ChevronDownIcon />}</span>
			</div>
			{showState &&
				ruleData[1].map((rule, j) => {
					if (typeof rule === 'string') {
						return (
							<div key={i + '.' + j} className="py-2 text-sm xs:text-base text-center">
								{rule}
							</div>
						)
					}
					return (
						<div key={i + '.' + j} className="py-2">
							<div className="text-sm xs:text-base font-bold text-center">{rule[0]}</div>
							<ul className="pt-1">
								{rule[1].map((subrule, k) => {
									return (
										<li key={`${i + 1}.${j + 1}.${k + 1}`} className="text-sm sm:text-base text-center py-1">
											{subrule}
										</li>
									)
								})}
							</ul>
						</div>
					)
				})}
		</div>
	)
}

const rulebook: [string, (string | [string, string[]])[]][] = [
	[
		'Schedule',
		[
			'The PGC Tour schedule consists of the top 16 tournaments on the PGA Tour schedule.',
			'These 16 tournaments are split in to three categories, Majors, Invitationals, and Opens.',
			['Majors', ['The Masters, PGA Championship, U.S. Open, The Open Championship']],
			[
				'Invitationals',
				[
					'The Genesis Invitational, Arnold Palmer Inviational, The Players Championship, RBC Heritage, Wells Fargo Championship, The Memorial Torunament',
				],
			],
			[
				'Opens',
				['Waste Management Open, Valero Texas Open, The CJ Cup Byron Nelson, RBC Canadian Open, Travelers Championship, Genesis Scottish Open'],
			],
			'Each tier will have a different points and payouts.',
		],
	],
	[
		'Rosters',
		[
			'The field for each tournament will be split into five groups that will be finalized on the Monday morning prior to each tournament. Groups will be chosen based on the PGC Rating.',
			'Players choose 2 golfers from each of the 5 groupings to create your 10 golfer team for the tournament. You will make new picks and have a new team for each tournament on the schedule.',
			'Groups are set on Monday morning of tournament week.',
			'Golfers that are added to the tournament field after the groups are set will be left out of the PGC field.',
			'If a golfer withdraws prior to hitting their first tee shot of the tournament and remains on your roster, then that golfer will be replaced with the highest world ranked golfer from that group.',
		],
	],
	[
		'Scoring',
		[
			'During Rounds 1 and 2 of the tournament your team’s score will be the average strokes of all 10 golfers on your team.',
			'Rounds 3 and 4 of the tournament your team’s score will be the average strokes of the 5 lowest golfers on your team that day.',
			'The leaderboard will look just like a PGA leaderboard and tracked live on the Live Leaderboard page.',
			'Teams must have 5 golfers make the weekend cut line or their team will be cut from the PGC tournament. Any golfers that withdraw before cut day will receive a score of 8-over par until cut day. Any golfer that withdraws after cut day receives a score of 8-over par on the day they participated but did not finish and then CUT on the days they do not participate at all.',
		],
	],
	[
		'Playoffs',
		[
			'After every tournament of the season the top 35 finishers will receive playoff points.',
			'Major tournaments have a total points purse of 4,325 points with the winner taking 1,000 points.',
			'Mid tier tournaments have a total points purse of 3,150 points with the winner taking 750 points.',
			'Bottom Tier tournaments have a total points purse of 1,925 points with the winner taking 450 points.',
			'At the end of the regular season the top 35 players in the standings will make the PGC Playoff tournament.',
			'Each team will start the playoff tournament at a starting score based on the distribution below.',
			'The playoff tournament will be 12-rounds long throughout all three FedEx Cup Playoff events (FedEx-StJude Championship, BMW Championship, TOUR Championship).',
			'Players that qualify for the playoff tournament will pick their team prior to the FedEx-StJude Championship as usual and that will be your team of golfers throughout the entire playoffs.',
			'The FedEx-StJude Championship will run just like a normal tournament.',
			'The BMW Championship will only count your top 5 golfers in all 4 rounds.',
			'The TOUR Championship will only count your top 3 golfers in all 4 rounds.',
			"The TOUR Championship will only count the golfer's actual score and not their starting strokes awarded by the PGA.",
		],
	],
	[
		'Payouts',
		[
			'After every tournament the top 7-15 finishers will win money earnings. Earnings will accumulate during the season and will be paid out at the end of the year.',
			'Major Champions will win $150',
			'Mid Tier Champions will win $100',
			'Bottom Tier Champions will win $50',
			'Full distributions can be found below.',
			'Payouts are based on a 75 player tour, they will be adjusted once the total number of players is finalized.',
		],
	],
]
