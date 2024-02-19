import { useQuery } from '@tanstack/react-query'

const book_ids = {
	inputs: '',
	outputs: '1I3sq1tm1Wn6uIDcp8_3Uede4Qlj_WFNWMh1KJLtlYr0',
}
const fetchSheets = async ({ bookName, sheetName }:{bookName:'outputs'|'inputs',sheetName:String}) => {
	try {
		const data = await fetch('https://opensheet.elk.sh/' + book_ids[bookName] + '/' + sheetName)
		return data.json()
	} catch (error) {
		return error
	}
}


export const useTourLeaderboard = () => {
	const bookName = 'outputs'
	const sheetName = 'Leaderboards'
	return useQuery({
		queryKey: ['getLeaderboard',bookName,sheetName],
		queryFn: () => fetchSheets({bookName,sheetName}),
	})
}
export const useTourStandings = () => {
	const bookName = 'outputs'
	const sheetName = 'Standings'
	return useQuery({
		queryKey: ['getStandings',bookName,sheetName],
		queryFn: () => fetchSheets({bookName,sheetName}),
	})
}
