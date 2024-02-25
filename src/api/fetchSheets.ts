import { useQuery } from '@tanstack/react-query'
import Error from 'next/error'

const book_ids = {
	inputs: '1SSk7lg3Ym17lw8Hn-yZvT_erE9umRHPlrZJ8U4faBMY',
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

export type Tournament = {
	tourneyID: number,
	dg_id: number,
	Tourney: string,
	StartDate: Date,
	EndDate: Date,
	Dates: string,
	Class: string,
	PointsPurse: number,
	MoneyPurse: number,
	Par: number,
	ShowPar: string,
	Course: string,
	Location: string,
	Logo: string,
	FormLink: string,
}
type TournamentsOutput = {
	all: Tournament[],
	current: Tournament | undefined,
	next: Tournament | undefined,
	previous: Tournament | undefined,
	isLoading: Boolean,
	isError: Boolean,
	error: globalThis.Error | null,
	refetch: any,
}
export const useTournaments = (): TournamentsOutput => {
	const bookName = 'inputs'
	const sheetName = 'Tournaments'
	const now = new Date()
	const data = useQuery({
		queryKey: ['getTournaments',bookName,sheetName],
		queryFn: () => fetchSheets({bookName,sheetName}),
	})
	if (!data.data) {
		return {
			all: [],
			current: undefined,
			next: undefined,
			previous: undefined,
			isLoading:data.isLoading,
			isError:data.isError,
			error:data.error,
			refetch:data.refetch,
		}
	}
	const tourneyData: Tournament[] = data.data.map((tourney: any) => {
		tourney.tourneyID = +tourney.tourneyID
		tourney.dg_id = +tourney.dg_id
		tourney.StartDate = new Date(tourney.StartDate)
		tourney.EndDate = new Date(tourney.EndDate)
		tourney.PointsPurse = +tourney.PointsPurse
		tourney.MoneyPurse = +tourney.MoneyPurse
		tourney.Par = +tourney.Par
		return tourney
	})
	return {
		all: tourneyData,
		current: tourneyData.filter(obj => now > obj.StartDate && now < obj.EndDate)[0],
		previous: tourneyData.filter(obj => now > obj.EndDate).slice(-1)[0],
		next: tourneyData.filter(obj => now < obj.StartDate)[0],
		isLoading:data.isLoading,
		isError:data.isError,
		error:data.error,
		refetch:data.refetch,
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
