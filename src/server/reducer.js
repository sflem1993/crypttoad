import {updateCurrencies, updateMarketList} from './data';

export default function reducer(state, action) {
	switch(action.type) {
		case 'UPDATE_MARKET_LIST':
			return updateMarketList(state, action.markets);
		case 'UPDATE_MARKET':
			return updateCurrencies(state, action.newCurrencyData);
		default:
			return state;
	}
}