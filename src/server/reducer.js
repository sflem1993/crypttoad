import {updateCurrencies} from './data';

export default function reducer(state, action) {
	switch(action.type) {
		case 'UPDATE_MARKETS':
			return updateCurrencies(state, action.newCurrencyData);
		default:
			return state;
	}
}