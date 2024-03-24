import { delay } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import Error from 'next/error'

const book_ids = {
	oldinputs: '1SSk7lg3Ym17lw8Hn-yZvT_erE9umRHPlrZJ8U4faBMY',
	outputs: '1I3sq1tm1Wn6uIDcp8_3Uede4Qlj_WFNWMh1KJLtlYr0',
	inputs: '12HZe4vBhfbeIW3b5WAOubYB3I612UAHjWEWvqH8Y4_U',
}
export const fetchSheets = async ({ bookName, sheetName }:{bookName:'outputs'|'inputs',sheetName:String}) => {
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
export type TournamentsOutput = {
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

export type LeaderboardTeam = {
	RawRk:string,
	ShowRk:string,
	FullRk:string,
	RkChange:number,
	TourID:string,
	tourneyID:number,
	Name:string,
	Score:string,
	Today:string,
	Thru:string,
	R1:string,
	R2:string,
	R3:string,
	R4:string,
	Total:string,
	Points:string,
	Earnings:string,
	PastScore:string,
	G1Pos:string,
	G1Name:string,
	G1Total:string,
	G1Today:string,
	G1Thru:string,
	G2Pos:string,
	G2Name:string,
	G2Total:string,
	G2Today:string,
	G2Thru:string,
	G3Pos:string,
	G3Name:string,
	G3Total:string,
	G3Today:string,
	G3Thru:string,
	G4Pos:string,
	G4Name:string,
	G4Total:string,
	G4Today:string,
	G4Thru:string,
	G5Pos:string,
	G5Name:string,
	G5Total:string,
	G5Today:string,
	G5Thru:string,
	G6Pos:string,
	G6Name:string,
	G6Total:string,
	G6Today:string,
	G6Thru:string,
	G7Pos:string,
	G7Name:string,
	G7Total:string,
	G7Today:string,
	G7Thru:string,
	G8Pos:string,
	G8Name:string,
	G8Total:string,
	G8Today:string,
	G8Thru:string,
	G9Pos:string,
	G9Name:string,
	G9Total:string,
	G9Today:string,
	G9Thru:string,
	G10Pos:string,
	G10Name:string,
	G10Total:string,
	G10Today:string,
	G10Thru:string,
}
export const useTourLeaderboard = () => {
	const bookName = 'inputs'
	const sheetName = 'Leaderboards'
	return useQuery({
		queryKey: ['getLeaderboard',bookName,sheetName],
		queryFn: () => fetchSheets({bookName,sheetName}),
	})
}
export const useTourStandings = () => {
	const bookName = 'inputs'
	const sheetName = 'Standings'
	return useQuery({
		queryKey: ['getStandings',bookName,sheetName],
		queryFn: () => fetchSheets({bookName,sheetName}),
	})
}
