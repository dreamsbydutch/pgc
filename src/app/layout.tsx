import type { Metadata } from 'next'
import './globals.css'
import MobileNav from '@/components/MobileNav'
import Provider from './_provider'
import { cn } from '@/lib/utils'
import { barlowCondensed, fontSans, varelaRound, yellowtail } from '@/lib/fonts'

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
