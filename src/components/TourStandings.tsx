import { fetchSheets } from '@/api/fetchSheets'
import type { Tournament } from '@/api/fetchSheets'
import type { StandingTeam } from '@/lib/inputTypes'
import StandingsItem from './StandingsItem'

export async function PGCStandings() {
	const standings: StandingTeam[] = await fetchSheets({ bookName: 'outputs', sheetName: 'Standings' })
	const tourneys: Tournament[] = await fetchSheets({ bookName: 'inputs', sheetName: 'Tournaments' })
	const pgcStandings = standings.filter(obj => obj.TourID === '1')
	return (
		<>
			<div id="my-4">
				<div className="grid grid-flow-row grid-cols-8 text-center">
					<div className="font-varela place-self-center font-bold text-xs sm:text-sm">Rank</div>
					<div className="font-varela place-self-center font-bold text-base sm:text-lg  col-span-4">Name</div>
					<div className="font-varela place-self-center font-bold text-xs col-span-2 xs:text-sm sm:text-base">Points</div>
					<div className="font-varela place-self-center text-2xs xs:text-xs sm:text-sm">Earnings</div>
				</div>
				{pgcStandings.map(obj => (
					<StandingsItem info={obj} key={obj.RawRk} tourneys={tourneys} />
				))}
			</div>
		</>
	)
}
export async function DbyDStandings() {
	const standings: StandingTeam[] = await fetchSheets({ bookName: 'outputs', sheetName: 'Standings' })
	const tourneys: Tournament[] = await fetchSheets({ bookName: 'inputs', sheetName: 'Tournaments' })
	const dbydStandings = standings.filter(obj => obj.TourID === '2')
	return (
		<>
			<div id="my-4">
				<div className="grid grid-flow-row grid-cols-8 text-center">
					<div className="font-varela place-self-center font-bold text-xs sm:text-sm">Rank</div>
					<div className="font-varela place-self-center font-bold text-base sm:text-lg  col-span-4">Name</div>
					<div className="font-varela place-self-center font-bold text-xs col-span-2 xs:text-sm sm:text-base">Points</div>
					<div className="font-varela place-self-center text-2xs xs:text-xs sm:text-sm">Earnings</div>
				</div>
				{dbydStandings.map(obj => (
					<StandingsItem info={obj} key={obj.RawRk} tourneys={tourneys} />
				))}
			</div>
		</>
	)
}
