'use client'
import { useEffect, useRef, useState } from 'react'
import { Tournament } from '@/api/fetchSheets'
import Image from 'next/image'
import { useInterval } from 'usehooks-ts'

export default function Countdown({ tourney }: { tourney: Tournament }) {
	const [count, setCount] = useState(0)

	useEffect(() => {
		const start_date = tourney.StartDate
		const current_date = new Date()
		setCount(Math.round((+start_date - +current_date) / 1000))
	}, [tourney])

	return <CountdownTimer count={count} tourneyName={tourney.Tourney} tourneyLogo={tourney.Logo} />
}

function CountdownTimer({ count, tourneyName, tourneyLogo }: { count: number; tourneyName: string; tourneyLogo: string }) {
	var { width } = useWindowDimensions()

	const [secondsRemaining, setSecondsRemaining] = useState(count < 0 ? 0 : count)
	const [status, setStatus] = useState('Started')

	useEffect(() => {
		setSecondsRemaining(count < 0 ? 0 : count)
	}, [count])

	useInterval(
		() => {
			if (secondsRemaining > 0) {
				setSecondsRemaining(secondsRemaining - 1)
			} else {
				setStatus('Stopped')
			}
		},
		status === 'Started' ? 1000 : null
	)

	const secondsToDisplay = secondsRemaining % 60
	const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60
	const minutesToDisplay = minutesRemaining % 60
	const hoursRemaining = (minutesRemaining - minutesToDisplay) / 60
	const hoursToDisplay = hoursRemaining % 24
	const daysToDisplay = (hoursRemaining - hoursToDisplay) / 24

	return (
		<div className="my-8 p-2 rounded-2xl bg-gray-100 shadow-md">
			<div className="py-4 text-center">
				<h1 className="font-bold text-2xl px-3 sm:text-3xl md:text-4xl font-varela">Countdown until {tourneyName}</h1>
				<div className="w-full flex items-center justify-center py-3">
					<div className="">
						<Image width={1000} height={1000} className="w-full max-h-32 md:max-h-40" alt="Tourney Logo" src={tourneyLogo} />
					</div>
					<div className="text-2xl sm:text-3xl md:text-4xl font-bold font-varela">
						{twoDigits(daysToDisplay)}:{twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
						<div className="text-2xs md:text-xs">{width < 420 ? 'Days : Hrs : Mins : Secs' : 'Days : Hours : Minutes : Seconds'}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const twoDigits = (num: number) => String(num).padStart(2, '0')

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window
	return {
		width,
		height,
	}
}
function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())
	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions())
		}
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])
	return windowDimensions
}
