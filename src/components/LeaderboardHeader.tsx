import { Tournament, useTournaments } from '@/api/fetchSheets'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { DotFilledIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

export default function LeaderboardHeader({ tourney }: { tourney: Tournament }) {
	const allTourneys = useTournaments()
	return (
		<div id="leaderboard-header">
			<div className="grid grid-flow-row grid-cols-10 border-b-2 border-gray-800 mx-auto bg-red-400 py-2">
				<div className="text-center font-varela place-self-center py-2 px-1 col-span-3 row-span-4 max-h-40">
					<Image src={tourney.Logo} className="max-h-36" alt={`${tourney.Tourney} logo`} width={150} height={150} />
				</div>
				<div className="col-span-5 row-span-2 font-varela text-center place-self-center font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
					{tourney.Tourney}
				</div>

				<div className="row-span-1 col-span-2 font-varela text-xs text-center place-self-center xs:text-sm md:text-lg lg:text-xl">
					<HeaderDropdown tourneys={allTourneys.all} activeID={tourney.tourneyID} />
				</div>
				<div className="row-span-1 col-span-2 font-varela text-xs text-center place-self-center xs:text-sm md:text-lg lg:text-xl">
					{tourney.Dates}
				</div>
				<div className="row-span-1 col-span-3 font-varela text-2xs text-center place-self-center xs:text-xs md:text-sm lg:text-base">
					{tourney.Course}
				</div>
				<div className="row-span-1 col-span-2 font-varela text-2xs text-center place-self-center xs:text-xs md:text-sm lg:text-base">
					{tourney.Location}
				</div>
				<div className="row-span-1 col-span-2 font-varela text-2xs text-center place-self-center xs:text-xs md:text-sm lg:text-base">
					{tourney.ShowPar}
				</div>
				<div className="mt-2 row-span-1 col-span-3 font-varela text-2xs text-center place-self-center xs:text-xs md:text-sm lg:text-base">
					Tournament Purse:
				</div>
				<div className="mt-2 row-span-1 col-span-2 font-varela text-2xs text-center place-self-center xs:text-xs md:text-sm lg:text-base">
					{`${tourney.PointsPurse} points`}
				</div>
				<div className="mt-2 row-span-1 col-span-2 font-varela text-2xs text-center place-self-center xs:text-xs md:text-sm lg:text-base">
					{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tourney.MoneyPurse)}
				</div>
			</div>
		</div>
	)
}

// function HeaderDropdown() {
// 	return (
// 		<DropdownMenu.Root>
// 			<DropdownMenu.Trigger />
// 			<DropdownMenu.Portal>
// 				<DropdownMenu.Content>
// 					<DropdownMenu.Label>Text123</DropdownMenu.Label>
// 				</DropdownMenu.Content>
// 			</DropdownMenu.Portal>
// 		</DropdownMenu.Root>
// 	)
// }
const HeaderDropdown = ({ tourneys, activeID }: { tourneys: Tournament[]; activeID: number }) => {
	const groupedTourneys = [
		tourneys.filter(obj => obj.Class === 'Major'),
		tourneys.filter(obj => obj.Class === 'Mid'),
		tourneys.filter(obj => obj.Class === 'Bottom'),
	]
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					className="rounded-lg h-7 w-8 inline-flex items-center justify-center bg-slate-600 text-slate-100 shadow-lg"
					aria-label="Customise options">
					<ChevronDown />
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content className="max-h-[70vh] bg-white rounded-lg p-1 shadow-lg overflow-y-scroll" sideOffset={5}>
					{groupedTourneys.map((group, i) => {
						return (
							<>
								{i !== 0 && <DropdownMenu.Separator key={`sep-${i}`} className="h-[1px] bg-slate-700 m-1" />}
								<DropdownMenu.Label className="xs:text-lg font-bold text-center">{group[0].Class}</DropdownMenu.Label>
								{group.map(tourney => {
									return (
										<DropdownMenu.Item
											key={tourney.tourneyID}
											className={cn(
												'text-xs xs:text-sm sm:text-lg flex-row items-center justify-center py-1 relative px-2 outline-none select-none',
												activeID === tourney.tourneyID && 'bg-slate-200 rounded-lg'
											)}>
											<Link href={`/leaderboard/${tourney.tourneyID}`}>
												<div className="flex items-center gap-2">
													<Image src={tourney.Logo} alt={`${tourney.Tourney} logo`} width={24} height={24} />
													{tourney.Tourney}
												</div>
												<div className="text-2xs xs:text-xs text-slate-500">{`${tourney.Dates} - ${tourney.Course}`}</div>
											</Link>
										</DropdownMenu.Item>
									)
								})}
							</>
						)
					})}

					<DropdownMenu.Arrow className="fill-white" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	)
}
