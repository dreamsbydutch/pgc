'use client'

import { DbyDStandings, PGCStandings } from '@/components/TourStandings'
import useWindowDimensions from '@/lib/hooks/useWindowDimensions'
import Link from 'next/link'
import { useState } from 'react'

export default function TourStandings({ params }: { params: { tourID: string } }) {
	const { width } = useWindowDimensions()
	const [pgcEffect, setPGCEffect] = useState(false)
	const [dbydEffect, setDbyDEffect] = useState(false)
	if (!width) return <></>
	return (
		<>
			<div className="mb-4 pb-2 text-5xl font-yellowtail text-center sm:text-6xl md:text-7xl">
				{params.tourID === '1' ? 'PGC Tour Standings' : 'Dreams by Dutch Tour Standings'}
			</div>

			<div className="mb-2 text-sm text-gray-400 text-center md:text-base">Tap on a tour player to view their stats and tournament history.</div>
			<div className="my-4 mx-auto text-center">
				<Link
					href="/standings/1"
					onClick={() => setPGCEffect(true)}
					onAnimationEnd={() => setPGCEffect(false)}
					className={`my-2 mx-3 py-1 px-6 rounded-lg text-lg md:text-xl sm:px-8 md:px-10 font-bold whitespace-nowrap ${
						params.tourID === '1' ? 'bg-gray-600 text-gray-300 shadow-btn' : 'bg-gray-300 text-gray-800 shadow-btn'
					}`}>
					PGC
				</Link>
				<Link
					href="/standings/2"
					onClick={() => setDbyDEffect(true)}
					onAnimationEnd={() => setDbyDEffect(false)}
					className={`my-2 mx-3 py-1.5 px-6 rounded-lg text-md md:text-lg sm:px-8 md:px-10 font-bold whitespace-nowrap ${
						params.tourID === '2' ? 'bg-gray-600 text-gray-300 shadow-btn' : 'bg-gray-300 text-gray-800 shadow-btn'
					}`}>
					{width < 350 ? 'D by D' : 'Dreams by Dutch'}
				</Link>
			</div>
			{params.tourID === '1' ? <PGCStandings /> : <DbyDStandings />}
		</>
	)
}
