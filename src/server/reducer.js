import {List, Map, fromJS} from 'immutable';
import {updateMarketList} from './data';

export default function reducer(state = Map(), action) {
	switch(action.type) {
		case 'UPDATE_MARKET_LIST':
			return updateMarketList(state, fromJS(action.markets));
		case 'UPDATE_MARKET_LISTz':
			return state.set('markets', action.markets);
		default:
			return state;
	}
}