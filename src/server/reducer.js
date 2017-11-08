import {List, Map, fromJS} from 'immutable';

function updateMarkets(state, marketData) {
	return state.set("marketData", marketData);
}

export default function reducer(state = Map(), action) {
	switch(action.type) {
		case 'UPDATE_MARKET_LIST':
			return state.set('markets', action.markets);
		case 'UPDATE_MARKET_DATA':
			return updateMarkets(state, action.marketData);
		default:
			return state;
	}
}