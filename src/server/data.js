import Bittrex from 'bittrex-wrapper';
import {List, Map, fromJS} from 'immutable';
const bittrex = new Bittrex();

export function getMarketData() {
	return bittrex.publicGetMarketSummaries();
}

export function updateMarketList() {
	return bittrex.publicGetMarkets();
}