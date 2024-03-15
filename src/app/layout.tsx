import type { Metadata } from 'next'
import './globals.css'
import Provider from './_provider'
import { barlowCondensed, fontSans, varelaRound, yellowtail } from '@/lib/fonts'
import MobileNav from '@/components/ui/MobileNav'

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
			<body className={`font-varela ${fontSans.variable} ${varelaRound.variable} ${yellowtail.variable} ${barlowCondensed.variable}`}>
				<Provider>
					<div className="mx-2">
						<div className="mx-auto mt-4 pb-8 mb-24 max-w-4xl">{children}</div>
					</div>
					<MobileNav />
				</Provider>
			</body>
		</html>
	)
}
