'use client'

import { Tournament, useTournaments } from '@/api/fetchSheets'
import Countdown from '@/components/Countdown'
import LeaderboardHeader from '@/components/LeaderboardHeader'
import { Skeleton } from '@/components/ui/skeleton'
import { useParams } from 'next/navigation'
import React from 'react'

export default function LeaderboardWithID() {
	let { tourneyID } = useParams()
	const tourneys = useTournaments()

	if (tourneys.isLoading || !tourneys.all) return <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-400" />

	let tourney = tourneys.all.filter((obj: Tournament) => obj.tourneyID === +tourneyID)[0]
	if (new Date(tourney['StartDate']) > new Date()) {
		return (
			<>
				<LeaderboardHeader tourney={tourney} />
				<Countdown tourney={tourney} />
			</>
		)
	} else {
		return (
			<>
				<LeaderboardHeader tourney={tourney} />
			</>
			// <TourneyLeaderboard
			//     tourney={tourney}
			//     allTourneys={props.data.allTourneys}
			//     standings={props.data.standings}
			//     live={false}
			//     limit={props.limit ?? null}
			//     home={props.home ?? null}
			// />
		)
	}
}
