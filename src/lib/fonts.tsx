import { Barlow_Condensed, Inter as FontSans, Varela_Round, Yellowtail } from 'next/font/google'

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
