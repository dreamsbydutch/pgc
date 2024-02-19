import { useQuery } from '@tanstack/react-query'

type apiEndpoints = 'get-player-list'|'get-schedule'|'field-updates'|'preds/get-dg-rankings'|'preds/pre-tournament'|'preds/pre-tournament-archive'|'preds/player-decompositions'|'preds/skill-ratings'|'preds/approach-skill'|'preds/fantasy-projection-defaults'|'preds/in-play'|'preds/live-tournament-stats'|'preds/live-hole-stats'|'betting-tools/outrights'|'historical-raw-data/event-list'|'historical-raw-data/rounds'|'historical-odds/event-list'|'historical-odds/outrights'
type apiOptions = {
    'tour'?: 'pga'|'euro'|'kft'|'opp'|'alt',
    'add_position'?: Number,
    'odds_format'?: 'percent'|'american'|'decimal'|'fraction',
    'event_id'?: Number,
    'year'?: Number,
    'display'?: 'value'|'rank',
    'period'?: 'l24'|'l12'|'ytd',
    'site'?: 'draftkings'|'fanduel'|'yahoo',
    'slate'?: 'main'|'showdown'|'showdown_late'|'weekend'|'captain',
    'file_format'?: 'json'|'csv',
    'dead_heat'?: 'no'|'yes',
    'stats'?: 'sg_putt'|'sg_arg'|'sg_app'|'sg_ott'|'sg_t2g'|'sg_bs'|'sg_total'|'distance'|'accuracy'|'gir'|'prox_fw'|'prox_rgh'|'scrambling',
    'round'?: 'event_avg'|'1'|'2'|'3'|'4',
    'market'?: 'win'|'top_5'|'top_10'|'top_20'|'mc'|'make_cut'|'frl',
    'book'?: 'bet365'|'betcris'|'betmgm'|'betonline'|'betway'|'bovada'|'caesars'|'corale'|'circa'|'draftkings'|'fanduel'|'pinnacle'|'skybet'|'sportsbook'|'unibet'|'williamhill',
}
const apiKey = process.env.NEXT_PUBLIC_API_KEY

const fetchDataGolf = async ({ endpoint, options }:{endpoint:apiEndpoints,options:apiOptions}) => {
    let optionString = ''
    const fetchString = 'https://feeds.datagolf.com/' + endpoint + '?' + optionString + 'key=' + apiKey
    console.log(fetchString)
	try {
		const data = await fetch(fetchString)
        console.log(data)
		return data
	} catch (error) {
		return error
	}
}


export function usePGALeaderboard() {
    const endpoint = 'get-player-list'
    const options = {
        tour: 'pga' as 'pga'
    }
	return useQuery({
		queryKey: ['getStandings',endpoint],
		queryFn: () => fetchDataGolf({endpoint,options}),
	})
}