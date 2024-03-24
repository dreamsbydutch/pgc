import { Tournament, fetchSheets } from '@/api/fetchSheets'
import Countdown from '@/components/Countdown'
import LeaderboardHeader from '@/components/LeaderboardHeader'
import { LiveLeaderboard } from './_pgcLeaderboard'

export default async function Leaderboard() {
	const tourneys: Tournament[] = await fetchSheets({ bookName: 'inputs', sheetName: 'Tournaments' })

	const leaderboards = await fetchSheets({ bookName: 'outputs', sheetName: 'Leaderboards' })
	const now = new Date()
	const currentTourney = tourneys.filter(obj => now > obj.StartDate && now < obj.EndDate)[0]
	const nextTourney = tourneys.filter(obj => now < obj.StartDate)[0]

	if (currentTourney) {
		return (
			<>
				<LeaderboardHeader tourney={currentTourney} />
				<LiveLeaderboard tourney={currentTourney} tourID={'PGC'} />
			</>
		)
	}
	if (nextTourney) {
		return (
			<>
				<LeaderboardHeader tourney={nextTourney} />
				<Countdown tourney={nextTourney} />
			</>
		)
	}
	return <></>
}
