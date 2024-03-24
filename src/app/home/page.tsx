'use client'
import { useTournaments } from '@/api/fetchSheets'
import Countdown from '@/components/Countdown'
import Header from '@/components/header'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
	const tourneys = useTournaments()
	return (
		<main className="max-w-4xl mx-auto">
			<Header />
			{!tourneys.current && !!tourneys.next && <Countdown tourney={tourneys.next} />}
		</main>
	)
}
