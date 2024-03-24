import { useTourStandings } from '@/api/fetchSheets'
import type { StandingTeam } from '@/lib/inputTypes'
import StandingsItem from './StandingsItem'
import LoadingSpinner from './ui/loadingSpinner'

export function PGCStandings() {
	const standings = useTourStandings()
	if (!standings.data) return <LoadingSpinner />
	const pgcStandings: StandingTeam[] = standings.data.filter((obj: StandingTeam) => obj.TourID === '1')
	return (
		<div className="my-4">
			<StandingsHeaderRow />
			{pgcStandings.map((obj, i) => (
				<StandingsItem info={obj} key={obj.RawRk} />
			))}
		</div>
	)
}
export function DbyDStandings() {
	const standings = useTourStandings()
	if (!standings.data) return <LoadingSpinner />
	const dbydStandings: StandingTeam[] = standings.data.filter((obj: StandingTeam) => obj.TourID === '2')
	return (
		<div className="my-4">
			<StandingsHeaderRow />
			{dbydStandings.map((obj, i) => (
				<StandingsItem info={obj} key={obj.RawRk} />
			))}
		</div>
	)
}

function StandingsHeaderRow() {
	return (
		<div className="grid grid-flow-row grid-cols-8 text-center">
			<div className="font-varela place-self-center font-bold text-xs sm:text-sm">Rank</div>
			<div className="font-varela place-self-center font-bold text-base sm:text-lg  col-span-4">Name</div>
			<div className="font-varela place-self-center font-bold text-xs col-span-2 xs:text-sm sm:text-base">Points</div>
			<div className="font-varela place-self-center text-2xs xs:text-xs sm:text-sm">Earnings</div>
		</div>
	)
}
