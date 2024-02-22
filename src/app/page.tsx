'use client'
import { useTournaments } from '@/api/fetchSheets'
import Countdown from '@/components/Countdown'
import Header from '@/components/header'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
	const tourneys = useTournaments()
	if (tourneys.isLoading || !tourneys.all) return <Skeleton className="w-[100px] h-[20px] rounded-full bg-gray-400" />
	return (
		<main className="max-w-4xl mx-auto">
			<Header />
			<Countdown tourney={tourneys.next ?? tourneys.all[0]} />
		</main>
	)
}
