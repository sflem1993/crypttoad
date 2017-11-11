import Bittrex from 'bittrex-wrapper';
import {List, Map, fromJS} from 'immutable';

export const DATA_POINTS = 'price_list';
export const MARKET_STATS = "market_stats";
export const MARKETS = "markets";
export const NULL_DATA_POINT = -1;
export const INITIAL_STATE = Map();
export const MAX_SIZE = 10; //storing data every 15 seconds for 24 hour period

const bittrex = new Bittrex();

//returns promise
export function getMarketData() {
	return bittrex.publicGetMarketSummaries();
}

export function updateMarketList() {
	return bittrex.publicGetMarkets();
}