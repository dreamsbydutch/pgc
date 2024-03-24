'use client'

import { Tournament } from '@/api/fetchSheets'
import PGCLeaderboard from '@/components/TourLeaderboard'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function LiveLeaderboard({ tourney, tourID }: { tourney: Tournament; tourID: string | undefined }) {
	const searchParams = useSearchParams()
	const [pgcEffect, setPGCEffect] = useState(false)
	const [dbydEffect, setDbyDEffect] = useState(false)
	const [pgaEffect, setPGAEffect] = useState(false)
	const [leaderboardToggle, setLeaderboardToggle] = useState(searchParams.get('tour') || tourID || 'PGC')

	return (
		<div className="py-4">
			<div className="mt-8">
				<div className="my-4 mx-auto text-center">
					<button
						onClick={() => {
							setLeaderboardToggle('PGC')
							setPGCEffect(true)
						}}
						className={`${pgcEffect && 'animate-toggleClick'} my-2 mx-3 py-1 px-6 rounded-lg text-lg md:text-xl sm:px-8 md:px-10 font-bold ${
							leaderboardToggle === 'PGC' ? 'bg-gray-600 text-gray-300 shadow-btn' : 'bg-gray-300 text-gray-800 shadow-btn'
						}`}
						onAnimationEnd={() => setPGCEffect(false)}>
						PGC
					</button>
					<button
						onClick={() => {
							setLeaderboardToggle('DbyD')
							setDbyDEffect(true)
						}}
						className={`${dbydEffect && 'animate-toggleClick'} my-2 mx-3 py-1 px-6 rounded-lg text-lg md:text-xl sm:px-8 md:px-10 font-bold ${
							leaderboardToggle === 'DbyD' ? 'bg-gray-600 text-gray-300 shadow-btn' : 'bg-gray-300 text-gray-800 shadow-btn'
						}`}
						onAnimationEnd={() => setDbyDEffect(false)}>
						DbyD
					</button>
					<button
						onClick={() => {
							setLeaderboardToggle('PGA')
							setPGAEffect(true)
						}}
						className={`${pgaEffect && 'animate-toggleClick'} my-2 mx-3 py-1 px-6 rounded-lg text-lg md:text-xl sm:px-8 md:px-10 font-bold ${
							leaderboardToggle === 'PGA' ? 'bg-gray-600 text-gray-300 shadow-btn' : 'bg-gray-300 text-gray-800 shadow-btn'
						}`}
						onAnimationEnd={() => setPGAEffect(false)}>
						PGA
					</button>
				</div>
				{leaderboardToggle === 'PGC' || leaderboardToggle === 'DbyD' ? (
					<PGCLeaderboard tourney={tourney} tourID={leaderboardToggle} />
				) : (
					<>{/* <PGALeaderboard {...props} /> */}</>
				)}
			</div>
		</div>
	)
}
