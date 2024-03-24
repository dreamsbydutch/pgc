'use client'

import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
	const pathName = usePathname()
	return (
		<nav>
			<ul className="w-full h-[76px] bg-gray-200 shadow-inv flex justify-evenly items-center fixed bottom-0 z-20">
				{navigation.map(({ href, icon: Icon, activeClass }, i) => {
					if (href === '') {
						return <li key={`spacer-${i}`} className="border-slate-500 border h-4/6" />
					} else {
						return (
							<li key={`logo-${i}`}>
								<Link href={href} className={cn(pathName.startsWith(href) ? activeClass : '')}>
									<Icon />
								</Link>
							</li>
						)
					}
				})}
			</ul>
		</nav>
	)
}

type NavigationItem = {
	href: string
	icon: React.ComponentType
	activeClass: string
}
const navigation: NavigationItem[] = [
	{
		href: '/home',
		icon: () => {
			return <Image src="/assets/PGCsmall.png" alt="Home Icon" height={56} width={56} priority={true} />
		},
		activeClass:
			'invert before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActiveLg before:translate-y-navbarActiveLg before:rounded-xl w-auto h-auto',
	},
	{
		href: '',
		icon: () => {
			return <Image src="/assets/PGCsmall.png" alt="Home Icon" height={56} width={56} priority={true} />
		},
		activeClass: '',
	},
	{
		href: '/leaderboard',
		icon: () => {
			return <Image src="/assets/leaderboardIcon.png" alt="Leaderboard Icon" height={48} width={48} />
		},
		activeClass:
			'invert before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActive before:translate-y-navbarActive before:rounded-xl w-auto h-auto',
	},
	{
		href: '',
		icon: () => {
			return <Image src="/assets/PGCsmall.png" alt="Home Icon" height={56} width={56} priority={true} />
		},
		activeClass: '',
	},
	{
		href: '/standings',
		icon: () => {
			return <Image src="/assets/standingsIcon.png" alt="Standings Icon" height={48} width={48} />
		},
		activeClass:
			'invert before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActive before:translate-y-navbarActive before:rounded-xl w-auto h-auto',
	},
	{
		href: '',
		icon: () => {
			return <Image src="/assets/PGCsmall.png" alt="Home Icon" height={56} width={56} priority={true} />
		},
		activeClass: '',
	},
	{
		href: '/rulebook',
		icon: () => {
			return <Image src="/assets/rulebookIcon.png" alt="Rulebook Icon" height={48} width={48} />
		},
		activeClass:
			'invert before:inline-block before:absolute before:w-16 before:h-16 before:z-[-1] before:bg-gray-200 before:transform before:translate-x-navbarActive before:translate-y-navbarActive before:rounded-xl w-auto h-auto',
	},
]
