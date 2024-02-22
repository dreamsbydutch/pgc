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
					<div className="mx-2">
						<div className="mx-auto mt-4 pb-8 mb-24 max-w-4xl rounded-3xl shadow-lg">{children}</div>
					</div>
					<MobileNav />
				</Provider>
			</body>
		</html>
	)
}
