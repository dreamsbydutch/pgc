// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'

// import { useActivePath } from '@/lib/hooks/useActivePath'
// import { cn } from '@/lib/utils'

// export default function MobileNav() {
// 	const checkActivePath = useActivePath()
// 	return (
// 		<nav className="">
// 			<ul className="w-full h-[72px] bg-gray-200 shadow-inv flex justify-evenly items-center fixed bottom-0 z-20">
// 				{navigation.map(({ href, icon: Icon, activeClass }, i) => (
// 					<>
// 						{i !== 0 && <span className="h-4/6 border border-gray-400" />}
// 						<li key={href}>
// 							<Link href={href} className={cn(checkActivePath(href) ? activeClass : '')}>
// 								<Icon />
// 							</Link>
// 						</li>
// 					</>
// 				))}
// 			</ul>
// 		</nav>
// 	)
// }

// const HomeIcon = () => {
// 	return <Image src="/assets/PGCsmall.png" alt="Home Icon" height={56} width={56} />
// }
// const LeaderboardIcon = () => {
// 	return <Image src="/assets/leaderboardIcon.png" alt="Leaderboard" height={48} width={48} />
// }
// const StandingsIcon = () => {
// 	return <Image src="/assets/standingsIcon.png" alt="Standings" height={48} width={48} />
// }
// const RulebookIcon = () => {
// 	return <Image src="/assets/rulebookIcon.png" alt="Rulebook" height={48} width={48} />
// }

// type NavigationItem = {
// 	href: string
// 	icon: React.ComponentType
// 	name: string
// 	activeClass: string
// }
// const navigation: NavigationItem[] = [
// 	{
// 		href: '/',
// 		icon: HomeIcon,
// 		name: 'Home',
// 		activeClass: '',
// 	},
// 	{
// 		href: '/leaderboard',
// 		icon: LeaderboardIcon,
// 		name: 'Leaderboard',
// 		activeClass: '',
// 	},
// 	{
// 		href: '/standings',
// 		icon: StandingsIcon,
// 		name: 'Standings',
// 		activeClass: '',
// 	},
// 	{
// 		href: '/rulebook',
// 		icon: RulebookIcon,
// 		name: 'Rulebook',
// 		activeClass: '',
// 	},
// ]
