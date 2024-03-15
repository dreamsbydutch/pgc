import { Tournament, fetchSheets } from '@/api/fetchSheets'
import { StandingTeam } from '@/lib/inputTypes'
import Image from 'next/image'
import Link from 'next/link'

export default async function Standings() {
	const standings: StandingTeam[] = await fetchSheets({ bookName: 'outputs', sheetName: 'Standings' })
	const tourneys: Tournament[] = await fetchSheets({ bookName: 'inputs', sheetName: 'Tournaments' })
	const splitStandings = [standings.filter(obj => obj.TourID === '1').slice(0, 15), standings.filter(obj => obj.TourID === '2').slice(0, 15)]
	return (
		<div className="grid grid-flow-col grid-cols-2 text-center mx-1 gap-2">
			<Link href="/standings/1" className="border border-zinc-300 bg-zinc-100 shadow-lg rounded-xl p-2">
				<div className="text-4xl font-yellowtail my-4">PGC Tour</div>
				<div className="grid grid-flow-row grid-cols-8 text-center">
					<div className="font-varela place-self-center font-bold text-xs sm:text-sm">Rank</div>
					<div className="font-varela place-self-center font-bold text-base sm:text-lg col-span-5">Name</div>
					<div className="font-varela place-self-center font-bold text-xs col-span-2 xs:text-sm sm:text-base">Points</div>
				</div>
				{splitStandings[0].map(obj => {
					return (
						<div
							key={obj.RawRk}
							className="grid grid-flow-row grid-cols-8 text-center py-1 md:py-2 border-t border-dashed border-t-gray-400 whitespace-nowrap">
							<div className="font-varela place-self-center text-2xs xs:text-xs sm:text-sm md:text-md lg:text-lg">{obj.ShowRk}</div>
							<div className="font-varela place-self-center text-sm sm:text-base md:text-lg lg:text-xl col-span-5 [&>:nth-child(1)]:ml-1.5">
								{obj.TeamName}
							</div>
							<div className="font-varela place-self-center text-xs col-span-2 2xs:text-sm sm:text-base md:text-lg lg:text-xl">{obj.Points}</div>
						</div>
					)
				})}
			</Link>
			<Link href="/standings/2" className="border border-zinc-300 bg-zinc-100 shadow-lg rounded-xl p-2">
				<div className="text-4xl font-yellowtail my-4">DbyD Tour</div>
				<div className="grid grid-flow-row grid-cols-8 text-center">
					<div className="font-varela place-self-center font-bold text-xs sm:text-sm">Rank</div>
					<div className="font-varela place-self-center font-bold text-base sm:text-lg col-span-5">Name</div>
					<div className="font-varela place-self-center font-bold text-xs col-span-2 xs:text-sm sm:text-base">Points</div>
				</div>
				{splitStandings[1].map(obj => {
					return (
						<div
							key={obj.RawRk}
							className="grid grid-flow-row grid-cols-8 text-center py-1 md:py-2 border-t border-dashed border-t-gray-400 whitespace-nowrap">
							<div className="font-varela place-self-center text-2xs xs:text-xs sm:text-sm md:text-md lg:text-lg">{obj.ShowRk}</div>
							<div className="font-varela place-self-center text-sm sm:text-base md:text-lg lg:text-xl col-span-5 [&>:nth-child(1)]:ml-1.5">
								{obj.TeamName}
							</div>
							<div className="font-varela place-self-center text-xs col-span-2 2xs:text-sm sm:text-base md:text-lg lg:text-xl">{obj.Points}</div>
						</div>
					)
				})}
			</Link>
		</div>
	)
}
