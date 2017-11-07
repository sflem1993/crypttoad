import {List, Map, fromJS} from 'immutable';
import {updateMarketList} from './data';

// function updateMarkets(state, marketData) {

// }

export default function reducer(state = Map(), action) {
	switch(action.type) {
		case 'UPDATE_MARKET_LIST':
			return updateMarketList(state, fromJS(action.markets));
		case 'UPDATE_MARKET_LISTz':
			return state.set('markets', action.markets);
		case 'UPDATE_MARKET_DATA':
			return state;//updateMarkets(state, action.marketData);
		default:
			return state;
	}
}