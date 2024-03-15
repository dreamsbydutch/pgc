'use client'

import { Tournament } from '@/api/fetchSheets'
import { StandingTeam } from '@/lib/inputTypes'
import { formatMoney } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { rankChange } from './ui/rankChange'

export default function StandingsItem({ info, tourneys, i }: { info: StandingTeam; tourneys: Tournament[]; i: number }) {
	const [showInfo, setShowInfo] = useState(false)

	return (
		// <div className="" onClick={() => setShowInfo(!showInfo)}>
		<div
			className={`[&:nth-child(17)]:border-t-2 [&:nth-child(17)]:border-yellow-600 [&:nth-child(32)]:border-t-2 [&:nth-child(32)]:border-gray-600`}
			onClick={() => setShowInfo(!showInfo)}>
			<div className="grid grid-flow-row grid-cols-8 text-center py-1 md:py-2 border-t border-dashed border-t-gray-400">
				<div className="flex font-varela place-self-center text-2xs xs:text-xs sm:text-sm md:text-base lg:text-lg">
					{info.ShowRk} {rankChange(+info.RkChange)}
				</div>
				<div className="font-varela place-self-center text-base sm:text-lg md:text:xl lg:text-2xl col-span-4 [&>:nth-child(1)]:ml-1.5">
					{info.TeamName}
					{info.Tourney6Rk === '1' ? <Image className="inline-block mx-0.5 w-7" src={tourneys[5].Logo} alt={tourneys[5].Tourney + ' Logo'} /> : <></>}
					{info.Tourney10Rk === '1' ? (
						<Image className="inline-block mx-0.5 w-7" src={tourneys[9].Logo} alt={tourneys[9].Tourney + ' Logo'} />
					) : (
						<></>
					)}
					{info.Tourney13Rk === '1' ? (
						<Image className="inline-block mx-0.5 w-7" src={tourneys[12].Logo} alt={tourneys[12].Tourney + ' Logo'} />
					) : (
						<></>
					)}
					{info.Tourney16Rk === '1' ? (
						<Image className="inline-block mx-0.5 w-7" src={tourneys[15].Logo} alt={tourneys[15].Tourney + ' Logo'} />
					) : (
						<></>
					)}
				</div>
				<div className="font-varela place-self-center text-xs col-span-2 2xs:text-sm sm:text-base md:text-lg lg:text-xl">{info.Points}</div>
				<div className="font-varela place-self-center text-2xs xs:text-xs sm:text-sm md:text-base lg:text-lg">{formatMoney(+info.Earnings)}</div>
			</div>
			{showInfo ? <StandingsItemInfo info={info} tourneys={tourneys} /> : <></>}
		</div>
	)
}

function StandingsItemInfo({ info, tourneys }: { info: any; tourneys: any }) {
	return (
		<div className="mx-2.5">
			<div className="grid grid-flow-row grid-cols-5 text-center pt-1.5">
				<div className="place-self-center font-varela text-3xs 2xs:text-2xs sm:text-sm font-bold">Wins</div>
				<div className="place-self-center font-varela text-3xs 2xs:text-2xs sm:text-sm font-bold">Top Tens</div>
				<div className="place-self-center font-varela text-3xs 2xs:text-2xs sm:text-sm font-bold">Cuts Made</div>
				<div className="place-self-center font-varela text-3xs 2xs:text-2xs sm:text-sm font-bold">Weekday Avg.</div>
				<div className="place-self-center font-varela text-3xs 2xs:text-2xs sm:text-sm font-bold">Weekend Avg.</div>
			</div>
			<div className="grid grid-flow-row grid-cols-5 text-center pb-3">
				<div className="font-varela place-self-center text-xs 2xs:text-sm sm:text-base md:text-lg">{info.TourneyWins}</div>
				<div className="font-varela place-self-center text-xs 2xs:text-sm sm:text-base md:text-lg">{info.TourneyToptens}</div>
				<div className="font-varela place-self-center text-xs 2xs:text-sm sm:text-base md:text-lg">{info.TourneyCutsmade}</div>
				<div className="font-varela place-self-center text-xs 2xs:text-sm sm:text-base md:text-lg">{info.WeekdayScrAvg}</div>
				<div className="font-varela place-self-center text-xs 2xs:text-sm sm:text-base md:text-lg">{info.WeekendScrAvg}</div>
			</div>
			<div className="grid grid-flow-row grid-cols-8 text-center items-end px-1 py-1.5 [&>*:nth-child(8)]:border-none">
				{tourneys.slice(0, 8).map((obj: any) => {
					return (
						<div key={obj.tourneyID} className="grid h-full items-end justify-items-center border-r border-dotted border-gray-400">
							<Link href={'/leaderboard/' + obj.tourneyID} className="block max-w-full max-h-14 p-0.5">
								<Image className="max-h-12" width={48} height={48} src={obj.Logo} alt={obj.Tourney} />
							</Link>
							<div className="font-barlow font-extrabold text-base xs:text-lg sm:text-xl md:text-2xl">{info['Tourney' + obj.tourneyID + 'Rk']}</div>
						</div>
					)
				})}
			</div>
			<div className="grid grid-flow-row grid-cols-8 text-center items-end px-1 py-1.5 [&>*:nth-child(8)]:border-none">
				{tourneys.slice(8, 16).map((obj: any) => {
					return (
						<div key={obj.tourneyID} className="grid h-full items-end justify-items-center border-r border-dotted border-gray-400">
							<Link href={'/leaderboard/' + obj.tourneyID} className="block max-w-full max-h-14 p-0.5">
								<Image className="max-h-12" width={48} height={48} src={obj.Logo} alt={obj.Tourney} />
							</Link>
							<div className="font-barlow font-extrabold text-base xs:text-lg sm:text-xl md:text-2xl">{info['Tourney' + obj.tourneyID + 'Rk']}</div>
						</div>
					)
				})}
			</div>
			<div className="py-4"></div>
		</div>
	)
}
