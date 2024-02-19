'use client'
import { usePGALeaderboard } from '@/lib/hooks/fetchDataGolf'

export default function Leaderboard() {
	const data2 = usePGALeaderboard()
	console.log(data2.data)
	return <div>1w22</div>
}
