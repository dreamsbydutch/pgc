'use client'

import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/utils/utils'
import { useActivePath } from '@/lib/hooks/useActivePath'

export default function MobileNav() {
	const checkActivePath = useActivePath()
	return (
		<nav className="">
			<ul className="w-full h-[72px] bg-gray-200 shadow-inv flex justify-evenly items-center fixed bottom-0 z-20">
				{navigation.map(({ href, icon: Icon, activeClass }, i) => (
					<>
						{i !== 0 && <span className="h-4/6 border border-gray-400" />}
						<li key={href}>
							<Link href={href} className={cn(checkActivePath(href) ? activeClass : '')}>
								<Icon />
							</Link>
						</li>
					</>
				))}
			</ul>
		</nav>
	)
}

const HomeIcon = () => {
	return <Image src="/assets/PGCsmall.png" alt="Home Icon" height={56} width={56} />
}
const LeaderboardIcon = () => {
	return <Image src="/assets/leaderboardIcon.png" alt="Leaderboard" height={48} width={48} />
}
const StandingsIcon = () => {
	return <Image src="/assets/standingsIcon.png" alt="Standings" height={48} width={48} />
}
const RulebookIcon = () => {
	return <Image src="/assets/rulebookIcon.png" alt="Rulebook" height={48} width={48} />
}

type NavigationItem = {
	href: string
	icon: React.ComponentType
	activeClass: string
}
const navigation: NavigationItem[] = [
	{
		href: '/',
		icon: HomeIcon,
		activeClass:
			'invert before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActiveLg before:translate-y-navbarActiveLg before:rounded-xl',
	},
	{
		href: '/leaderboard',
		icon: LeaderboardIcon,
		activeClass:
			'invert before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActive before:translate-y-navbarActive before:rounded-xl',
	},
	{
		href: '/standings',
		icon: StandingsIcon,
		activeClass:
			'invert before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActive before:translate-y-navbarActive before:rounded-xl',
	},
	{
		href: '/rulebook',
		icon: RulebookIcon,
		activeClass:
			'invert before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActive before:translate-y-navbarActive before:rounded-xl',
	},
]
