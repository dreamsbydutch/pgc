import { LeaderboardTeam, Tournament, fetchSheets } from '@/api/fetchSheets'
import { StandingTeam } from '@/lib/inputTypes'
import { useState } from 'react'
import { rankChange } from './ui/rankChange'
import { addRankingSuffix } from '@/lib/utils'

export default async function PGCLeaderboard({ tourney, tourID }: { tourney: Tournament; tourID: string }) {
	const leaderboard: LeaderboardTeam[] = await fetchSheets({ bookName: 'outputs', sheetName: 'Leaderboards' })
	const standings: StandingTeam[] = await fetchSheets({ bookName: 'outputs', sheetName: 'Standings' })

	return (
		<>
			<div className="grid grid-flow-row grid-cols-10 text-center max-w-xl mx-auto">
				<div className="col-span-2 text-sm font-bold font-varela place-self-center">Rank</div>
				<div className="col-span-4 text-base font-bold font-varela place-self-center">Name</div>
				<div className="col-span-2 text-sm font-bold font-varela place-self-center">Score</div>
				<div className="col-span-1 text-2xs font-varela place-self-center sm:text-xs">Today</div>
				<div className="col-span-1 text-2xs font-varela place-self-center sm:text-xs">Thru</div>
			</div>
			{leaderboard
				.filter(obj => obj.TourID === (tourID === 'PGC' ? '1' : '2') && +obj.tourneyID === +tourney.tourneyID)
				.map(obj => (
					<PGCLeaderboardItem leaderboard={obj} key={obj.Name} standings={standings.filter(team => team.TeamName === obj.Name)[0]} />
				))}
		</>
	)
}

export function PGCLeaderboardItem({ leaderboard, standings }: { leaderboard: LeaderboardTeam; standings: StandingTeam }) {
	const [showInfo, setShowInfo] = useState(false)
	return (
		<div className="border-b border-dashed border-gray-200 max-w-xl mx-auto" onClick={() => setShowInfo(!showInfo)}>
			<div className="grid grid-flow-row grid-cols-9 text-center py-1 md:py-2 border-t border-dashed border-t-gray-400">
				<div className="flex font-varela place-self-center text-2xs col-span-1 xs:text-xs sm:text-sm md:text-base lg:text-lg">
					{leaderboard.ShowRk} {rankChange(+leaderboard.RkChange)}
				</div>
				<div className="font-varela place-self-center text-base col-span-4 sm:text-lg">{leaderboard.Name}</div>
				<div className="font-varela place-self-center text-sm col-span-2 sm:text-base">{leaderboard.Score === '+100' ? '-' : leaderboard.Score}</div>
				<div className="font-varela place-self-center text-2xs col-span-1 sm:text-xs">{leaderboard.Today === '+100' ? '-' : leaderboard.Today}</div>
				<div className="font-varela place-self-center text-2xs col-span-1 whitespace-nowrap xs:text-2xs sm:text-xs">{leaderboard.Thru}</div>
			</div>
			{showInfo ? <PGCLeaderboardItemInfo {...{ leaderboard, standings }} /> : <></>}
		</div>
	)
}
function PGCLeaderboardItemInfo({ leaderboard, standings }: { leaderboard: LeaderboardTeam; standings: StandingTeam }) {
	return (
		<div className="mt-1 mb-6 mx-auto">
			<TeamRounds {...{ leaderboard }} />
			<PGCTeamTable {...{ leaderboard }} />
			{leaderboard.tourneyID > 1 && leaderboard.tourneyID <= 16 && <ProjStandings {...{ standings }} />}
		</div>
	)
}

