import { Tournament, fetchSheets } from '@/api/fetchSheets'
import Header from '@/components/header'
import { StandingTeam } from '@/lib/inputTypes'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default async function Standings() {
	const standings: StandingTeam[] = await fetchSheets({ bookName: 'outputs', sheetName: 'Standings' })
	const tourneys: Tournament[] = await fetchSheets({ bookName: 'inputs', sheetName: 'Tournaments' })
	const splitStandings = [standings.filter(obj => obj.TourID === '1').slice(0, 15), standings.filter(obj => obj.TourID === '2').slice(0, 15)]
	return (
		<div className="grid grid-flow-col grid-cols-2 text-center mx-auto">
			<Link href="/standings/1" className="border-r border-black pr-2">
				<div className="text-lg font-bold mb-2">PGC Tour</div>
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
								{obj.Tourney6Rk === '1' ? (
									<img className="inline-block mx-0.5 w-7" src={tourneys[5].Logo} alt={tourneys[5].Tourney + ' Logo'} />
								) : (
									<></>
								)}
								{obj.Tourney10Rk === '1' ? (
									<img className="inline-block mx-0.5 w-7" src={tourneys[9].Logo} alt={tourneys[9].Tourney + ' Logo'} />
								) : (
									<></>
								)}
								{obj.Tourney13Rk === '1' ? (
									<img className="inline-block mx-0.5 w-7" src={tourneys[12].Logo} alt={tourneys[12].Tourney + ' Logo'} />
								) : (
									<></>
								)}
								{obj.Tourney16Rk === '1' ? (
									<img className="inline-block mx-0.5 w-7" src={tourneys[15].Logo} alt={tourneys[15].Tourney + ' Logo'} />
								) : (
									<></>
								)}
							</div>
							<div className="font-varela place-self-center text-xs col-span-2 2xs:text-sm sm:text-base md:text-lg lg:text-xl">{obj.Points}</div>
						</div>
					)
				})}
			</Link>
			<Link href="/standings/2" className="pl-2">
				<div className="text-lg font-bold mb-2">DbyD Tour</div>
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
								{obj.Tourney6Rk === '1' ? (
									<img className="inline-block mx-0.5 w-7" src={tourneys[5].Logo} alt={tourneys[5].Tourney + ' Logo'} />
								) : (
									<></>
								)}
								{obj.Tourney10Rk === '1' ? (
									<img className="inline-block mx-0.5 w-7" src={tourneys[9].Logo} alt={tourneys[9].Tourney + ' Logo'} />
								) : (
									<></>
								)}
								{obj.Tourney13Rk === '1' ? (
									<img className="inline-block mx-0.5 w-7" src={tourneys[12].Logo} alt={tourneys[12].Tourney + ' Logo'} />
								) : (
									<></>
								)}
								{obj.Tourney16Rk === '1' ? (
									<img className="inline-block mx-0.5 w-7" src={tourneys[15].Logo} alt={tourneys[15].Tourney + ' Logo'} />
								) : (
									<></>
								)}
							</div>
							<div className="font-varela place-self-center text-xs col-span-2 2xs:text-sm sm:text-base md:text-lg lg:text-xl">{obj.Points}</div>
						</div>
					)
				})}
			</Link>
		</div>
	)
}
