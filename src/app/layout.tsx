import type { Metadata } from 'next'
import { Inter as FontSans, Varela_Round, Yellowtail, Barlow_Condensed } from 'next/font/google'
import './globals.css'
import MobileNav from '@/components/MobileNav'
import { cn } from '@/utils/utils'
import Provider from './_provider'

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})
export const varelaRound = Varela_Round({
	weight: '400',
	subsets: ['latin'],
	variable: '--varela',
})
export const yellowtail = Yellowtail({
	weight: '400',
	subsets: ['latin'],
	variable: '--yellowtail',
})
export const barlowCondensed = Barlow_Condensed({
	weight: '400',
	subsets: ['latin'],
	variable: '--barlow-condensed',
})

export const metadata: Metadata = {
	title: 'PGC Tour',
	description: 'The best fantasy golf experience on the planet',
	icons: ['/public/favicon.ico'],
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn('font-varela', fontSans.variable, varelaRound.variable, yellowtail.variable, barlowCondensed.variable)}>
				<Provider>
					{children}
					<MobileNav />
				</Provider>
			</body>
		</html>
	)
}