function TeamRounds({ leaderboard }: { leaderboard: LeaderboardTeam }) {
	return (
		<>
			<div className="mx-auto grid grid-cols-5 sm:w-10/12 md:w-9/12">
				<div className="font-varela font-bold text-xs text-center place-self-center">Rd 1</div>
				<div className="font-varela font-bold text-xs text-center place-self-center">Rd 2</div>
				<div className="font-varela font-bold text-xs text-center place-self-center">Rd 3</div>
				<div className="font-varela font-bold text-xs text-center place-self-center">Rd 4</div>
				<div className="font-varela font-bold text-xs text-center place-self-center">Total</div>
			</div>
			<div className="mx-auto grid grid-cols-5 mb-1 sm:w-10/12 md:w-9/12">
				<div className="font-varela py-1 text-sm text-center place-self-center md:text-base">{leaderboard.R1}</div>
				<div className="font-varela py-1 text-sm text-center place-self-center md:text-base">{leaderboard.R2}</div>
				<div className="font-varela py-1 text-sm text-center place-self-center md:text-base">{leaderboard.R3}</div>
				<div className="font-varela py-1 text-sm text-center place-self-center md:text-base">{leaderboard.R4}</div>
				<div className="font-varela py-1 text-sm text-center place-self-center md:text-base">{leaderboard.Total}</div>
			</div>
		</>
	)
}
function PGCTeamTable({ leaderboard }: { leaderboard: LeaderboardTeam }) {
	let golfers = []
	for (let i = 1; i <= 10; i++) {
		leaderboard['G' + i + 'Thru'] = leaderboard['G' + i + 'Thru'] === undefined ? '' : leaderboard['G' + i + 'Thru']
		golfers.push([
			leaderboard['G' + i + 'Pos'],
			leaderboard['G' + i + 'Name'],
			leaderboard['G' + i + 'Total'],
			leaderboard['G' + i + 'Pos'] === 'CUT' || leaderboard['G' + i + 'Pos'] === 'WD' || leaderboard['G' + i + 'Pos'] === 'DQ'
				? null
				: leaderboard['G' + i + 'Thru'].includes('M')
				? leaderboard['G' + i + 'Thru']
				: leaderboard['G' + i + 'Today'] + ' (' + leaderboard['G' + i + 'Thru'] + ')',
		])
	}
	return (
		<table className="text-center w-11/12 mx-auto mb-2 table-auto sm:w-9/12 md:w-8/12">
			<thead className="bg-gray-600 text-gray-100">
				<tr>
					<td className="text-2xs font-bold md:text-xs">Rk</td>
					<td className="text-2xs font-bold md:text-xs col=span-2">Golfer</td>
					<td className="text-2xs font-bold md:text-xs">Score</td>
					<td className="text-2xs font-bold md:text-xs">Today</td>
				</tr>
			</thead>
			<tbody className={`bg-gray-50 ${leaderboard['R2'] !== '-' ? '[&>*:nth-child(5)]:border-b border-gray-400' : ''}`}>
				{golfers?.map(obj => {
					if (obj[1] === '-') return null
					return (
						<tr
							key={leaderboard.RawRk}
							className={`${
								(leaderboard.R1 !== '-' &&
									(leaderboard.R2 === '-' || leaderboard.Today === '-') &&
									leaderboard.R3 === '-' &&
									(+leaderboard.Thru >= 9 || leaderboard.Thru === 'F') &&
									+obj[0].replace('T', '') > 65) ||
								obj[0] === 'CUT' ||
								obj[0] === 'WD' ||
								obj[0] === 'DQ'
									? 'text-gray-400'
									: 'text-gray-800'
							}`}>
							<td className="text-xs md:text-sm">{obj[0]}</td>
							<td className="text-xs md:text-sm">{obj[1]}</td>
							<td className="text-xs md:text-sm">{obj[0] === 'CUT' || obj[0] === 'WD' || obj[0] === 'DQ' ? '-' : obj[2]}</td>
							<td className="text-xs md:text-sm">{obj[3]}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}
function ProjStandings({ standings }: { standings: StandingTeam }) {
	return (
		<div className="w-3/6 mx-auto bg-gray-50 rounded-lg">
			<div className="text-center py-1 font-varela text-gray-800 font-bold text-base md:text-lg">Standings</div>
			<div className="mx-auto grid grid-cols-2">
				<div className="font-varela font-bold text-xs md:text-sm text-center place-self-center">Current</div>
				<div className="font-varela font-bold text-xs md:text-sm text-center place-self-center">Projected</div>
			</div>
			<div className="mx-auto grid grid-cols-2 mb-1">
				<div
					className={`font-varela py-1 text-sm md:text-base text-center place-self-center ${
						+(standings.ShowRk[0] === 'T' ? standings.ShowRk.slice(1) : standings.ShowRk) <= 35 ? 'text-green-700' : 'text-rose-800'
					}`}>
					{standings.ShowRk[0] === 'T' ? 'T' + addRankingSuffix(+standings.ShowRk.slice(1)) : addRankingSuffix(+standings.ShowRk)}
				</div>
				<div
					className={`font-varela py-1 text-sm md:text-base text-center place-self-center ${
						+(standings.ProjRk[0] === 'T' ? standings.ProjRk.slice(1) : standings.ProjRk) <= 35 ? 'text-green-700' : 'text-rose-800'
					}`}>
					{standings.ProjRk[0] === 'T' ? 'T' + addRankingSuffix(+standings.ProjRk.slice(1)) : addRankingSuffix(+standings.ProjRk)}
				</div>
			</div>
		</div>
	)
}
